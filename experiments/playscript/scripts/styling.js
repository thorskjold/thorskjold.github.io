// data structure

window.character = {
    "locked" : false,
    "force" : 30,
    "controller" : "1",
    "color" : "purple",
    "group" : "teen",
    "ball" : "soccer"
}

window.characters = {
    "receiving" : "1",
    "1" : {
        "color" : "purple",
        "group" : "teen",
        "ball" : "soccer"
    },
    "2" : {
        "color" : "purple",
        "group" : "teen",
        "ball" : "soccer"
    },
    "3" : {
        "color" : "purple",
        "group" : "teen",
        "ball" : "soccer"
    },
    "4" : {
        "color" : "purple",
        "group" : "teen",
        "ball" : "soccer"
    }
}

// listen for changes to selections

document.getElementById("option2").addEventListener('change', () => {
    window.character["force"] = document.getElementById("option2").value;
});
document.getElementById("option3").addEventListener('change', () => {
    window.character["group"] = document.getElementById("option3").value;
    document.getElementById("character").src = "visuals/characters/" + window.character["group"] + "_" + window.character["color"] + ".png";
});
document.getElementById("option4").addEventListener('change', () => {
    window.character["color"] = document.getElementById("option4").value;
    document.getElementById("character").src = "visuals/characters/" + window.character["group"] + "_" + window.character["color"] + ".png";
});
document.getElementById("option5").addEventListener('change', () => {
    window.character["ball"] = document.getElementById("option5").value;
    document.getElementById("option5").style.backgroundImage = "url(visuals/vectors/" + window.character["ball"] + ".svg)";
});

// set player

function control(player) {
    document.getElementById("controller" + window.character["controller"]).classList.remove("select");
    window.character["controller"] = player;
    document.getElementById("controller" + window.character["controller"]).classList.add("select");
}

// lock options on mobile

let elements = ["request", "controller1", "controller2", "controller3", "controller4", "options"]

function lock() {

    if (window.character["locked"]) {
        window.character["locked"] = false;
        document.getElementById("lock").innerHTML = "Lock";
        elements.forEach(function (item, index) {
            document.getElementById(item).style.pointerEvents = "auto";
            document.getElementById(item).classList.remove("locked");
        });
    } else {
        window.character["locked"] = true;
        document.getElementById("lock").innerHTML = "Unlock";
        elements.forEach(function (item, index) {
            document.getElementById(item).style.pointerEvents = "none";
            document.getElementById(item).classList.add("locked");
        });
    }

}