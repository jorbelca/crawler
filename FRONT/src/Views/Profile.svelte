<script>
  import { changeProfileData, getProfileData } from "../Services/profileUser.js"
  import { onMount } from "svelte"
  import { notificationStore, errorStore, userStore } from "../State/store.js"
  import {
    validateEmail,
    validatePassword,
    validateUsername,
  } from "../Helpers/validators.js"
  import { eliminateUser } from "../Services/eliminateUser.js"
  import { navigate } from "svelte-routing"
  import { handleLogout } from "../Helpers/handleLogout.js"

  let username
  let email
  onMount(async () => {
    const response = await getProfileData()
    const json = await response.json()
    if (json) {
      username = json.username
      email = json.email
    }
    if (Object.keys(json)[0] === "error") {
      handleLogout()
      return errorStore.setErrors(json.error)
    }

    if (response.status !== 200) {
      if (json.error) return errorStore.setErrors(json.error)
      if (response.error) return errorStore.setErrors(response.error)
      if (response.message === "Network Error") {
        return errorStore.setErrors(response.statusText)
      }
      if (response.status === 404) {
        return errorStore.setErrors(response.statusText)
      }
      if (response == "TypeError: Failed to fetch")
        return errorStore.setErrors(
          "There is a problem with the connection to the server"
        )
    }
  })

  let newEmail
  let newPassword
  let newUsername

  const resetForm = () => {
    newUsername = ""
    newPassword = ""
    newEmail = ""
  }

  // ELIMINAR PERFIL DE USUARIO
  const eliminateProfile = async () => {
    if (
      window.confirm(
        "Are you sure?, this action will delete your profile completely"
      )
    ) {
      const response = await eliminateUser()
      const json = await response.json()

      if (response.status !== 200) {
        if (json) errorStore.setErrors(json.message)
        if (response == "TypeError: Failed to fetch")
          return errorStore.setErrors(
            "There is a problem connecting to the server"
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
        return errorStore.setErrors("Please enter a valid password")
      }
    }

    if (!validateUsername(newData.username)) {
      return errorStore.setErrors("Please enter a valid username")
    }

    if (!validateEmail(newData.email)) {
      return errorStore.setErrors("Please enter a valid email")
    }

    const response = await changeProfileData(newData)

    if (response.status !== 200) {
      if (response == "TypeError: Failed to fetch")
        return errorStore.setErrors(
          "There is a problem connecting to the server"
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

  // const handleSelect = (e) => {
  //   newTime = e.detail;
  // };
</script>

<main>
  <h1>Profile</h1>
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
              autocomplete="new-email"
            />
          </div>
        </div>

        <div class="form-group">
          <div class="col-3 col-sm-12">
            <label class="form-label label-sm" for="username">Username</label>
          </div>
          <div class="col-9 col-sm-12">
            <input
              id="username"
              class="form-input input-sm"
              bind:value={newUsername}
              type="text"
              placeholder={username}
              autocomplete="new-user"
            />
          </div>
        </div>

        <div class="form-group">
          <div class="col-3 col-sm-12">
            <label class="form-label label-sm" for="pass">Password</label>
          </div>
          <div class="col-9 col-sm-12">
            <input
              type="password"
              id="pass"
              class="form-input input-sm"
              bind:value={newPassword}
              autocomplete="new-pass"
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
            on:click|preventDefault={changeProfile}>Change</button
          >

          <button
            class="btn btn-sm"
            on:click|preventDefault={resetForm}
            style={"color:grey"}>Cancel</button
          >
          <button
            class="btn btn-error btn-sm"
            on:click|preventDefault={eliminateProfile}>Eliminate Account</button
          >
        </div>
      </div>
    </form>
  </div>
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
