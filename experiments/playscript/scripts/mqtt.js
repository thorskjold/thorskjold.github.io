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

    // minimize ball
    document.getElementById("player" + window.characters["receiving"]).style.opacity = "0.5";
    document.getElementById("circle" + window.characters["receiving"]).classList.remove("enlarge");

    // set time of receiving ball
    window.received = new Date();

    // update characters with received message

    console.log("Received ball!");
    window.characters = JSON.parse(message);

    // update characters on field
    document.getElementById("char1").src = "characters/" + window.characters["1"]["group"] + "_" + window.characters["1"]["color"] + ".png";
    document.getElementById("char2").src = "characters/" + window.characters["2"]["group"] + "_" + window.characters["2"]["color"] + ".png";
    document.getElementById("char3").src = "characters/" + window.characters["3"]["group"] + "_" + window.characters["3"]["color"] + ".png";
    document.getElementById("char4").src = "characters/" + window.characters["4"]["group"] + "_" + window.characters["4"]["color"] + ".png";

    // update field styles
    document.getElementById("player1").style.backgroundImage = "url(vectors/" + window.characters["1"]["ball"] + "_bgBig.svg)";

    // update ball styles
    document.getElementById("circle1").src = "vectors/" + window.characters["1"]["ball"] + ".svg";
    document.getElementById("circle2").src = "vectors/" + window.characters["2"]["ball"] + ".svg";
    document.getElementById("circle3").src = "vectors/" + window.characters["3"]["ball"] + ".svg";
    document.getElementById("circle4").src = "vectors/" + window.characters["4"]["ball"] + ".svg";

    // enlarge ball
    document.getElementById("player" + window.characters["receiving"]).style.opacity = "1";
    document.getElementById("circle" + window.characters["receiving"]).classList.add("enlarge");

});

// pass the ball to random next player

function pass(event) {
    
    // delay updates 300ms to avoid flickering numbers
    var now = Date.now();
    if (now - window.lastExecution < 300) return;
    window.lastExecution = now;

    // get absolute value of acceleration parameters
    var x = Math.abs(event.acceleration.x);
    var y = Math.abs(event.acceleration.y);
    var z = Math.abs(event.acceleration.z);

    if (x > window.character["force"] || y > window.character["force"] || z > window.character["force"]) {

        if (window.characters["receiving"] == window.character["controller"]) {
    
            let players = [1, 2, 3, 4]
            var next = window.characters["receiving"]
            while (next == window.characters["receiving"]) {
                let random = Math.floor(Math.random() * 4)
                next = players[random]
            }
    
            window.characters["receiving"] = next;

            // update personal character styling
            window.characters[window.character["controller"]]["color"] = window.character["color"];
            window.characters[window.character["controller"]]["group"] = window.character["group"];
            window.characters[window.character["controller"]]["ball"] = window.character["ball"];
    
            sendMessage(JSON.stringify(window.characters));
            console.log("Passed ball!");

            /*
            let passing = new Date();
            
            setTimeout(function() {
    
            }, (Math.random() * 3000) + Math.min(3000, Math.abs(passing.getTime() - window.received.getTime())));
            */

        }

    }

}