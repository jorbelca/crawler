<script>
  import { notificationStore, errorStore, userStore } from "../State/store.js"

  import { navigate } from "svelte-routing"

  import { loginUser } from "../Services/login"
  import { validateEmail, validatePassword } from "../Helpers/validators.js"

  let email = ""
  let password = ""

  const handleSubmit = async () => {
    if (!validateEmail(email)) {
      errorStore.setErrors("Por favor introduzca una direccion de email válida")
    }
    if (!validatePassword(password)) {
      errorStore.setErrors("Por favor introduzca una contraseña válida")
    }
    let response
    let res
    try {
      response = await loginUser(email, password)
      if (response.status === 200) res = await response.json()
    } catch (error) {
      console.error(error)
    }

    if (response.status === 200) {
      notificationStore.setNotifications(response.statusText)
      userStore.setUser(res.token)
      return navigate("/ops", { replace: true })
    }
    if (response.status !== 200) {
      if (response == "TypeError: Failed to fetch")
        return errorStore.setErrors(
          "Hay un problema con la conexión con el servidor"
        )
      errorStore.setErrors(response.statusText)
    }
  }
</script>

<main>
  <h1>Login</h1>

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
        <label class="form-label label-sm " for="pass">Contraseña</label>
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
    <button class="login-btn"
      >Log In &nbsp<i class="fa-solid fa-arrow-right" /></button
    >
  </form>
</main>

<style>
  :root {
    font-family: -apple-system, Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
      "Helvetica Neue", sans-serif;
  }

  main {
    text-align: center;
    padding: 0;
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
  .login-btn {
    font-weight: 100;
  }
  @media (min-width: 480px) {
    h1 {
      max-width: none;
    }
  }
</style>
