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

// set player

window.player = Math.floor(Math.random() * 4);
window.playing = false;
window.controlling = 1

function control(player) {
    document.getElementById(window.controlling).classList.remove("select");
    window.controlling = player;
    document.getElementById(window.controlling).classList.add("select");
    window.playing = true;
}

// receive the ball state

window.received = new Date();

client.on('message', function(topic, message) {

    let values = JSON.parse(message);
    window.received = new Date();

    console.log(values[0]);

    window.player = values[0]

    if (window.player != 1) { document.getElementById("circle1").classList.add("minimize") }
    if (window.player != 2) { document.getElementById("circle2").classList.add("minimize") }
    if (window.player != 3) { document.getElementById("circle3").classList.add("minimize") }
    if (window.player != 4) { document.getElementById("circle4").classList.add("minimize") }

    document.getElementById("circle" + window.player).classList.remove("minimize");
    document.getElementById("circle" + window.player).classList.add("enlarge");

});

// pass the ball to random next player

function pass(event) {

    document.getElementById("acceleration").innerHTML = event.acceleration.x;

    /*
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
    */

}

// focus on a player

window.focusing = false;

function full(player) {

    if (window.focusing) {

        document.getElementById("player1").style.width = "25vw";
        document.getElementById("player2").style.width = "25vw";
        document.getElementById("player3").style.width = "25vw";
        document.getElementById("player4").style.width = "25vw";

        window.focusing = false;

    } else {

        document.getElementById("player1").style.width = "0";
        document.getElementById("player2").style.width = "0";
        document.getElementById("player3").style.width = "0";
        document.getElementById("player4").style.width = "0";
        document.getElementById(player).style.width = "100vw";

        window.focusing = true;

    }

}

// request device motion access

function request() {

    window.addEventListener("devicemotion", pass);

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') {
                        window.removeEventListener("devicemotion", pass);
                    };
                })
                .catch(console.error);
        };
    } else {
        window.removeEventListener("devicemotion", pass);
    };

};