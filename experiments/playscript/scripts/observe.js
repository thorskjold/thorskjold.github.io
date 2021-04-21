// request sensor access

function request() {

    window.lastExecution;

    window.removeEventListener("devicemotion", pass);
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

    // enlarge ball
    document.getElementById("player" + window.characters["receiving"]).style.opacity = "1";
    document.getElementById("circle" + window.characters["receiving"]).classList.add("enlarge");

});

// pass the ball to random next player

function pass(event) {

    // change Play button
    document.getElementById("request").innerHTML = "Ready!";
    document.getElementById("request").style.opacity = "0.3";
    
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