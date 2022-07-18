export const apiUrl = import.meta.env.VITE_API_URL

export const registerUser = async (email, username, password) => {

  try {
    const response = await fetch(`${apiUrl}/api/register`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ username: username, email: email, password: password }),
      headers: {
        "Content-Type": "application/json ",
        "Accept": "*/*",
        "Connection": "keep-alive"
      },
    })
    return response
  } catch (error) {
    console.log(error);
    return error
  }

}