import { tokenSetter } from "../Helpers/tokenSetter";
import { apiUrl } from "./register";

export const searchUrl = async (url, selectorClass) => {
  try {
    const response = await fetch(`${apiUrl}/api/search`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ url: url, selector: selectorClass }),
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json; charset=UTF-8 ",
        Accept: "application/json",
        Authorization: tokenSetter(),
      },
    });
    return response.json();
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const saveUrl = async (url, selectorClass, time, initialData) => {
  try {
    const response = await fetch(`${apiUrl}/api/save`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        url: url,
        selector: selectorClass,
        time: time,
        initialData: initialData,
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8 ",
        Accept: "application/json",
        Authorization: tokenSetter(),
      },
    });
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};
