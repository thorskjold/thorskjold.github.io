// experiment 3

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

    if (window.alpha == null || Math.abs(window.alpha - alpha) > 2) {

        window.alpha = alpha;

        alpha = parseInt(alpha); // round data before sending

        if (window.option == 'hue') {
            sendMessage(JSON.stringify(['H', alpha]));
        };
    
        if (window.option == 'saturation') {
            sendMessage(JSON.stringify(['S', alpha]));
        };
    
        if (window.option == 'light') {
            sendMessage(JSON.stringify(['L', alpha]));
        };

    };

};