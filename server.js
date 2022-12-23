require('dotenv').config()
// const dotenv=require('dotenv');
// dotenv.config('/.env');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));
mongoose.set('strictQuery', false);
app.use(express.json())
// console.log(process.env.DATABASE_URL);
const subscribersRouter = require('./routes/subscribers')
app. use('/subscribers', subscribersRouter)
app.listen(3000, () => console.log('Server started'));