import express from 'express'
import http from 'http'
import cors from 'cors'
import { json } from 'express'
import {  urlData } from './indexC.js';


var app = express();
app.use(cors())
app.use(json())

const port = 3030

app.post('/api', async (req, res) => {
  const { url, selector } = req.body
  setInterval(async () => {
    const response = await urlData(url, selector)
    console.log(response);
    if (response) res.status(200).send({ response });
  }, 10000)
});


http.createServer(app).listen(port, function () {
  console.log('Express server listening on port ' + port);
});
