// MQTT

const myTopic = "playscript";
const myBroker = "wss://edp21:Ko5z2bU0Uf7ajNzv@edp21.cloud.shiftr.io"; 
const myID = "itu" + parseInt(Math.random() * 1000000, 10); // construct a random unique ID
const client = mqtt.connect(myBroker, {clientId: myID});

client.on('connect', function() {
    client.subscribe(myTopic);
})

function sendMessage(msg) {
    client.publish(myTopic, msg);
}

client.on('message', function(topic, message) {
    
    message = JSON.parse(message);
    
    if (window.device["mobile"]) {
        
        // receive request
        if (message[0] == "request" && message[1] == window.controller["player"]) {
            window.controller["responding"] == true
        }

    } else {
        
        // receive response
        if (message[0] == "respond" && message[1] == window.viewport["player"]) {
            if (message[1] == window.viewport["dying"]) {
                window.viewport["dying"] = 0
            }
            pass()
        }

        // receive opt-in
        if (message[0] == "optin") {
            window.viewport[message[1]]["playing"] = true;
            document.getElementById("join" + message[1]).style.opacity = "1";
            start();
        }

        // receive opt-out
        if (message[0] == "optout") {
            window.viewport[message[1]]["playing"] = false;
            document.getElementById("join" + message[1]).style.opacity = "0.3";
        }

    }

})

// pass the ball

function pass() {
    document.getElementById("player" + window.viewport["player"]).style.opacity = "0.5";
    document.getElementById("circle" + window.viewport["player"]).classList.remove("enlarge");
    if ([window.viewport[1]["alive"], window.viewport[2]["alive"], window.viewport[3]["alive"], window.viewport[4]["alive"]].filter(Boolean).length == 1) {
        if (window.viewport[1]["placement"] == 0) { window.viewport[1]["placement"] = 1 }
        if (window.viewport[2]["placement"] == 0) { window.viewport[2]["placement"] = 1 }
        if (window.viewport[3]["placement"] == 0) { window.viewport[3]["placement"] = 1 }
        if (window.viewport[4]["placement"] == 0) { window.viewport[4]["placement"] = 1 }
        document.getElementById("place" + window.viewport[1]["placement"]).src = "visuals/vectors/soccer.svg";
        document.getElementById("place" + window.viewport[2]["placement"]).src = "visuals/vectors/volley.svg";
        document.getElementById("place" + window.viewport[3]["placement"]).src = "visuals/vectors/tennis.svg";
        document.getElementById("place" + window.viewport[4]["placement"]).src = "visuals/vectors/basketball.svg";
        document.getElementById("final").style.display = "flex";
        document.getElementById("winner").play();
    } else {
        var next = window.viewport["player"]
        while (next == window.viewport["player"] || window.viewport[next]["alive"] == false) {
            next = Math.floor(Math.random() * 4) + 1;
        }
        window.viewport["player"] = next
        request()
    }
}

// opt-in and out

function optin() {
    sendMessage(JSON.stringify(["optin", window.controller["player"]]))
}

function optout() {
    sendMessage(JSON.stringify(["optout", window.controller["player"]]))
}

// request and respond

function request() {
    window.viewport["dying"] = window.viewport["player"];
    setTimeout(function() {
        if (window.viewport["dying"] != 0) {
            window.viewport[window.viewport["dying"]]["alive"] = false;
            window.viewport[window.viewport["dying"]]["placement"] = 4 - Math.max(window.viewport[1]["placement"], window.viewport[2]["placement"], window.viewport[3]["placement"], window.viewport[4]["placement"]);
            document.getElementById("loser").play();
            document.getElementById("player" + window.viewport["dying"]).style.animationName = "hide";
            setTimeout(function() { document.getElementById("player" + window.viewport["dying"]).style.opacity = "0" }, 1900);
            pass()
        }
    }, 5000);
    document.getElementById("player" + window.viewport["player"]).style.opacity = "1";
    document.getElementById("circle" + window.viewport["player"]).classList.add("enlarge");
    sendMessage(JSON.stringify(["request", window.viewport["player"]]));
}

function respond() {
    sendMessage(JSON.stringify(["respond", window.controller["player"]]))
    window.controller["responding"] == false
}