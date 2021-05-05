// data structure

structure() // init

function structure() {
    window.device = {
        "mobile" : /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    }
    window.controller = {
        "authentication" : "", // READ FROM CONTROLLER TEXTFIELD
        "interaction" : "swipe",
        "force" : 30,
        "player" : "0",
        "responding" : false
    }
    window.viewport = {
        "authentication" : Math.floor(Math.random() * 10000), // INSERT INTO HTML
        "player" : Math.floor(Math.random() * 5),
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