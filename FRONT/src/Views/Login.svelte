<script>
  import { notificationStore, errorStore, userStore } from "../State/store.js"

  import { navigate } from "svelte-routing"

  import { loginUser } from "../Services/login"
  import { validateEmail, validatePassword } from "../Helpers/validators.js"

  let email = ""
  let password = ""

  const handleSubmit = async () => {
    if (!validateEmail(email)) {
      errorStore.setErrors("Please introduce a valid email")
    }
    if (!validatePassword(password)) {
      errorStore.setErrors("Please introduce a valid password")
    }

    const response = await loginUser(email, password)
    const json = await response.json()

    if (response.status === 200) {
      notificationStore.setNotifications(response.statusText)
      userStore.setUser(json.token)
      return navigate("/ops", { replace: true })
    }
    if (response.status !== 200) {
      
      if (json.error) return errorStore.setErrors(json.error)
      if (response == "TypeError: Failed to fetch")
        return errorStore.setErrors(
          "There is a problem connecting to the server"
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
          required
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
          required
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
