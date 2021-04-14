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

window.player = 1
function control(player) {
    document.getElementById(window.player).classList.remove("select");
    window.player = player;
    document.getElementById(window.player).classList.add("select");
}

// placeholder start

window.started = false

function start() {
    if (!window.started) {
        window.started = true;
        pass()
    }
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

// listen for ball mouseovers

document.getElementById("circle1").addEventListener("mouseenter", function(event) { if (window.player == 1) { pass() } }, false);
document.getElementById("circle2").addEventListener("mouseenter", function(event) { if (window.player == 2) { pass() } }, false);
document.getElementById("circle3").addEventListener("mouseenter", function(event) { if (window.player == 3) { pass() } }, false);
document.getElementById("circle4").addEventListener("mouseenter", function(event) { if (window.player == 4) { pass() } }, false);

// pass the ball to random next player

function pass() {

    if (window.started) {

        document.getElementById("circle" + window.player).classList.add("minimize");
        document.getElementById("circle" + window.player).classList.remove("enlarge");

        let players = [1, 2, 3, 4]
        var next = window.player
        while (next == window.player) {
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

}

// NOTE: Det kunne være sjovt hvis setTimeout var variende, så man ikke vidste hvor hurtigt bolden blev sendt videre. F.eks. varierende i range 500 ms til 2000 ms