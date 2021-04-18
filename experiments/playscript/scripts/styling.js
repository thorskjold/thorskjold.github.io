// data structure

window.character = {
    "locked" : false,
    "force" : document.getElementById("force").value,
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

// set character accent

function accent(color) {
    document.getElementById(window.character["color"]).classList.remove("select");
    document.getElementById(color).classList.add("select");
    window.character["color"] = color;
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
    document.getElementById(window.character["ball"]).classList.add("select");
}

// lock options on mobile

let elements = ["colors", "ages", "forces", "players", "balls"]

function lock() {

    if (window.character["locked"]) {
        window.character["locked"] = false;
        document.getElementById("lock").innerHTML = "Lock";
        elements.forEach(function (item, index) {
            var c = document.getElementById(item).children; var i;
            for (i = 0; i < c.length; i++) {
                c[i].style.pointerEvents = "auto";
                c[i].classList.remove("locked");
            }
        });
    } else {
        window.character["locked"] = true;
        document.getElementById("lock").innerHTML = "Unlock";
        elements.forEach(function (item, index) {
            var c = document.getElementById(item).children; var i;
            for (i = 0; i < c.length; i++) {
                c[i].style.pointerEvents = "none";
                c[i].classList.add("locked");
            }
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