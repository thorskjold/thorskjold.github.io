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

    window.player = values[0]
    document.getElementById("circle" + window.player).classList.remove("minimize");
    document.getElementById("circle" + window.player).classList.add("enlarge");

});

// pass the ball to random next player

function pass() {

    document.getElementById("circle" + window.controlling).classList.add("minimize");
    document.getElementById("circle" + window.controlling).classList.remove("enlarge");

    let players = [1, 2, 3, 4]
    var next = window.controlling
    while (next == window.controlling) {
        let random = Math.floor(Math.random() * 4)
        next = players[random]
    }
    if (next != 1) { document.getElementById("circle1").classList.add("minimize") }
    if (next != 2) { document.getElementById("circle2").classList.add("minimize") }
    if (next != 3) { document.getElementById("circle3").classList.add("minimize") }
    if (next != 4) { document.getElementById("circle4").classList.add("minimize") }

    let passing = new Date();

    console.log(Math.abs(passing.getTime() - window.received.getTime()));

    setTimeout(function() {

        sendMessage(JSON.stringify([next]))

    }, 500 + Math.min(3000, Math.abs(passing.getTime() - window.received.getTime())));

}

// NOTE: Det kunne være sjovt hvis setTimeout var variende, så man ikke vidste hvor hurtigt bolden blev sendt videre. F.eks. varierende i range 500 ms til 2000 ms

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