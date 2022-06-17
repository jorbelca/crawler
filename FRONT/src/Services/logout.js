const apiUrl = "http://localhost:3030/api"

export const loginUser = async () => {
  try {
    const response = await fetch(`${apiUrl}/logout`, {
      method: "POST",
      mode: "cors",

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