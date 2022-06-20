<script>
  import { saveUrl, searchUrl } from "../Services/searchService.js"
  import {
    Button,
    Content,
    Form,
    FormGroup,
    Select,
    SelectItem,
    TextInput,
  } from "carbon-components-svelte"
  import notification from "../State/store.js"

  let url = "https://www.deporvillage.com/kettlebell-ruster-cast-iron-28-kg"
  let selectorClass = ".Product_product-price__2P9So"
  let time
  let initialData

  const handleSelect = (e) => {
    time = e.detail
  }
  // SEARCH

  const handleSubmit = async () => {
    const response = await searchUrl(url, selectorClass)
    const span = document.getElementById("value")

    if (response) {
      span.innerText = response.response
      initialData = response.response
      document.getElementById("guardar").style.visibility = "visible "
    }
  }

  // SAVE
  const handleSave = async () => {
    if (time == undefined || null) {
      $notification.setErrors(
        "Por favor seleccione una frecuencia de comprobacion"
      )
      return setInterval(() => $notification.removeErrors(), 3000)
    }
    if (initialData == undefined || null) {
      $notification.setErrors("Por haga una búsqueda válida")
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
  <Content>
    <h1>Operaciones</h1>

    <form on:submit|preventDefault={handleSubmit}>
      <div>
        <TextInput inline labelText="URL" bind:value={url} type="text" />
      </div>
      <div>
        <TextInput
          inline
          labelText="SELECTOR"
          bind:value={selectorClass}
          type="text"
        />
      </div>
      <br />
      <div class="search-result">
        <Button kind="secondary" type="submit">Enviar</Button>

        <span id="value" />
      </div>
    </form>
    <div id="guardar">
      <div>
        <br />

        <Form
          on:submit={(e) => {
            e.preventDefault()
            handleSave()
          }}
          ><FormGroup>
            <div class="search-result">
              <Select
                inline
                labelText="Frecuencia de comprobación"
                on:change={handleSelect}
              >
                <SelectItem>Select the duration</SelectItem>
                <SelectItem value="1" text="1 hora" />
                <SelectItem value="2" text="2 horas" />
                <SelectItem value="5" text="5 horas" />
                <SelectItem value="16" text="16 hora" />
                <SelectItem value="24" text="24 horas" />
              </Select>

              <Button class="guardar-btn" type="submit">Guardar</Button>
            </div>
          </FormGroup>
        </Form>
      </div>
    </div>
  </Content>
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
    color: goldenrod;
    text-transform: uppercase;
    font-size: 2rem;
    font-weight: 150;
    line-height: 1.1;
    margin: 2rem auto;
    max-width: 14rem;
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

    p {
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
    .bx--btn bx--btn--primary {
      padding-top: 20px;
    }
  }
</style>
