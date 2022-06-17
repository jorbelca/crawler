const apiUrl = "http://localhost:3030/api"

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${apiUrl}/login`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ email: email, password: password }),
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