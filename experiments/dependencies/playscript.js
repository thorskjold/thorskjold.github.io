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

// placeholder start

window.started = false

function start() {

    if (!window.started) {
        document.getElementById("circle1").classList.add("minimize");
        document.getElementById("circle2").classList.add("minimize");
        document.getElementById("circle3").classList.add("minimize");
        document.getElementById("circle4").classList.add("minimize");
        setTimeout(function() { pass() }, 1000);
        window.started = true;
    }

}

// receive the ball state

window.player = 2

client.on('message', function(topic, message) {

    let values = JSON.parse(message);
    window.player = values[0]
    document.getElementById("circle" + window.player).classList.remove("minimize");
    document.getElementById("circle" + window.player).classList.add("enlarge");

});

// listen for ball mouseovers

if (window.started) {

    document.getElementById("circle1").addEventListener("mouseenter", function(event) { if (window.player == 1) { pass() } }, false);
    document.getElementById("circle2").addEventListener("mouseenter", function(event) { if (window.player == 2) { pass() } }, false);
    document.getElementById("circle3").addEventListener("mouseenter", function(event) { if (window.player == 3) { pass() } }, false);
    document.getElementById("circle4").addEventListener("mouseenter", function(event) { if (window.player == 4) { pass() } }, false);

}

// pass the ball to random next player

function pass() {

    document.getElementById("circle" + window.player).classList.add("minimize");
    document.getElementById("circle" + window.player).classList.remove("enlarge");
    let players = [1, 2, 3, 4]
    var next = window.player
    while (next == window.player) {
        let random = Math.floor(Math.random() * 4)
        next = players[random]
    }
    setTimeout(function() { sendMessage(JSON.stringify([next])) }, 1000);

}

// NOTE: Det kunne være sjovt hvis setTimeout var variende, så man ikke vidste hvor hurtigt bolden blev sendt videre. F.eks. varierende i range 500 ms til 2000 ms