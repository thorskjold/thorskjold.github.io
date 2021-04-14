// toggle desktop-mobile mode

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.getElementById('mobile').style.display = "flex"
} else {
    document.getElementById("desktop").style.display = "flex"
}

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

window.received = new Date();

client.on('message', function(topic, message) {

    window.received = new Date();

    let values = JSON.parse(message);
    window.player = values[0];

    if (window.player != 1) { document.getElementById("circle1").classList.add("minimize") }
    if (window.player != 2) { document.getElementById("circle2").classList.add("minimize") }
    if (window.player != 3) { document.getElementById("circle3").classList.add("minimize") }
    if (window.player != 4) { document.getElementById("circle4").classList.add("minimize") }

    if (window.player != 1) { document.getElementById("player1").style.opacity = "0.5" }
    if (window.player != 2) { document.getElementById("player2").style.opacity = "0.5" }
    if (window.player != 3) { document.getElementById("player3").style.opacity = "0.5" }
    if (window.player != 4) { document.getElementById("player4").style.opacity = "0.5" }
    document.getElementById("player" + window.player).style.opacity = "1";

    document.getElementById("circle" + window.player).classList.remove("minimize");
    document.getElementById("circle" + window.player).classList.add("enlarge");

});

// pass the ball to random next player

function pass(event) {

    if (event.alpha > 100 && event.alpha < 200) {

        if (window.player == window.controlling) {
            document.getElementById("circle" + window.player).classList.add("minimize");
            document.getElementById("circle" + window.player).classList.remove("enlarge");
    
            let players = [1, 2, 3, 4]
            var next = window.player
            while (next == window.player) {
                let random = Math.floor(Math.random() * 4)
                next = players[random]
            }
    
            window.player = next;
    
            let passing = new Date();
    
            setTimeout(function() {
    
                sendMessage(JSON.stringify([next]))
    
            }, (Math.random() * 3000) + Math.min(3000, Math.abs(passing.getTime() - window.received.getTime())));
        }

    }

}

// set player and request sensor access

window.player = 0;
window.controlling = 1;

function request(player) {

    document.getElementById("control" + window.controlling).classList.remove("select");
    window.controlling = player;
    document.getElementById("control" + window.controlling).classList.add("select");

    window.removeEventListener("deviceorientation", pass, true);
    window.addEventListener("deviceorientation", pass, true);

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') {
                        window.removeEventListener("deviceorientation", pass, true);
                    };
                })
                .catch(console.error);
        };
    } else {
        window.removeEventListener("deviceorientation", pass, true);
    };

};

// focus on a player

window.focusing = false;

function full(player) {

    if (window.focusing) {

        document.getElementById("circle1").style.display = "block";
        document.getElementById("circle2").style.display = "block";
        document.getElementById("circle3").style.display = "block";
        document.getElementById("circle4").style.display = "block";

        document.getElementById("player1").style.display = "flex";
        document.getElementById("player2").style.display = "flex";
        document.getElementById("player3").style.display = "flex";
        document.getElementById("player4").style.display = "flex";

        document.getElementById("player1").style.width = "25vw";
        document.getElementById("player2").style.width = "25vw";
        document.getElementById("player3").style.width = "25vw";
        document.getElementById("player4").style.width = "25vw";

        document.getElementById("player1").style.backgroundImage = "url(vectors/soccer_bg.svg)";
        document.getElementById("player2").style.backgroundImage = "url(vectors/basket_bg.svg)";
        document.getElementById("player3").style.backgroundImage = "url(vectors/tennis_bg.svg)";
        document.getElementById("player4").style.backgroundImage = "url(vectors/volley_bg.svg)";

        window.focusing = false;

    } else {

        if (player != "player1") { document.getElementById("circle1").style.display = "none" }
        if (player != "player2") { document.getElementById("circle2").style.display = "none" }
        if (player != "player3") { document.getElementById("circle3").style.display = "none" }
        if (player != "player4") { document.getElementById("circle4").style.display = "none" }

        if (player != "player1") { document.getElementById("player1").style.display = "none" }
        if (player != "player2") { document.getElementById("player2").style.display = "none" }
        if (player != "player3") { document.getElementById("player3").style.display = "none" }
        if (player != "player4") { document.getElementById("player4").style.display = "none" }

        document.getElementById(player).style.width = "100vw";

        if (player == "player1") { document.getElementById("player1").style.backgroundImage = "url(vectors/soccer_bgBig.svg)" }
        if (player == "player2") { document.getElementById("player2").style.backgroundImage = "url(vectors/basket_bgBig.svg)" }
        if (player == "player3") { document.getElementById("player3").style.backgroundImage = "url(vectors/tennis_bgBig.svg)" }
        if (player == "player4") { document.getElementById("player4").style.backgroundImage = "url(vectors/volley_bgBig.svg)" }

        window.focusing = true;

    }

}