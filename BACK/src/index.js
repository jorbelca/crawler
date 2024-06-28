import express from "express";
import http from "http";
import cors from "cors";
import { json } from "express";
import { MONGO, MONGO_TEST, NODE_ENV, PORT } from "../configEnv.js";
import loginRouter from "./routes/loginRoutes.js";
import registerRouter from "./routes/registerRoutes.js";
import searchRouter from "./routes/searchRoutes.js";

import saveRouter from "./routes/saveRoutes.js";
import eliminateUserRouter from "./routes/eliminateUserRoutes.js";
import mongoose from "mongoose";

import getDataRouter from "./routes/getAllData.js";
import profileRouter from "./routes/getProfileData.js";
import eliminateOpsRouter from "./routes/eliminateOpsRouter.js";
import { cronoScraper } from "./scraper/cronos.js";
import changeTimeRouter from "./routes/changeTimeRoutes.js";
import { sendNotification } from "./email/nodemailer.js";

const corsOptions = {
  origin: [
    "https://thesmallcrawler.vercel.app",
    "http://localhost:3000",
    "http://localhost:5173",
  ],
  optionsSuccessStatus: 204,
};

export const app = express();
// app.use(express.static('dist'));
app.options("*", cors(corsOptions));
app.use(cors(corsOptions));
app.use(json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/register", registerRouter);

const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
connectDB();

app.get("/api/ping", (_request, response) => {
  return response.status(200).json({ message: "PONG!!" });
});
app.use("/api/login", loginRouter);
app.use("/api/search", searchRouter);

app.use("/api/save", saveRouter);
app.use("/api/eliminate-user", eliminateUserRouter);
app.use("/api/eliminate-operation", eliminateOpsRouter);
app.use("/api/data", getDataRouter);
app.use("/api/profile", profileRouter);
app.use("/api/change-time", changeTimeRouter);

//404 Not Found Middleware
app.use((req, res, next) => {
  res.status(404).type("text").send("Not Found");
});

function connectDB() {
  let URL = MONGO;
  if (NODE_ENV === "test") URL = MONGO_TEST;
  // CONECTAR MONGODB

  try {
    mongoose.connect(`${URL}`, dbOptions);
    console.log("Connected To MongoDB");
  } catch (error) {
    console.log(error);
  }
}

// CREA SERVIDOR Y ARRANCA EL DAEMON QUE REALIZA LOS ESCRAPEOS PROGRAMADOS
http.createServer(app).listen(PORT, function () {
  console.log("Server listening on port " + PORT);
  cronoScraper();
});


const mailOptions = {
  from: "crawlerjs6@gmail.com",
  to: "jordi_belda@hotmail.com",
  subject: "Correo de prueba desde Nodemailer",
  text: "Este es un correo de prueba enviado usando OAuth 2.0 y Nodemailer. \n\nSi ya no deseas recibir estos correos, haz clic aquí para darte de baja.",
  html: '<p>Este es un correo de prueba enviado usando OAuth 2.0 y Nodemailer.</p><p>Si ya no deseas recibir estos correos, haz clic <a href="http://tusitio.com/unsubscribe">aquí</a> para darte de baja.</p>',
};
sendNotification(mailOptions);
