// start or restart the game

function start() {

    // hide the start window
    document.getElementById("window").style.animationName = "hide"
    setTimeout(function() {
        document.getElementById("window").style.display = "none"
    }, 250);

    // request first player response
    request();

}

function restart() {

    // reset playingfield
    document.getElementById("player1").style.animationName = "present"; setTimeout(function() { document.getElementById("player1").style.opacity = "1" }, 1900);
    document.getElementById("player2").style.animationName = "present"; setTimeout(function() { document.getElementById("player2").style.opacity = "1" }, 1900);
    document.getElementById("player3").style.animationName = "present"; setTimeout(function() { document.getElementById("player3").style.opacity = "1" }, 1900);
    document.getElementById("player4").style.animationName = "present"; setTimeout(function() { document.getElementById("player4").style.opacity = "1" }, 1900);

    // stop the winner sound effect
    document.getElementById("winner").pause();
    document.getElementById("winner").currentTime = 0;

    // hide the final window
    document.getElementById("final").style.animationName = "hide"
    setTimeout(function() {
        document.getElementById("final").style.display = "none"
    }, 250)

    // reset data structure
    structure();

    // request first player response
    request();

}