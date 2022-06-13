<script>
  import { searchUrl } from "../Services/search.service.js"

  let url = "https://www.deporvillage.com/kettlebell-ruster-cast-iron-28-kg"
  let selectorClass = ".Product_product-price__2P9So"

  const handleInputUrl = (event) => {
    url = event.target.value
  }
  const handleInputClass = (event) => {
    selectorClass = event.target.value
  }
  const handleSubmit = async () => {
    const response = await searchUrl(url, selectorClass)
    const span = document.getElementById("value")

    if (response) {
      span.innerText = response.response
    }
  }
</script>

<main>
  <h1>Operations</h1>

  <form on:submit|preventDefault={handleSubmit}>
    <div>
      <label for="username">Url</label>
      <input value={url} type="text" on:input={handleInputUrl} />
    </div>
    <div>
      <label for="password">Selector</label>
      <input value={selectorClass} type="text" on:input={handleInputClass} />
    </div>
    <button type="submit">Enviar</button>
  </form>
  <span id="value" />
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  main {
    text-align: center;
    padding: 1rem;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 2rem;
    font-weight: 100;
    line-height: 1.1;
    margin: 2rem auto;
    max-width: 14rem;
  }
  form input {
    width: 25rem;
    margin: 1rem;
  }
  form button {
    width: 5rem;
    padding: 0.3rem;
    background-color: lightblue;
    border-radius: 10px;
    color: grey;
    font-size: 0.7rem;
    font-weight: 400;
  }
  @media (min-width: 480px) {
    h1 {
      max-width: none;
    }

    p {
      max-width: none;
    }
  }
</style>
