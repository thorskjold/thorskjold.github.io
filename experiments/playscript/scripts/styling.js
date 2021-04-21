// data structure

window.character = {
    "locked" : false,
    "interaction" : "motion",
    "force" : 30,
    "controller" : "0",
    "color" : "purple",
    "group" : "teen",
}

window.characters = {
    "receiving" : "0",
    "1" : {
        "alive" : true,
        "color" : "purple",
        "group" : "teen"
    },
    "2" : {
        "alive" : true,
        "color" : "purple",
        "group" : "teen"
    },
    "3" : {
        "alive" : true,
        "color" : "purple",
        "group" : "teen"
    },
    "4" : {
        "alive" : true,
        "color" : "purple",
        "group" : "teen"
    }
}

// listen for changes to selections

/*
document.getElementById("option2").addEventListener('change', () => {
    window.character["force"] = document.getElementById("option2").value;
});
document.getElementById("option3").addEventListener('change', () => {
    window.character["group"] = document.getElementById("option3").value;
    document.getElementById("character").src = "visuals/characters/" + window.character["group"] + "_" + window.character["color"] + ".png";
});
*/

document.getElementById("option4").addEventListener('change', () => {
    window.character["color"] = document.getElementById("option4").value;
    document.getElementById("character").src = "visuals/characters/" + window.character["group"] + "_" + window.character["color"] + ".png";
});

// set player

function control(player) {
    if (window.character["controller"] != "0") {
        document.getElementById("controller" + window.character["controller"]).classList.remove("select");
    }
    window.character["controller"] = player;
    document.getElementById("controller" + window.character["controller"]).classList.add("select");
}