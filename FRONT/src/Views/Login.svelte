<script>
  import {
    TextInput,
    Button,
    PasswordInput,
    FormGroup,
    Content,
  } from "carbon-components-svelte"
  import notification from "../State/store.js"
  import { navigate } from "svelte-routing"

  import { loginUser } from "../Services/login"

  let email = ""
  let password = ""

  const handleSubmit = async () => {
    if (email == "" || undefined || null) {
      $notification.setErrors(
        "Por favor introduzca una direccion de email válida"
      )
      return setInterval(() => $notification.removeErrors(), 3000)
    }
    if (password == "" || undefined || null) {
      $notification.setErrors("Por favor introduzca la contraseña")
      return setInterval(() => $notification.removeErrors(), 3000)
    }
    const response = await loginUser(email, password)
    const res = await response.json()

    if (response.status === 200) {
      $notification.setNotifications(response.statusText)
      setInterval(() => $notification.removeNotifications(), 3000)
      document.cookie = response.cookie
      window.localStorage.setItem("userID", res)

      return navigate("/ops", { replace: true })
    }
    if (response.status !== 200) {
      $notification.setErrors(response.statusText)
      return setInterval(() => $notification.removeErrors(), 3000)
    }
  }
</script>

<main>
  <Content>
    <h1>Login</h1>

    <form on:submit|preventDefault={handleSubmit}>
      <FormGroup>
        <TextInput
          light
          size="sm"
          inline
          bind:value={email}
          type="email"
          labelText="Email"
        />

        <PasswordInput
          light
          size="sm"
          inline
          bind:value={password}
          labelText="Contraseña"
        />

        <br />
        <Button kind="secondary" type="tertiary">Log In</Button>
      </FormGroup>
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
    padding: 1em;
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
