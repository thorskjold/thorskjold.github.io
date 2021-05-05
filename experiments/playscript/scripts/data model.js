// data structure

structure() // init

function structure() {
    window.device = {
        "mobile" : /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    }
    window.controller = {
        "interaction" : "swipe",
        "force" : 30,
        "player" : "0"
    }
    window.viewport = {
        "receiving" : "1",
        "1" : {
            "playing" : false,
            "alive" : true,
            "placement" : "0"
        },
        "2" : {
            "playing" : false,
            "alive" : true,
            "placement" : "0"
        },
        "3" : {
            "playing" : false,
            "alive" : true,
            "placement" : "0"
        },
        "4" : {
            "playing" : false,
            "alive" : true,
            "placement" : "0"
        }
    }
}