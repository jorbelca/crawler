const apiUrl = "http://localhost:3030/api"

export const eliminateOperation = async (userID, id) => {
  try {
    const response = await fetch(`${apiUrl}/eliminate-operation/${id}`, {
      method: "DELETE",
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