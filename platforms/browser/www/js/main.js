 //splash screen
setTimeout(function() {
    document.getElementById("splash").style.visibility= "hidden";
}, 2000);

//js for everyday elements


//--------------------------------------introduction----------------------------------
var slideIndex_0 = 1;
var slideIndex_1 = 1;
var slideIndex_2 = 1;
var slideIndex_3 = 1;
var slideIndex_4 = 1;
var slideIndex_5 = 1;
var slideIndex_6 = 1;

showSlides_0(slideIndex_0);
showSlides_1(slideIndex_1);
showSlides_2(slideIndex_2);
showSlides_3(slideIndex_3);
showSlides_4(slideIndex_4);
showSlides_5(slideIndex_5);
showSlides_6(slideIndex_6);

function plusSlides_0(s) {
  showSlides_0(slideIndex_0 += s);
}
function plusSlides_2(s) {
  showSlides_0(slideIndex_2 += s);
}
function plusSlides_1(s) {
  showSlides_1(slideIndex_1 += s);
}
function plusSlides_5(s) {
  showSlides_5(slideIndex_5 += s);
}
function plusSlides_6(s) {
  showSlides_6(slideIndex_6 += s);
}
   
  function play(){
       var audio = document.getElementById("audio");
       audio.play();
                 }

function showSlides_5(s) {
  var i0;
  var slides_0 = document.getElementsByClassName("card-bg ");
  
  for (i0 = 0; i0 <= 7; i0++) {
    slides_0[i0].style.display = "none";  

  slides_0[slideIndex_5-1].style.display = "block";
 
 }

}  

function showSlides_6(s) {
  var i0;
  var slides_0 = document.getElementsByClassName("card-bg ");
  
  for (i0 = 0; i0 <= 13; i0++) {
    slides_0[i0].style.display = "none";  

  slides_0[slideIndex_6-1].style.display = "block";
 
 }

}  


function showSlides_0(s) {
  var i0;
  var slides_0 = document.getElementsByClassName("box mySlides");
  
  for (i0 = 0; i0 <= 7; i0++) {
    slides_0[i0].style.display = "none";  

  slides_0[slideIndex_0-1].style.display = "block";
 
 }

}  


function plusSlides_3(s) {
  showSlides_3(slideIndex_3 += s);
}

function showSlides_3(s) {
  var i0;
  var slides_0 = document.getElementsByClassName("box mySlides");
  
  for (i0 = 0; i0 <= 7; i0++) {

    slides_0[i0].style.display = "none";  


  slides_0[slideIndex_3-1].style.display = "block";
 
 }

}  

function showSlides(s) {
  var i;
  var slides = document.getElementsByClassName("box mySlides");
  
  for (i = 0; i <= 7; i++) {
    slides[i].style.display = "none";  

  slides[slideIndex-1].style.display = "block";
 
 }

}  


function showSlides_1(s) {
  var i0;
  var slides_0 = document.getElementsByClassName("box mySlides");
  
  for (i0 = 0; i0 < 6; i0++) {
    slides_0[i0].style.display = "none";  

   
  slides_0[slideIndex_1-1].style.display = "block";
 }
}  


function plusSlides_2(s) {
  showSlides_2(slideIndex_2 += s);
}

function showSlides_2(s) {
  var i0;
  var slides_0 = document.getElementsByClassName("box mySlides");
  
  for (i0 = 0; i0 < 14; i0++) {
    slides_0[i0].style.display = "none";  

   
  slides_0[slideIndex_2-1].style.display = "block";
 }

}  


function plusSlides_4(s) {
  showSlides_4(slideIndex_4 += s);
}

function showSlides_4(s) {
  var i0;
  var slides_0 = document.getElementsByClassName("box mySlides");
  
  for (i0 = 0; i0 <= 5; i0++) {

    slides_0[i0].style.display = "none";  


  slides_0[slideIndex_4-1].style.display = "block";
 
 }

}  


function incr0() { 
var v0=document.getElementById('p0').value;

document.getElementById("p0").value= v0 + 14.2;
   }

function incr1() { 
var v1=document.getElementById('p1').value;

document.getElementById("p1").value= v1 + 7.84;
   }

   function incr2() { 
var v1=document.getElementById('p2').value;

document.getElementById("p2").value= v1 + 20.00;
   }


function todo_0(){
     // plusSlides_5(1);
    plusSlides_0(1);  
    incr0();
    play();

    }

function todo_1(){
     play(); 
    plusSlides_1(1);  
    incr2();
    }

function todo(){
     play(); 
    plusSlides_0(1);  
    incr0();
    }

    function todo_2(){
     // plusSlides_6(1);   
    plusSlides_2(1);  
    incr1();
    play();
    }


    function todo_3(){
      
    plusSlides_3(1);  
    incr0();
    play();
    }
function todo_4(){
      
    plusSlides_4(1);  
    incr2();
    play();
    }


//  ----------------------------quiz----------------------------------------

    function submitQuiz() {
      alert('submitted and tap continue');


    // get each answer score
        function answerScore (qName) {
            var radiosNo = document.getElementsByName(qName);

            for (var i = 0, length = radiosNo.length; i < length; i++) {
                if (radiosNo[i].checked) {
            // do something with radiosNo
                    var answerValue = Number(radiosNo[i].value);
                }
            }
            // change NaNs to zero
            if (isNaN(answerValue)) {
                answerValue = 0;
            }
            return answerValue;
        }

    // calc score with answerScore function
        var calcScore = (answerScore('q1') + answerScore('q2') + answerScore('q3') + answerScore('q4')+ answerScore('q5'));
        console.log("CalcScore: " + calcScore); // it works!

    // function to return correct answer string
        function correctAnswer (correctStringNo, qNumber) {
            console.log("qNumber: " + qNumber);  // logs 1,2,3,4 after called below
            return ("The correct answer for question " + qNumber + ": &nbsp;<strong>" +
                (document.getElementById(correctStringNo).innerHTML) + "</strong>");
            }

    // print correct answers only if wrong (calls correctAnswer function)
        if (answerScore('q1') === 0) {
            document.getElementById('112').innerHTML = correctAnswer('correctString1', 1);
        }
        if (answerScore('q2') === 0) {
            document.getElementById('R-kioski').innerHTML = correctAnswer('correctString2', 2);
        }
        if (answerScore('q3') === 0) {
            document.getElementById('Yes. Tap water is totally clean and ecological').innerHTML = correctAnswer('correctString3', 3);
        }
        if (answerScore('q4') === 0) {
            document.getElementById('Coffee').innerHTML = correctAnswer('correctString4', 4);
        }
        if (answerScore('q5') === 0) {
            document.getElementById('Firm hand shake').innerHTML = correctAnswer('correctString5', 5);
        }

    // calculate "possible score" integer
        var questionCountArray = document.getElementsByClassName('question');

        var questionCounter = 0;
        for (var i = 0, length = questionCountArray.length; i < length; i++) {
            questionCounter++;
        }

    // show score as "score/possible score"
        var showScore = "Your Score: " + calcScore +"/" + questionCounter;


    // if 4/4, "perfect score!"
        if (calcScore === questionCounter) {
            showScore = showScore + "&nbsp; <strong>Perfect Score!</strong>"
        };
        document.getElementById('userScore').innerHTML = showScore;
       
    }
function play1(){
       var audio1 = document.getElementById("audio1");
       audio1.play1();
                 }
    
function bothfn() {
  submitQuiz();
  todo_4();
  play1();
}
$(document).ready(function() {

    $('#submitButton').click(function() {
        $(this).addClass('hide');
    });
    
});


//---------menubar---------------------------------
function dropdown_option() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var ii;
    for (ii = 0; ii < dropdowns.length; ii++) {
      var openDropdown = dropdowns[ii];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
//---------signup---------------------------------

$("#signup").click(function(){
var fullname=$("#fullname").val();
var email=$("#email").val();
var password=$("#password").val();
var dataString="fullname="+fullname+"&email="+email+"&password="+password+"&signup=";
if($.trim(fullname).length>0 & $.trim(email).length>0 & $.trim(password).length>0)
{
$.ajax({
type: "POST",
url: url,
data: dataString,
crossDomain: true,
cache: false,
beforeSend: function(){ $("#signup").val('Connecting...');},
success: function(data){
if(data=="success")
{
alert("Thank you for Registering with us! you can login now");
}
else if(data="exist")
{
alert("Hey! You alreay has account! you can login with us");
}
else if(data="failed")
{
alert("Something Went wrong");
}
}
});
}return false;
});

