<script>
  import { notificationStore, errorStore } from "../State/store.js"
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
      errorStore.setErrors("Por favor introduzca una direccion de email válida")
    }
    if (!validatePassword(password)) {
      errorStore.setErrors("Por favor introduzca una contraseña válida")
    }
    if (!validateUsername(username)) {
      errorStore.setErrors("Por favor introduzca una nombre de usuario válido")
    }
    const response = await registerUser(email, username, password)
    console.log(response)
    if (response.status === 200) {
      notificationStore.setNotifications(response.statusText)
      return navigate("/login", { replace: true })
    }
    if (response.status !== 200) {
      if (response.statusText === undefined)
        return errorStore.setErrors(
          "Hay un problema con la conexión con el servidor"
        )
      return errorStore.setErrors(response.statusText)
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
        <label class="form-label label-sm " for="username">Username</label>
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
        <label class="form-label label-sm " for="pass">Password</label>
      </div>
      <div class="col-9 col-sm-12">
        <input
          id="pass"
          class="form-input input-sm"
          bind:value={password}
          autocomplete="true"
          type="password"
        />
      </div>
    </div>
    <br />
    <button class="register-btn" type="submit">Register</button>
    <button class="register-btn" disabled>Cancel</button>
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
  .register-btn {
    font-weight: 100;
  }

  @media (min-width: 480px) {
    h1 {
      max-width: none;
    }
  }
</style>
