<script>
  import { Content } from "carbon-components-svelte"
</script>

<svelte:head>
  <title>Welcome</title>
</svelte:head>

<main>
  <Content>
    <h1>Hello and welcome to the small Crawler</h1>
    <h5>
      If you are interested in follow anything on the internet, you are in the
      correct spot
    </h5>

    <a href="/about">About my site</a></Content
  >
</main>

<style>
  h1 {
    font-family: -apple-system, Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
      "Helvetica Neue", sans-serif;
    text-transform: uppercase;
    font-size: 2rem;
    font-weight: 150;
    line-height: 1.1;
    margin: 2rem auto;
    max-width: 14rem;
    color: goldenrod;
  }
</style>
