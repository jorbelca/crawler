<script>
  // @ts-nocheck
  import { eliminateOperation } from "../Services/eliminateOperation";
  import { handleLogout } from "../Helpers/handleLogout";
  import { changeTime } from "../Services/changeTime";
  import { getData } from "../Services/getData";
  import { errorStore, notificationStore } from "../State/store";
  import { onMount } from "svelte";
  import Chart from "../Components/Chart.svelte";

  let data = [];
  let dataTable = [];
  let openModal = false;
  let newTime;

  onMount(async () => {
    spinner.style.display = "block";
    const res = await getData();
    if (res == "TypeError: Failed to fetch")
      return errorStore.setErrors(
        "There is a problem connecting to the server"
      );
    let response = await res.json();

    if (Object.keys(response)[0] === "error") {
      spinner.style.display = "none";
      handleLogout();
      return errorStore.setErrors(response.error);
    }
    if (response !== undefined || response.length > 0 || response !== null) {
      spinner.style.display = "none";
      data = await response;
      data.forEach((data) => {
        data.data = data.data.reverse();
      });
    }

    if (res.status !== 200) {
      spinner.style.display = "none";
      if (response.error) return errorStore.setErrors(response.error);
      if (response == "TypeError: Failed to fetch")
        return errorStore.setErrors(
          "There is a problem connecting to the server"
        );
    }
    const selector = document.getElementById("selector");
    selector.style.display = "block";
    selector.style.width = "100%";
  });

  // ELIMINAR SEGUIMIENTO DEL CRAWLER
  const eliminateOps = async (id) => {
    if (
      window.confirm(
        "Are you sure? This action will delete the tracking data permanently"
      )
    ) {
      const response = await eliminateOperation(id);
      const json = await response.json();

      if (response.status !== 200) {
        if (json) errorStore.setErrors(json.message);
        return errorStore.setErrors(response.statusText);
      }
      if (response.status === 200) {
        document.getElementById("selector").style.visibility = "hidden ";

        dataTable = [];
        return notificationStore.setNotifications(json.message);
      }
    }
  };

  // CAMBIAR DURACION DE LA COMPROBACION DEL CRAWLER
  const handleChangeTime = async (id) => {
    openModal = false;

    const response = await changeTime(newTime, id);

    if (response.status !== 200) {
      if (response.statusText === undefined)
        return errorStore.setErrors(
          "There is a problem connecting to the server"
        );
      return errorStore.setErrors(response.statusText);
    }
    if (response.status === 200) {
      notificationStore.setNotifications(response.statusText);
      setTimeout(() => {
        location.reload();
      }, 300);
    }
  };

  // MOSTRAR EL CHART
  let activeChart = false;
  const showChart = () => {
    activeChart = !activeChart;
  };
</script>

<main>
  <h1>DATA</h1>
  <div id="spinner" class="loading loading-lg" />
  <select id="selector" bind:value={dataTable}
    >{#each data as dato (dato.id)}
      <option value={[dato]}>{dato.url.substring(0, 50) + "..."}</option>
    {:else}
      <option value={""}>{"NO DATA"}</option>
    {/each}
  </select>

  {#each dataTable as dato (dato.id)}
    <div class="table-head">
      <a style="padding-bottom:6px" href={dato.url} target="_blank"
        >{dato.url.substring(0, 50) + "..."}</a
      >
      <select
        id="change-duration"
        on:change={() => {
          document.getElementById("modal-id").style.visibility = "visible";
          openModal = true;
        }}
      >
        <option default
          >Now, it is checked every {dato.time}
          {dato.time > 1 ? "hours" : "hour"}</option
        >
        <option>Change duration</option>
      </select>
      <button
        id="btn-del"
        class="btn btn-error btn-sm"
        iconDescription="Eliminar registro y operación del servidor"
        on:click|preventDefault={eliminateOps(dato.id)}
        ><i class="fa-solid fa-trash-can" /></button
      >

      <!-- MODAL CAMBIO DE FRECUENCIA -->
      <div class={openModal == true ? "modal active" : "modal"} id="modal-id">
        <div class="modal-container">
          <div class="modal-header">
            <!-- svelte-ignore a11y-missing-attribute -->
            <!-- svelte-ignore a11y-missing-content -->
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
    <!--     
    <div id="chart-btn">
      <button class="chart-btn" on:click={showChart}
        ><i class="fa-solid fa-chart-line" /></button
      >
    </div>
    <div class={!activeChart ? "chart" : "chart active"}>
      <Chart {data} />
    </div> -->
    <br />
    <table class="table">
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
  h1 {
    color: goldenrod;
    text-transform: uppercase;
    font-size: 2rem;
    font-weight: 150;
    line-height: 1.1;
    margin: 1rem auto;
    max-width: 14rem;
  }
  .main-data {
    display: flex;
    justify-content: center;
    align-items: baseline;
    margin-top: 20px;
  }
  #spinner {
    display: none;
  }
  #selector {
    display: none;
  }
  .table-head {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 20px;
  }
  .table-head > select,
  .table-head > a {
    font-weight: 100;
  }
  #modal-id {
    visibility: hidden;
  }
  #modal-body {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-items: center;
  }
  .form-group {
    align-items: center;
    justify-content: center;
  }
  .chart {
    display: none;
  }
  .chart.active {
    display: block;
  }
  @media (max-width: 770px) {
    h1 {
      max-width: none;
    }

    .main-data {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
    }
    .main-data > select {
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
  @media (max-width: 450px) {
    .table-head {
      flex-direction: column;
      justify-items: center;
      align-items: stretch;
    }
  }
</style>
