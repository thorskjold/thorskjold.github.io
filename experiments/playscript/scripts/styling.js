// listen for changes to selections

/*
document.getElementById("styles").addEventListener('change', () => {
    window.character["skin"] = document.getElementById("styles").value;
    document.getElementById("character").src = "visuals/characters/" + window.character["skin"] + ".png";
});
*/

// set player

function control(player) {
    if (window.character["controller"] != "0") {
        document.getElementById("controller" + window.character["controller"]).classList.remove("select");
    }
    window.character["controller"] = player;
    document.getElementById("controller" + window.character["controller"]).classList.add("select");
}