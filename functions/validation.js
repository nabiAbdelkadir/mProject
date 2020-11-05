function validateUsername (username){
    if(username.length==0){
        return "username is required"
    }
    return ""
}
function validateEmail (email){
    if(email.length==0){
        return "email is required"
    }
    return ""
}
function validatePassword(password){
    if (password.length==0){
        return "password is required"
    }
    return ""
}
exports.validateUsername=validateUsername;
exports.validateEmail=validateEmail;
exports.validatePassword=validatePassword;
