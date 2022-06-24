const apiUrl = "http://localhost:3030/api"

export const changeTime = async (userID, time, id) => {

  try {
    const response = await fetch(`${apiUrl}/change-time/${id}`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ userID: userID, time: time }),
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