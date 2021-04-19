// character data structure

window.character = {
    "skin" : "template",
    "hair" : "template",
    "eyes" : "template"
}

// select a style option

window.selected = "hair";
function select(option) {
    document.getElementById(window.selected).classList.remove("select");
    window.selected = option;
    document.getElementById(window.selected).classList.add("select");
}

// the link to your model provided by Teachable Machine export panel https://teachablemachine.withgoogle.com/
const URL = "https://teachablemachine.withgoogle.com/models/5por9wdbQ/";

let model, webcam;

async function identify() {

    // load the model and metadata
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";              
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // setup a camera
    webcam = new tmImage.Webcam(200, 200, true); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    // hide the start button, and show the style options
    document.getElementById("start").style.display = "none";
    document.getElementById("options").style.display = "flex";

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

    if (prediction[0].probability > 0.5) {
        window.character["hair"] = "blonde";
    } else if (prediction[1].probability > 0.5) {
        window.character["hair"] = "brown";
    } else {
        window.character["hair"] = "template";
    }

    document.getElementById("character").src = "characters/" + window.character["skin"] + "_" + window.character["hair"] + "_" + window.character["eyes"] + ".png"

}