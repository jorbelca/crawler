<script>
  import Home from "./Views/Home.svelte"
  import Login from "./Views/Login.svelte"
  import Register from "./Views/Register.svelte"
  import Operations from "./Views/Operations.svelte"
  import Profile from "./Views/Profile.svelte"
  import Notifications from "./Components/Notifications.svelte"
  import { Link, Router, Route } from "svelte-routing"
  import { navigate } from "svelte-routing"
  import Footer from "./Components/Footer.svelte"
  import { logout } from "./Services/logoutService"

  $: userID = window.localStorage.getItem("userID")
  const handleLogout = async () => {
    const response = await logout()
    if (response) {
      console.log(response)
      window.localStorage.removeItem("userID")
      navigate("/", { replace: true })
    }
  }
</script>

<main>
  <div id="page-container">
    <div id="content-wrap">
      <Router>
        <header class="navbar">
          <!-- DERECHA -->
          <section class="navbar-section">
            <Link
              class="btn btn-link"
              style="text-decoration:none; color:black"
              to="/">Home</Link
            >

            <Link
              class="btn btn-link"
              style="text-decoration:none; color:black"
              to="/login">Login</Link
            >

            <Link
              class="btn btn-link"
              style="text-decoration:none; color:black"
              to="/registro">Registrarse</Link
            >
          </section>
          <section class="navbar-center">
            <div id="logo">
              <!-- LOGO -->
              <i class="fa-solid fa-spider" />
              &nbsp;
              <p>theSmallCrawler</p>
              &nbsp;
              <i class="fa-solid fa-spider" />
            </div>
          </section>
          <section class="navbar-section">
            <!-- IZQUIERDA  -->

            {#if userID}
              <Link
                class="btn btn-link"
                style="text-decoration:none; color:black"
                to="/ops">Operaciones</Link
              >

              <Link
                class="btn btn-link"
                style="text-decoration:none; color:black"
                to="/perfil">Perfil</Link
              >
              <Link
                class="btn btn-link"
                style="text-decoration:none;color:red"
                id="menu"
                to="/"
                on:click={handleLogout}>Logout</Link
              >
              <i
                style="text-decoration:none;color:red"
                class="fa-solid fa-right-from-bracket"
              />
            {/if}
          </section>
        </header>

        <Notifications />

        <Route path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/registro">
          <Register />
        </Route>
        <Route path="/perfil">
          <Profile />
        </Route>
        <Route path="/ops">
          <Operations />
        </Route>
      </Router>
    </div>
    <Footer />
  </div>
</main>

<style>
  :root {
    font-family: Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
      "Helvetica Neue", sans-serif;
  }
  main {
    text-align: center;
    padding: 1rem;
    margin: 0 auto;
  }
  #page-container {
    position: relative;
    min-height: 100vh;
  }
  #content-wrap {
    padding-bottom: 2.5rem;
  }
  #logo {
    display: flex;
    align-items: baseline;
    font-weight: 200;
    color: goldenrod;
  }
</style>
