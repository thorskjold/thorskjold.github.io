// toggle mobile resizing

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.getElementById('html').style.height = "-webkit-fill-available";
    document.getElementById('html').style.maxHeight = "-webkit-fill-available";
    document.getElementById('body').style.height = "-webkit-fill-available";
    document.getElementById('body').style.maxHeight = "-webkit-fill-available";
} else {
    document.getElementById('html').style.height = "100vh";
    document.getElementById('body').style.height = "100vh";
}

// select a style option

window.selected = "option2";
function select(option) {
    document.getElementById(window.selected).classList.remove("select");
    window.selected = option;
    document.getElementById(window.selected).classList.add("select");
}

// async flags
window.identify_eyes = false;
window.identify_skin = false;
window.identify_hair = false;
window.identify_beard = false;

// memoji eyes

async function eyes() {

    // reset flags
    window.identify_eyes = true;
    window.identify_skin = false;
    window.identify_hair = false;
    window.identify_beard = false;

    // define constants
    const URL = "https://teachablemachine.withgoogle.com/models/LRxjebzM1/";
    let model, webcam;

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

    async function loop() {
        webcam.update(); // update the webcam frame
        await predict();
        window.requestAnimationFrame(loop);
    }
    
    // run the webcam image through the ML model
    async function predict() {

        if (window.identify_eyes) {

            // predict can take in an image, video or canvas html element
            const prediction = await model.predict(webcam.canvas);
        
            if (prediction[0].probability > 0.95) {
                document.getElementById("eyes").style.display = "block";
                document.getElementById("eyes").src = "characters/eyes/blue.png";
            }
            
            if (prediction[1].probability > 0.95) {
                document.getElementById("eyes").style.display = "block";
                document.getElementById("eyes").src = "characters/eyes/brown.png";
            }
            
            if (prediction[2].probability > 0.95) {
                document.getElementById("eyes").style.display = "block";
                document.getElementById("eyes").src = "characters/eyes/green.png";
            }

        }
    
    }

}

// memoji skin

async function skin() {

    // reset flags
    window.identify_eyes = false;
    window.identify_skin = true;
    window.identify_hair = false;
    window.identify_beard = false;

    // define constants
    const URL = "https://teachablemachine.withgoogle.com/models/wZh7KPwxG/";
    let model, webcam;

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

    async function loop() {
        webcam.update(); // update the webcam frame
        await predict();
        window.requestAnimationFrame(loop);
    }
    
    // run the webcam image through the ML model
    async function predict() {

        if (window.identify_skin) {

            // predict can take in an image, video or canvas html element
            const prediction = await model.predict(webcam.canvas);
        
            if (prediction[0].probability > 0.95) {
                document.getElementById("skin").style.display = "block";
                document.getElementById("skin").src = "characters/skin/light.png";
            }
            
            if (prediction[1].probability > 0.95) {
                document.getElementById("skin").style.display = "block";
                document.getElementById("skin").src = "characters/skin/dark.png";
            }

        }
    
    }

}

// memoji hair

async function hair() {

    // reset flags
    window.identify_eyes = false;
    window.identify_skin = false;
    window.identify_hair = true;
    window.identify_beard = false;

    // define constants
    const URL = "https://teachablemachine.withgoogle.com/models/LG7E-aW5n/";
    let model, webcam;

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

    async function loop() {
        webcam.update(); // update the webcam frame
        await predict();
        window.requestAnimationFrame(loop);
    }
    
    // run the webcam image through the ML model
    async function predict() {

        if (window.identify_hair) {

            // predict can take in an image, video or canvas html element
            const prediction = await model.predict(webcam.canvas);
        
            if (prediction[0].probability > 0.95) {
                document.getElementById("hair").style.display = "block";
                document.getElementById("hair").src = "characters/hair/black.png";
            }
            
            if (prediction[1].probability > 0.95) {
                document.getElementById("hair").style.display = "block";
                document.getElementById("hair").src = "characters/hair/blonde.png";
            }

            if (prediction[2].probability > 0.95) {
                document.getElementById("hair").style.display = "block";
                document.getElementById("hair").src = "characters/hair/brown.png";
            }

        }
    
    }

}

// memoji beard

async function beard() {

    // reset flags
    window.identify_eyes = false;
    window.identify_skin = false;
    window.identify_hair = false;
    window.identify_beard = true;

    // define constants
    const URL = "https://teachablemachine.withgoogle.com/models/yawHVVxGw/";
    let model, webcam;

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

    async function loop() {
        webcam.update(); // update the webcam frame
        await predict();
        window.requestAnimationFrame(loop);
    }
    
    // run the webcam image through the ML model
    async function predict() {
        
        if (window.identify_beard) {

            // predict can take in an image, video or canvas html element
            const prediction = await model.predict(webcam.canvas);
        
            if (prediction[0].probability > 0.95) {
                document.getElementById("beard").style.display = "block";
                document.getElementById("beard").src = "characters/beard/black.png";
            }
            
            if (prediction[1].probability > 0.95) {
                document.getElementById("beard").style.display = "block";
                document.getElementById("beard").src = "characters/beard/brown.png";
            }

            if (prediction[2].probability > 0.95) {
                document.getElementById("beard").style.display = "block";
                document.getElementById("beard").src = "characters/beard/red.png";
            }

        }
    
    }

}