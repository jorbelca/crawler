<script>
  import { eliminateOperation } from "../Services/eliminateOperation";
  import { handleLogout } from "../Helpers/handleLogout";
  import { changeTime } from "../Services/changeTime";
  import { getData } from "../Services/getData";
  import { errorStore, notificationStore } from "../State/store";

  let data = []
  let dataTable = []


  // ELIMINAR SEGUIMIENTO DEL CRAWLER
  const eliminateOps = async (id) => {
    if (
      window.confirm(
        "Are you sure? This action will delete the tracking data permanently"
      )
    ) {
      const response = await eliminateOperation(id)
      const json = await response.json()

      if (response.status !== 200) {
        if (json) errorStore.setErrors(json.message)
        return errorStore.setErrors(response.statusText)
      }
      if (response.status === 200) {
        document.getElementById("selector").style.visibility = "hidden "

        dataTable = []
        return notificationStore.setNotifications(json.message)
      }
    }
  }

const handleClick = async () => {
    document.getElementById("selector").style.visibility = "visible "

    const res = await getData()
    if (res == "TypeError: Failed to fetch")
      return errorStore.setErrors(
        "There is a problem connecting to the server"
      )
    let response = await res.json()

    if (Object.keys(response)[0] === "error") {
      handleLogout()
      return errorStore.setErrors(response.error)
    }
    if (response !== undefined || response.length > 0 || response !== null){
      data = await response

    }

    if (res.status !== 200) {
      if (response == "TypeError: Failed to fetch")
        return errorStore.setErrors(
          "There is a problem connecting to the server"
        )
      return errorStore.setErrors(response.statusText)
    }
  }

// CAMBIAR DURACION DE LA COMPROBACION DEL CRAWLER
  const handleChangeTime = async (id) => {
    openModal = false

    const response = await changeTime(newTime, id)

    if (response.status !== 200) {
      if (response.statusText === undefined)
        return errorStore.setErrors(
          "There is a problem connecting to the server"
        )
      return errorStore.setErrors(response.statusText)
    }
    if (response.status === 200) {
      notificationStore.setNotifications(response.statusText)
      location.reload()
    }
  }

  let openModal = false
  let newTime
</script>


<main>
<div class="main-data">
    <button class="btn btn-sm" on:click={handleClick} id="btn-carga"
      >CHARGE DATA FROM OPERATIONS
    </button>

    <select id="selector" bind:value={dataTable}
      >{#each data as dato (dato.id)}
        <option value={[dato]}>{dato.url.substring(0, 50) + "..."}</option>
      {:else}
        <option value={""}>{"NO DATA"}</option>
      {/each}
    </select>
  </div>
  {#each dataTable as dato (dato.id)}
    <div class="table-head">
      <a style="padding-bottom:6px" href={dato.url} target="_blank"
        >{dato.url.substring(0, 50) + "..."}</a
      >
      <select
        on:change={() => {
          document.getElementById("modal-id").style.visibility = "visible"
          openModal = true
        }}
      >
        <option default
          >Now, it is checked every {dato.time}
          {dato.time > 1 ? "hours" : "hour"}</option
        >
        <option>Change duration</option>
      </select>
      <button
        class="btn  btn-error btn-sm"
        iconDescription="Eliminar registro y operación del servidor"
        on:click|preventDefault={eliminateOps(dato.id)}
        ><i class="fa-solid fa-trash-can" /></button
      >

      <!-- MODAL CAMBIO DE FRECUENCIA -->
      <div class={openModal == true ? "modal active" : "modal"} id="modal-id">
        <div class="modal-container">
          <div class="modal-header">
            <a
              on:click={() => (openModal = false)}
              class="btn btn-clear float-right"
              aria-label="Close"
            />
            <div class="modal-title h5">Select new checking frecuency</div>
          </div>
          <div class="modal-body">
            <div class="content">
              <label for="Duracion" />
              <div id="guardar">
                <form
                  class="form-horizontal"
                  on:submit|preventDefault={handleChangeTime(dato.id)}
                >
                  <div class="search-result">
                    <div class="form-group">
                      <div class="col-6 col-sm-12">
                        <select id="select-frecuency" bind:value={newTime}>
                          <option value="1">1 hour</option>
                          <option value="2">2 hours</option>
                          <option value="5">5 hours</option>
                          <option value="16">16 hours</option>
                          <option value="24">24 hours</option>
                        </select>
                        <button class="guardar-btn btn" type="submit"
                          >Save</button
                        >
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <br />
    <table class="table ">
      <thead>
        <tr>
          <th>Date // Hour</th>
          <th>Value</th>
        </tr>
      </thead>
      {#each dato.data as operation}
        <tbody>
          <tr class="active">
            <td>
              {operation.date.split("T").join(" // ")}
            </td>
            <td>
              {operation.data}
            </td>
          </tr>
        </tbody>
      {/each}
      <br />
    </table>
  {/each}

</main>

<style>
.main-data{
    display: flex;
    justify-content: center;
    align-items: baseline;
    margin-top: 20px;
  }
  .main-data#btn-carga {
    font-weight: 100;
  }
  .table-head {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
  .table-head > select,
  .table-head > a {
    font-weight: 100;
  }
  #modal-id {
    visibility: hidden;
  }
  @media (max-width: 770px) {
    h1 {
      max-width: none;
    }
    #btn-carga {
      display: flex;
      align-self: center;
    }
    .main-data{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
    }
    .main-data> select {
      margin-left: 10px;
      margin-right: 10px;
      max-width: 95%;
    }
    .table-head {
      flex-direction: column;
      justify-items: center;
      align-items: center;
    }
  }
  @media (max-width: 400px) {
    .table-head {
      flex-direction: column;
      justify-items: center;
      align-items: stretch;
    }
    }
</style>