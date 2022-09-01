const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()
const app = express();

// connections
mongoose
  .connect(
    process.env.MONGO_URL,
    { autoCreate: true }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Couldn't connect to Atlas: ", err.message));

const con=mongoose.connection 

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
  });


// routes
const dataRouter = require('../backend/routes/intensity');
app.use('/intensity', dataRouter);

const likelihoodRouter = require('../backend/routes/likelihood');
app.use('/likelihood', likelihoodRouter);

const relevanceRouter = require('../backend/routes/relevance');
app.use('/relevance', relevanceRouter);

const topicsRouter = require('../backend/routes/topics');
app.use('/topics', relevanceRouter);

const regionRouter = require('../backend/routes/region');
app.use('/region', regionRouter);

const cityRouter = require('../backend/routes/city');
app.use('/city', cityRouter);
// const yearRouter = require('../backend/routes/year');
// app.use('/year', yearRouter);

app.listen(9000, ()=>{
  console.log('Server started');
})




