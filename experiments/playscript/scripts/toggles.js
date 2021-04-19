// toggle desktop-mobile mode

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.getElementById('mobile').style.display = "flex"
} else {
    document.getElementById("desktop").style.display = "flex"
}

// focus on a player

window.focusing = false;

function full(player) {

    if (window.focusing) {

        document.getElementById("circle1").style.display = "block";
        document.getElementById("circle2").style.display = "block";
        document.getElementById("circle3").style.display = "block";
        document.getElementById("circle4").style.display = "block";

        document.getElementById("player1").style.display = "flex";
        document.getElementById("player2").style.display = "flex";
        document.getElementById("player3").style.display = "flex";
        document.getElementById("player4").style.display = "flex";

        document.getElementById("player1").style.width = "50vw";
        document.getElementById("player2").style.width = "50vw";
        document.getElementById("player3").style.width = "50vw";
        document.getElementById("player4").style.width = "50vw";
        document.getElementById("player1").style.height = "50vh";
        document.getElementById("player2").style.height = "50vh";
        document.getElementById("player3").style.height = "50vh";
        document.getElementById("player4").style.height = "50vh";

        window.focusing = false;

    } else {

        if (player != "player1") { document.getElementById("circle1").style.display = "none" }
        if (player != "player2") { document.getElementById("circle2").style.display = "none" }
        if (player != "player3") { document.getElementById("circle3").style.display = "none" }
        if (player != "player4") { document.getElementById("circle4").style.display = "none" }

        if (player != "player1") { document.getElementById("player1").style.display = "none" }
        if (player != "player2") { document.getElementById("player2").style.display = "none" }
        if (player != "player3") { document.getElementById("player3").style.display = "none" }
        if (player != "player4") { document.getElementById("player4").style.display = "none" }

        document.getElementById(player).style.width = "100vw";
        document.getElementById(player).style.height = "100vh";

        window.focusing = true;

    }

}

// show and hide popover

window.isPresented = false;
let blurred = ["toolbar", "center", "option1", "option2", "option3", "option4", "option5"];

function popover(content) {

    // present or hide
    if (window.isPresented) {

        // remove blur filter
        blurred.forEach(function (item, index) {
            document.getElementById(item).style.filter = ""
        });

        document.getElementById("popover").style.animationName = "hide";

        setTimeout(function() {
            document.getElementById("overlay").style.display = "none";
            document.getElementById("controllers").style.display = "none";
            document.getElementById("forces").style.display = "none";
            document.getElementById("groups").style.display = "none";
            document.getElementById("colors").style.display = "none";
            document.getElementById("balls").style.display = "none";
        }, 250);

    } else {

        // blur out everything else
        blurred.forEach(function (item, index) {
            document.getElementById(item).style.filter = "blur(20px)"
        });

        switch(content) {
            case "controllers": document.getElementById("controllers").style.display = "flex"; document.getElementById("option1").style.filter = ""; break;
            case "forces": document.getElementById("forces").style.display = "flex"; document.getElementById("option2").style.filter = ""; break;
            case "groups": document.getElementById("groups").style.display = "flex"; document.getElementById("option3").style.filter = ""; break;
            case "colors": document.getElementById("colors").style.display = "flex"; document.getElementById("option4").style.filter = ""; break;
            case "balls": document.getElementById("balls").style.display = "flex"; document.getElementById("option5").style.filter = ""; break;
        }

        document.getElementById("popover").style.animationName = "present";
        document.getElementById("overlay").style.display = "flex";

    }

    window.isPresented = !window.isPresented;

}