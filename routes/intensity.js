const express = require('express');
const router = express.Router();
const dataModel = require('../models/dataModel');
router.get('/', async (req,res)=>{
    try{
        const data = await dataModel.aggregate([
            {"$group" : {_id:"$intensity", count:{$sum:1}}},
            {"$sort":{__id:1}}
        ]);
        res.json(data);
    }
    catch(err){
        res.send("Error "+err);
    }
})

module.exports = router
