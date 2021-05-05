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
            document.getElementById("player" + window.viewport["player"]).style.opacity = "0.5";
            document.getElementById("circle" + window.viewport["player"]).classList.remove("enlarge");
            var next = window.viewport["player"]
            while (next == window.viewport["player"]) {
                next = Math.floor(Math.random() * 5)
            }
            window.viewport["player"] = next
            request()
        }

        // receive opt-in
        if (message[0] == "optin") {
            window.viewport[message[1]]["playing"] = true
        }

        // receive opt-out
        if (message[0] == "optout") {
            window.viewport[message[1]]["playing"] = false
        }

    }

})

// opt-in and out

function optin() {
    sendMessage(JSON.stringify(["optin", window.controller["player"]]))
}

function optout() {
    sendMessage(JSON.stringify(["optout", window.controller["player"]]))
}

// request and respond

function request() {
    document.getElementById("player" + window.viewport["player"]).style.opacity = "1";
    document.getElementById("circle" + window.viewport["player"]).classList.add("enlarge");
    sendMessage(JSON.stringify(["request", window.viewport["player"]]));
}

function respond() {
    sendMessage(JSON.stringify(["respond", window.controller["player"]]))
    window.controller["responding"] == false
}

/*
client.on('message', function(topic, message) {
    
    if (window.characters["receiving"] != null) {

        // minimize ball
        document.getElementById("player" + window.characters["receiving"]).style.opacity = "0.5";
        document.getElementById("circle" + window.characters["receiving"]).classList.remove("enlarge");

        // wait a random amount of time before proceeding
        setTimeout(function() {
            
            // update characters with received message
            window.characters = JSON.parse(message);

            // check if any players are dead
            let killed = []
            if (!window.characters["1"]["alive"]) { document.getElementById("player1").style.animationName = "hide"; setTimeout(function() { document.getElementById("player1").style.opacity = "0" }, 1900); killed.push("1") }
            if (!window.characters["2"]["alive"]) { document.getElementById("player2").style.animationName = "hide"; setTimeout(function() { document.getElementById("player2").style.opacity = "0" }, 1900); killed.push("2") }
            if (!window.characters["3"]["alive"]) { document.getElementById("player3").style.animationName = "hide"; setTimeout(function() { document.getElementById("player3").style.opacity = "0" }, 1900); killed.push("3") }
            if (!window.characters["4"]["alive"]) { document.getElementById("player4").style.animationName = "hide"; setTimeout(function() { document.getElementById("player4").style.opacity = "0" }, 1900); killed.push("4") }

            // check if someone has won
            if (killed.length == 3) {

                document.getElementById("place1").src = "visuals/characters/" + window.characters["1"]["skin"] + ".png";
                document.getElementById("place2").src = "visuals/characters/" + window.characters["2"]["skin"] + ".png";
                document.getElementById("place3").src = "visuals/characters/" + window.characters["3"]["skin"] + ".png";
                document.getElementById("place4").src = "visuals/characters/" + window.characters["4"]["skin"] + ".png";
                if (window.characters["1"]["alive"]) { document.getElementById("place1").style.width = "20vw" }
                if (window.characters["2"]["alive"]) { document.getElementById("place2").style.width = "20vw" }
                if (window.characters["3"]["alive"]) { document.getElementById("place3").style.width = "20vw" }
                if (window.characters["4"]["alive"]) { document.getElementById("place4").style.width = "20vw" }
                document.getElementById("final").style.display = "flex";
                if (!window.mobile) { document.getElementById("winner").play() }

            } else {

                // enlarge ball
                document.getElementById("player" + window.characters["receiving"]).style.opacity = "1";
                document.getElementById("circle" + window.characters["receiving"]).classList.add("enlarge");

                // only runs for the player receiving the ball
                if (window.characters["receiving"] == window.character["controller"]) {

                    // reset the variable for registering death
                    window.died = true;

                    // decide if player should stay alive
                    setTimeout(function() {
                        if (window.died) {
                            window.characters[window.character["controller"]]["alive"] = false;
                            document.getElementById("loser").play();
                            send();
                        }
                    }, 5000)

                }
                
            }

        }, Math.floor(Math.random() * 3) * 1000);

    }

})
*/