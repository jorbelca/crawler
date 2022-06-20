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

  import { getData } from "../Services/getData.js"
  import notification from "../State/store.js"

  let data = []
  let dataTable = []

  const handleClick = async () => {
    document.getElementById("selector").style.visibility = "visible "
    const userID = window.localStorage.getItem("userID")
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
  const eliminateProfile = () => {
    if (window.confirm("Estas seguro?")) {
    }
  }
  const eliminateFollowing = () => {
    if (window.confirm("Estas seguro?")) {
    }
  }
  const changeProfile = () => {
    resetForm()
  }
</script>

<main>
  <Content>
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
          placeholder="pass"
        />
        <TextInput
          light
          size="sm"
          inline
          bind:value={newUsername}
          type="email"
          labelText="Nombre de Usuario"
          placeholder="pass"
        />
        <PasswordInput
          light
          size="sm"
          inline
          bind:value={newPassword}
          labelText="Contraseña"
        />
        <br />
        <Button size="small" kind="danger-ghost" type="submit">Cambiar</Button>

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
              on:click={eliminateFollowing}
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
