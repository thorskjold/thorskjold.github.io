// data structure

structure(); // init

function structure() {
    window.character = {
        "locked" : false,
        "interaction" : "motion",
        "force" : 30,
        "controller" : "0",
        "skin" : "none"
    }
    
    window.characters = {
        "receiving" : "0",
        "1" : {
            "alive" : true,
            "skin" : "none"
        },
        "2" : {
            "alive" : true,
            "skin" : "none"
        },
        "3" : {
            "alive" : true,
            "skin" : "none"
        },
        "4" : {
            "alive" : true,
            "skin" : "none"
        }
    }
}

// listen for changes to selections

document.getElementById("option").addEventListener('change', () => {
    window.character["skin"] = document.getElementById("option").value;
    document.getElementById("character").src = "visuals/characters/" + window.character["skin"] + ".png";
});

// set player

function control(player) {
    if (window.character["controller"] != "0") {
        document.getElementById("controller" + window.character["controller"]).classList.remove("select");
    }
    window.character["controller"] = player;
    document.getElementById("controller" + window.character["controller"]).classList.add("select");
}