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
        if (message[0] == "request" && message[1] == window.controller["player"] && message[2] == window.controller["authenticator"]) {
            window.controller["responding"] == true
        }

    } else {
        
        // receive response
        if (message[0] == "respond" && message[1] == window.viewport["player"]) {

            // play sound for ball hit
            switch(message[1]) {
                case 1: document.getElementById("soccer").play(); break;
                case 2: document.getElementById("volley").play(); break;
                case 3: document.getElementById("tennis").play(); break;
                case 4: document.getElementById("basketball").play(); break;
            }

            // reset countdown for death
            if (message[1] == window.viewport["dying"]) {
                window.viewport["dying"] = 0
            }
            
            // send ball to next player
            pass()

        }

        // receive opt-in
        if (message[0] == "optin" && message[2] == window.viewport["authenticator"]) {
            window.viewport[message[1]]["playing"] = true;
            document.getElementById("join" + message[1]).style.opacity = "1";
            start();
        }

        // receive opt-out
        if (message[0] == "optout" && message[2] == window.viewport["authenticator"]) {
            window.viewport[message[1]]["playing"] = false;
            document.getElementById("join" + message[1]).style.opacity = "0.3";
        }

    }

})

// pass the ball

function pass() {

    // minimize ball
    document.getElementById("player" + window.viewport["player"]).style.opacity = "0.5";
    document.getElementById("circle" + window.viewport["player"]).classList.remove("enlarge");

    // determine if game is over
    if ([window.viewport[1]["alive"], window.viewport[2]["alive"], window.viewport[3]["alive"], window.viewport[4]["alive"]].filter(Boolean).length == 1) {
        finish()
    } else {
        // select random next player from those alive
        var next = window.viewport["player"]
        while (next == window.viewport["player"] || window.viewport[next]["alive"] == false) {
            next = Math.floor(Math.random() * 4) + 1;
        }
        window.viewport["player"] = next
        setTimeout(function() {
            request()
        }, 5000)
    }

}

// opt-in and out

function optin() {
    sendMessage(JSON.stringify(["optin", window.controller["player"], window.controller["authenticator"]]))
}

function optout() {
    sendMessage(JSON.stringify(["optout", window.controller["player"], window.controller["authenticator"]]))
}

// request and respond

function request() {

    window.viewport["dying"] = window.viewport["player"];
    setTimeout(function() {
        if (window.viewport["dying"] != 0) {
            let dead = window.viewport["dying"];
            window.viewport[dead]["placement"] = [window.viewport[1]["alive"], window.viewport[2]["alive"], window.viewport[3]["alive"], window.viewport[4]["alive"]].filter(Boolean).length;
            window.viewport[dead]["alive"] = false;
            document.getElementById("loser").play();
            document.getElementById("player" + dead).style.animationName = "hide";
            setTimeout(function() { document.getElementById("player" + dead).style.opacity = "0" }, 1900);
            pass();
        }
    }, 5000)
    document.getElementById("player" + window.viewport["player"]).style.opacity = "1";
    document.getElementById("circle" + window.viewport["player"]).classList.add("enlarge");
    sendMessage(JSON.stringify(["request", window.viewport["player"], window.viewport["authenticator"]]));

}

function respond() {
    sendMessage(JSON.stringify(["respond", window.controller["player"]]))
    window.controller["responding"] == false
}