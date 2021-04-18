// toggle desktop-mobile mode

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.getElementById('mobile').style.display = "flex"
} else {
    document.getElementById("desktop").style.display = "flex"
}

// focus on a player

window.focusing = false;

function full(player) {

    if (window.focusing) {

        document.getElementById("circle1").style.display = "block";
        document.getElementById("circle2").style.display = "block";
        document.getElementById("circle3").style.display = "block";
        document.getElementById("circle4").style.display = "block";

        document.getElementById("player1").style.display = "flex";
        document.getElementById("player2").style.display = "flex";
        document.getElementById("player3").style.display = "flex";
        document.getElementById("player4").style.display = "flex";

        document.getElementById("player1").style.width = "50vw";
        document.getElementById("player2").style.width = "50vw";
        document.getElementById("player3").style.width = "50vw";
        document.getElementById("player4").style.width = "50vw";
        document.getElementById("player1").style.height = "50vh";
        document.getElementById("player2").style.height = "50vh";
        document.getElementById("player3").style.height = "50vh";
        document.getElementById("player4").style.height = "50vh";

        window.focusing = false;

    } else {

        if (player != "player1") { document.getElementById("circle1").style.display = "none" }
        if (player != "player2") { document.getElementById("circle2").style.display = "none" }
        if (player != "player3") { document.getElementById("circle3").style.display = "none" }
        if (player != "player4") { document.getElementById("circle4").style.display = "none" }

        if (player != "player1") { document.getElementById("player1").style.display = "none" }
        if (player != "player2") { document.getElementById("player2").style.display = "none" }
        if (player != "player3") { document.getElementById("player3").style.display = "none" }
        if (player != "player4") { document.getElementById("player4").style.display = "none" }

        document.getElementById(player).style.width = "100vw";
        document.getElementById(player).style.height = "100vh";

        window.focusing = true;

    }

}

// data structure

window.character = {
    "locked" : false,
    "force" : document.getElementById("force").value,
    "controller" : "1",
    "color" : "purple",
    "group" : "teen",
    "ball" : "soccer"
}

window.characters = {
    "receiving" : "1",
    "1" : {
        "color" : "purple",
        "group" : "teen",
        "ball" : "soccer"
    },
    "2" : {
        "color" : "purple",
        "group" : "teen",
        "ball" : "soccer"
    },
    "3" : {
        "color" : "purple",
        "group" : "teen",
        "ball" : "soccer"
    },
    "4" : {
        "color" : "purple",
        "group" : "teen",
        "ball" : "soccer"
    }
}

// set character accent

function accent(color) {
    document.getElementById(window.character["color"]).classList.remove("select");
    document.getElementById(color).classList.add("select");
    window.character["color"] = color;
    document.getElementById("character").src = "characters/" + window.character["group"] + "_" + window.character["color"] + ".png";
}

// set character group

function look(group) {
    document.getElementById(window.character["group"]).classList.remove("select");
    document.getElementById(group).classList.add("select");
    window.character["group"] = group;
    document.getElementById("character").src = "characters/" + window.character["group"] + "_" + window.character["color"] + ".png";
}

// set player

function control(player) {
    document.getElementById("controller" + window.character["controller"]).classList.remove("select");
    window.character["controller"] = player;
    document.getElementById("controller" + window.character["controller"]).classList.add("select");
}

function join(ball) {
    document.getElementById(window.character["ball"]).classList.remove("select")
    window.character["ball"] = ball;
    document.getElementById(window.character["ball"]).classList.add("select");
}

// lock options on mobile

let elements = ["colors", "ages", "forces", "players", "balls"]

function lock() {

    if (window.character["locked"]) {
        window.character["locked"] = false;
        document.getElementById("lock").innerHTML = "Lock";
        elements.forEach(function (item, index) {
            var c = document.getElementById(item).children; var i;
            for (i = 0; i < c.length; i++) {
                c[i].style.pointerEvents = "auto";
                c[i].classList.remove("locked");
            }
        });
    } else {
        window.character["locked"] = true;
        document.getElementById("lock").innerHTML = "Unlock";
        elements.forEach(function (item, index) {
            var c = document.getElementById(item).children; var i;
            for (i = 0; i < c.length; i++) {
                c[i].style.pointerEvents = "none";
                c[i].classList.add("locked");
            }
        });
    }

}

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

    console.log("Received ball!");

    // minimize ball
    document.getElementById("player" + window.characters["receiving"]).style.opacity = "0.5";
    document.getElementById("circle" + window.characters["receiving"]).classList.remove("enlarge");

    // set time of receiving ball
    window.received = new Date();

    // update controller styling
    window.characters = JSON.parse(message);
    window.characters[window.character["controller"]]["color"] = window.character["color"];
    window.characters[window.character["controller"]]["group"] = window.character["group"];
    window.characters[window.character["controller"]]["ball"] = window.character["ball"];

    // update characters on field
    document.getElementById("char1").src = "characters/" + window.characters["1"]["group"] + "_" + window.characters["1"]["color"] + ".png";
    document.getElementById("char2").src = "characters/" + window.characters["2"]["group"] + "_" + window.characters["2"]["color"] + ".png";
    document.getElementById("char3").src = "characters/" + window.characters["3"]["group"] + "_" + window.characters["3"]["color"] + ".png";
    document.getElementById("char4").src = "characters/" + window.characters["4"]["group"] + "_" + window.characters["4"]["color"] + ".png";

    // update field styles
    document.getElementById("player1").src = "vectors/" + window.characters["1"]["ball"] + "_bgBig.svg";
    document.getElementById("player2").src = "vectors/" + window.characters["2"]["ball"] + "_bgBig.svg";
    document.getElementById("player3").src = "vectors/" + window.characters["3"]["ball"] + "_bgBig.svg";
    document.getElementById("player4").src = "vectors/" + window.characters["4"]["ball"] + "_bgBig.svg";

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

// cancel ML process

function cancel() {
    document.getElementById("mobile").style.display = "flex";
    document.getElementById("camera").style.display = "none";
    // HOW DO WE CANCEL THE WEBCAM AND ML??
}

// the link to your model provided by Teachable Machine export panel https://teachablemachine.withgoogle.com/
const URL = "https://teachablemachine.withgoogle.com/models/36P5oCMKu/";  //YOU NEED TO REPLACE THIS LINK

let model, webcam;

async function identify() {

    // document.getElementById("mobile").style.display = "none";

    // load the model and metadata
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";              
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // setup a camera
    webcam = new tmImage.Webcam(400, 400, true); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    // append video element (remove/comment line if you do not want the video shown)
    // document.getElementById("camera").style.display = "block";
    // document.getElementById("camera").appendChild(webcam.canvas);
}

async function loop() {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}

// run the webcam image through the ML model
async function predict() {
    
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(webcam.canvas);

    if(prediction[0].probability > 0.95) {
        console.log("Case A");
    }
    
    if(prediction[1].probability > 0.95) {
        console.log("Case B");
    }
}