// MQTT

const myBroker = "wss://edp21:Ko5z2bU0Uf7ajNzv@edp21.cloud.shiftr.io"; 
const myID = "itu" + parseInt(Math.random() * 1000000, 10); // construct a random unique ID
const client = mqtt.connect(myBroker, {clientId: myID});

client.on('connect', function() {
    client.subscribe(myTopic);
});

function sendMessage(msg) {
    client.publish(myTopic, msg);
};

// receive the ball state

client.on('message', function(topic, message) {

    // minimize ball
    if (window.characters["receiving"] != "0") {
        document.getElementById("player" + window.characters["receiving"]).style.opacity = "0.5";
        document.getElementById("circle" + window.characters["receiving"]).classList.remove("enlarge");
    }

    // update characters with received message
    window.characters = JSON.parse(message);

    // check if any players are dead
    let killed = []
    if (!window.characters["1"]["alive"]) { document.getElementById("player1").style.opacity = "0"; killed.push("1") }
    if (!window.characters["2"]["alive"]) { document.getElementById("player2").style.opacity = "0"; killed.push("2") }
    if (!window.characters["3"]["alive"]) { document.getElementById("player3").style.opacity = "0"; killed.push("3") }
    if (!window.characters["4"]["alive"]) { document.getElementById("player4").style.opacity = "0"; killed.push("4") }

    // check if someone has won
    if (killed.length == 3) {
        document.getElementById("place1").src = "visuals/characters/" + window.characters["1"]["group"] + "_" + window.characters["1"]["color"] + ".png";
        document.getElementById("place2").src = "visuals/characters/" + window.characters["2"]["group"] + "_" + window.characters["2"]["color"] + ".png";
        document.getElementById("place3").src = "visuals/characters/" + window.characters["3"]["group"] + "_" + window.characters["3"]["color"] + ".png";
        document.getElementById("place4").src = "visuals/characters/" + window.characters["4"]["group"] + "_" + window.characters["4"]["color"] + ".png";
        if (window.characters["1"]["alive"]) { document.getElementById("place1").style.width = "20vw" }
        if (window.characters["2"]["alive"]) { document.getElementById("place2").style.width = "20vw" }
        if (window.characters["3"]["alive"]) { document.getElementById("place3").style.width = "20vw" }
        if (window.characters["4"]["alive"]) { document.getElementById("place4").style.width = "20vw" }
        document.getElementById("final").style.display = "flex";
    } else {

        // enlarge ball
        document.getElementById("player" + window.characters["receiving"]).style.opacity = "1";
        document.getElementById("circle" + window.characters["receiving"]).classList.add("enlarge");

        // decide if player should stay alive
        setTimeout(function() {
            if (window.characters["receiving"] == window.character["controller"]) {
                window.character["alive"] = false
            }
        }, 10000);
        
    }

});

// request sensor access

function motion() {

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

// pass the ball to random next player

function pass(event) {

    // change button
    document.getElementById("request").style.opacity = "1";

    // get absolute value of acceleration parameters
    var x = Math.abs(event.acceleration.x);
    var y = Math.abs(event.acceleration.y);
    var z = Math.abs(event.acceleration.z);

    if (x > window.character["force"] || y > window.character["force"] || z > window.character["force"]) {

        if (window.characters["receiving"] == window.character["controller"]) {
    
            let players = []
            if (window.characters["1"]["alive"]) { players.push(1) }
            if (window.characters["2"]["alive"]) { players.push(2) }
            if (window.characters["3"]["alive"]) { players.push(3) }
            if (window.characters["4"]["alive"]) { players.push(4) }
            
            var next = window.characters["receiving"];
            while (next == window.characters["receiving"]) {
                let random = Math.floor(Math.random() * 4);
                next = players[random];
            }
    
            window.characters["receiving"] = next;

            // insert personal character styling
            window.characters[window.character["controller"]]["color"] = window.character["color"];
            window.characters[window.character["controller"]]["group"] = window.character["group"];

            // check if play has died
            if (!window.character["alive"]) {
                window.characters[window.character["controller"]]["alive"] = false;
            }

            sendMessage(JSON.stringify(window.characters));

        }

    }

}

// click to pass the ball

function click() {

    if (window.characters["receiving"] == window.character["controller"]) {
    
        let players = []
        if (window.characters["1"]["alive"]) { players.push(1) }
        if (window.characters["2"]["alive"]) { players.push(2) }
        if (window.characters["3"]["alive"]) { players.push(3) }
        if (window.characters["4"]["alive"]) { players.push(4) }
        
        var next = window.characters["receiving"];
        while (next == window.characters["receiving"]) {
            let random = Math.floor(Math.random() * 4);
            next = players[random];
        }

        window.characters["receiving"] = next;

        // insert personal character styling
        window.characters[window.character["controller"]]["color"] = window.character["color"];
        window.characters[window.character["controller"]]["group"] = window.character["group"];

        // check if play has died
        if (!window.character["alive"]) {
            window.characters[window.character["controller"]]["alive"] = false;
        }

        sendMessage(JSON.stringify(window.characters));

    }

}