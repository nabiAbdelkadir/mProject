const  express = require('express');
const  router = express.Router();
const upload =require("express-fileupload")

router.get('/', function(req, res, next) {
    res.render('upload',
        {
            title: 'upload'
        }
    );
});
router.use(upload())
router.post("/",(req,res,next)=>{
    if(req.files){
        limits: {
            fileSize: 2 * 1024 * 1024 * 1024 //2MB max file(s) size
        }
        console.log(req.files)
        var file=req.files.file //name in html file
        var fileName =file.name

        //console.log(fileName)
        file.mv('./uploads/'+fileName,(err)=>{
            if (err){
                res.send(err)
                console.log("error upload file "+err)
            }else {
                res.send("file uploaded ")
            }

        })
    }
})
module.exports = router;
