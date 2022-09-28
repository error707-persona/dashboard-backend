// const express = require('express');
// const router = express.Router();
// const NotesModel = require('../models/dataModel');
// router.post('/', async (req, res)=>{
//     const {title, tagline, note} = req.body;
  
//     try{
//       const newNote = await NotesModel.create({title, tagline, note});
//       res.json(newNote);
//     } catch(err){
//       res.status(500).send(err);
//     }
//   })