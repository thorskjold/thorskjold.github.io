// request sensor access

function request() {

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

    // check if any players are dead
    if (!window.characters["1"]["alive"]) { document.getElementById("player1").style.opacity = "0" }
    if (!window.characters["2"]["alive"]) { document.getElementById("player2").style.opacity = "0" }
    if (!window.characters["3"]["alive"]) { document.getElementById("player3").style.opacity = "0" }
    if (!window.characters["4"]["alive"]) { document.getElementById("player4").style.opacity = "0" }

    /*
    // minimize ball
    document.getElementById("player" + window.characters["receiving"]).style.opacity = "0.5";
    document.getElementById("circle" + window.characters["receiving"]).classList.remove("enlarge");
    */

    // update characters with received message
    window.characters = JSON.parse(message);

    // enlarge ball
    document.getElementById("player" + window.characters["receiving"]).style.opacity = "1";
    document.getElementById("circle" + window.characters["receiving"]).classList.add("enlarge");

    // decide if player should stay alive
    setTimeout(function() {
        if (window.characters["receiving"] == window.character["controller"]) {
            window.characters[window.character["controller"]]["alive"] = false;
        }
    }, 10000);

});

// pass the ball to random next player

function pass(event) {

    // change Play button
    document.getElementById("request").innerHTML = "Ready!";
    document.getElementById("request").style.opacity = "0.3";

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

            sendMessage(JSON.stringify(window.characters));

        }

    }

}