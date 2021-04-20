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
});
document.getElementById("option4").addEventListener('change', () => {
    window.character["color"] = document.getElementById("option4").value;
});
document.getElementById("option5").addEventListener('change', () => {
    window.character["ball"] = document.getElementById("option5").value;
    document.getElementById("option5").style.backgroundImage = "url(vectors/" + window.character["ball"] + ".svg)";
});

// set character accent

function accent(color) {
    document.getElementById(window.character["color"]).classList.remove("select");
    document.getElementById(color).classList.add("select");
    window.character["color"] = color;
    document.getElementById("option4").style.background = window.character["color"];
    document.getElementById("character").src = "characters/" + window.character["group"] + "_" + window.character["color"] + ".png";
}

// set character group

function look(group) {
    document.getElementById(window.character["group"]).classList.remove("select");
    document.getElementById(group).classList.add("select");
    window.character["group"] = group;
    document.getElementById("character").src = "characters/" + window.character["group"] + "_" + window.character["color"] + ".png";
}

// set player

function control(player) {
    document.getElementById("controller" + window.character["controller"]).classList.remove("select");
    window.character["controller"] = player;
    document.getElementById("controller" + window.character["controller"]).classList.add("select");
}

function join(ball) {
    document.getElementById(window.character["ball"]).classList.remove("select")
    window.character["ball"] = ball;
    document.getElementById("option5").style.backgroundImage = "url(vectors/" + window.character["ball"] + ".svg";
    document.getElementById(window.character["ball"]).classList.add("select");
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

// request sensor access

function request() {

    window.lastExecution;

    window.removeEventListener("devicemotion", pass);
    window.addEventListener("devicemotion", pass);

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') {
                        window.addEventListener("devicemotion", pass);
                    };
                })
                .catch(console.error);
        };
    } else {
        window.addEventListener("devicemotion", pass);
    };

};