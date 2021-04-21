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

    // choose a random player
    let random = Math.floor(Math.random() * 4)
    next = window.characters["alive"][random]
    window.characters["receiving"] = next;

    // communicate to controllers
    sendMessage(JSON.stringify(window.characters));
    console.log("Game started!");

}