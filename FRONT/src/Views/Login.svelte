<script>
  import { loginUser } from "../Services/login"

  let email = ""
  let password = ""

  const handleSubmit = async () => {
    const response = await loginUser(email, password)
    const res = await response.json()

    if (response.status === 200) {
      document.cookie = response.cookie
      window.localStorage.setItem("userID", res)
      return {
        redirect: "http://localhost:3000/ops",
      }
    }
  }
</script>

<main>
  <h1>Login</h1>

  <form on:submit|preventDefault={handleSubmit}>
    <div>
      <label for="email">Email</label>
      <input bind:value={email} type="text" />
    </div>
    <div>
      <label for="password">Password</label>
      <input bind:value={password} type="password" />
    </div>
    <button type="submit">Log In</button>
  </form>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  main {
    text-align: center;
    padding: 1em;
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

  @media (min-width: 480px) {
    h1 {
      max-width: none;
    }
  }
</style>
