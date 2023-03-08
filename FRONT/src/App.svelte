<script>
  import Home from "./Views/Home.svelte";
  import Login from "./Views/Login.svelte";
  import Register from "./Views/Register.svelte";
  import Operations from "./Views/Operations.svelte";
  import Profile from "./Views/Profile.svelte";
  import Notifications from "./Components/Notifications.svelte";
  import { Link, Router, Route } from "svelte-routing";

  import Footer from "./Components/Footer.svelte";
  import { userStore } from "./State/store";
  import { handleLogout } from "./Helpers/handleLogout";
  import About from "./Views/About.svelte";
  import Data from "./Views/Data.svelte";
  import Error from "./Views/Error.svelte";

  const tokenLocal = userStore.getUser();

  if (tokenLocal !== null && tokenLocal.length > 0) {
    userStore.setUser(tokenLocal);
  } else {
    handleLogout();
  }
</script>

<main>
  <div id="page-container">
    <div id="content-wrap">
      <Router>
        <header class="navbar">
          <!-- LOGO -->
          <section class="nav-logo">
            <div id="logo">
              <!-- LOGO -->
              <i class="fa-solid fa-spider" />
              &nbsp;
              <p>theSmallCrawler</p>
              &nbsp;
              <i class="fa-solid fa-spider" />
            </div>
          </section>
        </header>
        <header class="navbar">
          <!-- DERECHA -->
          <section class="navbar-section menus">
            <Link
              class="btn btn-link"
              style="text-decoration:none; color:black"
              to="/">Home</Link
            >
            {#if $userStore.length > 0}
              <Link
                class="btn btn-link"
                style="text-decoration:none; color:black"
                to="/ops">Operations</Link
              >
              <Link
                class="btn btn-link"
                style="text-decoration:none; color:black"
                to="/data">Data</Link
              >
              <Link
                class="btn btn-link"
                style="text-decoration:none; color:black"
                to="/profile">Profile</Link
              >

              <span>
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
                /></span
              >
            {:else}
              <Link
                class="btn btn-link"
                style="text-decoration:none; color:black"
                to="/login">Login</Link
              >

              <Link
                class="btn btn-link"
                style="text-decoration:none; color:black"
                to="/register">Register</Link
              >
            {/if}
          </section>
        </header>

        <Notifications />

        <Route path="/">
          <Home />
        </Route>
        <Route path="/about">
          <About />
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
        <Route path="/data">
          <Data />
        </Route>
        <Route path="*">
          <Error />
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
  .navbar {
    justify-content: space-evenly;
  }
  .menus {
    display: flex;
    justify-content: space-evenly;
    margin-top: -20px;
    flex-wrap: wrap;
    font-weight: 150;
  }
  #page-container {
    position: relative;
    min-height: 100vh;
  }
  #content-wrap {
    padding-bottom: 2.5rem;
  }
  .nav-logo {
    display: flex;
    margin-top: -5px;
    margin-bottom: 10px;
  }
  #logo {
    display: flex;
    align-items: baseline;
    font-weight: 200;
    color: goldenrod;
  }
  @media (max-width: 550px) {
    .menus {
      /* flex-direction: column; */
    }
  }
</style>
