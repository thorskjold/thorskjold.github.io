// start the game

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

// restart the game

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

// finish the game

function finish() {

    // assign placements
    if (window.viewport[1]["placement"] == 0) { window.viewport[1]["placement"] = 1; document.getElementById("player1").style.animationName = "hide"; setTimeout(function() { document.getElementById("player1").style.opacity = "0" }, 1900) }
    if (window.viewport[2]["placement"] == 0) { window.viewport[2]["placement"] = 1; document.getElementById("player2").style.animationName = "hide"; setTimeout(function() { document.getElementById("player2").style.opacity = "0" }, 1900) }
    if (window.viewport[3]["placement"] == 0) { window.viewport[3]["placement"] = 1; document.getElementById("player3").style.animationName = "hide"; setTimeout(function() { document.getElementById("player3").style.opacity = "0" }, 1900) }
    if (window.viewport[4]["placement"] == 0) { window.viewport[4]["placement"] = 1; document.getElementById("player4").style.animationName = "hide"; setTimeout(function() { document.getElementById("player4").style.opacity = "0" }, 1900) }
    document.getElementById("place" + window.viewport[1]["placement"]).src = "visuals/vectors/soccer.svg";
    document.getElementById("place" + window.viewport[2]["placement"]).src = "visuals/vectors/volley.svg";
    document.getElementById("place" + window.viewport[3]["placement"]).src = "visuals/vectors/tennis.svg";
    document.getElementById("place" + window.viewport[4]["placement"]).src = "visuals/vectors/basketball.svg";

    // present final window
    document.getElementById("final").style.animationName = "present";
    document.getElementById("final").style.display = "flex";

    // player winner sound
    document.getElementById("winner").play();

}