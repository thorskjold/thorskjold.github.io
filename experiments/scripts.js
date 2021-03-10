/* toggle sidebar */

function toggle() {

    if (window.state) { // show
        document.getElementById("sidebar").style.animation = "show ease 0.5s";
        setTimeout(document.getElementById("sidebar").style.transform = "translate(0, 0)", 500);
        window.state = false;
    } else { // hide
        document.getElementById("sidebar").style.animation = "hide ease 0.5s";
        setTimeout(document.getElementById("sidebar").style.transform = "translate(-210px, 0)", 500);
        window.state = true;
    };
};

/* initialization */

window.delay = 1000;
window.fade = document.getElementById("fade");

/* time-difference between mousedown and mouseup */

function getStart() {
    window.start = new Date();
};

function getEnd() {
    window.end = new Date();
    document.getElementById("difference").innerHTML = window.end - window.start;
};

window.addEventListener("mousedown", getStart);
window.addEventListener("mouseup", getEnd);

/* experiment 1 */

function resetBehavior() {

    window.audio.pause();
    clearInterval(window.running);
    document.body.style.background = rgb(245, 245, 245);
    document.getElementById("difference").innerHTML = 0;
    
};

function setDelay(delay) {
    window.delay = delay;
};

function setBackground(colors) {

    window.audio.pause();
    clearInterval(window.running);

    var iteration = 0;
    
    window.running = setInterval(function() {

        if (iteration < colors.length - 1) {
            document.body.style.background = "rgb(" + String(colors[iteration]) + ")";
            iteration++;
        } else {
        	document.body.style.background = "rgb(" + String(colors[iteration]) + ")";
            iteration = 0;
        };

    }, window.delay);

};

function play() {

    window.audio = document.getElementById("audio");
    window.audio.play();

};

/* experiment 2 */

function resetEvents() {

    window.removeEventListener("deviceorientation", backgroundActivate);
    window.removeEventListener("deviceorientation", backgroundAstro);
    window.removeEventListener("deviceorientation", backgroundCycle);
    window.removeEventListener("mousemove", backgroundDigging);
    window.removeEventListener("mousemove", backgroundRainbow);
    
    document.getElementById("fade").checked = false;
    document.getElementById("activate").checked = false;
    document.getElementById("astro").checked = false;
    document.getElementById("cycle").checked = false;
    document.getElementById("digging").checked = false;
    document.getElementById("rainbow").checked = false;
    document.getElementById("difference").innerHTML = 0;

    document.body.style.background = rgb(245, 245, 245);

};

/*
function mouseBackground(event) {

    let xPos = event.clientX;
    let yPos = event.clientY;

    if (window.fade.checked) {
        document.body.style.background = onePixelDo(
            true, // fade
            (360 / 1000) * xPos, // hue
            30 + (70 / 1000) * yPos, // saturation
            50 // light
        );
    } else {
        document.body.style.background = onePixelDo(
            false, // fade
            (360 / 1000) * xPos, // hue
            30 + (70 / 1000) * yPos, // saturation
            50 // light
        );
    };

};

function orientationBackground(event) {

    var absolute = event.absolute;
    var alpha = event.alpha; // In degree in the range [0,360)
    var beta = event.beta; // In degree in the range [-180,180)
    var gamma = event.gamma; // In degree in the range [-90,90)

    if (window.fade.checked) {
        document.body.style.background = onePixelDo(
            true, // fade
            alpha, // hue
            (100 / 180) * Math.abs(beta), // saturation
            (100 / 90) * Math.abs(gamma) // light
        );
    } else {
        document.body.style.background = onePixelDo(
            false, // fade
            alpha, // hue
            (100 / 180) * Math.abs(beta), // saturation
            (100 / 90) * Math.abs(gamma) // light
        );
    };

};

function motionBackground(event) {

    let x = event.acceleration.x; // degrees
    let y = event.acceleration.y; // degrees
    let z = event.acceleration.z; // degrees

    if (window.fade.checked) {
        document.body.style.background = onePixelDo(
            true, // fade
            x, // hue
            (100 / 360) * y, // saturation
            (100 / 360) * z // light
        );
    } else {
        document.body.style.background = onePixelDo(
            false, // fade
            x, // hue
            (100 / 360) * y, // saturation
            (100 / 360) * z // light
        );
    };

};

function locationBackground(position) {

    let longitude = position.coords.longitude; // degrees range (-180 to 180)
    let latitude = position.coords.latitude; // degrees range (-90 to 90)

    if (window.fade.checked) {
        document.body.style.background = onePixelDo(
            true, // fade
            (100 / 180) * Math.abs(longitude), // hue
            (100 / 90) * Math.abs(latitude), // saturation
            50 // light
        );
    } else {
        document.body.style.background = onePixelDo(
            false, // fade
            (100 / 180) * Math.abs(longitude), // hue
            (100 / 90) * Math.abs(latitude), // saturation
            50 // light
        );
    };

};
*/

function backgroundActivate(event) {

    var beta = event.beta; // In degree in the range [-180,180)

    if (beta > 10 && beta < 40) {
        document.body.style.background = onePixelDo(window.fade.checked, 0, 100, 100); // black
    } else {
        document.body.style.background = onePixelDo(window.fade.checked, 0, 0, 0); // black
    }

};

function backgroundAstro(event) {

    var beta = event.beta; // In degree in the range [-180,180)
    var gamma = event.gamma; // In degree in the range [-90,90)

    if (beta > 170 && beta < -170 && gamma > -10 && gamma < 10) {
        document.body.style.background = onePixelDo(window.fade.checked, 50, 100, 50); // sun
    } else {
        document.body.style.background = onePixelDo(window.fade.checked, 0, 0, 0); // black
    }

};

function backgroundCycle(event) {

};

function backgroundDigging(event) {

    let xPos = event.clientX;
    let yPos = event.clientY;

    if ((xPos > 700 && xPos < 750 && yPos > 150 && yPos < 200) || (xPos > 350 && xPos < 400 && yPos > 500 && yPos < 550) || (xPos > 50 && xPos < 100 && yPos > 650 && yPos < 700) || (xPos > 500 && xPos < 550 && yPos > 750 && yPos < 800) || (xPos > 800 && xPos < 850 && yPos > 750 && yPos < 800)) {
        document.body.style.background = onePixelDo(window.fade.checked, 50, 100, 50); // gold
    } else if ((xPos > 100 && xPos < 150 && yPos > 0 && yPos < 50) || (xPos > 400 && xPos < 450 && yPos > 0 && yPos < 50) || (xPos > 700 && xPos < 750 && yPos > 50 && yPos < 100) || (xPos > 900 && xPos < 950 && yPos > 50 && yPos < 100) || (xPos > 850 && xPos < 900 && yPos > 100 && yPos < 150) || (xPos > 500 && xPos < 550 && yPos > 100 && yPos < 150) || (xPos > 300 && xPos < 350 && yPos > 100 && yPos < 150) || (xPos > 100 && xPos < 150 && yPos > 100 && yPos < 150) || (xPos > 50 && xPos < 100 && yPos > 200 && yPos < 250) || (xPos > 350 && xPos < 400 && yPos > 200 && yPos < 250) || (xPos > 600 && xPos < 650 && yPos > 150 && yPos < 200) || (xPos > 100 && xPos < 150 && yPos > 350 && yPos < 400) || (xPos > 350 && xPos < 400 && yPos > 350 && yPos < 400) || (xPos > 500 && xPos < 550 && yPos > 250 && yPos < 300) || (xPos > 650 && xPos < 700 && yPos > 300 && yPos < 350) || (xPos > 750 && xPos < 800 && yPos > 250 && yPos < 300) || (xPos > 850 && xPos < 900 && yPos > 250 && yPos < 300) || (xPos > 900 && xPos < 950 && yPos > 250 && yPos < 300) || (xPos > 850 && xPos < 900 && yPos > 350 && yPos < 400) || (xPos > 200 && xPos < 250 && yPos > 400 && yPos < 450) || (xPos > 450 && xPos < 500 && yPos > 450 && yPos < 500) || (xPos > 550 && xPos < 600 && yPos > 450 && yPos < 500) || (xPos > 650 && xPos < 700 && yPos > 450 && yPos < 500) || (xPos > 750 && xPos < 800 && yPos > 400 && yPos < 450) || (xPos > 750 && xPos < 800 && yPos > 450 && yPos < 500) || (xPos > 850 && xPos < 900 && yPos > 450 && yPos < 500) || (xPos > 950 && xPos < 1000 && yPos > 450 && yPos < 500) || (xPos > 100 && xPos < 150 && yPos > 500 && yPos < 550) || (xPos > 0 && xPos < 50 && yPos > 550 && yPos < 600) || (xPos > 0 && xPos < 50 && yPos > 850 && yPos < 900) || (xPos > 0 && xPos < 50 && yPos > 900 && yPos < 950) || (xPos > 100 && xPos < 150 && yPos > 900 && yPos < 950) || (xPos > 100 && xPos < 150 && yPos > 800 && yPos < 850) || (xPos > 150 && xPos < 200 && yPos > 700 && yPos < 750) || (xPos > 250 && xPos < 300 && yPos > 600 && yPos < 650) || (xPos > 250 && xPos < 300 && yPos > 750 && yPos < 800) || (xPos > 350 && xPos < 400 && yPos > 700 && yPos < 750) || (xPos > 500 && xPos < 550 && yPos > 550 && yPos < 600) || (xPos > 700 && xPos < 750 && yPos > 600 && yPos < 650) || (xPos > 650 && xPos < 700 && yPos > 700 && yPos < 750) || (xPos > 900 && xPos < 950 && yPos > 650 && yPos < 700) || (xPos > 200 && xPos < 250 && yPos > 900 && yPos < 950) || (xPos > 250 && xPos < 300 && yPos > 950 && yPos < 1000) || (xPos > 350 && xPos < 400 && yPos > 900 && yPos < 950) || (xPos > 400 && xPos < 450 && yPos > 800 && yPos < 850) || (xPos > 500 && xPos < 550 && yPos > 950 && yPos < 1000) || (xPos > 550 && xPos < 600 && yPos > 900 && yPos < 950) || (xPos > 650 && xPos < 700 && yPos > 900 && yPos < 950) || (xPos > 800 && xPos < 850 && yPos > 850 && yPos < 900) || (xPos > 800 && xPos < 850 && yPos > 950 && yPos < 1000) || (xPos > 900 && xPos < 950 && yPos > 850 && yPos < 900) || (xPos > 900 && xPos < 950 && yPos > 950 && yPos < 1000)) {
        document.body.style.background = onePixelDo(window.fade.checked, 0, 0, 50); // stone
    } else {
        document.body.style.background = onePixelDo(window.fade.checked, 40, 100, 20); // dirt
    };

};

function backgroundRainbow(event) {

    let xPos = event.clientX;
    let yPos = event.clientY;

    document.body.style.background = onePixelDo(
        window.fade.checked,
        (360 / 1000) * xPos,
        30 + (70 / 1000) * yPos,
        50
    );

};

function grantPermission(behavior) {

    window.removeEventListener("deviceorientation", backgroundActivate);
    window.removeEventListener("deviceorientation", backgroundAstro);
    window.removeEventListener("deviceorientation", backgroundCycle);
    window.removeEventListener("mousemove", backgroundDigging);
    window.removeEventListener("mousemove", backgroundRainbow);

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') {
                        if (behavior == "activate") {
                            window.addEventListener("deviceorientation", backgroundActivate);
                        }
                        if (behavior == "astro") {
                            window.addEventListener("deviceorientation", backgroundAstro);
                        }
                        if (behavior == "cycle") {
                            window.addEventListener("deviceorientation", backgroundCycle);
                        }
                        if (behavior == "digging") {
                            window.addEventListener("mousemove", backgroundDigging);
                        }
                        if (behavior == "rainbow") {
                            window.addEventListener("mousemove", backgroundRainbow);
                        }
                    }
                })
                .catch(console.error);
        };
    } else {
        if (behavior == "activate") {
            window.addEventListener("deviceorientation", backgroundActivate);
        }
        if (behavior == "astro") {
            window.addEventListener("deviceorientation", backgroundAstro);
        }
        if (behavior == "cycle") {
            window.addEventListener("deviceorientation", backgroundCycle);
        }
        if (behavior == "digging") {
            window.addEventListener("mousemove", backgroundDigging);
        }
        if (behavior == "rainbow") {
            window.addEventListener("mousemove", backgroundRainbow);
        }
    };

};