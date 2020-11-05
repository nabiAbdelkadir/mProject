const  express = require('express');
const router = express.Router();
const body_parser=require("body-parser")
const mongoose=require("mongoose")
const DB_URL ="mongodb://localhost:27017/mProject"
const validate =require("../functions/validation")
const cryptoPassword =require("../functions/cryptoPassword")
let userShema =mongoose.Schema({
    email :String ,
    password :String
})
const User = mongoose.model("user",userShema)

router.get('/', function(req, res, next) {
    res.render('login',
        {
            title: 'login',
            error:""
        }
    );
});

router.post("/",body_parser.urlencoded({extended:true}),(req,res,next)=>{
    let email=req.body.email
    let password = req.body.password
     if (validate.validateEmail(email) ){
        res.render('login',{
            error :validate.validateEmail(email),
            title:"login"
        })
    }
      else if (validate.validatePassword(password)){
        res.render('login',{
            error :validate.validatePassword(password),
            title:"login"
        })
    }else {
         password=cryptoPassword.hashPassword(password)
         mongoose.connect(DB_URL,{useNewUrlParser:true, useUnifiedTopology: true},(err)=>{
             User.find(
                 {
                     email : email,
                     password:password
                 },(err,users)=>{
                     mongoose.disconnect()
                     if(users.length==1){
                         //console.log("login data "+new Object(users.id))
                         console.log("login data "+JSON.stringify(users._id))

                         users = {
                             email:email,
                             password:password //After hash
                         }
                         res.render('profile',{
                             users :users,
                             title:"profile"
                         })
                     }else{
                         res.render('login',{
                             error :"error email or password",
                             title:"title"
                         })
                     }
                 })
         })
     }//End else
})//End mothod post

module.exports = router;
