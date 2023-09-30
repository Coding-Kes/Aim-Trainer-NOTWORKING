x = 0;
y = 0;

screen_width = 0;
screen_height = 0;

target = "";
speak_data = "";
to_number = 0;

draw_target = "";

var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();

function preload()
{
   target = loadImage("Target.png");
}

function start()
{
  document.getElementById("status").innerHTML = "System is listening please speak";  
  recognition.start();
} 
 
recognition.onresult = function(event) 
{

 console.log(event); 

 content = event.results[0][0].transcript;

    document.getElementById("status").innerHTML = "The speech has been recognized: " + content; 

    to_number = Number(content);
    if(Number.isInteger(to_number))
    {
      document.getElementById("status").innerHTML = "Started drawing Target";
      draw_target = "set";
    }
    else
    {
      document.getElementById("status").innerHTML = "The speech has not recognized a number";
    }
}

function setup() 
{
  screen_width = window.innerWidth;
  screen_height = window.innerHeight;

  canvas = createCanvas(screen_width, screen_height -150);
  canvas.position(0, 175);
}

function draw() 
{
  if(draw_target == "set")
  {
    for(var i = 1; i<= to_number; i++)
    {
      x = Math.floor(Math.random()*1400);
      y = Math.floor(Math.random()*490);
      image(target, x, y, 50, 50);
    }
    document.getElementById("status").innerHTML = to_number + " Targets drawn";
    draw_target = "";
    speak_data = to_number+"Targets Drawn"; 
    speak();
  }
}

function speak()
{
    var synth = window.speechSynthesis;

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);

    speak_data = "";
}




