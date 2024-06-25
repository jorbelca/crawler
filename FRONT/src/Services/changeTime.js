import { tokenSetter } from "../Helpers/tokenSetter";
import { apiUrl } from "./register";



export const changeTime = async (time, id) => {
  try {
    const response = await fetch(`${apiUrl}/api/change-time/${id}`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ time: time }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8 ",
        Accept: "application/json",
        Authorization: tokenSetter()
      },
    })
    return response
  } catch (error) {
    console.error(error);
    return error
  }

}