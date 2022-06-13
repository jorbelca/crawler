<script>
  let username = ""
  let password = ""

  const handleInputU = (event) => {
    username = event.target.value
  }
  const handleInputP = (event) => {
    password = event.target.value
  }
  const handleSubmit = () => {
    console.log(username, password)
  }
</script>

<main>
  <h1>Login</h1>

  <form on:submit|preventDefault={handleSubmit}>
    <div>
      <label for="username">Username</label>
      <input value={username} type="text" on:input={handleInputU} />
    </div>
    <div>
      <label for="password">Password</label>
      <input value={password} type="password" on:input={handleInputP} />
    </div>
    <button type="submit">Enviar</button>
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

  img {
    height: 10rem;
    width: 10rem;
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

    p {
      max-width: none;
    }
  }
</style>
