<script>
  import { Router, Link, Route } from "svelte-routing"

  import Home from "./Views/Home.svelte"
  import Login from "./Views/Login.svelte"
  import Register from "./Views/Register.svelte"
  import Perfil from "./Views/Perfil.svelte"
  import Operations from "./Views/Operations.svelte"
</script>

<main>
  <Router>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/perfil">Perfil</Link>
      <Link to="/register">Register</Link>
      <Link to="/ops">Operations</Link>
    </nav>

    <Route path="/">
      <Home />
    </Route>
    <Route path="/login">
      <Login />
    </Route>
    <Route path="/perfil">
      <Perfil />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
    <Route path="/ops">
      <Operations />
    </Route>
  </Router>
</main>

<style></style>
