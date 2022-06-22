<script>
  import { Button, Content, TextInput } from "carbon-components-svelte"
  import notification from "../State/store.js"
  import { navigate } from "svelte-routing"
  import { registerUser } from "../Services/register.js"
  import {
    validateEmail,
    validatePassword,
    validateUsername,
  } from "../Helpers/validators.js"

  let username = ""
  let password = ""
  let email = ""

  const handleSubmit = async () => {
    if (!validateEmail(email)) {
      $notification.setErrors(
        "Por favor introduzca una direccion de email válida"
      )
      return setInterval(() => $notification.removeErrors(), 3000)
    }
    if (!validatePassword(password)) {
      $notification.setErrors("Por favor introduzca una contraseña válida")
      return setInterval(() => $notification.removeErrors(), 3000)
    }
    if (!validateUsername(username)) {
      $notification.setErrors(
        "Por favor introduzca una nombre de usuario válido"
      )
      return setInterval(() => $notification.removeErrors(), 3000)
    }
    const response = await registerUser(email, username, password)

    if (response.status === 200) {
      $notification.setNotifications(response.statusText)
      setInterval(() => $notification.removeNotifications(), 3000)
      console.log(response.statusText)
      return navigate("/login", { replace: true })
    }
    if (response.status !== 200) {
      console.log(response)
      $notification.setErrors(response.statusText)
      return setInterval(() => $notification.removeErrors(), 3000)
    }
  }
</script>

<main>
  <Content style="padding:0">
    <h1>Registrarse</h1>
    <form on:submit|preventDefault={handleSubmit}>
      <div>
        <TextInput
          light
          inline
          id="registerEmail"
          type="email"
          bind:value={email}
          labelText="Email"
          autocomplete="true"
        />
      </div>
      <div>
        <TextInput
          light
          inline
          id="registerUsername"
          type="text"
          bind:value={username}
          labelText="Nombre de Usuario"
          autocomplete="true"
        />
      </div>
      <div>
        <TextInput
          light
          inline
          id="registerPassword"
          type="password"
          bind:value={password}
          labelText="Contraseña"
          autocomplete="true"
        />
      </div>
      <br />
      <Button kind="secondary" type="submit">Registrarse</Button>
    </form>
  </Content>
</main>

<style>
  :root {
    font-family: -apple-system, Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
      "Helvetica Neue", sans-serif;
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

  @media (min-width: 480px) {
    h1 {
      max-width: none;
    }
  }
</style>
