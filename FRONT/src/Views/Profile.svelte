<script>
  import { getData } from "../Services/getData.js"

  let data = []
  let dataTable = []

  const handleClick = async () => {
    document.getElementById("selector").style.visibility = "visible "
    const userID = window.localStorage.getItem("userID")
    const res = await getData(userID)
    let response = await res.json()
    if (response !== undefined || response.length > 0 || response !== null)
      data = await response
  }
</script>

<main>
  <h1>Profile</h1>

  <div>
    <button on:click={handleClick}>GET DATA OF OPERATIONS</button>
    <select id="selector" bind:value={dataTable}
      >{#each data as dato}
        <option value={[dato]}>{dato.url.substring(0, 50) + "..."}</option>
      {/each}
    </select>

    {#each dataTable as dato}
      <table>
        <thead>
          <a href={dato.url} target="_blank">{dato.url}</a>
        </thead>
        {#each dato.data as operation}
          <tbody>
            <tr>
              <td>
                {operation.date}
              </td>
              <td>
                {operation.data}
              </td>
            </tr>
          </tbody>
        {/each} <br />
      </table>
    {/each}
    <br />
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
  #selector {
    visibility: hidden;
  }

  @media (min-width: 480px) {
    h1 {
      max-width: none;
    }
  }
</style>
