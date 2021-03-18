// --- sendEvent -----------------------------------

function sendEvent(event) {

    var alpha = event.alpha; // 0, 360
    var beta = event.beta; // -180, 180
    var gamma = event.gamma; // -180, 180

    /* is true if window.beta not initialized
    or difference between new and most recent beta is greater than 2 */

    if (window.beta == null || Math.abs(window.beta - beta) > 2) {

        if (window.option == 'hue') {
            sendMessage(['H', beta].toString());
        };
    
        if (window.option == 'saturation') {
            sendMessage(['S', beta].toString());
        };
    
        if (window.option == 'light') {
            sendMessage(['L', beta].toString());
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