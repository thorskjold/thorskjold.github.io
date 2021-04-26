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

window.died = false;

client.on('message', function(topic, message) {

    // minimize ball
    if (window.characters["receiving"] != "0") {
        document.getElementById("player" + window.characters["receiving"]).style.opacity = "0.5";
        document.getElementById("circle" + window.characters["receiving"]).classList.remove("enlarge");
    }

    // wait a random amount of time before proceeding
    setTimeout(function() {

        // reset the variable for registering death
        window.died = true;
        
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

            document.getElementById("place1").src = "visuals/characters/" + window.characters["1"]["skin"] + ".png";
            document.getElementById("place2").src = "visuals/characters/" + window.characters["2"]["skin"] + ".png";
            document.getElementById("place3").src = "visuals/characters/" + window.characters["3"]["skin"] + ".png";
            document.getElementById("place4").src = "visuals/characters/" + window.characters["4"]["skin"] + ".png";
            if (window.characters["1"]["alive"]) { document.getElementById("place1").style.width = "20vw" }
            if (window.characters["2"]["alive"]) { document.getElementById("place2").style.width = "20vw" }
            if (window.characters["3"]["alive"]) { document.getElementById("place3").style.width = "20vw" }
            if (window.characters["4"]["alive"]) { document.getElementById("place4").style.width = "20vw" }
            document.getElementById("final").style.display = "flex";
            if (!window.mobile) { document.getElementById("winner").play() }

        } else {

            // enlarge ball
            document.getElementById("player" + window.characters["receiving"]).style.opacity = "1";
            document.getElementById("circle" + window.characters["receiving"]).classList.add("enlarge");

            // decide if player should stay alive
            setTimeout(function() {
                if (window.died) {
                    window.characters[window.characters["receiving"]]["alive"] = false;
                    send();
                }
            }, 10000)
            
        }

    }, Math.floor(Math.random() * 10) * 1000);

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
        window.died = false;
        send();
    }

}

// send to server

function send() {

    if (window.characters["receiving"] == window.character["controller"]) {

        if (window.character["controller"] == "1") { document.getElementById("soccer").play() }
        if (window.character["controller"] == "2") { document.getElementById("volley").play() }
        if (window.character["controller"] == "3") { document.getElementById("baseball").play() }
        if (window.character["controller"] == "4") { document.getElementById("basketball").play() }
    
        let players = []
        if (window.characters["1"]["alive"]) { players.push("1") }
        if (window.characters["2"]["alive"]) { players.push("2") }
        if (window.characters["3"]["alive"]) { players.push("3") }
        if (window.characters["4"]["alive"]) { players.push("4") }
        
        var next = window.characters["receiving"];
        while (next == window.characters["receiving"]) {
            let random = Math.floor(Math.random() * 4);
            next = players[random];
        }

        window.characters["receiving"] = next;

        // insert personal character styling
        window.characters[window.character["controller"]]["skin"] = window.character["skin"];

        sendMessage(JSON.stringify(window.characters));

    }

}