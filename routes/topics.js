const express = require('express');
const router = express.Router();
const dataModel = require('../models/dataModel');
router.get('/', async (req,res)=>{
    try{
        const data = await dataModel.aggregate([{"$group" : {_id:"$topics", count:{$sum:1}}}]);
        res.json(data, "topics");
    }
    catch(err){
        res.send("Error "+err);
    }
})

module.exports = router
