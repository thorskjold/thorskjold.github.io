// toggle desktop-mobile mode

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.getElementById('mobile').style.display = "flex"
} else {
    document.getElementById("desktop").style.display = "flex"
}

// start or restart the game

function start() {

    // hide the start window
    document.getElementById("window").style.display = "none";

    // define players alive
    let players = ["1", "2", "3", "4"];

    // choose a random player
    let random = Math.floor(Math.random() * 4);
    next = players[random];
    window.characters["receiving"] = next;

    // communicate to controllers
    sendMessage(JSON.stringify(window.characters));
    console.log("Game started!");

}

function restart() {

    // stop the winner sound effect
    document.getElementById("winner").pause();
    document.getElementById("winner").currentTime = 0;

    // hide the final window
    document.getElementById("final").style.display = "none";

    // reset data structure
    structure();

    // define players alive
    let players = ["1", "2", "3", "4"];

    // choose a random player
    let random = Math.floor(Math.random() * 4);
    next = players[random];
    window.characters["receiving"] = next;

    // communicate to controllers
    sendMessage(JSON.stringify(window.characters));
    console.log("Game started!");

}