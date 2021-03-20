// determine browser

var ua = window.navigator.userAgent;
var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
var webkit = !!ua.match(/WebKit/i);
var iOSSafari = iOS && webkit && !ua.match(/CriOS/i);

// content rotation

function rotate() {

    if (window.innerHeight > window.innerWidth) {

        // vertical

        document.getElementById("window").classList.remove("windowH");
        document.getElementById("background").classList.remove("backgroundH");
        document.getElementById("menu").classList.remove("menuH");
        document.getElementById("controls").classList.remove("controlsH");

        document.getElementById("window").classList.add("windowV");
        document.getElementById("background").classList.add("backgroundV");
        document.getElementById("menu").classList.add("menuV");
        document.getElementById("controls").classList.add("controlsV");

        if (navigator.userAgent.indexOf('AppleWebKit') != -1) {

            document.getElementById("html").classList.remove("htmlHW");
            document.getElementById("body").classList.remove("bodyHW");

            document.getElementById("html").classList.add("htmlVW");
            document.getElementById("body").classList.add("bodyVW");

        };

        if (window.toggled) {
            
            document.getElementById("controls").classList.remove("controlsHT");
            document.getElementById("background").classList.remove("backgroundHT");
            document.getElementById("menu").classList.remove("menuHT");

            document.getElementById("controls").classList.add("controlsVT");
            document.getElementById("background").classList.add("backgroundVT");
            document.getElementById("menu").classList.add("menuVT");

        };

    } else {

        // horizontal

        document.getElementById("window").classList.remove("windowV");
        document.getElementById("background").classList.remove("backgroundV");
        document.getElementById("menu").classList.remove("menuV");
        document.getElementById("controls").classList.remove("controlsV");

        document.getElementById("window").classList.add("windowH");
        document.getElementById("background").classList.add("backgroundH");
        document.getElementById("menu").classList.add("menuH");
        document.getElementById("controls").classList.add("controlsH");

        if (navigator.userAgent.indexOf('AppleWebKit') != -1) {

            document.getElementById("html").classList.remove("htmlVW");
            document.getElementById("body").classList.remove("bodyVW");

            document.getElementById("html").classList.add("htmlHW");
            document.getElementById("body").classList.add("bodyHW");
            
        };

        if (window.toggled) {
            
            document.getElementById("controls").classList.remove("controlsVT");
            document.getElementById("background").classList.remove("backgroundVT");
            document.getElementById("menu").classList.remove("menuVT");

            document.getElementById("controls").classList.add("controlsHT");
            document.getElementById("background").classList.add("backgroundHT");
            document.getElementById("menu").classList.add("menuHT");

        };

    };

};

rotate(); // initial page rotation
window.addEventListener("resize", rotate); // rotation on window resize aka orientation change

// toggle fullscreen background

window.toggled = false;

function toggle() {

    window.toggled = !window.toggled; // toggle variable

    if (window.toggled) {

        if (window.innerHeight > window.innerWidth) {

            // vertical

            document.getElementById("controls").classList.add("controlsVT");
            document.getElementById("background").classList.add("backgroundVT");
            document.getElementById("menu").classList.add("menuVT");

        } else {

            // horizontal

            document.getElementById("controls").classList.add("controlsHT");
            document.getElementById("background").classList.add("backgroundHT");
            document.getElementById("menu").classList.add("menuHT");

        };

    } else {

        if (window.innerHeight > window.innerWidth) {

            // vertical

            document.getElementById("controls").classList.remove("controlsVT");
            document.getElementById("background").classList.remove("backgroundVT");
            document.getElementById("menu").classList.remove("menuVT");

        } else {

            // horizontal

            document.getElementById("controls").classList.remove("controlsHT");
            document.getElementById("background").classList.remove("backgroundHT");
            document.getElementById("menu").classList.remove("menuHT");

        };

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