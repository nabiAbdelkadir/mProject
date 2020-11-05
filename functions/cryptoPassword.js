const crypto=require("crypto")
const md5 =require("md5")
function hashPassword(password){
    password="5fa123fbedc" +password + "5fa123fbedcf5"
    console.log("solt passowrd " +password)
    password = md5(password)
    md5(password)
    console.log("ms5  passowrd " +password)
    const hash = crypto.createHash('sha256').update(password).copy().digest("hex")
    return hash
}
exports.hashPassword=hashPassword