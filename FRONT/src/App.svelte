<script>
  import { Router, Link, Route } from "svelte-routing"

  import Home from "./Views/Home.svelte"
  import Login from "./Views/Login.svelte"
  import Register from "./Views/Register.svelte"
  import Operations from "./Views/Operations.svelte"
  import Profile from "./Views/Profile.svelte"
</script>

<main>
  <Router>
    <nav>
      <Link to="/home">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/register">Register</Link>
      <Link to="/ops">Operations</Link>
      <a href="">Logout</a>
    </nav>

    <Route path="/">
      <Home />
    </Route>
    <Route path="/login">
      <Login />
    </Route>
    <Route path="/profile">
      <Profile />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
    <Route path="/ops">
      <Operations />
    </Route>
  </Router>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  main nav {
    text-decoration: none;
    text-align: center;
    margin: 0 auto;
    color: #ff3e00;
    font-size: 1rem;
    font-weight: 100;
    line-height: 1.1;
    max-width: auto;
  }
</style>
