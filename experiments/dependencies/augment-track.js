/* experiment 2

This experiment explores the ability of a singular interactive pixel to illustrate five unique interactions,
using motion or orientation sensing. The interactions are built on device state from a combination of
cursor movement and gyroscopic orientation. The first 3 interactions leverage orientation,
and the last 2 interactions leverage cursor movement. The interactions consist of analogies for
raise-to-wake [1], daylight outdoors, nighttime outdoors, gold-digging, and an interactive rainbow.

[1] https://support.apple.com/en-us/HT208081

Orientation was mapped as a 3D space, wherein the device moves along an
Alpha (X), Beta (Y), and Gamma (Z) axis. The Beta axis was chosen for this experiment,
and its degrees (±180°) were delimited into ranges corresponding to the minimum
and maximum expression of the pixel.

Cursor movement was mapped to a coordinate system [2],
with the purpose of delimiting cursor position ranges, wherein an interaction would be triggered.
A randomised small selection of coordinates were marked as representing either rock (gray) or gold (yellow),
then the coordinates were used as delimiters in the code.

[2] https://thorskjold.com/experiments/coordinates.pdf

*/

// permission request functions (for iOS/WebKit)

function augment(behavior) {

    // remove any existing device orientation listeners
    window.removeEventListener("deviceorientation", backgroundActivate);
    window.removeEventListener("deviceorientation", backgroundSky);
    window.removeEventListener("deviceorientation", backgroundAstro);

    // determine if the user agent of the user's browser corresponds to a mobile device
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission()
                .then(permissionState => {
                    // determine if permission has been granted
                    if (permissionState === 'granted') {
                        // determine the function input variable, then attach the appropriate function to a device orientation listener
                        if (behavior == "activate") {
                            window.addEventListener("deviceorientation", backgroundActivate);
                        };
                        if (behavior == "sky") {
                            window.addEventListener("deviceorientation", backgroundSky);
                        };
                        if (behavior == "astro") {
                            window.addEventListener("deviceorientation", backgroundAstro);
                        };
                    }
                })
                .catch(console.error);
        };
    } else {
        // determine the function input variable, then attach the appropriate function to a device orientation listener
        if (behavior == "activate") {
            window.addEventListener("deviceorientation", backgroundActivate);
        };
        if (behavior == "sky") {
            window.addEventListener("deviceorientation", backgroundSky);
        };
        if (behavior == "astro") {
            window.addEventListener("deviceorientation", backgroundAstro);
        };
    };

};

function track(behavior) {

    // remove any existing mouse movement listeners
    window.removeEventListener("mousemove", backgroundDigging);
    window.removeEventListener("mousemove", backgroundRainbow);

    // determine if the user agent of the user's browser corresponds to a mobile device
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission()
                .then(permissionState => {
                    // determine if permission has been granted
                    if (permissionState === 'granted') {
                        // determine the function input variable, then attach the appropriate function to a mouse movement listener
                        if (behavior == "digging") {
                            window.addEventListener("mousemove", backgroundDigging);
                        };
                        if (behavior == "rainbow") {
                            window.addEventListener("mousemove", backgroundRainbow);
                        };
                    }
                })
                .catch(console.error);
        };
    } else {
        // determine the function input variable, then attach the appropriate function to a mouse movement listener
        if (behavior == "digging") {
            window.addEventListener("mousemove", backgroundDigging);
        };
        if (behavior == "rainbow") {
            window.addEventListener("mousemove", backgroundRainbow);
        };
    };

};

// eventlistener functions

function backgroundActivate(event) {

    // instantiate the device orientation's beta property as a variable
    var beta = event.beta; // in degrees within the range [-180,180]

    // determine if the value of beta is between 10 and 100, then update the style.background property of the "background" element in the DOM
    if (beta > 10 && beta < 100) {
        document.getElementById("background").style.background = onePixelDo(true, 0, 100, 100); // white
    } else {
        document.getElementById("background").style.background = onePixelDo(true, 0, 0, 0); // black
    };

};

function backgroundSky(event) {

    // instantiate the device orientation's beta property as a variable
    var beta = event.beta; // in degrees within the range [-180,180]

    // determine if the value of beta is above certain thresholds, then update the style.background property of the "background" element in the DOM
    if (Math.abs(beta) > 160) {
        document.getElementById("background").style.background = onePixelDo(true, 50, 100, 50); // sun
    } else if (Math.abs(beta) > 90) {
        document.getElementById("background").style.background = onePixelDo(true, 200, 100, 50 + (50 / 70 * (Math.abs(beta) - 90))); // sky
    } else if (Math.abs(beta) > 70) {
        document.getElementById("background").style.background = onePixelDo(true, 100, 70, 30); // dirt
    } else {
        document.getElementById("background").style.background = onePixelDo(true, 40, 100, 20); // dirt
    };

};

function backgroundAstro(event) {

    // instantiate the device orientation's beta property as a variable
    var beta = event.beta; // in degrees within the range [-180,180]

    // determine if the value of beta is above certain thresholds, then update the style.background property of the "background" element in the DOM
    if (Math.abs(beta) > 160) {
        document.getElementById("background").style.background = onePixelDo(true, 100, 100, 100); // star
    } else if (Math.abs(beta) > 90) {
        document.getElementById("background").style.background = onePixelDo(true, 200, 100, 30 - (30 / 70 * (Math.abs(beta) - 90))); // night sky
    } else if (Math.abs(beta) > 70) {
        document.getElementById("background").style.background = onePixelDo(true, 100, 70, 10); // dirt
    } else {
        document.getElementById("background").style.background = onePixelDo(true, 40, 100, 10); // dirt
    };

};

function backgroundDigging(event) {

    // instantiate the cursor's x- and y-coordinate properties as immutables
    let xPos = event.clientX;
    let yPos = event.clientY;

    // determine if both coordinates are within certain thresholds, then update the style.background property of the "background" element in the DOM
    if ((xPos > 700 && xPos < 750 && yPos > 150 && yPos < 200) || (xPos > 350 && xPos < 400 && yPos > 500 && yPos < 550) || (xPos > 50 && xPos < 100 && yPos > 650 && yPos < 700) || (xPos > 500 && xPos < 550 && yPos > 750 && yPos < 800) || (xPos > 800 && xPos < 850 && yPos > 750 && yPos < 800)) {
        document.getElementById("background").style.background = onePixelDo(true, 50, 100, 50); // gold
    } else if ((xPos > 100 && xPos < 150 && yPos > 0 && yPos < 50) || (xPos > 400 && xPos < 450 && yPos > 0 && yPos < 50) || (xPos > 700 && xPos < 750 && yPos > 50 && yPos < 100) || (xPos > 900 && xPos < 950 && yPos > 50 && yPos < 100) || (xPos > 850 && xPos < 900 && yPos > 100 && yPos < 150) || (xPos > 500 && xPos < 550 && yPos > 100 && yPos < 150) || (xPos > 300 && xPos < 350 && yPos > 100 && yPos < 150) || (xPos > 100 && xPos < 150 && yPos > 100 && yPos < 150) || (xPos > 50 && xPos < 100 && yPos > 200 && yPos < 250) || (xPos > 350 && xPos < 400 && yPos > 200 && yPos < 250) || (xPos > 600 && xPos < 650 && yPos > 150 && yPos < 200) || (xPos > 100 && xPos < 150 && yPos > 350 && yPos < 400) || (xPos > 350 && xPos < 400 && yPos > 350 && yPos < 400) || (xPos > 500 && xPos < 550 && yPos > 250 && yPos < 300) || (xPos > 650 && xPos < 700 && yPos > 300 && yPos < 350) || (xPos > 750 && xPos < 800 && yPos > 250 && yPos < 300) || (xPos > 850 && xPos < 900 && yPos > 250 && yPos < 300) || (xPos > 900 && xPos < 950 && yPos > 250 && yPos < 300) || (xPos > 850 && xPos < 900 && yPos > 350 && yPos < 400) || (xPos > 200 && xPos < 250 && yPos > 400 && yPos < 450) || (xPos > 450 && xPos < 500 && yPos > 450 && yPos < 500) || (xPos > 550 && xPos < 600 && yPos > 450 && yPos < 500) || (xPos > 650 && xPos < 700 && yPos > 450 && yPos < 500) || (xPos > 750 && xPos < 800 && yPos > 400 && yPos < 450) || (xPos > 750 && xPos < 800 && yPos > 450 && yPos < 500) || (xPos > 850 && xPos < 900 && yPos > 450 && yPos < 500) || (xPos > 950 && xPos < 1000 && yPos > 450 && yPos < 500) || (xPos > 100 && xPos < 150 && yPos > 500 && yPos < 550) || (xPos > 0 && xPos < 50 && yPos > 550 && yPos < 600) || (xPos > 0 && xPos < 50 && yPos > 850 && yPos < 900) || (xPos > 0 && xPos < 50 && yPos > 900 && yPos < 950) || (xPos > 100 && xPos < 150 && yPos > 900 && yPos < 950) || (xPos > 100 && xPos < 150 && yPos > 800 && yPos < 850) || (xPos > 150 && xPos < 200 && yPos > 700 && yPos < 750) || (xPos > 250 && xPos < 300 && yPos > 600 && yPos < 650) || (xPos > 250 && xPos < 300 && yPos > 750 && yPos < 800) || (xPos > 350 && xPos < 400 && yPos > 700 && yPos < 750) || (xPos > 500 && xPos < 550 && yPos > 550 && yPos < 600) || (xPos > 700 && xPos < 750 && yPos > 600 && yPos < 650) || (xPos > 650 && xPos < 700 && yPos > 700 && yPos < 750) || (xPos > 900 && xPos < 950 && yPos > 650 && yPos < 700) || (xPos > 200 && xPos < 250 && yPos > 900 && yPos < 950) || (xPos > 250 && xPos < 300 && yPos > 950 && yPos < 1000) || (xPos > 350 && xPos < 400 && yPos > 900 && yPos < 950) || (xPos > 400 && xPos < 450 && yPos > 800 && yPos < 850) || (xPos > 500 && xPos < 550 && yPos > 950 && yPos < 1000) || (xPos > 550 && xPos < 600 && yPos > 900 && yPos < 950) || (xPos > 650 && xPos < 700 && yPos > 900 && yPos < 950) || (xPos > 800 && xPos < 850 && yPos > 850 && yPos < 900) || (xPos > 800 && xPos < 850 && yPos > 950 && yPos < 1000) || (xPos > 900 && xPos < 950 && yPos > 850 && yPos < 900) || (xPos > 900 && xPos < 950 && yPos > 950 && yPos < 1000)) {
        document.getElementById("background").style.background = onePixelDo(true, 0, 0, 50); // stone
    } else {
        document.getElementById("background").style.background = onePixelDo(true, 40, 100, 20); // dirt
    };

};

function backgroundRainbow(event) {

    // instantiate the cursor's x- and y-coordinate properties as immutables
    let xPos = event.clientX;
    let yPos = event.clientY;

    // with both coordinates as input, update the style.background property of the "background" element in the DOM
    document.getElementById("background").style.background = onePixelDo(
        true,
        (360 / 1000) * xPos,
        30 + (70 / 1000) * yPos,
        50
    );

};