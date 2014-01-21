
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var indexpage = require('./routes/index');
var newuser = require('./routes/newuser');
var profile = require('./routes/profile');
var http = require('http');
var path = require('path');
var swig = require('swig');
var app = express();

// all environments
app.set('port',  process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.set('ipaddress',  process.env.OPENSHIFT_NODEJS_IP);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', indexpage.index);
app.get('/register', newuser.register);
app.get('/login', newuser.login);
app.get('/emailverify', newuser.emailVerify);
app.get('/passwordreset', newuser.passwordReset);
app.get('/user/:username', profile.profilePage);
app.post('/register', newuser.addUser);
app.post('/login', newuser.newLogin);
app.get('/*', indexpage.fourOFour);
http.createServer(app).listen(app.get('port'), app.get('ipaddress'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
