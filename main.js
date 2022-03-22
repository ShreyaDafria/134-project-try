img = "";
status = "";
objects = [];
alarm = "";
object_name = "";
function preload(){
 
    img = loadImage('dog_cat.jpg');
    alarm= loadSound("alarm_r.mp3");
}

function setup(){
    canvas = createCanvas(380 , 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380 , 380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function modelLoaded() {
    console.log("Model Loaded !!");
    status = true;
    
}
function gotResult(error, results){
    if (error){
        console.log(error);
    }
    console.log(results);
    objects = results;
    object_name = objects[i].label;
    ai = person;
}

function draw() {
    image(video, 0,0, 380, 380);
    
    if(status != "")
    { 
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for (i=0;i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("no_of_objects").innerHTML = "No. Of Object detected are :" + objects.length;
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15 , objects[i].y + 15 );
            noFill();
            stroke(r , g , b);
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
        }
    }

    if(object_name != person)
    {
        document.getElementById("status").innerHTML = "BABY NOT FOUND";
        alarm.play();
        console.log("no baby");
    }
    document.getElementById("status").innerHTML = "BABY FOUND";
    alarm.stop();
    console.log("yes baby");
    
}