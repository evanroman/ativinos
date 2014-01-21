// mailer.js
var nodemailer = require('nodemailer');
var smtpTransport = nodemailer.createTransport("SMTP", {
    service: "Mandrill",
    debug: true,
    auth: {
        user: "evanroman1@gmail.com",
        pass: "k-AdDVcsNJ9oj8QYATVNGQ"
    }
});
exports.sendEmailConfirmation = function(emailaddress, username, firstname, expiremoment, token){
    var mailOptions = {
        from: "confirm@ativinos.com", // sender address
        to: emailaddress, // list of receivers
        subject: "Confirm email and start Ativinos", // Subject line
        text: 'Hi '
        +firstname+
        ', your account, '
        +username+
        ', will be enabled after you confirm your email. Your account will be deleted by '
        + expiremoment + 
        ' if you do not verify email before then. To verify your email, visit http://www.ativinos.com/emailverify?token=' 
        + token +
        '&username='
        + username, 
        html: 'Hi '
        +firstname+
        ', your account, '
        +username+
        ', will be enabled after you confirm your email. Your account will be deleted by '
        + expiremoment + 
        ' if you do not verify email before then. To verify your email, visit <a href="http://www.ativinos.com/emailverify?token=' 
        + token +
        '&username='
        + username +
        '">http://www.ativinos.com/emailverify?token='
        + token +
        '&username='
        + username +
        '</a>', 
    }
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }
    })
} 
