const express = require('express');
const NotesModel = require('./models/dataModel');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// var cors = require('cors')
// app.use(cors);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
dotenv.config()


// connections
mongoose
  .connect(
    process.env.MONGO_URL,
    { autoCreate: true }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Couldn't connect to Atlas: ", err.message));

const con = mongoose.connection

// routes
// const dataRouter = require('./routes/Notes');
// app.use('/Notes', dataRouter);

// add note
app.post('/Notes', async (req, res) => {
  const { title, tagline, note } = req.body;
  
  try {
    const newNote = await NotesModel.create({ title:title, tagline:tagline, note:note });
    res.json(newNote);
  } catch (err) {
    res.status(500).send(err);
  }
})
// pin
app.post('/pin/:id', async (req, res) => {
  const { id } = req.params;
  const { isPinned } = req.body;

  try {
    const newNote = await NotesModel.findOneAndUpdate(
      { _id: id },
      { pinned: isPinned });
    res.json(newNote);
    console.log("api pin", isPinned)
  } catch (err) {
    res.status(500).send(err);
  }
})

// edit
// app.post('/edit/:id', async (req, res) => {
//   const { id } = req.params;
//   const { title,tagline, note  } = req.body;

//   try {
//     const newNote = await NotesModel.updateOne(
//       { _id: id },
//       {$set: {
//         tite:title,
//         tagline:tagline,
//         note:note
//       }});
//     res.json(newNote);
//     // console.log("api pin", isPinned)
//   } catch (err) {
//     res.status(500).send(err);
//   }
// })

app.post('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { title,tagline, note} = req.body;

  try {
    const newNote = await NotesModel.updateOne(
      { _id:id},
      {$set:{
        title:title,
        tagline:tagline,
        note:note
      }});
    res.json(newNote);
    // console.log("api pin", isPinned)
  } catch (err) {
    res.status(500).send(err);
  }
})

app.get('/', async (req, res) => {


  try {
    const newNote = await NotesModel.find();
    res.json(newNote);
  } catch (err) {
    res.status(500).send(err);
  }
})

// app.get('/search/:title', async (req, res)=>{

//   const {title} = req.params;

//   try{
//     const newNote = await NotesModel.find({title:title});
//     res.json(newNote);
//   } catch(err){
//     res.status(500).send(err);
//   }
// });

// delete note
app.post('/delete/:id', async (req, res) => {

  const { id } = req.params;

  try {
    const newNote = await NotesModel.deleteOne({ _id: id });
    res.json(newNote);
  } catch (err) {
    res.status(500).send(err);
  }
})
// cors headers


app.listen(9023, () => {
  console.log("listening to 9023");
})