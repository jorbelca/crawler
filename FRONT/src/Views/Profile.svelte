<script>
  import {
    Button,
    Content,
    Form,
    FormGroup,
    PasswordInput,
    Table,
    TextInput,
  } from "carbon-components-svelte"
  import TrashCan from "carbon-icons-svelte/lib/TrashCan.svelte"
  import { changeProfileData, getProfileData } from "../Services/profileUser.js"
  import { onMount } from "svelte"
  import { getData } from "../Services/getData.js"
  import notification from "../State/store.js"
  import {
    validateEmail,
    validatePassword,
    validateUsername,
  } from "../Helpers/validators.js"
  import { eliminateUser } from "../Services/eliminateUser.js"
  import { eliminateOperation } from "../Services/eliminateOperation.js"
  import { navigate } from "svelte-routing"

  const userID = window.localStorage.getItem("userID")

  let username
  let email
  onMount(async () => {
    const response = await getProfileData(userID)
    const json = await response.json()
    if (json) {
      username = json.username
      email = json.email
    }
    if (response.status !== 200) {
      $notification.setErrors(response.statusText)
      return setInterval(() => $notification.removeErrors(), 3000)
    }
  })

  let data = []
  let dataTable = []

  const handleClick = async () => {
    document.getElementById("selector").style.visibility = "visible "

    const res = await getData(userID)
    let response = await res.json()

    if (response !== undefined || response.length > 0 || response !== null)
      data = await response

    if (res.status !== 200) {
      $notification.setErrors(response.statusText)
      return setInterval(() => $notification.removeErrors(), 3000)
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
      const response = await eliminateOperation(userID, id)
      const json = await response.json()
      if (response.status !== 200) {
        if (json) $notification.setErrors(json.message)
        $notification.setErrors(response.statusText)
        return setInterval(() => $notification.removeErrors(), 3000)
      }
      if (response.status === 200) {
        document.getElementById("selector").style.visibility = "hidden "

        dataTable = []
        $notification.setNotifications(json.message)
        setInterval(() => $notification.removeNotifications(), 3000)
        return
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
      const response = await eliminateUser(userID)
      const json = await response.json()

      if (response.status !== 200) {
        if (json) $notification.setErrors(json.message)
        $notification.setErrors(response.statusText)
        return setInterval(() => $notification.removeErrors(), 3000)
      }
      if (response.status === 200) {
        $notification.setNotifications(json.message)
        setInterval(() => $notification.removeNotifications(), 3000)
        return navigate("/home", { replace: true })
      }
    }
  }
  // CAMBIAR DATOS PERSONALES DEL PERFIL
  const changeProfile = async (e) => {
    e.preventDefault()

    if (newPassword.length > 0)
      if (!validatePassword(newPassword)) {
        $notification.setErrors("Por favor introduzca una contraseña válida")
        return setInterval(() => $notification.removeErrors(), 3000)
      }
    if (newUsername.length > 0)
      if (!validateUsername(newUsername)) {
        $notification.setErrors(
          "Por favor introduzca una nombre de usuario válido"
        )
        return setInterval(() => $notification.removeErrors(), 3000)
      }
    if (newEmail.length > 0)
      if (!validateEmail(newEmail)) {
        $notification.setErrors(
          "Por favor introduzca una direccion de email válida"
        )
        return setInterval(() => $notification.removeErrors(), 3000)
      }
    const newData = {
      username: newUsername || username,
      email: newEmail || email,
      password: newPassword || null,
    }
    const response = await changeProfileData(newData, userID)

    if (response.status !== 200) {
      const json = await response.json()
      $notification.setErrors(json.message)
      return setInterval(() => $notification.removeErrors(), 3000)
    }
    resetForm()
    if (response.status === 200) {
      username = newData.username
      email = newData.email

      $notification.setNotifications(response.statusText)
      return setInterval(() => $notification.removeNotifications(), 3000)
    }
  }
</script>

<main>
  <Content style="padding:0">
    <h1>Perfil</h1>
    <Form on:submit={changeProfile}>
      <FormGroup legendText="Datos Personales">
        <TextInput
          light
          size="sm"
          inline
          bind:value={newEmail}
          type="email"
          labelText="Email"
          placeholder={email}
          autocomplete="true"
        />
        <TextInput
          light
          size="sm"
          inline
          bind:value={newUsername}
          type="text"
          labelText="Nombre de Usuario"
          placeholder={username}
          autocomplete="true"
        />
        <PasswordInput
          light
          size="sm"
          inline
          bind:value={newPassword}
          labelText="Contraseña"
          autocomplete="true"
        />
        <br />
        <Button
          disabled={!newUsername && !newEmail && !newPassword}
          id="cambiar"
          size="small"
          kind="danger-ghost"
          type="submit">Cambiar</Button
        >

        <Button
          on:click={resetForm}
          style={"color:grey"}
          size="small"
          kind="ghost">Cancelar</Button
        >

        <Button on:click={eliminateProfile} size="small" kind="danger"
          >Eliminar Cuenta</Button
        >
      </FormGroup>
    </Form>
    <div class="btn-select">
      <Button size="small" kind="secondary" on:click={handleClick}
        >CARGAR DATOS DE OPERACIONES</Button
      >

      <select id="selector" bind:value={dataTable}
        >{#each data as dato (dato.id)}
          <option value={[dato]}>{dato.url.substring(0, 50) + "..."}</option>
        {:else}
          <option value={""}>{"NO DATA"}</option>
        {/each}
      </select>
    </div>
    {#each dataTable as dato (dato.id)}
      <Table size="compact">
        <thead>
          <div class="table-head">
            URL <a href={dato.url} target="_blank"
              >{dato.url.substring(0, 50) + "..."}</a
            >
            <Button
              size="small"
              kind="danger-tertiary"
              iconDescription="Delete"
              icon={TrashCan}
              on:click={eliminateOps(dato.id)}
            />
          </div>
        </thead>
        {#each dato.data as operation}
          <tbody>
            <tr>
              <td>
                {operation.date}
              </td>
              <td>
                {operation.data}
              </td>
            </tr>
          </tbody>
        {/each} <br />
      </Table>
    {/each}
  </Content>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  main {
    text-align: center;
    padding: 1rem;
    margin: 0 auto;
  }

  h1 {
    color: goldenrod;
    text-transform: uppercase;
    font-size: 2rem;
    font-weight: 150;
    line-height: 1.1;
    margin: 2rem auto;
    max-width: 14rem;
  }
  .btn-select {
    display: flex;
    align-content: center;
    justify-content: center;
    margin-bottom: 20px;
  }
  #selector {
    visibility: hidden;
  }
  .table-head {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  @media (max-width: 580px) {
    h1 {
      max-width: none;
    }
    .btn-select {
      display: flex;
      flex-direction: column;
      align-content: center;
      justify-content: center;
      margin-bottom: 20px;
    }
  }
</style>
