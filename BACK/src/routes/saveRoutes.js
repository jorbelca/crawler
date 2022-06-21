import express from 'express'
import { urlData } from "../scraper/indexScraper.js";
import { sendNotification } from '../email/nodemailer.js'

import Operation from '../schemas/operationsSchema.js';
import User from '../schemas/userSchema.js'
import getTime from '../utils/getTime.js';

const saveRouter = express.Router()


saveRouter.post('/', async (request, response) => {
  const { url, selector, time, initialData, userID } = request.body
  console.log(userID);
  const entryAlreadyInDB = await Operation.find({ url: url, selector: selector, user: userID })

  if (entryAlreadyInDB.length > 0) {

    try {
      const res = await Operation.updateOne({ selector: selector, user: userID, url: url },
        { $push: { data: { date: getTime(), data: initialData } } })

      return response.status(200).send('OK')
    } catch (error) {
      console.error(error);

      return response.status(400).send(error)
    }


  }
  const newEntry = new Operation({
    ...request.body,
    data: [{ date: getTime(), data: initialData }]
    , user: userID
  })

  try {
    // ENTRY SAVE
    const res = await newEntry.save()
    // USER OPERATIONS SAVE
    await User.updateOne({ _id: userID }, { $push: { operations: res._id } })

    return response.status(200).json('Saved!')
  } catch (error) {
    console.error(error);

    return response.status(400).send(error)
  }






  // setInterval(async () => {
  //   response = await urlData(url, selector)
  //   console.log(response);
  //   if (response !== initialData) sendNotification(mailOptions)
  //   const mailOptions = {
  //     from: 'crawlerJS@hotmail.com',
  //     to: 'jordi_belda@hotmail.com',
  //     subject: 'Sending Email using Node.js',
  //     html: `<h1>Welcome</h1><p>${url}</p> <br><p>The data is ${response}</p>`
  //   };
  // }, 10000);



  // MAL
  // const operation = await User.findById(userID)
  //   const data = {
  //     url, selector, time, data: [{
  //       date: date,
  //       data: initialData
  //     }]
  // }
  //   user.operations = data
  // console.log(user.operations[0].data);
  // user.operations[0].data = user.operations[0].data, {
  //   date: date,
  //   data: initialData
  // }


  // if (user) await user.save()



});

export default saveRouter


  // const meals = await Entry.find({ user: userID }).populate("user", { username: 1 })


  // response.status(200).json(meals)