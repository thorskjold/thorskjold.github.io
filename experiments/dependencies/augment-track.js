// experiment 2

function augment(behavior) {

    window.removeEventListener("deviceorientation", backgroundActivate);
    window.removeEventListener("deviceorientation", backgroundSky);
    window.removeEventListener("deviceorientation", backgroundAstro);

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') {
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

    window.removeEventListener("mousemove", backgroundDigging);
    window.removeEventListener("mousemove", backgroundRainbow);

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') {
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
        if (behavior == "digging") {
            window.addEventListener("mousemove", backgroundDigging);
        };
        if (behavior == "rainbow") {
            window.addEventListener("mousemove", backgroundRainbow);
        };
    };

};

function backgroundActivate(event) {

    var beta = event.beta; // In degree in the range [-180,180)

    if (beta > 10 && beta < 100) {
        document.getElementById("background").style.background = onePixelDo(true, 0, 100, 100); // black
    } else {
        document.getElementById("background").style.background = onePixelDo(true, 0, 0, 0); // black
    };

};

function backgroundSky(event) {

    var beta = event.beta; // In degree in the range [-180,180)

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

    var beta = event.beta; // In degree in the range [-180,180)

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

    let xPos = event.clientX;
    let yPos = event.clientY;

    if ((xPos > 700 && xPos < 750 && yPos > 150 && yPos < 200) || (xPos > 350 && xPos < 400 && yPos > 500 && yPos < 550) || (xPos > 50 && xPos < 100 && yPos > 650 && yPos < 700) || (xPos > 500 && xPos < 550 && yPos > 750 && yPos < 800) || (xPos > 800 && xPos < 850 && yPos > 750 && yPos < 800)) {
        document.getElementById("background").style.background = onePixelDo(true, 50, 100, 50); // gold
    } else if ((xPos > 100 && xPos < 150 && yPos > 0 && yPos < 50) || (xPos > 400 && xPos < 450 && yPos > 0 && yPos < 50) || (xPos > 700 && xPos < 750 && yPos > 50 && yPos < 100) || (xPos > 900 && xPos < 950 && yPos > 50 && yPos < 100) || (xPos > 850 && xPos < 900 && yPos > 100 && yPos < 150) || (xPos > 500 && xPos < 550 && yPos > 100 && yPos < 150) || (xPos > 300 && xPos < 350 && yPos > 100 && yPos < 150) || (xPos > 100 && xPos < 150 && yPos > 100 && yPos < 150) || (xPos > 50 && xPos < 100 && yPos > 200 && yPos < 250) || (xPos > 350 && xPos < 400 && yPos > 200 && yPos < 250) || (xPos > 600 && xPos < 650 && yPos > 150 && yPos < 200) || (xPos > 100 && xPos < 150 && yPos > 350 && yPos < 400) || (xPos > 350 && xPos < 400 && yPos > 350 && yPos < 400) || (xPos > 500 && xPos < 550 && yPos > 250 && yPos < 300) || (xPos > 650 && xPos < 700 && yPos > 300 && yPos < 350) || (xPos > 750 && xPos < 800 && yPos > 250 && yPos < 300) || (xPos > 850 && xPos < 900 && yPos > 250 && yPos < 300) || (xPos > 900 && xPos < 950 && yPos > 250 && yPos < 300) || (xPos > 850 && xPos < 900 && yPos > 350 && yPos < 400) || (xPos > 200 && xPos < 250 && yPos > 400 && yPos < 450) || (xPos > 450 && xPos < 500 && yPos > 450 && yPos < 500) || (xPos > 550 && xPos < 600 && yPos > 450 && yPos < 500) || (xPos > 650 && xPos < 700 && yPos > 450 && yPos < 500) || (xPos > 750 && xPos < 800 && yPos > 400 && yPos < 450) || (xPos > 750 && xPos < 800 && yPos > 450 && yPos < 500) || (xPos > 850 && xPos < 900 && yPos > 450 && yPos < 500) || (xPos > 950 && xPos < 1000 && yPos > 450 && yPos < 500) || (xPos > 100 && xPos < 150 && yPos > 500 && yPos < 550) || (xPos > 0 && xPos < 50 && yPos > 550 && yPos < 600) || (xPos > 0 && xPos < 50 && yPos > 850 && yPos < 900) || (xPos > 0 && xPos < 50 && yPos > 900 && yPos < 950) || (xPos > 100 && xPos < 150 && yPos > 900 && yPos < 950) || (xPos > 100 && xPos < 150 && yPos > 800 && yPos < 850) || (xPos > 150 && xPos < 200 && yPos > 700 && yPos < 750) || (xPos > 250 && xPos < 300 && yPos > 600 && yPos < 650) || (xPos > 250 && xPos < 300 && yPos > 750 && yPos < 800) || (xPos > 350 && xPos < 400 && yPos > 700 && yPos < 750) || (xPos > 500 && xPos < 550 && yPos > 550 && yPos < 600) || (xPos > 700 && xPos < 750 && yPos > 600 && yPos < 650) || (xPos > 650 && xPos < 700 && yPos > 700 && yPos < 750) || (xPos > 900 && xPos < 950 && yPos > 650 && yPos < 700) || (xPos > 200 && xPos < 250 && yPos > 900 && yPos < 950) || (xPos > 250 && xPos < 300 && yPos > 950 && yPos < 1000) || (xPos > 350 && xPos < 400 && yPos > 900 && yPos < 950) || (xPos > 400 && xPos < 450 && yPos > 800 && yPos < 850) || (xPos > 500 && xPos < 550 && yPos > 950 && yPos < 1000) || (xPos > 550 && xPos < 600 && yPos > 900 && yPos < 950) || (xPos > 650 && xPos < 700 && yPos > 900 && yPos < 950) || (xPos > 800 && xPos < 850 && yPos > 850 && yPos < 900) || (xPos > 800 && xPos < 850 && yPos > 950 && yPos < 1000) || (xPos > 900 && xPos < 950 && yPos > 850 && yPos < 900) || (xPos > 900 && xPos < 950 && yPos > 950 && yPos < 1000)) {
        document.getElementById("background").style.background = onePixelDo(true, 0, 0, 50); // stone
    } else {
        document.getElementById("background").style.background = onePixelDo(true, 40, 100, 20); // dirt
    };

};

function backgroundRainbow(event) {

    let xPos = event.clientX;
    let yPos = event.clientY;

    document.getElementById("background").style.background = onePixelDo(
        true,
        (360 / 1000) * xPos,
        30 + (70 / 1000) * yPos,
        50
    );

};