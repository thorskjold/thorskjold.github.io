// read authenticator code from website URL

function getAnchor() { // source: https://programming.bogdanbucur.eu/how-to-get-the-url-anchor-with-javascript/
    var currentUrl = document.URL,
	urlParts   = currentUrl.split('#');
		
    return (urlParts.length > 1) ? urlParts[1] : 0;
}

window.controller["authenticator"] = getAnchor();

// set player

function control(player) {
    if (window.controller["player"] != 0) {
        optout()
        document.getElementById("controller" + window.controller["player"]).classList.remove("select");
    }
    window.controller["player"] = player;
    document.getElementById("controller" + window.controller["player"]).classList.add("select");
    optin()
}

// toggle interaction form

interact(window.controller["interaction"]) // init

function interact(input) {

    document.getElementById(window.controller["interaction"]).classList.remove("selected");
    window.controller["interaction"] = input;
    document.getElementById(window.controller["interaction"]).classList.add("selected");

    if (window.controller["interaction"] == "swipe") {
        swipe()
        document.getElementById("gesture").style.display = "block";
    } else {
        document.getElementById("gesture").style.display = "none";
        document.getElementById("gesture").removeEventListener('touchstart', handleTouchStart, false);        
        document.getElementById("gesture").removeEventListener('touchmove', handleTouchMove, false);
    }

    if (window.controller["interaction"] == "motion") {
        motion()
    } else {
        window.removeEventListener("devicemotion", accelerate)
    }

    if (window.controller["interaction"] == "vision") {
        if (!document.getElementById("canvas").hasChildNodes()) {
            identify()
        }
        document.getElementById("classification").style.display = "flex"
    } else {
        document.getElementById("classification").style.display = "none";
    }

}

// interact with swipe

function swipe() {
    
    // document.getElementById("gesture").addEventListener("mousemove", touch);
    document.getElementById("gesture").addEventListener('touchstart', handleTouchStart, false);        
    document.getElementById("gesture").addEventListener('touchmove', handleTouchMove, false);

    var xDown = null;                                                        
    var yDown = null;

}

function getTouches(evt) {
    return evt.touches || // browser API
    evt.originalEvent.touches; // jQuery
}                                                     

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
}                                                

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) { return }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) { /*most significant*/
        if ( xDiff > 0 ) {
            /* left swipe */ 
        } else {
            /* right swipe */
        }                       
    } else {
        if ( yDiff > 0 ) {
            respond()
        } else { 
            /* down swipe */
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
}

// interact with motion

function motion() {

    window.addEventListener("devicemotion", accelerate);

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') {
                        window.addEventListener("devicemotion", accelerate);
                    };
                })
                .catch(console.error);
        };
    } else {
        window.addEventListener("devicemotion", accelerate);
    };

}

function accelerate(event) {

    // get absolute value of acceleration parameters
    var x = Math.abs(event.acceleration.x);
    var y = Math.abs(event.acceleration.y);
    var z = Math.abs(event.acceleration.z);

    if (x > window.controller["force"] || y > window.controller["force"] || z > window.controller["force"]) {
        respond()
    }

}

// interact with computer vision

// source: https://github.com/googlecreativelab/teachablemachine-community/blob/master/snippets/markdown/pose/tensorflowjs/javascript.md

async function identify() {

    const URL = "https://teachablemachine.withgoogle.com/models/V-eOQ_exy/";
    let model, webcam, ctx, labelContainer, maxPredictions;
    
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // Note: the pose library adds a tmPose object to your window (window.tmPose)
    model = await tmPose.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    webcam = new tmPose.Webcam(); // width, height, flip
    await webcam.setup({ facingMode: "user" }); // use "user" to use front-cam on mobile phones

    // append elements to the DOM --> **before starting the webcam**
    document.getElementById('canvas').appendChild(webcam.webcam); // webcam object needs to be added in any case to make this work on iOS

    // grab video-object in any way you want and set the attributes --> **"muted" and "playsinline"**
    let wc = document.getElementsByTagName('video')[0];
    wc.setAttribute("playsinline", true); // written with "setAttribute" bc. iOS buggs otherwise :-)
    wc.muted = "true"
    wc.id = "webcamVideo";

    await webcam.play();
    window.requestAnimationFrame(loop);

    async function loop(timestamp) {
        webcam.update(); // update the webcam frame
        await predict();
        window.requestAnimationFrame(loop);
    }

    async function predict() {
        // Prediction #1: run input through posenet
        // estimatePose can take in an image, video or canvas html element
        const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
        // Prediction 2: run input through teachable machine classification model
        const prediction = await model.predict(posenetOutput);

        if (window.controller["interaction"] == "vision" && prediction[1].probability >= 0.95) {
            respond()
            document.getElementById("status").style.backgroundColor = "green"
        }

        if (window.controller["interaction"] == "vision" && prediction[0].probability >= 0.95) {
            document.getElementById("status").style.backgroundColor = "red"
        }

    }

}