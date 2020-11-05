const  express = require('express');
const router = express.Router();
//const body_parser=require("body-parser")
//const mongoose=require("mongoose")
//const DB_URL ="mongodb://localhost:27017/mProject"
//const validate =require("../functions/validation")

router.get('/', function(req, res, next) {
    res.render('profile',
        {
            users :"",
            title: 'profile',
            error:""
        }
    );
});
module.exports = router;