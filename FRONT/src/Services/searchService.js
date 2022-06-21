const apiUrl = "http://localhost:3030/api"


export const searchUrl = async (url, selectorClass) => {
  try {
    const response = await fetch(`${apiUrl}/search`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ url: url, selector: selectorClass }),
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json; charset=UTF-8 ",
        Accept: "application/json",
        Cookies: document.cookie
      },
    })
    return response.json()
  } catch (error) {
    console.log(error);
    return error
  }

}

export const saveUrl = async (url, selectorClass, time, initialData, userID) => {
  try {
    const response = await fetch(`${apiUrl}/save`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ url: url, selector: selectorClass, time: time, initialData: initialData, userID: userID }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8 ",
        Accept: "application/json",
      },
    })
    return response
  } catch (error) {
    console.log(error);
    return error
  }

}