<script>
  import { registerUser } from "../Services/register.js"

  let username = ""
  let password = ""
  let email = ""

  const handleSubmit = async () => {
    const response = await registerUser(email, username, password)

    if (response.status === 200) {
      console.log(response.statusText)
    }
    if (response.status !== 200) {
      console.log(response)
    }
  }
</script>

<main>
  <h1>Register</h1>
  <form on:submit|preventDefault={handleSubmit}>
    <div>
      <label htmlfor="registerEmail">Email</label>
      <input id="registerEmail" type="email" bind:value={email} />
    </div>
    <div>
      <label htmlfor="registerUsername">Username</label>
      <input id="registerUsername" type="text" bind:value={username} />
    </div>
    <div>
      <label htmlfor="registerPassword">Password</label>
      <input id="registerPassword" type="password" bind:value={password} />
    </div>

    <button type="submit">Register</button>
  </form>
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
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 2rem;
    font-weight: 100;
    line-height: 1.1;
    margin: 2rem auto;
    max-width: 14rem;
  }
  form input {
    width: 25rem;
    margin: 1rem;
  }
  form button {
    width: 5rem;
    padding: 0.3rem;
    background-color: lightblue;
    border-radius: 10px;
    color: grey;
    font-size: 0.7rem;
    font-weight: 400;
  }
  @media (min-width: 480px) {
    h1 {
      max-width: none;
    }
  }
</style>
