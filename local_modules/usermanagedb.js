var mongojs = require('mongojs');
var connection_string = '127.0.0.1:27017/nodejs';
    // if OPENSHIFT env variables are present, use the available connection info:
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
    connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
    process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
    process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
    process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
    process.env.OPENSHIFT_APP_NAME;
}
var db = mongojs(connection_string, ['userregistry','sessionstore'])
//input:Email, Output:pw:$passwordhash, s:$salt

exports.emailInDB = function(email, callback){
    db.userregistry.count({e: email}, function(err, counted) {
        if(err) throw err;
        callback(counted)
    });
}
exports.usernameInDB = function(username, callback){
    db.userregistry.count({_id: username}, function(err, counted) {
        if(err) throw err;
        callback(counted)
    });
}
exports.emailtokenInDB = function(token, username, callback){
    db.userregistry.count({et: token, _id: username}, function(err, counted) {
        if(err) throw err;
        callback(counted)
    });
}
exports.emailInPasswordOut = function(email, callback){
    db.userregistry.findOne({e: email}, {ph: 1, s: 1, et: 1}, (function(err, response){
        if(err) throw err;
        callback(response);
    })
)};

exports.usernameInPasswordOut = function(username, callback){
    db.userregistry.findOne({_id: username}, {ph: 1, s: 1, et: 1}, (function(err, response){
        if(err) throw err;
        callback(response);
    })
)};
exports.addNewUser = function(username, firstname, lastname, email, passwordhash, salt, deletetime, emailtoken){
    db.userregistry.save({_id: username, e: email, ph: passwordhash, s: salt, fn: firstname, ln: lastname, dt: deletetime, et: emailtoken}, function(err, saved) {
        if(err) throw err;
    });
}
exports.deleteTokenAndDate = function(username){
    db.userregistry.update({_id: username},{ $unset: {dt: "", et: ""}}, function(err, saved) {
        if(err) throw err;
    })
}

