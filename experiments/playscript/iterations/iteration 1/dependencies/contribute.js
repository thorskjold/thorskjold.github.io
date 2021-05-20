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

    if (window.cycle == "A") {

        alpha = parseInt(alpha); // round data before sending

        if (window.option == 'hue') {
            sendMessage(JSON.stringify(['H', window.cycle, alpha]));
        };
    
        if (window.option == 'saturation') {
            sendMessage(JSON.stringify(['S', window.cycle, alpha]));
        };
    
        if (window.option == 'light') {
            sendMessage(JSON.stringify(['L', window.cycle, alpha]));
        };

    } else if (window.cycle == "B") {
        
        beta = parseInt(beta); // round data before sending

        if (window.option == 'hue') {
            sendMessage(JSON.stringify(['H', window.cycle, beta]));
        };
    
        if (window.option == 'saturation') {
            sendMessage(JSON.stringify(['S', window.cycle, beta]));
        };
    
        if (window.option == 'light') {
            sendMessage(JSON.stringify(['L', window.cycle, beta]));
        };

    } else if (window.cycle == "G") {
        
        gamma = parseInt(gamma); // round data before sending

        if (window.option == 'hue') {
            sendMessage(JSON.stringify(['H', window.cycle, gamma]));
        };
    
        if (window.option == 'saturation') {
            sendMessage(JSON.stringify(['S', window.cycle, gamma]));
        };
    
        if (window.option == 'light') {
            sendMessage(JSON.stringify(['L', window.cycle, gamma]));
        };

    };

};