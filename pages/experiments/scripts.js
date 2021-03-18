// toggle fullscreen background

window.toggled = false;

function toggle() {

    window.toggled = !window.toggled;

    if (window.toggled) {

        document.getElementById("menu").style.height = "0";
        document.getElementById("controls").style.opacity = "0";

        document.getElementById("background").style.marginTop = "0%";
        document.getElementById("background").style.marginLeft = "0%";
        document.getElementById("background").style.marginRight = "0%";
        document.getElementById("background").style.width = "100%";
        document.getElementById("background").style.borderRadius = "0";

    } else {

        document.getElementById("menu").style.height = "125px";
        document.getElementById("controls").style.opacity = "1";

        document.getElementById("background").style.marginTop = "5%";
        document.getElementById("background").style.marginLeft = "5%";
        document.getElementById("background").style.marginRight = "5%";
        document.getElementById("background").style.width = "90%";
        document.getElementById("background").style.borderRadius = "10px";

    };

};

// toggle selected control

function select(control) {

    if (window.selected != null) {
        document.getElementById(window.selected).classList.remove("selected");
    };

    document.getElementById(control).classList.add("selected");

    window.selected = control;

};

// OLD CODE BEYOND THIS LINE ------------------------------------------------------------------------------------------------------------------------------

// EXPERIMENT 3

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

document.getElementById("background").style.background = "rgb(255, 255, 255)";

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

    document.getElementById("background").style.background = onePixelDo(true, hue, saturation, light);

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

    /* is true if window.beta not initialized
    or difference between new and most recent beta is greater than 2 */

    if (window.beta == null || Math.abs(window.beta - beta) > 2) {

        if (window.option == 'hue') {
            sendMessage(['hue', beta].toString());
        };
    
        if (window.option == 'saturation') {
            sendMessage(['saturation', beta].toString());
        };
    
        if (window.option == 'light') {
            sendMessage(['light', beta].toString());
        };
        
        window.beta = beta;

    };

};

// permission request and redirect

function grantPermission(behavior) {

    window.removeEventListener("deviceorientation", sendEvent);

    window.option = behavior;
    window.addEventListener("deviceorientation", sendEvent);

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') {
                        if (behavior == "hue" || behavior == "saturation" || behavior == "light") {
                            window.option = behavior;
                            window.addEventListener("deviceorientation", sendEvent);
                        }
                    }
                })
                .catch(console.error);
        };
    } else {
        if (behavior == "hue" || behavior == "saturation" || behavior == "light") {
            window.option = behavior;
            window.addEventListener("deviceorientation", sendEvent);
        }
    };

};