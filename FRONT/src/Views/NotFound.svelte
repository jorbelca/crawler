<script>
  import { link } from "svelte-routing";
</script>

<main>
  <h1>
    &nbsp;Error 404 -- Not Found &nbsp;
    <i class="fa-solid fa-exclamation" />
    <i class="fa-solid fa-exclamation" />
  </h1>

  <a href="/" use:link> Go Back to Home</a>
</main>

<style>
  h1 {
    color: goldenrod;
    text-transform: uppercase;
    font-size: 2rem;
    font-weight: 250;
    line-height: 1.1;
    margin: 1rem auto;
    margin-top: 40px;
  }
  i {
    font-size: xx-large;
  }
  a {
    padding-top: 2rem;
    color: rebeccapurple;
    font-weight: 300;
    text-decoration: underline;
  }
</style>
