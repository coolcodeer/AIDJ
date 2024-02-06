song=""
leftWristx=0
leftWristy=0
rightWristx=0
rightWristy=0

rightscore=0
leftscore=0
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video, modelloaded);
    poseNet.on('pose',gotPoses);

}
function draw(){
    image(video,0,0,600,500)
    fill("#DC9D00")
    stroke("#DC9D00")
    if(leftscore > 0.2){

        circle(leftWristx, leftWristy, 20);
        left_wrist_y=Number(leftWristy);
        remove_decimals = Math.floor(left_wrist_y);
        volume = remove_decimals/500;
        document.getElementsById("volume").innerHTML = "VOLUME = " + volume;
        song.setVolume(volume);
    }
    if(rightscore > 0.2){
        circle(rightWristx, rightWristy, 20);
        if(rightWristy > 0 && rightWristy <= 100){
            song.rate(0.5)
            document.getElementById("speed").innerHTML="speed = 0.5x"
        }
        else if(rightWristy > 100 && rightWristy <= 200){
            song.rate(1)
            document.getElementById("speed").innerHTML="speed = 1x"
        }
        else if(rightWristy > 200 && rightWristy <= 300){
            song.rate(1.5)
            document.getElementById("speed").innerHTML="speed = 1.5x"
        }
        else if(rightWristy > 300 && rightWristy <= 400){
            song.rate(2.0)
            document.getElementById("speed").innerHTML="speed = 2x"
        }
        else if(rightWristy > 400 && rightWristy <= 500){
            song.rate(2.5)
            document.getElementById("speed").innerHTML="speed = 2.5x"
        }
    }
}

function preload(){
    song=loadSound("music.mp3")
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
    
}

function modelloaded(){
    console.log("poseNet is initialized");
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftWristx = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;

        rightWristx = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;

        rightscore=results[0].pose.keypoints[10].score;
        leftscore=results[0].pose.keypoints[9].score;


    }

}

