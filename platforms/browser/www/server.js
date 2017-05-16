var express = require('express');
var app = express();
var mysql = require('mysql');
var cryptojs = require("crypto-js");
// var io = require('socket.io')(http);
var connection = mysql.createConnection({

  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'test',
  socket    :'/Applications/MAMP/tmp/mysql/mysql.sock'
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

app.use('/js',  express.static(__dirname + '/js'));

app.get('/', function(req, res){
  console.log(req.body);
    res.sendFile('icon.html',{'root': __dirname + '/temp'});
});



app.get('/showSignInPage',function(req,res){
    res.sendFile('login.html',{'root': __dirname + '/temp'});
});





app.get('/showSignupPage',function(req,res){
    res.sendFile('sign_up.html',{'root': __dirname + '/temp'});
});



app.get('/index',function(req,res){
    res.sendFile('icon.html',{'root': __dirname + '/temp'});
});

 
   
app.post('/verifyuser', function(req,res){
    console.log('checking user in database');
    console.log(req.body);
    var username = req.body.username;
        var password = req.body.password;
    var passhash = cryptojs.SHA256(username + 'howtobeafinnsalt' + req.body.password);
    passhash = passhash.toString(cryptojs.enc.Hex);
    console.log(username);
    console.log(password);
    var selectString = 'SELECT username FROM students WHERE username="'+username+'" AND password="'+passhash+'" ';

    connection.query(selectString, function(err, results) {

        console.log(results);

    if (results.length > 0 ) {
        // res.write('ok');
        res.redirect(303, '/index');
    }
    else {
        // res.write('not ok');
            res.redirect(303, '/showSignInPage');
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
app.post('/register', function(req,res){
    var username = req.body.username;
      console.log(req.body); 
 var password = req.body.password;
    var passhash = cryptojs.SHA256(username + 'howtobeafinnsalt' + req.body.password);
    passhash = passhash.toString(cryptojs.enc.Hex);



connection.query("SELECT 1 FROM students WHERE username = '"+username+"' ORDER BY username LIMIT 1", function (error, results, fields) {
if (error) {
    console.log(error);
    // socket.write("fail internal error"+"\r\n");
}
if (results.length  > 0) {
    console.log('fail');
    // socket.write("fail user already exists"+"\r\n");

} else {



           connection.query('INSERT INTO students (username,email,password,conformpass,profilepic) VALUES ("'+req.body.username+'","'+req.body.email+'", "'+passhash+'","'+req.body.conformpass+'","'+req.body.newPath+'")', function(err,res,fields){
             if(err) {
                console.log(err);
              }         
              else{
                console.log('record inserted');
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

app.listen(5500);
