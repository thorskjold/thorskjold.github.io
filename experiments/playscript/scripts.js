// toggle desktop-mobile mode

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.getElementById('mobile').style.display = "flex"
} else {
    document.getElementById("desktop").style.display = "flex"
}

// lock ball options on mobile

window.locked = false

function lock() {
    
    var c = document.getElementById("balls").children;
    var i;

    if (window.locked) {
        document.getElementById("style").style.pointerEvents = "auto";
        document.getElementById("style").classList.remove("lock");
        document.getElementById("ML").style.pointerEvents = "auto";
        document.getElementById("ML").classList.remove("lock");
        for (i = 0; i < c.length; i++) {
            c[i].style.pointerEvents = "auto";
            c[i].classList.remove("lock");
        }
        document.getElementById("lock").classList.remove("select");
        document.getElementById("lock").src = "vectors/lock.svg";
        window.locked = false;
    } else {
        document.getElementById("style").style.pointerEvents = "none";
        document.getElementById("style").classList.add("lock");
        document.getElementById("ML").style.pointerEvents = "none";
        document.getElementById("ML").classList.add("lock");
        for (i = 0; i < c.length; i++) {
            c[i].style.pointerEvents = "none";
            c[i].classList.add("lock");
        }
        document.getElementById("lock").classList.add("select");
        document.getElementById("lock").src = "vectors/lock_fill.svg";
        window.locked = true;
    }

}

// set ball accent color

window.accent = "#000000"

function accent() {
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

window.received = new Date();

client.on('message', function(topic, message) {

    console.log("Received ball!");

    window.received = new Date();

    let values = JSON.parse(message);
    window.player = values[0];

    if (window.player != 1) { document.getElementById("circle1").classList.add("minimize") }
    if (window.player != 2) { document.getElementById("circle2").classList.add("minimize") }
    if (window.player != 3) { document.getElementById("circle3").classList.add("minimize") }
    if (window.player != 4) { document.getElementById("circle4").classList.add("minimize") }

    if (window.player != 1) { document.getElementById("player1").style.opacity = "0.5" }
    if (window.player != 2) { document.getElementById("player2").style.opacity = "0.5" }
    if (window.player != 3) { document.getElementById("player3").style.opacity = "0.5" }
    if (window.player != 4) { document.getElementById("player4").style.opacity = "0.5" }
    document.getElementById("player" + window.player).style.opacity = "1";

    document.getElementById("circle" + window.player).classList.remove("minimize");
    document.getElementById("circle" + window.player).classList.add("enlarge");

});

// pass the ball to random next player

function pass(event) {

    if (event.alpha > 100 && event.alpha < 200) {

        if (window.player == window.controlling) {
            document.getElementById("circle" + window.player).classList.add("minimize");
            document.getElementById("circle" + window.player).classList.remove("enlarge");
    
            let players = [1, 2, 3, 4]
            var next = window.player
            while (next == window.player) {
                let random = Math.floor(Math.random() * 4)
                next = players[random]
            }
    
            window.player = next;
    
            sendMessage(JSON.stringify([next]));
            console.log("Passed ball!");

            /*
            let passing = new Date();
            
            setTimeout(function() {
    
            }, (Math.random() * 3000) + Math.min(3000, Math.abs(passing.getTime() - window.received.getTime())));
            */
        }

    }

}

// set player and request sensor access

window.player = 1;
window.controlling = 1;

function request(player) {

    document.getElementById("control" + window.controlling).classList.remove("select");
    window.controlling = player;
    document.getElementById("control" + window.controlling).classList.add("select");

    window.removeEventListener("deviceorientation", pass, true);
    window.addEventListener("deviceorientation", pass, true);

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') {
                        window.removeEventListener("deviceorientation", pass, true);
                    };
                })
                .catch(console.error);
        };
    } else {
        window.removeEventListener("deviceorientation", pass, true);
    };

};

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

        document.getElementById("player1").style.width = "25vw";
        document.getElementById("player2").style.width = "25vw";
        document.getElementById("player3").style.width = "25vw";
        document.getElementById("player4").style.width = "25vw";

        document.getElementById("player1").style.backgroundImage = "url(vectors/soccer_bg.svg)";
        document.getElementById("player2").style.backgroundImage = "url(vectors/basket_bg.svg)";
        document.getElementById("player3").style.backgroundImage = "url(vectors/tennis_bg.svg)";
        document.getElementById("player4").style.backgroundImage = "url(vectors/volley_bg.svg)";

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

        if (player == "player1") { document.getElementById("player1").style.backgroundImage = "url(vectors/soccer_bgBig.svg)" }
        if (player == "player2") { document.getElementById("player2").style.backgroundImage = "url(vectors/basket_bgBig.svg)" }
        if (player == "player3") { document.getElementById("player3").style.backgroundImage = "url(vectors/tennis_bgBig.svg)" }
        if (player == "player4") { document.getElementById("player4").style.backgroundImage = "url(vectors/volley_bgBig.svg)" }

        window.focusing = true;

    }

}

// the link to your model provided by Teachable Machine export panel https://teachablemachine.withgoogle.com/
const URL = "https://teachablemachine.withgoogle.com/models/36P5oCMKu/";  //YOU NEED TO REPLACE THIS LINK

let model, webcam;

async function start() {

    document.getElementById("mobile").style.display = "none";

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
    document.getElementById("camera").style.display = "block";
    document.getElementById("camera").appendChild(webcam.canvas);
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