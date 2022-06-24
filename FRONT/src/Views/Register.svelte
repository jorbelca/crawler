<script>
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
  <h1>Registro</h1>
  <form class="form-horizontal" on:submit|preventDefault={handleSubmit}>
    <div class="form-group">
      <div class="col-3 col-sm-12">
        <label class="form-label label-sm " for="email">Email</label>
      </div>
      <div class="col-9 col-sm-12">
        <input
          id="email"
          class="form-input input-sm"
          bind:value={email}
          type="email"
          autocomplete="true"
        />
      </div>
    </div>
    <div class="form-group">
      <div class="col-3 col-sm-12">
        <label class="form-label label-sm " for="username"
          >Nombre de usuario</label
        >
      </div>
      <div class="col-9 col-sm-12">
        <input
          id="username"
          class="form-input input-sm"
          bind:value={username}
          type="text"
          autocomplete="true"
        />
      </div>
    </div>
    <div class="form-group">
      <div class="col-3 col-sm-12">
        <label class="form-label label-sm " for="pass">Contraseña</label>
      </div>
      <div class="col-9 col-sm-12">
        <input
          id="pass"
          class="form-input input-sm"
          bind:value={password}
          autocomplete="true"
        />
      </div>
    </div>
    <br />
    <button type="submit">Registrarse</button>
    <button disabled>Cancelar</button>
  </form>
</main>

<style>
  :root {
    font-family: -apple-system, Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
      "Helvetica Neue", sans-serif;
  }

  main {
    text-align: center;
    padding: 0rem;
    margin: 0 auto;
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

  @media (min-width: 480px) {
    h1 {
      max-width: none;
    }
  }
</style>
