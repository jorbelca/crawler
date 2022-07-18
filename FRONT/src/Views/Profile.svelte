<script>
  import { changeProfileData, getProfileData } from "../Services/profileUser.js"
  import { onMount } from "svelte"
  import { getData } from "../Services/getData.js"
  import { notificationStore, errorStore, userStore } from "../State/store.js"
  import {
    validateEmail,
    validatePassword,
    validateUsername,
  } from "../Helpers/validators.js"
  import { eliminateUser } from "../Services/eliminateUser.js"
  import { eliminateOperation } from "../Services/eliminateOperation.js"
  import { navigate } from "svelte-routing"
  import { changeTime } from "../Services/changeTime.js"

  let username
  let email
  onMount(async () => {
    const response = await getProfileData()
    const json = await response.json()
    if (json) {
      username = json.username
      email = json.email
    }
    if (response.status !== 200) {
      if (response == "TypeError: Failed to fetch")
        return errorStore.setErrors(
          "Hay un problema con la conexión con el servidor"
        )
      return errorStore.setErrors(response.statusText)
    }
  })

  let data = []
  let dataTable = []

  const handleClick = async () => {
    document.getElementById("selector").style.visibility = "visible "

    const res = await getData()
    if (res == "TypeError: Failed to fetch")
      return errorStore.setErrors(
        "Hay un problema con la conexión con el servidor"
      )
    let response = await res.json()

    if (response !== undefined || response.length > 0 || response !== null)
      data = await response

    if (res.status !== 200) {
      if (response == "TypeError: Failed to fetch")
        return errorStore.setErrors(
          "Hay un problema con la conexión con el servidor"
        )
      return errorStore.setErrors(response.statusText)
    }
  }
  let newEmail
  let newPassword
  let newUsername

  const resetForm = () => {
    newUsername = ""
    newPassword = ""
    newEmail = ""
  }

  // ELIMINAR SEGUIMIENTO DEL CRAWLER
  const eliminateOps = async (id) => {
    if (
      window.confirm(
        "Estas seguro?, Esta acción eliminará los datos de seguimiento permanentemente"
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

  // ELIMINAR PERFIL DE USUARIO
  const eliminateProfile = async () => {
    if (
      window.confirm(
        "Estas seguro?, Esta acción eliminará tu perfil completamente"
      )
    ) {
      const response = await eliminateUser()
      const json = await response.json()

      if (response.status !== 200) {
        if (json) errorStore.setErrors(json.message)
        if (response == "TypeError: Failed to fetch")
          return errorStore.setErrors(
            "Hay un problema con la conexión con el servidor"
          )
        return errorStore.setErrors(response.statusText)
      }
      if (response.status === 200) {
        notificationStore.setNotifications(json.message)
        userStore.removeUser()
        return navigate("/", { replace: true })
      }
    }
  }
  // CAMBIAR DATOS PERSONALES DEL PERFIL
  const changeProfile = async () => {
    const newData = {
      username: newUsername || username,
      email: newEmail || email,
      password: newPassword || null,
    }
    if (newData.password !== null) {
      if (!validatePassword(newData.password)) {
        return errorStore.setErrors(
          "Por favor introduzca una contraseña válida"
        )
      }
    }

    if (!validateUsername(newData.username)) {
      return errorStore.setErrors(
        "Por favor introduzca una nombre de usuario válido"
      )
    }

    if (!validateEmail(newData.email)) {
      return errorStore.setErrors(
        "Por favor introduzca una direccion de email válida"
      )
    }

    const response = await changeProfileData(newData)

    if (response.status !== 200) {
      if (response == "TypeError: Failed to fetch")
        return errorStore.setErrors(
          "Hay un problema con la conexión con el servidor"
        )
      const json = await response.json()
      return errorStore.setErrors(json.message)
    }
    resetForm()
    if (response.status === 200) {
      username = newData.username
      email = newData.email

      return notificationStore.setNotifications(response.statusText)
    }
  }

  // CAMBIAR DURACION DE LA COMPROBACION DEL CRAWLER
  const handleChangeTime = async (id) => {
    openModal = false

    const response = await changeTime(newTime, id)

    if (response.status !== 200) {
      if (response.statusText === undefined)
        return errorStore.setErrors(
          "Hay un problema con la conexión con el servidor"
        )
      return errorStore.setErrors(response.statusText)
    }
    if (response.status === 200) {
      notificationStore.setNotifications(response.statusText)
      location.reload()
    }
  }
  const handleSelect = (e) => {
    newTime = e.detail
  }
  let openModal = false
  let newTime
</script>

<main>
  <h1>Perfil</h1>
  <div class="form-flex">
    <form class="form-horizontal" on:submit={changeProfile} autocomplete="off">
      <div class="form-form">
        <div class="form-group">
          <div class="col-3 col-sm-12">
            <label class="form-label label-sm " for="email">Email</label>
          </div>
          <div class="col-9 col-sm-12">
            <input
              id="email"
              class="form-input input-sm"
              bind:value={newEmail}
              type="email"
              placeholder={email}
              autocomplete="off"
            />
          </div>
        </div>

        <div class="form-group">
          <div class="col-3 col-sm-12">
            <label class="form-label label-sm" for="username"
              >Nombre de Usuario</label
            >
          </div>
          <div class="col-9 col-sm-12">
            <input
              id="username"
              class="form-input input-sm"
              bind:value={newUsername}
              type="text"
              placeholder={username}
              autocomplete="off"
            />
          </div>
        </div>

        <div class="form-group">
          <div class="col-3 col-sm-12">
            <label class="form-label label-sm" for="pass">Contraseña</label>
          </div>
          <div class="col-9 col-sm-12">
            <input
              type="password"
              id="pass"
              class="form-input input-sm"
              bind:value={newPassword}
              autocomplete="off"
            />
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="form-btns">
          <button
            class="btn btn-sm"
            disabled={!newUsername && !newEmail && !newPassword}
            id="cambiar"
            type="submit"
            on:click|preventDefault={changeProfile}>Cambiar</button
          >

          <button
            class="btn btn-sm"
            on:click|preventDefault={resetForm}
            style={"color:grey"}>Cancelar</button
          >
          <button
            class="btn btn-error btn-sm"
            on:click|preventDefault={eliminateProfile}>Eliminar Cuenta</button
          >
        </div>
      </div>
    </form>
  </div>
  <div class="btn-select">
    <button class="btn btn-sm" on:click={handleClick} id="btn-carga"
      >CARGAR DATOS DE OPERACIONES
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
          >Actualmente, se comprueba cada {dato.time}
          {dato.time > 1 ? "horas" : "hora"}</option
        >
        <option>Cambiar duración</option>
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
            <div class="modal-title h5">
              Seleccionar nueva frecuencia de comprobación
            </div>
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
                          <option value="1">1 hora</option>
                          <option value="2">2 horas</option>
                          <option value="5">5 horas</option>
                          <option value="16">16 horas</option>
                          <option value="24">24 horas</option>
                        </select>
                        <button class="guardar-btn btn" type="submit"
                          >Guardar</button
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
          <th>Fecha // Hora</th>
          <th>Valor</th>
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
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  h1 {
    color: goldenrod;
    text-transform: uppercase;
    font-size: 2rem;
    font-weight: 150;
    line-height: 1.1;
    margin: 1rem auto;
    max-width: 14rem;
  }

  .form-form {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
  .form-group {
    justify-content: center;
  }
  .form-btns {
    display: flex;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .form-btns > button {
    font-weight: 100;
  }
  .btn-sm {
    margin: 5px;
  }
  #selector {
    visibility: hidden;
  }
  .btn-select {
    display: flex;
    justify-content: center;
    align-items: baseline;
  }
  .btn-select #btn-carga {
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
    .btn-select {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
    }
    .btn-select > select {
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
