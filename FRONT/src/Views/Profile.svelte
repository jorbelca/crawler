<script>
  import { getData } from "../Services/getData.js"

  const handleClick = async () => {

    const userID = window.localStorage.getItem("userID")
    const res = await getData(userID)
    const response = await res.json()

    console.log(response)
  }
</script>

<main>
  <h1>Profile</h1>
  <button on:click={handleClick}>GET DATA</button>
</main>

<style></style>
