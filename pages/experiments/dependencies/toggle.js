// change orientation-based styles when window resizes

/*
window.addEventListener("resize", () => {

    if (window.innerHeight > window.innerWidth) {
            
        // portrait orientation

        document.getElementById("window").style.flexDirection = "column";

        document.getElementById("background").style.marginTop = "5%";
        document.getElementById("background").style.marginLeft = "5%";
        document.getElementById("background").style.marginRight = "5%";
        document.getElementById("background").style.width = "90%";
        document.getElementById("background").style.height = "100%";

        document.getElementById("menu").style.width = "100%";
        document.getElementById("menu").style.height = "110px";

        document.getElementById("controls").style.width = "90%";
        document.getElementById("controls").style.height = "100%";
        document.getElementById("controls").style.flexDirection = "row";
        document.getElementById("controls").style.marginLeft = "5%";
        document.getElementById("controls").style.marginRight = "5%";

    } else {

        // landscape orientation

        document.getElementById("window").style.flexDirection = "row";

        document.getElementById("background").style.marginTop = "5vh";
        document.getElementById("background").style.marginLeft = "5vh";
        document.getElementById("background").style.marginBottom = "5vh";
        document.getElementById("background").style.width = "100%";
        document.getElementById("background").style.height = "90%";

        document.getElementById("menu").style.width = "110px";
        document.getElementById("menu").style.height = "100%";

        document.getElementById("controls").style.width = "100%";
        document.getElementById("controls").style.height = "90%";
        document.getElementById("controls").style.flexDirection = "column";
        document.getElementById("controls").style.marginTop = "5vh";
        document.getElementById("controls").style.marginBottom = "5vh";

    };

});
*/

// toggle fullscreen background

window.toggled = false;

function toggle() {

    window.toggled = !window.toggled;

    if (window.toggled) {

        // portrait and landscape orientation

        document.getElementById("controls").style.opacity = "0";
        document.getElementById("controls").style.transitionDelay = "0s";

        document.getElementById("background").style.borderRadius = "0";

        if (window.innerHeight > window.innerWidth) {
            
            // portrait orientation

            document.getElementById("menu").style.height = "0";

            document.getElementById("background").style.marginTop = "0";
            document.getElementById("background").style.marginLeft = "0";
            document.getElementById("background").style.marginRight = "0";
            document.getElementById("background").style.width = "100%";

        } else {

            // landscape orientation

            document.getElementById("menu").style.width = "0";

            document.getElementById("background").style.marginTop = "0";
            document.getElementById("background").style.marginLeft = "0";
            document.getElementById("background").style.marginBottom = "0";
            document.getElementById("background").style.height = "100%";

        };

    } else {

        // portrait and landscape orientation

        document.getElementById("controls").style.opacity = "1";
        document.getElementById("controls").style.transitionDelay = "0.15s";

        document.getElementById("background").style.borderRadius = "10px";

        if (window.innerHeight > window.innerWidth) {
            
            // portrait orientation

            document.getElementById("menu").style.height = "110px";

            document.getElementById("background").style.marginTop = "25px";
            document.getElementById("background").style.marginLeft = "25px";
            document.getElementById("background").style.marginRight = "25px";
            
            // NEEDS TO BE MADE CROSS-BROWSER COMPATIBLE
            document.getElementById("background").style.width = "calc(100% - 50px)";

        } else {

            // landscape orientation

            document.getElementById("menu").style.width = "110px";

            document.getElementById("background").style.marginTop = "25px";
            document.getElementById("background").style.marginLeft = "25px";
            document.getElementById("background").style.marginBottom = "25px";

            // NEEDS TO BE MADE CROSS-BROWSER COMPATIBLE
            document.getElementById("background").style.height = "calc(100% - 50px)";

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