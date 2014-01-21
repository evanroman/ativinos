//Makes hashes of passwords
crypto = require('crypto');
//set bit lenght of random gen
var randombitlength=32;
var randomhexbitlength=48;
var passwordhashingalgorithm='sha224'
var randomBits = function (){
    //try entropy mining 
    try {
        //define buff with entropy mining crypto lib
        var buf = crypto.randomBytes(randombitlength);
        //return entropy mining crypto bitvalue
        var buf64 = new Buffer(buf).toString('base64');
        return buf64;
    } catch (ex) {
    // handle error
    // most likely, entropy sources are drained, use psuedorandom
        var muf = crypto.pseudoRandomBytes(randombitlength);
        var muf64 = new Buffer(muf).toString('base64');
        return muf64;
    }
}
var randomHexBits = function (){
    //try entropy mining 
    try {
        //define buff with entropy mining crypto lib
        var buf = crypto.randomBytes(randomhexbitlength);
        //return entropy mining crypto bitvalue
        var buf64 = new Buffer(buf).toString('hex');
        return buf64;
    } catch (ex) {
    // handle error
    // most likely, entropy sources are drained, use psuedorandom
        var muf = crypto.pseudoRandomBytes(randomhexbitlength);
        var muf64 = new Buffer(muf).toString('hex');
        return muf64;
    }
}
var saltUtfPasswordToBase64 = function(password, salt64){
    var password64 = new Buffer(password).toString('base64');
    var saltedpassword64 = salt64 + password64;
    return saltedpassword64;
} 
//hasher
//SALTED PASSWORDS WILL BE SALT + PASSWORD,
// base64 before input to this function
var passwordHasher64before = function(password) {
    //set encoding of input
    //var pw_base64_buffer = new Buffer(password).toString('base64');
    // change to 'md5' if you want an MD5 hash
    var hasher = crypto.createHash(passwordhashingalgorithm);
    // change to 'binary' if you want a binary hash.
    //hasher.setEncoding('binary');
    // the text that you want to hash
    hasher.write(password);
    var hashed_password = hasher.digest('hex');
    return hashed_password;
}

//export to be called seperately
exports.randomHexBits = randomHexBits;
exports.randomBits = randomBits;
exports.passwordHasher64before = passwordHasher64before;
exports.saltUtfPasswordToBase64 = saltUtfPasswordToBase64;
