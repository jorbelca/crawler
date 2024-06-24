import { tokenSetter } from "../Helpers/tokenSetter";
import { apiUrl } from "./register";



export const getProfileData = async () => {
  try {
    const response = await fetch(`${apiUrl}/api/profile`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=UTF-8 ",
        Accept: "application/json",
        Authorization: tokenSetter()
      },
    })
    return response
  } catch (error) {
    console.log(error);
    return error
  }

}

export const changeProfileData = async (newData) => {
  try {
    const response = await fetch(`${apiUrl}/api/profile`, {
      method: "PUT",
      mode: "cors",
      body: JSON.stringify({ newData: newData }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8 ",
        Accept: "application/json",
        Authorization: tokenSetter()
      },
    })
    return response
  } catch (error) {
    console.log(error);
    return error
  }

}