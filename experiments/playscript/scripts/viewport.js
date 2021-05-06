// start or restart the game

function start() {

    if (window.viewport[1]["playing"] && window.viewport[2]["playing"] && window.viewport[3]["playing"] && window.viewport[4]["playing"]) {

        // hide the intro window
        document.getElementById("intro").style.animationName = "hide"
        setTimeout(function() {
            document.getElementById("intro").style.display = "none"
        }, 250);

        // request first player response
        setTimeout(function() {
            request()
        }, 2500);

    }

}

function restart() {

    // reset playfields
    let playfields = document.getElementsByClassName('playfield');
    for (var i = 0; i < playfields.length; ++i) {
        playfields[i].style.opacity = "0.5";
        playfields[i].style.animationName = "reincarnate";
        setTimeout(function() { playfields[i].style.opacity = "1" }, 1900);
    }
    
    // stop the winner sound effect
    document.getElementById("winner").pause();
    document.getElementById("winner").currentTime = 0;

    // hide the final window
    document.getElementById("final").style.animationName = "hide"
    setTimeout(function() {
        document.getElementById("final").style.display = "none";
        document.getElementById("final").style.animationName = "";
    }, 250)

    // reset data structure
    structure();

    // request first player response
    setTimeout(function() {
        request()
    }, 2500);

}