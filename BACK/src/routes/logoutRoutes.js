import express from 'express'
import { auth } from '../utils/auth.js';

const logoutRouter = express.Router()

logoutRouter.get('/',  async (request, response) => {
  request.session.destroy();
  response.redirect('/');
})

export default logoutRouter