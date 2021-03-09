/* initialization */

window.delay = 1000;
window.HSL = document.getElementById("HSL");
window.fade = document.getElementById("fade");

/* experiment 1 */

function resetBehavior() {

    window.audio.pause();
    clearInterval(window.running);
    document.body.style.background = rgb(245, 245, 245);
    
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

    window.removeEventListener("mousemove", mouseBackground);
    window.removeEventListener("deviceorientation", orientationBackground);
    window.removeEventListener("devicemotion", motionBackground);
    navigator.geolocation.clearWatch(window.watching);
    document.body.style.background = rgb(245, 245, 245);
    document.getElementById("HSL").checked = false;
    document.getElementById("fade").checked = false;

};

function mouseBackground(event) {

    let xPos = event.clientX;
    let yPos = event.clientY;

    if (window.HSL.checked) {
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
    } else {
        document.body.style.background = rgb(
            (255 / 1000) * xPos,
            (255 / 1000) * yPos,
            255
        );
    };

};

function orientationBackground(event) {

    var absolute = event.absolute;
    var alpha = event.alpha; // In degree in the range [0,360)
    var beta = event.beta; // In degree in the range [-180,180)
    var gamma = event.gamma; // In degree in the range [-90,90)

    if (window.HSL.checked) {
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
    } else {
        document.body.style.background = rgb(
            (255 / 360) * alpha,
            (255 / 180) * Math.abs(beta),
            (255 / 90) * Math.abs(gamma)
        );
    };

};

function motionBackground(event) {

    let x = event.acceleration.x; // degrees
    let y = event.acceleration.y; // degrees
    let z = event.acceleration.z; // degrees

    if (window.HSL.checked) {
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
    } else {
        document.body.style.background = rgb(
            (255 / 360) * x,
            (255 / 360) * y,
            (255 / 360) * z
        );
    };

};

function locationBackground(position) {

    let longitude = position.coords.longitude; // degrees range (-180 to 180)
    let latitude = position.coords.latitude; // degrees range (-90 to 90)

    if (window.HSL.checked) {
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
    } else {
        document.body.style.background = rgb(
            (255 / 180) * Math.abs(longitude),
            (255 / 90) * Math.abs(latitude),
            255
        );
    };

};

function grantPermission(sensor) {

    window.removeEventListener("mousemove", mouseBackground);
    window.removeEventListener("deviceorientation", orientationBackground);
    window.removeEventListener("devicemotion", motionBackground);
    navigator.geolocation.clearWatch(window.watching);

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') {
                        if (sensor == "mouse") {
                            window.addEventListener("mousemove", mouseBackground);
                        }
                        if (sensor == "orientation") {
                            window.addEventListener("deviceorientation", orientationBackground);
                        }
                        if (sensor == "motion") {
                            window.addEventListener("devicemotion", motionBackground);
                        }
                        if (sensor == "location") {
                            window.watching = navigator.geolocation.watchPosition(locationBackground);
                        }
                    }
                })
                .catch(console.error);
        };
    } else {
        if (sensor == "mouse") {
            window.addEventListener("mousemove", mouseBackground);
        }
        if (sensor == "orientation") {
            window.addEventListener("deviceorientation", orientationBackground);
        }
        if (sensor == "motion") {
            window.addEventListener("devicemotion", motionBackground);
        }
        if (sensor == "location") {
            window.watching = navigator.geolocation.watchPosition(locationBackground);
        }
    };

};