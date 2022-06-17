import express from 'express'
import http from 'http'
import cors from 'cors'
import { json } from 'express'
import { MONGO, PORT, SECRET } from '../configEnv.js';
import loginRouter from './routes/loginRoutes.js';
import registerRouter from './routes/registerRoutes.js';
import searchRouter from './routes/searchRoutes.js';
import logoutRouter from './routes/logoutRoutes.js';
import saveRouter from './routes/saveRoutes.js';
import eliminateUserRouter from './routes/eliminateUserRoutes.js';
import mongoose from 'mongoose';
import session from 'express-session'
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo'
import getDataRouter from './routes/getAllData.js';



const app = express();
app.use(cors())
app.use(json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/register', registerRouter)


const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
connectMDB()

const sessionStore = new MongoStore({
  mongoUrl: `${MONGO}`,
  collectionName: 'sessions'
})

const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
  secret: SECRET,
  saveUninitialized: true,
  cookie: { maxAge: oneDay },
  resave: false,
  store: sessionStore
}));

app.use(cookieParser());

app.use('/api/login', loginRouter)
app.use('/api/search', searchRouter)
app.use('/api/logout', logoutRouter)
app.use('/api/save', saveRouter)
app.use('/api/eliminate', eliminateUserRouter)
app.use('/api/data', getDataRouter)




function connectMDB() {
  // Connect to MongoDB
  try {
    mongoose.connect(`${MONGO}`, dbOptions);
    console.log('Connected To MongoDB')
  } catch (error) { console.log(error) }
}

http.createServer(app).listen(PORT, function () {
  console.log('Server listening on port ' + PORT);
});
