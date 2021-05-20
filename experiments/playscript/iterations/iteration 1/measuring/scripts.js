// illustration preloading
window.addEventListener('load', function () {
    document.getElementById("illustration").style.display = "block";
});

// initialization
document.addEventListener("touchstart", function(){}, true);
window.count = 0;
window.round = false;
window.slow = false;
window.noise = true;
window.A = 0;
window.B = 0;
window.G = 0;

// reload scrolling
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

// count reset and stepper

function reset() {

    document.getElementById("reset").style.display = "none";
    document.getElementById("stepper").innerHTML = "";
    window.count = 0;

};

function step() {
    
    if (window.A != null && window.B != null && window.G != null) {

        document.getElementById("reset").style.display = "block";

        window.count += 1;
        
        stepper = document.getElementById("stepper");

        // parent
        horizontal = document.createElement('div');
        horizontal.classList.add("horizontal");

        // first child
        content = document.createElement('div');
        content.classList.add("content");

        // second children
        count1 = document.createElement('div');
        count1.classList.add("quarter");
        count1.innerHTML = parseInt(window.A);
        content.append(count1);

        count2 = document.createElement('div');
        count2.classList.add("quarter");
        count2.innerHTML = parseInt(window.B);
        content.append(count2);

        count3 = document.createElement('div');
        count3.classList.add("quarter");
        count3.innerHTML = parseInt(window.G);
        content.append(count3);

        count4 = document.createElement('div');
        count4.classList.add("quarter");
        count4.style.textAlign = "end";
        count4.innerHTML = "#" + window.count;
        content.append(count4);

        // write to DOM
        horizontal.append(content);
        stepper.prepend(horizontal);

    };
};

// modifiers

function threshold() {

    if (document.getElementById("threshold").checked) {
        window.slow = true;
    } else {
        window.slow = false;
    };

};

function precision() {

    if (document.getElementById("rounded").checked) {
        window.round = true;
    } else {
        window.round = false;
    };
    
};

function reduce() {

    if (document.getElementById("noise").checked) {
        window.noise = true;
    } else {
        window.noise = false;
    };

};

// show content when permission granted

function granted() {
    var elements = document.getElementsByClassName('hidden');
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = "flex";
    };
    document.getElementById("request").style.display = "none";
};

// recalibrate device orientation

function recalibrate() {

    // remove device orientation
    window.removeEventListener("deviceorientation", measure);

    // set alpha, beta, gamma color
    document.getElementById("alpha").classList.add("orange");
    document.getElementById("beta").classList.add("orange");
    document.getElementById("gamma").classList.add("orange");

    // remove alpha, beta, gamma color after 500 ms delay
    setTimeout(function() {

        document.getElementById("alpha").classList.remove("orange");
        document.getElementById("beta").classList.remove("orange");
        document.getElementById("gamma").classList.remove("orange");

    }, 500);

    // add device orientation
    assign();

};

// event listeners for alpha, beta, gamma

function measure(event) {

    if (window.noise) {
        // delay updates 300ms to avoid flickering numbers
        var now = Date.now();
        if (now - window.lastExecution < 300) return;
        window.lastExecution = now;
    };

    // thresholding measurements
    if (window.slow) {

    if (window.A != null && Math.abs(window.A - event.alpha) > 2) {
        var A = event.alpha;
    } else {
        var A = window.A;
    };

    if (window.B != null && Math.abs(window.B - event.beta) > 2) {
        var B = event.beta;
    } else {
        var B = window.B;
    };

    if (window.G != null && Math.abs(window.G - event.gamma) > 2) {
        var G = event.gamma;
    } else {
        var G = window.G;
    };

    } else {
    var A = event.alpha;
    var B = event.beta;
    var G = event.gamma;
    };

    // rounding numbers
    if (window.round) {
        document.getElementById("alpha").innerHTML = parseInt(A);
        document.getElementById("beta").innerHTML = parseInt(B);
        document.getElementById("gamma").innerHTML = parseInt(G);
    } else {
        document.getElementById("alpha").innerHTML = A;
        document.getElementById("beta").innerHTML = B;
        document.getElementById("gamma").innerHTML = G;
    };

    window.A = A;
    window.B = B;
    window.G = G;

};

function assign() {

    window.lastExecution;
    window.addEventListener("deviceorientation", measure);

};

// sensor permission request

function request() {


    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    assign();
                    granted();
                };
            })
            .catch(console.error);
    } else {
        assign();
        granted();
    };

};