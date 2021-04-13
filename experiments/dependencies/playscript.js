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

window.player = 1

client.on('message', function(topic, message) {

    let values = JSON.parse(message);
    window.player = values[0]
    document.getElementById("circle" + window.player).classList.add("enlarge");

});

// pass the ball to random next player

function pass() {
    document.getElementById("circle" + window.player).classList.remove("enlarge");
    let players = [1, 2, 3, 4]
    var next = window.player
    while (next == window.player) {
        let random = Math.floor(Math.random() * 4)
        next = players[random]
    }
    sendMessage(JSON.stringify([next]));
}