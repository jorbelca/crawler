<script>
  import { saveUrl, searchUrl } from "../Services/searchService.js"
  import notification from "../State/store.js"

  let url = "https://www.deporvillage.com/kettlebell-ruster-cast-iron-28-kg"
  let selectorClass = ".Product_product-price__2P9So"
  let time
  let initialData

  // SEARCH

  const handleSubmit = async () => {
    const spinner = document.getElementById("spinner")
    spinner.style.visibility = "visible"
    const response = await searchUrl(url, selectorClass)
    const span = document.getElementById("value")

    if (response) {
      spinner.style.visibility = "hidden"
      span.innerText = response.response
      initialData = response.response
      document.getElementById("guardar").style.visibility = "visible "
    }
  }

  // SAVE
  const handleSave = async () => {
    if (time == undefined || null) {
      $notification.setErrors(
        "Por favor, seleccione una frecuencia de comprobacion"
      )
      return setInterval(() => $notification.removeErrors(), 3000)
    }
    if (initialData == undefined || null) {
      $notification.setErrors("Por favor, haga una búsqueda válida")
      return setInterval(() => $notification.removeErrors(), 3000)
    }
    const userID = window.localStorage.getItem("userID")

    const response = await saveUrl(
      url,
      selectorClass,
      Number(time),
      initialData,
      userID
    )

    if (response.status === 200) {
      document.getElementById("guardar").style.visibility = "hidden"
      $notification.setNotifications(response.statusText)
      setInterval(() => $notification.removeNotifications(), 3000)
    }
    if (response.status !== 200) {
      $notification.setErrors(response.statusText)
      setInterval(() => $notification.removeErrors(), 3000)
    }
  }
</script>

<main>
  <h1>Operaciones</h1>

  <form class="form-horizontal" on:submit|preventDefault={handleSubmit}>
    <div class="form-group">
      <div class="col-3 col-sm-12">
        <label class="form-label label-sm " for="url">URL </label>
      </div>
      <div class="col-9 col-sm-12">
        <input class="form-input input-sm" bind:value={url} type="text" />
      </div>
    </div>

    <div class="form-group">
      <div class="col-3 col-sm-12">
        <label class="form-label label-sm " for="selector">Selector</label>
      </div>
      <div class="col-9 col-sm-12">
        <input
          id="selector"
          class="form-input input-sm"
          bind:value={selectorClass}
          type="text"
        />
      </div>
    </div>

    <div class="search-result">
      <button id="buscar-btn" class="btn" type="submit">Buscar</button>
      <div id="spinner" class="loading loading-lg" />
      <span id="value" />
    </div>
  </form>

  <div id="guardar">
    <form class="form-horizontal" on:submit|preventDefault={handleSave}>
      <div class="search-result">
        <div class="form-group">
          <div class="col-3 col-sm-12">
            <label class="form-label label-sm " for="select-frecuency"
              >Frecuencia de comprobación</label
            >
          </div>
          <div class="col-6 col-sm-12">
            <select id="select-frecuency" bind:value={time}>
              <option value="1">1 hora</option>
              <option value="2">2 horas</option>
              <option value="5">5 horas</option>
              <option value="16">16 horas</option>
              <option value="24">24 horas</option>
            </select>
            <button class="guardar-btn btn" type="submit">Guardar</button>
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
  #guardar {
    visibility: hidden;
  }
  .search-result {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  span#value {
    padding-left: 45px;
  }
  @media (max-width: 480px) {
    h1 {
      max-width: none;
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
  }
</style>
