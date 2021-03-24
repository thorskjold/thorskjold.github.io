// experiment 3

window.cycle = "A";

function angle() {

    if (window.cycle == "A") {

        window.cycle = "B";
        document.getElementById("cycle").innerHTML = "B";

    } else if (window.cycle == "B") {

        window.cycle = "G";
        document.getElementById("cycle").innerHTML = "G";

    } else if (window.cycle == "G") {

        window.cycle = "A";
        document.getElementById("cycle").innerHTML = "A";

    };

};

function contribute(sensor) {

    window.removeEventListener("deviceorientation", sendEvent);

    window.option = sensor;
    window.addEventListener("deviceorientation", sendEvent);

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') {
                        if (sensor == "hue" || sensor == "saturation" || sensor == "light") {
                            window.option = sensor;
                            window.addEventListener("deviceorientation", sendEvent);
                        };
                    };
                })
                .catch(console.error);
        };
    } else {
        if (sensor == "hue" || sensor == "saturation" || sensor == "light") {
            window.option = sensor;
            window.addEventListener("deviceorientation", sendEvent);
        };
    };

};

function sendEvent(event) {

    var alpha = event.alpha; // 0, 360
    var beta = event.beta; // -180, 180
    var gamma = event.gamma; // -180, 180

    /* is true if window.alpha not initialized
    or difference between new and most recent alpha is greater than 2 */

    if (window.angle == "A") {

        alpha = parseInt(alpha); // round data before sending

        if (window.option == 'hue') {
            sendMessage(JSON.stringify(['H', window.angle, alpha]));
        };
    
        if (window.option == 'saturation') {
            sendMessage(JSON.stringify(['S', window.angle, alpha]));
        };
    
        if (window.option == 'light') {
            sendMessage(JSON.stringify(['L', window.angle, alpha]));
        };

    } else if (window.angle == "B") {
        
        beta = parseInt(beta); // round data before sending

        if (window.option == 'hue') {
            sendMessage(JSON.stringify(['H', window.angle, beta]));
        };
    
        if (window.option == 'saturation') {
            sendMessage(JSON.stringify(['S', window.angle, beta]));
        };
    
        if (window.option == 'light') {
            sendMessage(JSON.stringify(['L', window.angle, beta]));
        };

    } else if (window.angle == "G") {
        
        gamma = parseInt(gamma); // round data before sending

        if (window.option == 'hue') {
            sendMessage(JSON.stringify(['H', window.angle, gamma]));
        };
    
        if (window.option == 'saturation') {
            sendMessage(JSON.stringify(['S', window.angle, gamma]));
        };
    
        if (window.option == 'light') {
            sendMessage(JSON.stringify(['L', window.angle, gamma]));
        };

    };

};