<script>
  import { saveUrl, searchUrl } from "../Services/searchService.js"

  let url = "https://www.deporvillage.com/kettlebell-ruster-cast-iron-28-kg"
  let selectorClass = ".Product_product-price__2P9So"
  let time
  let initialData

  // SEARCH

  const handleSubmit = async () => {
    const response = await searchUrl(url, selectorClass)
    const span = document.getElementById("value")

    if (response) {
      span.innerText = response.response
      initialData = response.response
    }
  }

  // SAVE
  const handleSave = async () => {
    if (time === undefined || null)
      return console.log("Please select a date of actualization")
    const userID = window.localStorage.getItem("userID")
    const response = await saveUrl(
      url,
      selectorClass,
      Number(time),
      initialData,
      userID
    )

    if (response) console.log(response.statusText)
  }
</script>

<main>
  <h1>Operations</h1>

  <form on:submit|preventDefault={handleSubmit}>
    <div>
      <label for="username">Url</label>
      <input bind:value={url} type="text" />
    </div>
    <div>
      <label for="password">Selector</label>
      <input bind:value={selectorClass} type="text" />
    </div>
    <button type="submit">Enviar</button>
  </form>
  <div>
    <span id="value" />
    <form on:submit|preventDefault={handleSave}>
      <button>Guardar </button>
      <select bind:value={time}>
        <option>Select the duration</option>
        <option value="1">1 hour</option>
        <option value="2">2 hour</option>
        <option value="5">5 hour</option>
        <option value="16">16 hour</option>
        <option value="24">24 hour</option>
      </select>
    </form>
  </div>
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
