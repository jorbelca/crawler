<script>
  import { Router, Link, Route } from "svelte-routing"
  import "carbon-components-svelte/css/all.css"

  import Home from "./Views/Home.svelte"
  import Login from "./Views/Login.svelte"
  import Register from "./Views/Register.svelte"
  import Operations from "./Views/Operations.svelte"
  import Profile from "./Views/Profile.svelte"
  import Notifications from "./Components/Notifications.svelte"

  import {
    SkipToContent,
    Header,
    SideNav,
    SideNavMenuItem,
    SideNavItems,
    Theme,
  } from "carbon-components-svelte"

  const handleLogout = () => {}
  let isSideNavOpen = false
</script>

<main>
  <Router>
    <Header company="Crawler" bind:isSideNavOpen>
      <svelte:fragment slot="skip-to-content">
        <SkipToContent />
      </svelte:fragment>
      <SideNav bind:isOpen={isSideNavOpen}>
        <SideNavItems>
          <Theme
            render="toggle"
            theme="white"
            tokens={{
              "interactive-01": "#d02670",
              "hover-primary": "#ee5396",
              "active-primary": "#9f1853",
            }}
          />
          <SideNavMenuItem text="Home">
            <Link style="text-decoration:none; color:black" to="/home"
              >Home</Link
            ></SideNavMenuItem
          >

          <SideNavMenuItem text="Login">
            <Link style="text-decoration:none; color:black" to="/login"
              >Login</Link
            ></SideNavMenuItem
          >

          <SideNavMenuItem text="Register">
            <Link style="text-decoration:none; color:black" to="/register"
              >Registrarse</Link
            ></SideNavMenuItem
          >
          <SideNavMenuItem text="Profile">
            <Link style="text-decoration:none; color:black" to="/profile"
              >Perfil</Link
            >
          </SideNavMenuItem>
          <SideNavMenuItem text="Operations">
            <Link style="text-decoration:none; color:black" to="/ops"
              >Operaciones</Link
            ></SideNavMenuItem
          >
          <SideNavMenuItem text="Logout">
            <Link
              style="text-decoration:none;color:red"
              id="menu"
              to="/home"
              on:click={handleLogout}>Logout</Link
            >
          </SideNavMenuItem></SideNavItems
        >
      </SideNav>
    </Header>
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

  /* text-align: center;
    margin: 0 auto;
    color: #ff3e00;
    font-size: 1rem;
    font-weight: 100;
    line-height: 1.1;
    max-width: auto; */
</style>
