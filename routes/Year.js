const express = require('express');
const router = express.Router();
const dataModel = require('../models/dataModel');
router.get('/', async (req,res)=>{
    try{
        const data = await dataModel.aggregate([{"$group" : {_id:"$year", count:{$sum:1}}}]);
        res.json(data);
    }
    catch(err){
        res.send("Error "+err);
    }
})

module.exports = router
