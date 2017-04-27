var express = require('express');
var app = express();
var mysql = require('mysql');
var cryptojs = require("crypto-js");
var connection = mysql.createConnection({


  host: 'localhost',
  port: '5000',
  user: 'b0334abf83c266',
  password: '49a52da7',
 
  database: 'heroku_4b8e16da2cf1943'
 
});
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

  
//connection.connect();

connection.query('SELECT * from login', function(err, rows, fields) {
  if (!err)
    console.log('The solution is: ', rows);
  else
    console.log('Error while performing Query.');
});
app.use('/node_modules',  express.static(__dirname + '/node_modules'));

app.use('/css',  express.static(__dirname + '/css'));
app.get('/', function(req, res){
  console.log(req.body);
    res.sendFile('login.html',{'root': __dirname + '/html'});
});



app.get('/showSignInPage',function(req,res){
    res.sendFile('login.html',{'root': __dirname + '/temp'});
});



app.get('/index',function(req,res){
    res.sendFile('login.html',{'root': __dirname + '/html'});
});


app.post('/verifyuser', function(req,res){
    var username = req.body.username;
    
    var selectString = 'SELECT COUNT(username) FROM login WHERE username="'+req.body.username+'" AND password="'+req.body.password+'" ';

  connection.query(selectString, function(err, results) {
    
        console.log(results);
        var string=JSON.stringify(results);
        console.log(string);



 if (string === '[{"COUNT(username)":1}]') {
      res.redirect(303, '/index');
  
          }
        if (string === '[{"COUNT(username)":0}]')  {
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

});

app.listen(5000);
