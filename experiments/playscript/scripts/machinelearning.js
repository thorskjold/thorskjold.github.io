// cancel ML process

function cancel() {
    document.getElementById("mobile").style.display = "flex";
    document.getElementById("camera").style.display = "none";
    // HOW DO WE CANCEL THE WEBCAM AND ML??
}

// the link to your model provided by Teachable Machine export panel https://teachablemachine.withgoogle.com/
const URL = "https://teachablemachine.withgoogle.com/models/36P5oCMKu/";  //YOU NEED TO REPLACE THIS LINK

let model, webcam;

async function identify() {

    // document.getElementById("mobile").style.display = "none";

    // load the model and metadata
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";              
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // setup a camera
    webcam = new tmImage.Webcam(400, 400, true); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    // append video element (remove/comment line if you do not want the video shown)
    // document.getElementById("camera").style.display = "block";
    // document.getElementById("camera").appendChild(webcam.canvas);
}

async function loop() {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}

// run the webcam image through the ML model
async function predict() {
    
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(webcam.canvas);

    if(prediction[0].probability > 0.95) {
        console.log("Case A");
    }
    
    if(prediction[1].probability > 0.95) {
        console.log("Case B");
    }
}