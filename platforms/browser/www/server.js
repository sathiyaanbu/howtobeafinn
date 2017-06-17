var express = require('express');
var nodemailer = require('nodemailer');
var app = express();
var session=require('express-session');

var mysql = require('mysql');
var async = require('async');
var crypto = require('crypto');
// var fs = require('fs');

// var app = express.createServer();
 
// app.use(express.static(__dirname));
// app.use(require('sesame')()); // for sessions 
 
// var forgot = require('password-reset')({
//     uri : 'http://localhost:5500/password_reset',
//     from : 'password-robot@localhost',
//     host : 'localhost', port : 25,
// });
// app.use(forgot.middleware);


// var smtpTransport = nodemailer.createTransport({
//     service: 'gmail',
//     host: 'smtp.gmail.com',
//     port: 587,
//     auth: {
//         user: 'gangarani.k@gmail.com',
//         pass: 'intrawebr'
//     },
//     tls: {rejectUnauthorized: false},
//     debug:true
// });


var cryptojs = require("crypto-js");
// var io = require('socket.io')(http);
var connection = mysql.createConnection({

  host     : 'localhost',
  port      : 8889,
  user     : 'root',
  password : 'root',
  database : 'test',
  socket    :'/Applications/MAMP/tmp/mysql/mysql.sock'
});
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

  var sess;
//connection.connect();

connection.query('SELECT * from students1', function(err, rows, fields) {
  if (!err)
    console.log('The solution is: ', rows);
  else
    console.log('Error while performing Query.');
});
app.use('/node_modules',  express.static(__dirname + '/node_modules'));

app.use('/css',  express.static(__dirname + '/css'));

app.use('/js',  express.static(__dirname + '/js'));

app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));

app.get('/', function(req, res){

sess=req.session;  
sess.username;

if(sess.username)  
    {  
        res.sendFile('home.html',{'root': __dirname + '/temp'});
    }  
    else{  
    res.sendFile('login.html',{'root': __dirname + '/temp'}); 
    }  

  console.log(req.body);
    
});



app.get('/showSignInPage',function(req,res){
    res.sendFile('login.html',{'root': __dirname + '/temp'});
});





app.get('/showSignupPage',function(req,res){
    res.sendFile('sign_up.html',{'root': __dirname + '/temp'});
});



app.get('/forgot',function(req,res){
    res.sendFile('forgot.html',{'root': __dirname + '/temp'});
});


app.get('/index',function(req,res){


sess=req.session;  
    if(sess.username)      
    {   
        //res.render('lg.html');  
        res.sendFile('home.html',{'root': __dirname + '/temp'});
        res.write('<h1>Hello '+sess.username+'</h1><br>');  
        res.end('<a href='+'/logout'+'>Logout</a>');  
    }  
    else  
    {  
        res.write('<h1>Please login first.</h1>');    
        res.end('<a href='+'/'+'>Login</a>');    
    }    



    // res.sendFile('home.html',{'root': __dirname + '/temp'});
});

 
   
app.post('/verifyuser', function(req,res){
   sess=req.session; 
    sess.username=req.body.username;
    console.log('checking user in database');
    console.log(req.body);
    var username = req.body.username;
        var password = req.body.password;
    var passhash = cryptojs.SHA256(username + 'howtobeafinnsalt' + req.body.password);
    passhash = passhash.toString(cryptojs.enc.Hex);
    console.log(username);
    console.log(password);
    var selectString = 'SELECT username FROM students1 WHERE username="'+username+'" AND password="'+passhash+'" ';

    connection.query(selectString, function(err, results) {

        console.log(results);

    if (results.length > 0 ) {
        // res.write('ok');
        res.redirect(303, '/index');
    }
    else {
        // res.write('not ok');
            res.redirect(303, '/showSignInPage');
            responseJson = { error: 'Invalid password' }
             res.write('<h1>Hello '+sess.username+'</h1><br>'); 
    }

    // res.end();
   });
});



app.post('/counting', function(req, res){


  var results = req.body.result;
  var place_name= req.body.kortepohja;
       console.log(req.body.result); 

 var query = 'UPDATE users SET count="'+results+'", Place_name="'+place_name+'" WHERE Place_name="'+place_name+'"';
 connection.query(query, function(err, result) {
             if(err) {
                console.log(err);
              }         
              else{
                console.log('record Updated');
            }
});

});

app.get('/logout',function(req,res){    
    req.session.destroy(function(err){  
        if(err){  
            console.log(err);  
        }  
        else  
        {  
            res.redirect('/');  
        }  
    });  

});  




app.get('/send',function(req,res){
    var mailOptions={
        to : req.query.to,
        subject : req.query.subject,
        text : req.query.text
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.end("error");
     }else{
            console.log("Message sent: " + response.message);
        res.end("sent");
         }
});
});


/*
 
app.post('/forgot', express.bodyParser(), function (req, res) {
    var email = req.body.email;
    var reset = forgot(email, function (err) {
        if (err) res.end('Error sending message: ' + err)
        else res.end('Check your inbox for a password reset message.')
    });
    
    reset.on('request', function (req_, res_) {
        req_.session.reset = { email : email, id : reset.id };
        fs.createReadStream(__dirname + '/forgot.html').pipe(res_);
    });
});
*/
/*


app.post('/forgot', function(req, res, next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
          req.flash('error', 'No account with that email address exists.');
          return res.redirect('/forgot');
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      var smtpTransport = nodemailer.createTransport('SMTP', {
        service: 'SendGrid',
        auth: {
          user: '!!! YOUR SENDGRID USERNAME !!!',
          pass: '!!! YOUR SENDGRID PASSWORD !!!'
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'passwordreset@demo.com',
        subject: 'Node.js Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
    res.redirect('/forgot');
  });
});*/




app.post('/register', function(req,res){
    var username = req.body.username;
      console.log(req.body); 
 var password = req.body.password;
    var passhash = cryptojs.SHA256(username + 'howtobeafinnsalt' + req.body.password);
    passhash = passhash.toString(cryptojs.enc.Hex);

 var selectString1 = 'INSERT INTO students1 (username,email,password,conformpass,profilepic) VALUES ("'+req.body.username+'","'+req.body.email+'", "'+passhash+'","'+req.body.conformpass+'","'+req.body.newPath+'")' ;

    

connection.query("SELECT 1 FROM students1 WHERE username = '"+username+"' ORDER BY username LIMIT 1", function (error, results, fields) {
if (error) {
    console.log(error);
    // socket.write("fail internal error"+"\r\n");
}
if (results.length  > 0) {
    console.log('fail');
    // socket.write("fail user already exists"+"\r\n");

} else {



           
             
connection.query(selectString1, function(err, results) {
             if(err) {
                console.log(err);
                
              }         
              else{
                
                 res.redirect(303, '/showSignInPage');
    

            }

/*
        //this is a walkaround of checking if the email pass combination is 1 or not it will fail if wrong pass is given
           if (results.length > 0 ) {
        // res.write('ok');
        res.redirect(303, '/showSignInPage');
    }
     if (results.length < 0 ) {
        // res.write('not ok');
            res.redirect(303, '/index');
    }*/
});

}

});
});

app.listen(process.env.PORT || 5500, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});