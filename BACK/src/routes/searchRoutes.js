import express from 'express'
import { urlData } from "../scraper/indexScraper.js";


const searchRouter = express.Router()


searchRouter.post('/', async (req, res) => {
  const { url, selector } = req.body


  const response = await urlData(url, selector)


  if (response) res.status(200).send({ response });
});


export default searchRouter