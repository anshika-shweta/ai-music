song="";
song1="";
song1status="";
song2status="";
leftwristx=0;
rightwristx=0;
leftwristy=0;
rightwristy=0;
scoreleftwrist=0;
scorerightwrist=0;
function preload(){
song=loadSound("Cupid.mp3");
song1=loadSound("music.mp3");
}
function setup(){
canvas=createCanvas(600,500);
canvas.center();
video=createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on('pose',gotResults);
}
function modelLoaded(){
    console.log("modelLoaded");
}
function gotResults(results){
    if(results.length>0)
    {
        console.log(results);
        scoreleftwrist=results[0].pose.keypoints[9].score;
        scorerightwrist=results[0].pose.keypoints[10].score;
        console.log("scoreleftwrist="+scoreleftwrist);
        console.log("scorerightwrist="+scorerightwrist);
        leftwristx=results[0].pose.leftWrist.x;
        rightwristx=results[0].pose.rightWrist.x;
        leftwristy=results[0].pose.leftWrist.y;
        rightwristy=results[0].pose.leftWrist.y;
        console.log("lx="+leftwristx+"ly="+leftwristy+"rx="+rightwristx+"ry="+rightwristy);
    }
}
function draw(){
image(video,0,0,600,500);
song1status=song.isPlaying();
song2status=song1.isPlaying();
fill("red");
stroke("black");
if(scoreleftwrist>0.2)
{
    circle(leftwristx,leftwristy,20);
    song.stop();
    if(song2status==false){
    song1.play()
    document.getElementById("song").innerHTML="playing-playing music";
   
    }
}
if(scorerightwrist>0.2)
{
    circle(rightwristx,rightwristy,20);
    song1.stop();
    if(song1status==false){
        song.play()
        document.getElementById("song").innerHTML="playing-playing cupid";
       
        }
}
}
function play(){
    song.play();
}