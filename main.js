Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 100
});
camera = document.getElementById("camera");
Webcam.attach(camera);

function take_snapshot(){
    Webcam.snap(function(data_uri){
        result = document.getElementById("result");
        result.innerHTML = '<img id = "imageobject" src = ' + data_uri + '>';
    });
}
console.log("ml5 version = ", ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/Hu3qJQ78S/model.json", loaded);
function loaded(){
    console.log("the model is loaded!");
}

function check(){
    imageobject = document.getElementById("imageobject");
    classifier.classify(imageobject, gotresult);
}

function gotresult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_name").innerHTML = results[0].label;
        document.getElementById("result_accuracy").innerHTML = results[0].confidence.toFixed(2);
    }
}