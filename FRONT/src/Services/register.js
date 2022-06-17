const apiUrl = "http://localhost:3030/api"

export const registerUser = async (email, username, password) => {

  try {
    const response = await fetch(`${apiUrl}/register`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ username: username, email: email, password: password }),
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