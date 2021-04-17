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
window.X = 0;
window.Y = 0;
window.Z = 0;

// reload scrolling

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

// count reset

function reset() {

    document.getElementById("reset").style.display = "none";
    document.getElementById("stepper").innerHTML = "";
    window.count = 0;

};

// stepper

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
        count1.classList.add("slice");
        count1.innerHTML = parseInt(window.A);
        content.append(count1);

        count2 = document.createElement('div');
        count2.classList.add("slice");
        count2.innerHTML = parseInt(window.B);
        content.append(count2);

        count3 = document.createElement('div');
        count3.classList.add("slice");
        count3.innerHTML = parseInt(window.G);
        content.append(count3);

        count7 = document.createElement('div');
        count7.classList.add("slice");
        count7.style.textAlign = "end";
        count7.innerHTML = "#" + window.count;
        content.append(count7);

        // write to DOM
        horizontal.append(content);
        stepper.prepend(horizontal);

    };
};

// recorder reset

function rerecord() {
    var elements = document.getElementsByClassName('empty');
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = "none";
    };
}

// recorder

window.recording = false;
let format = { "X":[], "Y":[], "Z":[] };
window.records = format;

function record() {

    if (window.recording) {

        // show values
        var elements = document.getElementsByClassName('empty');
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.display = "flex";
        };

        // reset record button
        document.getElementById('red').setAttribute('d', 'M52 30 C52 17.85 42.15 8 30 8 17.85 8 8 17.85 8 30 8 42.15 17.85 52 30 52 42.15 52 52 42.15 52 30 Z');
        document.getElementById('red').setAttribute('fill', '#fd3d30');

        // median calculation
        const median = arr => {

            const mid = Math.floor(arr.length / 2),
            nums = [...arr].sort((a, b) => a - b);
            return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;

        };

        // average calculation
        let average = (array) => array.reduce((a, b) => a + b) / array.length;

        // assign values to DOM
        for (let parameter in window.records) {

            document.getElementById('min' + parameter).innerHTML = parseInt(Math.min(...window.records[parameter]));
            document.getElementById('max' + parameter).innerHTML = parseInt(Math.max(...window.records[parameter]));
            document.getElementById('med' + parameter).innerHTML = parseInt(median(window.records[parameter]));
            document.getElementById('avg' + parameter).innerHTML = parseInt(average(window.records[parameter]));
            
        }

        // reset record button and records
        window.recording = false;

    } else {

        // hide values
        var elements = document.getElementsByClassName('empty');
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.display = "none";
        };

        // change record button
        document.getElementById('red').setAttribute('d', 'M24 19 C21.239 19 19 21.239 19 24 L19 36 C19 38.761 21.239 41 24 41 L36 41 C38.761 41 41 38.761 41 36 L41 24 C41 21.239 38.761 19 36 19 Z');

        // reset values
        for (let parameter in window.records) {

            window.records[parameter] = [];

            document.getElementById('min' + parameter).innerHTML = "";
            document.getElementById('max' + parameter).innerHTML = "";
            document.getElementById('med' + parameter).innerHTML = "";
            document.getElementById('avg' + parameter).innerHTML = "";
            
        }

        // initialize recording
        window.recording = true;

    };

};

// filters

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
    var elements = document.getElementsByClassName('empty');
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = "none";
    };
    document.getElementById("request").style.display = "none";
};

// recalibrate device orientation

function recalibrate() {

    // remove device orientation and motion
    window.removeEventListener("deviceorientation", orient);
    window.removeEventListener("devicemotion", motion);

    // set color for alpha, beta, gamma, x, y, z
    document.getElementById("alpha").classList.add("orange");
    document.getElementById("beta").classList.add("orange");
    document.getElementById("gamma").classList.add("orange");
    document.getElementById("x").classList.add("orange");
    document.getElementById("y").classList.add("orange");
    document.getElementById("z").classList.add("orange");

    // remove alpha, beta, gamma, x, y, z color after 500 ms delay
    setTimeout(function() {

        document.getElementById("alpha").classList.remove("orange");
        document.getElementById("beta").classList.remove("orange");
        document.getElementById("gamma").classList.remove("orange");
        document.getElementById("x").classList.remove("orange");
        document.getElementById("y").classList.remove("orange");
        document.getElementById("z").classList.remove("orange");

    }, 500);

    // add device orientation
    assign();

};

// event listeners for alpha, beta, gamma, x, y, z

function orient(event) {

    if (window.noise) {
        // delay updates 300ms to avoid flickering numbers
        var now = Date.now();
        if (now - window.lastExecution1 < 300) return;
        window.lastExecution1 = now;
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

function motion(event) {

    if (window.recording) {
        window.records["X"].push(Math.abs(event.acceleration.x));
        window.records["Y"].push(Math.abs(event.acceleration.y));
        window.records["Z"].push(Math.abs(event.acceleration.z));
    }

    if (window.noise) {
        // delay updates 300ms to avoid flickering numbers
        var now = Date.now();
        if (now - window.lastExecution2 < 300) return;
        window.lastExecution2 = now;
    };

    // thresholding measurements
    if (window.slow) {

        if (window.X != null && Math.abs(window.X - event.acceleration.x) > 0.05) {
            var X = event.acceleration.x;
        } else {
            var X = window.X;
        };

        if (window.Y != null && Math.abs(window.Y - event.acceleration.y) > 0.05) {
            var Y = event.acceleration.y;
        } else {
            var Y = window.Y;
        };

        if (window.Z != null && Math.abs(window.Z - event.acceleration.z) > 0.05) {
            var Z = event.acceleration.z;
        } else {
            var Z = window.Z;
        };

    } else {

        var X = event.acceleration.x;
        var Y = event.acceleration.y;
        var Z = event.acceleration.z;

    };

    // rounding numbers
    if (window.round) {
        document.getElementById("x").innerHTML = parseInt(X);
        document.getElementById("y").innerHTML = parseInt(Y);
        document.getElementById("z").innerHTML = parseInt(Z);
    } else {
        document.getElementById("x").innerHTML = X;
        document.getElementById("y").innerHTML = Y;
        document.getElementById("z").innerHTML = Z;
    };

    window.X = X;
    window.Y = Y;
    window.Z = Z;

};

function assign() {

    window.lastExecution1;
    window.addEventListener("deviceorientation", orient);
    window.lastExecution2;
    window.addEventListener("devicemotion", motion);

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