<script>
  import { handleLogout } from "../Helpers/handleLogout.js"

  import { saveUrl, searchUrl } from "../Services/searchService.js"
  import { notificationStore, errorStore } from "../State/store.js"

  let url = "https://www.amazon.es/dp/B07RPMGKQB/ref=twister_B08ZNPDFTC?th=1"
  let selectorClass = ".a-offscreen"
  let time = "24"
  let initialData

  // SEARCH

  const handleSubmit = async () => {
    const spinner = document.getElementById("spinner")
    const searchBtn = document.getElementById("buscar-btn")
    spinner.style.visibility = "visible"
    searchBtn.disabled = true

    if (/[a-zA-Z\d]/gm.test(selectorClass[0])) {
      spinner.style.visibility = "hidden"
      searchBtn.disabled = false
      return errorStore.setErrors("Please enter the selector type correctly")
    }
    const response = await searchUrl(url, selectorClass)
    const span = document.getElementById("value")

    if (Object.keys(response)[0] === "error") {
      spinner.style.visibility = "hidden"
      searchBtn.disabled = false
      handleLogout()
      return errorStore.setErrors(response.error)
    }
    if (response === "TypeError: Failed to fetch") {
      spinner.style.visibility = "hidden"
      searchBtn.disabled = false
      return errorStore.setErrors("There is a problem connecting to the server")
    }
    if (response.response.status === 403 || response.response.status === 404) {
      spinner.style.visibility = "hidden"
      searchBtn.disabled = false
      return errorStore.setErrors("Error in the selector or in the URL")
    }
    if (Object.keys(response)[0] === "response") {
      spinner.style.visibility = "hidden"
      searchBtn.disabled = false
      span.innerText = response.response
      initialData = response.response
      document.getElementById("guardar").style.visibility = "visible "

      if (Object.keys(response.response).length === 0) {
        spinner.style.visibility = "hidden"
        searchBtn.disabled = false
        return errorStore.setErrors(
          "We have not found what you were looking for"
        )
      }
    }
  }

  // SAVE
  const handleSave = async () => {
    if (time == undefined || null) {
      errorStore.setErrors(
        "Por favor, seleccione una frecuencia de comprobacion"
      )
      return setTimeout(() => errorStore.removeErrors(), 3000)
    }
    if (initialData == undefined || null) {
      errorStore.setErrors("Por favor, haga una búsqueda válida")
      return setTimeout(() => errorStore.removeErrors(), 3000)
    }

    const response = await saveUrl(
      url,
      selectorClass,
      Number(time),
      initialData
    )

    if (response.status === 200) {
      document.getElementById("guardar").style.visibility = "hidden"
      document.getElementById("value").style.visibility = "hidden"
      notificationStore.setNotifications(response.statusText)
    }
    if (response.status !== 200) {
      if (response.statusText === undefined)
        return errorStore.setErrors(
          "Hay un problema con la conexión con el servidor"
        )
      return errorStore.setErrors(response.statusText)
    }
  }
</script>

<main>
  <h1>Operations</h1>

  <form class="form-horizontal" on:submit|preventDefault={handleSubmit}>
    <div class="form-group">
      <div class="col-3 col-sm-12">
        <label class="form-label label-sm " for="url">URL </label>
      </div>
      <div class="col-9 col-sm-12">
        <input
          class="form-input input-sm"
          bind:value={url}
          type="text"
          required
        />
      </div>
    </div>

    <div class="form-group">
      <div class="col-3 col-sm-12">
        <label class="form-label label-sm " for="selector"
          >Selector <p class="helper">
            (If it is class, the first character is a point, if it is an id, a
            pad)
          </p></label
        >
      </div>
      <div class="col-9 col-sm-12">
        <input
          id="selector"
          class="form-input input-sm"
          bind:value={selectorClass}
          type="text"
          required
        />
      </div>
    </div>

    <div class="search-result">
      <button id="buscar-btn" class="btn" type="submit">Search</button>
      <div id="spinner" class="loading loading-lg" />
      <span id="value" />
    </div>
  </form>

  <div id="guardar">
    <form class="form-horizontal" on:submit|preventDefault={handleSave}>
      <div class="search-result">
        <div class="form-group search-result">
          <div class="col-3 col-sm-12">
            <label class="form-label label-sm " for="select-frecuency"
              >Checking Frequency</label
            >
          </div>
          <div class="col-6 col-sm-12" id="select-btn">
            <select id="select-frecuency" bind:value={time}>
              <option value="1">1 hour</option>
              <option value="2">2 hours</option>
              <option value="5">5 hours</option>
              <option value="16">16 hours</option>
              <option value="24">24 hours</option>
            </select>
            <button class="guardar-btn btn" type="submit">Save</button>
          </div>
        </div>
      </div>
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
    margin: 0 auto;
  }

  h1 {
    color: goldenrod;
    text-transform: uppercase;
    font-size: 2rem;
    font-weight: 150;
    line-height: 1.1;
    margin: 1rem auto;
    max-width: 14rem;
  }
  #spinner {
    visibility: hidden;
  }
  .guardar-btn {
    font-weight: 100;
  }
  #buscar-btn {
    font-weight: 100;
  }
  #guardar {
    visibility: hidden;
    font-weight: 100;
  }
  .search-result {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  #select-frecuency {
    font-weight: 300;
  }
  #select-btn {
    display: flex;
    padding: 40px;
    justify-content: center;
  }
  span#value {
    padding-left: 45px;
  }
  .helper {
    font-size: 0.5rem;
    font-weight: 100;
  }
  @media (max-width: 480px) {
    h1 {
      max-width: none;
    }
    #spinner {
      margin-top: 20px;
      margin-bottom: -20px;
    }
    .search-result {
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 10px;
    }

    span#value {
      padding-top: 20px;
      padding-left: 0;
    }
    #buscar-btn {
      margin-top: 40px;
    }
  }
  @media (min-width: 480px) {
    .search-result {
      margin-top: 40px;
    }
    #spinner {
      margin-left: 60px;
    }
  }
</style>
