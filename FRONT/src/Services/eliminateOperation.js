import { tokenSetter } from "../Helpers/tokenSetter";
import { apiUrl } from "./register";



export const eliminateOperation = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/api/eliminate-operation/${id}`, {
      method: "DELETE",
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