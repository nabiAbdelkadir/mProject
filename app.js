const express =require("express")
const puth =require("path")//get puth files

const app =express()
const MongoClient=require("mongodb").MongoClient
app.use(express.static(puth.join(__dirname , 'assets')))//using for static files
app.use(express.static(puth.join(__dirname , 'images')))

const homeRouter =require('./routes/index')
const loginRouter =require("./routes/login")
const registerRouter =require("./routes/register")
const profileRouter =require("./routes/profile")
const uploadRouter =require("./routes/upload")
const testRouter =require("./routes/test")
//use template engine
app.set('view engine', 'ejs')
app.set('views', 'views');//default folder 

//routing ..
app.use("/",homeRouter)
app.use("/login",loginRouter)
app.use("/register",registerRouter)
app.use("/profile",profileRouter)
app.use("/upload",uploadRouter)
app.use("/test",testRouter)

//routing ..



app.get('/users',(req,res,next )=>{
    MongoClient.connect("mongodb://localhost:27017",(err ,clientResult)=>{
        console.log("connected to database ...")
        let db =clientResult.db("mProject")//database name
        db.collection("users").insertOne({
            email :"nabi@gmail.com",
            password :"1231"
        }).then(result=>{
            console.log("result :: " +result)
            res.redirect("/")//return to home page ;
        })
        clientResult.close()
    })//End connect
   // res.send("hello nabi");
});
app.get('/home',(req,res,next )=>{
    res.redirect("/")
});
app.get("/eroor404",(req,res,next)=>{
    res.render("notFound",{
        title :"Eroor 404"
    })
})


app.use((req,res)=>{
    res.redirect('/eroor404')

 })
//Create server 
const port =3000;
app.listen(port,(err)=>{
    console.log("start server port "+port)
});
