import express from 'express'

const logoutRouter = express.Router()

logoutRouter.post('/', async (request, response) => {
  req.session.destroy();
  res.redirect('/');
})

export default logoutRouter