  var app = angular.module('myapp',[]);

        app.controller('myCtrl', function($scope,$http){
        $scope.student={};

          $scope.submit = function(studentinfo){
    /* processData:false why do you need this? */
    /* I can see the code behind this $interval */
        console.log("triggering post");
        $http({method:"post", url:"http://localhost:5500", data:studentinfo})
            .then(function(data){
                /* Success callback */
                console.log("success");
            },function(err){
                /* Failure callback */
                console.log("failed");
            });
    };
});







/*var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
app.use(bodyParser.json());       
app.use(bodyParser.urlencoded({extended: true}));

var http = require("http");
var path = require("path");
const uuid = require('node-uuid');
var connection = mysql.createConnection({
	host: 'localhost',
	port: '8889',
	user: 'root',
	password: 'root',
	socket: '/Applications/MAMP/tmp/mysql/mysql.sock',
	database: 'login_db',
});
connection.connect(function(error){
	if(!error){
		console.log('connected');
	}else{
		console.log(error);
	}
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/angular"));


app.get('/', function(req, res){
	console.log(req.body);
    res.sendFile(__dirname + '/' + 'registration.html');
});

app.post('/', function(req, res) {
  
    console.log(req.body); 
const uploadImage = (req, res, next) => {
	   if(req.files && req.files.image) {
		 // Create a new unique name for the image
       	 var filename =  uuid.v1() + 
						  path.extname(req.files.image.name);
		// Update the path of the image
        var newPath = path.resolve(__dirname, '../images/') + '/' + 			
					   filename;
        fs.readFile(req.files.image.path, function (err, data) {
         if(err) {
           res.status(500);
		    res.send(err);
         }
         else {
           fs.writeFile(newPath, data, function (err) {
             if(err) {
               res.status(500);
				res.send(err);
             }
             else {


	connection.query('insert into login (username,email,password,conformpass,profilepic) VALUES ("'+req.body.username+'","'+req.body.email+'", "'+req.body.password+'","'+req.body.conformpass+'","'+req.body.newPath+'")', function(err,res,fields){

		if(!err) { 
		
         				console.log('record inserted');
      				}					
      				else{
        				console.log(err);
    				}
  					 });
				}
			});
		}
		});
    	}
}
});
app.listen(8088);






*/