<script>
  import { Button, Content, TextInput } from "carbon-components-svelte"

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
  <Content>
    <h1>Registrarse</h1>
    <form on:submit|preventDefault={handleSubmit}>
      <div>
        <TextInput
          light
          inline
          id="registerEmail"
          type="email"
          bind:value={email}
          labelText="Email"
        />
      </div>
      <div>
        <TextInput
          light
          inline
          id="registerUsername"
          type="text"
          bind:value={username}
          labelText="Nombre de Usuario"
        />
      </div>
      <div>
        <TextInput
          light
          inline
          id="registerPassword"
          type="password"
          bind:value={password}
          labelText="Contraseña"
        />
      </div>
      <br />
      <Button kind="secondary" type="submit">Registrarse</Button>
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
    padding: 1rem;
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
