<script>
  import { Link } from "svelte-routing"
</script>

<svelte:head>
  <title>the Small Crawler</title>
</svelte:head>

<main>
  <h1>Hello,</h1>
  <h2>and welcome to the small Crawler</h2>
  <div class="extended-text">
    <p>
      If you are interested in following anything on the internet, you are in
      the correct spot
    </p>

    <ul>
      <li>You can track prices from some of the large webs of the internet</li>
      <li>You cant track words from some webs of your interest</li>
      <li>
        We will send you a mail if anything that you are tracking changes !
      </li>
      <li>
        The data will be stored in the profile section and you could query it,
        whenever you want
      </li>
      <li class="warning">
        <i class="fas fa-warning" /> Not all the web pages work with our service.
        We are trying to improve the crawler searcher to bring the best service
      </li>
    </ul>
  </div>

  <Link class="link-about" to="/about"
    ><span class="link-about">About my site</span></Link
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
    margin: 0.3rem auto;
    max-width: 14rem;
    color: rgb(218, 165, 32);
  }
  h2 {
    font-family: -apple-system, Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
      "Helvetica Neue", sans-serif;
    text-transform: uppercase;
    font-size: 1.5rem;
    font-weight: 100;
    line-height: 1.1;
    margin: auto;

    color: rgb(218, 165, 32);
  }
  .extended-text {
    margin-top: 2rem;
    font-weight: 300;
    display: flex;
    flex-direction: column;
    align-content: center;
  }

  .link-about {
    padding-top: 2rem;
    color: goldenrod;
    font-weight: 100;
  }

  .link-about:hover {
    border-bottom: 0.5px solid goldenrod;
    text-decoration: none;
  }
  a:visited {
    text-decoration: none !important;
    color: none;
  }
  .warning {
    color: rgb(129, 3, 129);
  }
</style>
