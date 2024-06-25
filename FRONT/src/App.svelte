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
  import NotFound from "./Views/NotFound.svelte";

  const tokenLocal = userStore.getUser();

  if (tokenLocal !== null && tokenLocal.length > 0) {
    userStore.setUser(tokenLocal);
  } else {
    handleLogout();
  }

  let menuResponsive = false;

  const handleToggle = () => {
    menuResponsive = !menuResponsive;
  };
</script>

<main>
  <div id="page-container">
    <Notifications />
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
        <header class={!menuResponsive ? "navbar nav" : "navbar nav open"}>
          <!-- DERECHA -->
          <button
            id="toggle-btn"
            class="btn btn-action"
            on:click|preventDefault={handleToggle}
            ><i class="icon icon-menu" /></button
          >
          <section
            class={!menuResponsive
              ? "navbar-section menus"
              : "navbar-section menus open"}
          >
            <Link
              on:click={handleToggle}
              class="btn btn-link"
              style="text-decoration:none; color:black"
              to="/">Home</Link
            >
            {#if $userStore.length > 0}
              <Link
                on:click={handleToggle}
                class="btn btn-link"
                style="text-decoration:none; color:black"
                to="/ops">Operations</Link
              >
              <Link
                on:click={handleToggle}
                class="btn btn-link"
                style="text-decoration:none; color:black"
                to="/data">Data</Link
              >
              <Link
                on:click={handleToggle}
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
                on:click={handleToggle}
                class="btn btn-link"
                style="text-decoration:none; color:black"
                to="/login">Login</Link
              >

              <Link
                on:click={handleToggle}
                class="btn btn-link"
                style="text-decoration:none; color:black"
                to="/register">Register</Link
              >
            {/if}
          </section>
        </header>

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
          <NotFound />
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
    width: 100%;
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
  .navbar .navbar-section:not(:first-child):last-child {
    justify-content: space-evenly;
  }

  #toggle-btn {
    color: goldenrod;
    border-color: goldenrod;
    transform: translateY(-60px);
  }

  @media (max-width: 450px) {
    section.navbar-section {
      display: none;
    }
    section.navbar-section.menus.open {
      display: block;
      display: flex;
      flex-wrap: nowrap;
      flex-direction: column;
      height: 100%;
      width: 100%;
      margin-top: -60px;
    }
    header.navbar.nav {
      width: 0%;
      margin: 0;
      margin-bottom: -60px;
    }
    header.navbar.nav.open {
      width: 100%;
      transition: 0.5s;
      margin-bottom: 0px;
    }
  }
  @media (min-width: 450px) {
    #toggle-btn {
      display: none;
      width: 0px;
    }
  }
</style>
