// the link to your model provided by Teachable Machine export panel
// https://teachablemachine.withgoogle.com/
const URL = "https://teachablemachine.withgoogle.com/models/36P5oCMKu/";  //YOU NEED TO REPLACE THIS LINK

let model, webcam;


async function start() {

    document.getElementById("startknap").style.display="none";  // Hide the start buttobn

    // load the model and metadata
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";              
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Setup a webcam
    webcam = new tmImage.Webcam(200, 200, true); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    // append video element (remove/comment line if you do not want the video shown)
    document.getElementById("webcam-container").appendChild(webcam.canvas);
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


    

       if(prediction[0].probability >0.95)
       {
console.log("Case A");
document.body.style.backgroundColor = "green";
       }
        

       if(prediction[1].probability >0.95)
       {
console.log("Case B");
document.body.style.backgroundColor = "red";
       }
    }