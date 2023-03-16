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
      return errorStore.setErrors("Please introduce a valid email")
    }
    if (!validatePassword(password)) {
      return errorStore.setErrors("Please introduce a valid password")
    }
    if (!validateUsername(username)) {
      return errorStore.setErrors("Please introduce a valid username")
    }
    const response = await registerUser(email, username, password)
    const json = await response.json()

    if (response.status === 200) {
      notificationStore.setNotifications(response.statusText)
      return navigate("/login", { replace: true })
    }
    if (response.status !== 200) {

      if (json.error) return errorStore.setErrors(json.error)
      if (response.error) return errorStore.setErrors(response.error)
      if (response.statusText === undefined) {
        return errorStore.setErrors(
          " There is a problem connecting to the server"
        )
      }
    }
  }
</script>

<main>
  <h1>Register</h1>
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
          autocomplete="false"
          required
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
          autocomplete="false"
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
          autocomplete="false"
          type="password"
          required
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
