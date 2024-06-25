import axios from "axios";
import {
  MAIL_CLIENT_ID,
  MAIL_CLIENT_SECRET,
  MAIL_REFRESH_TOKEN,
} from "../../configEnv.js";

// Asignar Variables
const clientId = MAIL_CLIENT_ID;
const clientSecret = MAIL_CLIENT_SECRET;
const refreshToken = MAIL_REFRESH_TOKEN;

// FUNCION QUE COMPRUEBA SI EL REFRESH ACCESS TOKEN DE LA API DE GMAIL ES VALIDO

export async function refreshAccessToken() {
  try {
    const response = await axios.post(
      "https://oauth2.googleapis.com/token",
      null,
      {
        params: {
          client_id: clientId,
          client_secret: clientSecret,
          refresh_token: refreshToken,
          grant_type: "refresh_token",
        },
      }
    );
    const accessToken = response.data.access_token;
    console.log("New access token:", accessToken);
  } catch (error) {
    console.error(
      "Error refreshing access token:",
      error.response ? error.response.data : error.message
    );
    if (error.response && error.response.data.error === "invalid_grant") {
      console.error("The refresh token has expired or been revoked." + error);
    } else {
      console.error(error);
    }
  }
}
