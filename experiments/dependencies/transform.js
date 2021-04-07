// choose a player position

window.player = 0
function choose(selected) {
    window.player = selected
}

// choose next player

function randomize() {

    let players = [1, 2, 3, 4]
    var next = window.player
    while (next == window.player) {
        let random = Math.floor(Math.random() * 4)
        next = players[random]
    }
    return next

}

// pass the ball

function pass() {
    document.getElementById("circle").classList.remove("enlarge");
    window.next = randomize();
    send();
}

// send information

function send() {
    sendMessage(JSON.stringify([window.next]));
};

// MQTT

// --- SETTING UP --------------------------------------

const myBroker = "wss://edp21:Ko5z2bU0Uf7ajNzv@edp21.cloud.shiftr.io"; 
const myID = "itu" + parseInt(Math.random() * 1000000, 10); //Construct a random unique ID
const client = mqtt.connect(myBroker, {clientId: myID});

// --- CONNECTING--------------------------------------

client.on('connect', function() {
    // console.log('connected!');
    client.subscribe(myTopic);
});

// --- SEND MESSAGE --------------------------------------

function sendMessage(msg) {
    client.publish(myTopic, msg);
};

// --- RECEIVING MESSAGE --------------------------------------

client.on('message', function(topic, message) {

    let values = JSON.parse(message);

    if (values[0] == window.player) {
        document.getElementById("circle").classList.add("enlarge");
    };

});