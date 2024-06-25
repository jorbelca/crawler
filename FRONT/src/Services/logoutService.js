const apiUrl = "http://localhost:3030/api"

export const logout = async () => {
  try {
    const response = await fetch(`${apiUrl}/logout`, {
      method: "GET",
      mode: "cors",
         headers: {
        "Content-Type": "application/json; charset=UTF-8 ",
        Accept: "application/json",
      },
    })
    return response
  } catch (error) {
    console.error(error);
    return error
  }

}