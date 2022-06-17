const apiUrl = "http://localhost:3030/api"

export const getData = async (userID) => {
  try {
    const response = await fetch(`${apiUrl}/data`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ userID: userID }),
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