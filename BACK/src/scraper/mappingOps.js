import { sendNotification } from "../email/nodemailer.js";
import { createEmail } from "../email/plantillaEnvio.js";
import Operation from "../schemas/operationsSchema.js";
import User from "../schemas/userSchema.js";
import getTime from "../utils/getTime.js";
import { urlData } from "./indexScrapper.js";

export const mappingOperations = async () => {
  // SACAR TODAS LAS OPERACIONES INDIVIDUALIZADAS DE LA BBD Y MAPEARLAS UNA POR UNA PARA EJECUTAR LA COMPROBACION DE LA HORA
  const operations = await Operation.find({}, "data time url selector user");

  operations.forEach(async (operation) => {
    const lastData = operation.data[operation.data.length - 1];
    const time = operation.time;

    const currentTime = new Date(getTime());
    const lastTime = new Date(lastData.date);
    const nextTime = lastTime.setHours(lastTime.getHours() + time);

    // COMPARACIÓN DE SI LA HORA QUE ESTA EN LA BBD ES MENOR A LA ACTUAL Y EJECUCION DEL SCRAPPING
    if (nextTime < currentTime.getTime()) {
      try {
        const data = await urlData(operation.url, operation.selector);

        if (data !== lastData.data) {
          try {
            // ACTUALIZA BBD
            await Operation.findOneAndUpdate(
              { _id: operation._id },
              { $push: { data: { date: getTime(), data: data } } }
            );

            // SI LOS DATOS ESCRAPEADOS CAMBIAN, QUE ENVIE UN EMAIL

            const { email } = await User.findById(operation.user).select(
              "email"
            );
            sendNotification(createEmail(email, operation, data));
          } catch (error) {
            console.error(
              "Error updating the database or sending email:",
              error
            );
          }
        }
      } catch (error) {
        console.error(`Error handling operation for ${operation.url}:`, error);
      }
    }
  });
};
