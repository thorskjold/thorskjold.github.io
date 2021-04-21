// toggle desktop-mobile mode

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.getElementById('mobile').style.display = "flex"
} else {
    document.getElementById("desktop").style.display = "flex"
}

// start or restart the game

function start() {

    // hide the start window
    document.getElementById("window").style.display = "none"

    // define players alive
    let players = []
    if (window.characters["1"]["alive"]) { players.push(1) }
    if (window.characters["2"]["alive"]) { players.push(2) }
    if (window.characters["3"]["alive"]) { players.push(3) }
    if (window.characters["4"]["alive"]) { players.push(4) }

    // choose a random player
    let random = Math.floor(Math.random() * 4);
    next = players[random];
    window.characters["receiving"] = next;

    // communicate to controllers
    sendMessage(JSON.stringify(window.characters));
    console.log("Game started!");

}