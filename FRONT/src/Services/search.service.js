const apiUrl = "http://localhost:3030/api"


export const searchUrl = async (url, selectorClass) => {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ url: url, selector: selectorClass }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8 ",
        Accept: "application/json",
      },
    })
    return response.json()
  } catch (error) {
    console.log(error);
    return error
  }

}