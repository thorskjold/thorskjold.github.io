// toggle desktop-mobile mode

window.mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

if (window.mobile) {
    document.getElementById('mobile').style.display = "flex"
} else {
    document.getElementById("desktop").style.display = "flex"
}

// start or restart the game

function start() {

    // hide the start window
    document.getElementById("window").style.animationName = "hide"
    setTimeout(function() {
        document.getElementById("window").style.display = "none"
    }, 250);

    // RANDOMIZE
    let players = []
    if (window.characters["1"]["alive"]) { players.push("1") }
    if (window.characters["2"]["alive"]) { players.push("2") }
    if (window.characters["3"]["alive"]) { players.push("3") }
    if (window.characters["4"]["alive"]) { players.push("4") }
    window.characters["receiving"] = players[Math.floor(Math.random() * players.length)];

    // communicate to controllers
    sendMessage(JSON.stringify(window.characters));

}

function restart() {

    // reset playfields
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
    }, 250);

    // reset data structure
    structure();

    // RANDOMIZE
    let players = []
    if (window.characters["1"]["alive"]) { players.push("1") }
    if (window.characters["2"]["alive"]) { players.push("2") }
    if (window.characters["3"]["alive"]) { players.push("3") }
    if (window.characters["4"]["alive"]) { players.push("4") }
    window.characters["receiving"] = players[Math.floor(Math.random() * players.length)];

    // communicate to controllers
    sendMessage(JSON.stringify(window.characters));

}

window.swiping = false
function swipe() {
    if (window.swiping) {
        document.getElementById("swipe").style.opacity = "0.2";
        document.getElementById("gesture").style.display = "none";
        document.getElementById("styles").style.display = "flex";
        document.getElementById("character").style.display = "block";
    } else {
        document.getElementById("swipe").style.opacity = "1";
        document.getElementById("gesture").style.display = "block";
        document.getElementById("styles").style.display = "none";
        document.getElementById("character").style.display = "none";
    }
    window.swiping = !window.swiping
}