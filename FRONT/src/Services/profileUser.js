const apiUrl = "http://localhost:3030/api"

export const getProfileData = async (userID) => {
  try {
    const response = await fetch(`${apiUrl}/profile`, {
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

export const changeProfileData = async (newData, userID) => {
  try {
    const response = await fetch(`${apiUrl}/profile`, {
      method: "PUT",
      mode: "cors",
      body: JSON.stringify({ newData: newData, userID: userID }),
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