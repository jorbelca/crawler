<script>
  import { Router, Link, Route, navigate } from "svelte-routing"
  import "carbon-components-svelte/css/all.css"

  import Home from "./Views/Home.svelte"
  import Login from "./Views/Login.svelte"
  import Register from "./Views/Register.svelte"
  import Operations from "./Views/Operations.svelte"
  import Profile from "./Views/Profile.svelte"
  import Notifications from "./Components/Notifications.svelte"

  import { Theme, Grid, Column, Row } from "carbon-components-svelte"
  const userID = window.localStorage.getItem("userID")
  const handleLogout = () => {
    window.localStorage.removeItem("userID")
    navigate("/home", { replace: true })
  }
</script>

<main>
  <Router>
    <Grid fullWidth style="margin:2px;color:gold;padding:1rem">
      <Row
        ><Column style="margin-bottom:10px">
          <Link style="text-decoration:none; color:black" to="/home">Home</Link>
        </Column>
        <Column style="margin-bottom:10px">
          <Link style="text-decoration:none; color:black" to="/login"
            >Login</Link
          ></Column
        >
        <Column style="margin-bottom:10px">
          <Link style="text-decoration:none; color:black" to="/register"
            >Registrarse</Link
          ></Column
        >

        {#if userID}
          <Column style="margin-bottom:10px">
            <Link style="text-decoration:none; color:black" to="/ops"
              >Operaciones</Link
            ></Column
          >
          <Column style="margin-bottom:10px">
            <Link style="text-decoration:none; color:black" to="/profile"
              >Perfil</Link
            >
          </Column>
          <Column style="margin-bottom:10px">
            <Link
              style="text-decoration:none;color:red"
              id="menu"
              to="/home"
              on:click={handleLogout}>Logout</Link
            >
          </Column>
        {/if}
        <Column style="margin-top:-20px;margin-left:auto; "
          ><Theme
            render="toggle"
            tokens={{
              "interactive-01": "#d02670",
              "hover-primary": "#ee5396",
              "active-primary": "#9f1853",
            }}
            toggle={{
              themes: ["g10", "g80"],
              labelA: "Dark ",
              labelB: "Light",
            }}
          /></Column
        >
      </Row>
    </Grid>

    <Notifications />

    <Route path="/home">
      <Home />
    </Route>
    <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
    <Route path="/profile">
      <Profile />
    </Route>
    <Route path="/ops">
      <Operations />
    </Route>
  </Router>
</main>

<style>
  :root {
    font-family: Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
      "Helvetica Neue", sans-serif;
  }
  main {
    margin: 0 auto;
    padding: 0;
  }
</style>
