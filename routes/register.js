var express = require('express');
var router = express.Router();

const body_parser=require("body-parser")
const mongoose=require("mongoose")
const DB_URL ="mongodb://localhost:27017/mProject"
const validate =require("../functions/validation")
const cryptoPassword =require("../functions/cryptoPassword")

let userShema =mongoose.Schema({//TABLE
    username :String,
    email :String ,
    password :String,
    originalPassword :String
})
const User = mongoose.model("users",userShema)//name collection in database

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('register',
        {
            error:"",
            title: 'register'
        }
    );
});

router.post("/",body_parser.urlencoded({extended:true}),(req,res,next)=>{
    let username =req.body.username
    let email =req.body.email
    let password =req.body.password
    let confirm_password =req.body.confirm_password

    if (validate.validateUsername(username)){
        res.render('register',{
            error :validate.validateUsername(username),
            title:"register"
        })
    }
    if (validate.validateEmail(email)){
        res.render('register',{
            error :validate.validateEmail(email),
            title:"register"
        })
    }
   else if (validate.validatePassword(password)){
        res.render('register',{
            error :validate.validatePassword(password),
            title:"register"
        })
    }else  if (password!=confirm_password){
        res.render('register',{
            error :"confirme password",
            title:"register"
        })
    }
    else {
        let originalPassword =password
        password=cryptoPassword.hashPassword(password)
        mongoose.connect(DB_URL,{useNewUrlParser:true,useUnifiedTopology: true},(err)=>{
            console.log("connected to database")
            let newUser =new User({
                username :username,
                email :email,
                password :password,
                originalPassword:originalPassword
            })
            newUser.save((err,result)=>{
                console.log("insert "+result)
                mongoose.disconnect()
                let  users = {
                    username:username,
                    email :email,
                    password: password
                }
                res.render('profile',{
                    users:users,
                    title:"profile",
                    error:""
                })
            })
        })
    }
})//End mothod post

module.exports = router;

