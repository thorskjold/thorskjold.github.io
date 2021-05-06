// data structure

structure() // init

function structure() {
    window.device = {
        "mobile" : /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    }
    window.controller = {
        "authenticator" : 0,
        "interaction" : "swipe",
        "force" : 30,
        "player" : 0,
        "responding" : false
    }
    window.viewport = {
        "authenticator" : Math.floor(Math.random() * 90000) + 10000,
        "player" : Math.floor(Math.random() * 4) + 1,
        "dying" : 0,
        1 : {
            "playing" : false,
            "alive" : true,
            "placement" : 0
        },
        2 : {
            "playing" : false,
            "alive" : true,
            "placement" : 0
        },
        3 : {
            "playing" : false,
            "alive" : true,
            "placement" : 0
        },
        4 : {
            "playing" : false,
            "alive" : true,
            "placement" : 0
        }
    }
}

// generate qrcode with authenticator

new QRCode("qrcode", { // source: http://davidshimjs.github.io/qrcodejs/
    text: "https://thorskjold.com/experiments/playscript/index#" + window.viewport["authenticator"],
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
});