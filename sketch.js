//input your port on line 12, OR delete this and copy the starter code from the P5.serialcontrol application

//serial control setup

let serial;
let latestData = "waiting for data";

//variable setup

let gyro; 
let X = 30; 

//ball info

var ballX;
var ballY;
var ballRadius = 10;

var ballSpeed = 2;
var ballDirectionX = -1;
var ballDirectionY = -1;


//player 1 setup
var playerX = 10;
var playerY= 250;

//player 2 / cpu setup
var p2X =890;
var p2Y = 250;
var p2Speed = 5;


//player size stuff
var playerWidth = 20;
var playerHeight = 100;
var playerSpeed = 4;


//score tracking
var playerScore = 0;
var p2Score = 0;

//screens
var stage = 0;



function setup() {
  createCanvas(900,500);
  
  //initial ball placement
  rectMode(CENTER);
  ballX = width/2;
  ballY = height/2; 
  
  textAlign(CENTER);
 


 serial = new p5.SerialPort();

 serial.list();
 serial.open('COM6');

 serial.on('connected', serverConnected);

 serial.on('list', gotList);

 serial.on('data', gotData);

 serial.on('error', gotError);

 serial.on('open', gotOpen);

 serial.on('close', gotClose);
  
  

}



function serverConnected() {
 print("Connected to Server");
}

function gotList(thelist) {
 print("List of Serial Ports:");

 for (let i = 0; i < thelist.length; i++) {
  print(i + " " + thelist[i]);
 }
}

function gotOpen() {
 print("Serial Port is Open");
}

function gotClose(){
 print("Serial Port is Closed");
 latestData = "Serial Port is Closed";
}

function gotError(theerror) {
 print(theerror);
}

function gotData() {
 let currentString = serial.readLine();
  trim(currentString);
 if (!currentString) return;
 console.log(currentString);
 latestData = currentString;
  
  console.log(currentString);
  
  //let sensorArray = split(currentString, ",");
}

function draw(){
  if(stage == 0){
    welcomeScreen();
  }
  
  if(stage==1){
    pong();
  }
  
  if(stage ==2){
    playerWins();
  }
  
  if(stage == 3){
    p2Wins();
  }
  
  if(mouseIsPressed == true){
    stage = 1;
  }
  
}

function welcomeScreen(){
  background(0);
  fill(255);
  textSize(150);
  
  text('precarious pong', width/2, 50);
  
  textSize(50);
  text('click mouse to start', width/2, 250)
}

function playerWins(){
  background(0);
  fill(255);
  textSize(100);
  
  text('you win!', width/2, 50);
  
    textSize(30);
  
  text('refresh to try again', width/2, 250);
  
  
}

function p2Wins(){
  background(0);
  fill(255);
  textSize(100);
  
  text('cpu won! game over!', width/2, 200);
  
  textSize(30);
  
  text('refresh to try again', width/2, 250);
  
  
}

function pong(){
  
  keyTyped();
  gyroMove();
  moveCPU();
  checkCollision();
  
  background(0); 
  
  //drawing the ball so we can see it
  fill(255);
  //noStroke();
  
  //center line
  line(450, 0, 450, height);
  stroke(255);
  strokeWeight(2);
  
  rect(ballX, ballY, ballRadius, ballRadius);
  
 // let mappedGyro = map(gyro, -250, 0, 250);
 // print(mappedGyro);
  
  //draw paddles
  rect(playerX, playerY, playerWidth, playerHeight);
  rect(p2X, p2Y, playerWidth, playerHeight);
  
  
  //ball physics
  ballX = ballX + (ballDirectionX*ballSpeed);
  ballY = ballY + (ballDirectionY*ballSpeed);
  
  //scoreboard
  textSize(12);
  text(playerScore, 400, 25);
  text(p2Score, 500, 25)
  
  //update score
  if(ballX <= 0){
    p2Score = p2Score + 1;
    ballX = width/2;
    ballY = height/2;
  }
  
    if(ballX >= width){
    playerScore = playerScore + 1;
    ballX = width/2;
    ballY = height/2;
  }
  
  if(playerScore >= 3){
    stage= 2;
  }
  
    if(p2Score >= 3){
    stage= 3;
  }
  

  
  
  //collisions
  
function checkCollision(){
  
  if(ballY >= height){
    ballDirectionY = ballDirectionY * -1;
  }
  
    if(ballY <= 0){
    ballDirectionY = ballDirectionY * -1;
  }
  
  if(ballX >= playerX - 10 && ballX <= playerX + 10 && ballY >= playerY - 50 && ballY <= playerY + 50){
    
     ballDirectionX = ballDirectionX * -1;
  }//hit p1
  
   if(ballX >= p2X - 10 && ballX <= p2X + 10 && ballY >= p2Y - 50 && ballY <= p2Y + 50){
     ballDirectionX = ballDirectionX * -1;
  } //hit p2
}
function gyroMove(){
  
   if (playerY >= height){
    playerY = playerY - 20;
    
  }
  
  if (playerY <= 0 )
    playerY = playerY+ 20;
  }
  
  //gryo player movement
  
    
  if(latestData > 0){
    //set it so that when the gyro is positive, you set keyIsPressed for W to true and make the player paddle move up
    //or you could just make it so you move up when the gyro value is positive idk
    
    playerY = playerY - playerSpeed;
  }
  
   if(latestData < 0){
 
    
    playerY = playerY + playerSpeed;
  }
  
 
  
  
  
} 

function keyTyped(){
  
  
  
  //player movement
  
    
  if(key == 'w' && keyIsPressed){
    //set it so that when the gyro is positive, you set keyIsPressed for W to true and make the player paddle move up
    //or you could just make it so you move up when the gyro value is positive idk
    
    playerY = playerY - playerSpeed;
  }
  
   if(key == 's' && keyIsPressed){
 
    
    playerY = playerY + playerSpeed;
  }
  
  else{
    playerY = playerY;
  }
  
  
  
} 
//cpu movement

function moveCPU(){
  if(ballX > width/2){
    if(p2Y <= ballY){
      p2Y = p2Y + p2Speed;
    }
    
    if(p2Y >= ballY){
      p2Y = p2Y - p2Speed;
    }
    
    
  }
  
}
// function keyPressed(){
//   if(keyCode == UP_ARROW && keyIsPressed){
 
    
//     p2Y = p2Y - playerSpeed;
    
//   }
  
//    if(keyCode == DOWN_ARROW && keyIsPressed){
 
    
//     p2Y = p2Y + playerSpeed;
//   }
// }
