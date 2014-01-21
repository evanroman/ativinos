var validator = require('validator');
var hasher = require('./hasher');
//var namechars = /[a-zA-Z\u00C0-\u1FFF\2E80-\FEFF]+/g;
exports.newUserCheck=function(username, firstname, lastname, email, password, passwordverify){
    var output = {
         validEmail: null,
         validUsername: null,
         validFirstName: null,
         validLastName: null,
         validEmailLength: null,
         validFirstNameLength: null,
         validLastNameLength: null,
         validUsernameLength: null,
         passwordsMatch: null,
         passedValidation:true}
    output.validEmail = validator.isEmail(email);
    output.validUsername = validator.isAlphanumeric(username);
    output.validFirstName = validator.isAlpha(firstname);
    output.validLastName = validator.isAlpha(lastname);
    output.validEmailLength = validator.isLength(email, 5, 254);
    output.validFirstNameLength = validator.isLength(firstname, 1, 30);
    output.validLastNameLength = validator.isLength(lastname, 1, 35);
    output.validUsernameLength = validator.isLength(username, 5, 30);
    output.passwordsMatch = validator.equals(password, passwordverify);
    for(var o in output){ if(!output[o]){output.passedValidation= false;}}
    return output;
}
exports.createNewSaltAndHash= function(password){
    var output={
        hash: null,
        salt: null}
    output.salt = hasher.randomBits();
    var saltedpassword64 = hasher.saltUtfPasswordToBase64(password, output.salt);
    output.hash = hasher.passwordHasher64before(saltedpassword64);
    return output;
}
exports.newLoginCheck=function(userxemail){
    var output = {
        validEmail:null,
        validUsername:null,
        validUsernameLength:null,
        validEmailLength:null}
    output.validEmail = validator.isEmail(userxemail);
    output.validUsername = validator.isAlphanumeric(userxemail);
    output.validEmailLength = validator.isLength(userxemail, 5, 254);
    output.validUsernameLength = validator.isLength(userxemail, 5, 30);
    return output;
}
exports.hashCheck = function(password, salt, hash){
    var salted = hasher.saltUtfPasswordToBase64(password, salt);
    var newhash = hasher.passwordHasher64before(salted);
    return validator.equals(newhash, hash);
}
exports.createNewToken = function(){
    return hasher.randomHexBits();
}
exports.emailCheck = function(email){
    var output = false;
    if(validator.isLength(email, 5, 254) && validator.isEmail(email)){
        var output = true;
    }
    return output;
}

