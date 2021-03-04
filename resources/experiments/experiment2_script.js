function mouseBackground(event) {

    let xPos = event.clientX;
    let yPos = event.clientY;

    document.body.style.background = rgb(
        (255 / 1000) * xPos,
        (255 / 1000) * yPos,
        255
    );

};

function orientationBackground(event) {

    var absolute = event.absolute;
    var alpha = event.alpha; // In degree in the range [0,360)
    var beta = event.beta; // In degree in the range [-180,180)
    var gamma = event.gamma; // In degree in the range [-90,90)

    document.body.style.background = rgb(
        (255 / 360) * alpha,
        (255 / 180) * Math.abs(beta),
        (255 / 90) * Math.abs(gamma)
    );

};

function motionBackground(event) {

    let x = event.acceleration.x; // degrees
    let y = event.acceleration.y; // degrees
    let z = event.acceleration.z; // degrees

    document.body.style.background = rgb(
        (255 / 360) * x,
        (255 / 360) * y,
        (255 / 360) * z
    );

};

function locationBackground(position) {

    let longitude = position.coords.longitude;
    let latitude = position.coords.latitude;

    document.body.style.background = rgb(
        (255 / 100) * longitude,
        (255 / 100) * latitude,
        255
    );

};

function grantPermission(sensor) {
    
    window.removeEventListener("mousemove", mouseBackground);
    window.removeEventListener("deviceorientation", orientationBackground);
    window.removeEventListener("devicemotion", motionBackground);
    navigator.geolocation.clearWatch(window.watching);
    document.body.style.background = rgb(255, 255, 255);

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