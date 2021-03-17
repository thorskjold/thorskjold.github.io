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
    window.audio.currentTime = 0;
    clearInterval(window.running);
    document.body.style.background = rgb(0, 0, 0);
    document.getElementById("difference").innerHTML = 0;
    document.getElementById("delay").value = 1000;
    window.delay = 1000;
    
};

function setDelay(delay) {
    window.delay = delay;
};

function setBackground(colors) {

    window.audio.pause();
    window.audio.currentTime = 0;
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
    window.removeEventListener("deviceorientation", backgroundSky);
    window.removeEventListener("deviceorientation", backgroundAstro);
    window.removeEventListener("mousemove", backgroundDigging);
    window.removeEventListener("mousemove", backgroundRainbow);
    
    document.getElementById("fade").checked = false;
    document.getElementById("activate").checked = false;
    document.getElementById("sky").checked = false;
    document.getElementById("astro").checked = false;
    document.getElementById("digging").checked = false;
    document.getElementById("rainbow").checked = false;
    document.getElementById("difference").innerHTML = 0;

    document.body.style.background = rgb(0, 0, 0);

};

function backgroundActivate(event) {

    var beta = event.beta; // In degree in the range [-180,180)

    if (beta > 10 && beta < 100) {
        document.body.style.background = onePixelDo(window.fade.checked, 0, 100, 100); // black
    } else {
        document.body.style.background = onePixelDo(window.fade.checked, 0, 0, 0); // black
    }

};

function backgroundSky(event) {

    var beta = event.beta; // In degree in the range [-180,180)

    if (Math.abs(beta) > 160) {
        document.body.style.background = onePixelDo(window.fade.checked, 50, 100, 50); // sun
    } else if (Math.abs(beta) > 90) {
        document.body.style.background = onePixelDo(window.fade.checked, 200, 100, 50 + (50 / 70 * (Math.abs(beta) - 90))); // sky
    } else if (Math.abs(beta) > 70) {
        document.body.style.background = onePixelDo(window.fade.checked, 100, 70, 30); // dirt
    } else {
        document.body.style.background = onePixelDo(window.fade.checked, 40, 100, 20); // dirt
    };

};

function backgroundAstro(event) {

    var beta = event.beta; // In degree in the range [-180,180)

    if (Math.abs(beta) > 160) {
        document.body.style.background = onePixelDo(window.fade.checked, 100, 100, 100); // star
    } else if (Math.abs(beta) > 90) {
        document.body.style.background = onePixelDo(window.fade.checked, 200, 100, 30 - (30 / 70 * (Math.abs(beta) - 90))); // night sky
    } else if (Math.abs(beta) > 70) {
        document.body.style.background = onePixelDo(window.fade.checked, 100, 70, 10); // dirt
    } else {
        document.body.style.background = onePixelDo(window.fade.checked, 40, 100, 10); // dirt
    };

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
    window.removeEventListener("deviceorientation", backgroundSky);
    window.removeEventListener("deviceorientation", backgroundAstro);
    window.removeEventListener("mousemove", backgroundDigging);
    window.removeEventListener("mousemove", backgroundRainbow);
    window.addEventListener("deviceorientation", sendEvent);
    window.option = behavior;

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') {
                        if (behavior == "activate") {
                            window.addEventListener("deviceorientation", backgroundActivate);
                        }
                        if (behavior == "sky") {
                            window.addEventListener("deviceorientation", backgroundSky);
                        }
                        if (behavior == "astro") {
                            window.addEventListener("deviceorientation", backgroundAstro);
                        }
                        if (behavior == "digging") {
                            window.addEventListener("mousemove", backgroundDigging);
                        }
                        if (behavior == "rainbow") {
                            window.addEventListener("mousemove", backgroundRainbow);
                        }
                        if (behavior == "hue" || behavior == "saturation" || behavior == "light") {
                            window.addEventListener("deviceorientation", sendEvent);
                        }
                    }
                })
                .catch(console.error);
        };
    } else {
        if (behavior == "activate") {
            window.addEventListener("deviceorientation", backgroundActivate);
        }
        if (behavior == "sky") {
            window.addEventListener("deviceorientation", backgroundSky);
        }
        if (behavior == "astro") {
            window.addEventListener("deviceorientation", backgroundAstro);
        }
        if (behavior == "digging") {
            window.addEventListener("mousemove", backgroundDigging);
        }
        if (behavior == "rainbow") {
            window.addEventListener("mousemove", backgroundRainbow);
        }
        if (behavior == "hue" || behavior == "saturation" || behavior == "light") {
            window.addEventListener("deviceorientation", sendEvent);
        }
    };

};

/* experiment 3 */

// --- SETTING UP --------------------------------------

const myBroker = "wss://edp21:Ko5z2bU0Uf7ajNzv@edp21.cloud.shiftr.io"; 
const myID = "itu" + parseInt(Math.random() * 1000000, 10); //Construct a random unique ID
const client = mqtt.connect(myBroker, {clientId: myID});

// --- CONNECTING--------------------------------------

client.on('connect', function() {
  console.log('connected!');
  client.subscribe(myTopic);
});

// --- SEND MESchromath.min.jsSAGE --------------------------------------

function sendMessage(msg) {
  client.publish(myTopic, msg);
};

// --- RECEIVING MESSAGE --------------------------------------

client.on('message', function(topic, message) {

    // convert received data

    let msg = message.toString();
    console.log(msg);

    let values = msg.split(",");

    // get current background

    currentBackground = document.getElementById("background").style.background; // current Background RGB string
    cBA = currentBackground.slice(4, -1).split(","); // current Background Array
    cBH = RGBtoHSL(cBA[0], cBA[1], cBA[2]); // current Background HSL
    [hue, saturation, light] = [cBH[0]*360, cBH[1]*100, cBH[2]*100]; // convert HSL float % to HSL 360, 100%, 100%

    // filter received data

    if (values[0] == 'hue') {
        var hue = (100 / 360) * (360 / 180 * Math.abs(values[1]));
    };

    if (values[0] == 'saturation') {
        var saturation = 100 / 180 * Math.abs(values[1]);
    };

    if (values[0] == 'light') {
        var light = 100 / 180 * Math.abs(values[1]);
    };

    // set the new background

    document.body.style.background = onePixelDo(true, hue, saturation, light);

});

// RGB TO HSL

function RGBtoHSL(r, g, b) {

    r /= 255, g /= 255, b /= 255;
  
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
  
    if (max == min) {
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
    
        h /= 6;
    }
  
    return [ h, s, l ];

}

// --- sendEvent -----------------------------------

function sendEvent(event) {

    var alpha = event.alpha; // 0, 360
    var beta = event.beta; // -180, 180
    var gamma = event.gamma; // -180, 180

    if (window.option == 'hue') {
        sendMessage(['hue', beta].toString());
    };

    if (window.option == 'saturation') {
        sendMessage(['saturation', beta].toString());
    };

    if (window.option == 'light') {
        sendMessage(['light', beta].toString());
    };

};