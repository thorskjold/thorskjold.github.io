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

    // convert received data

    let values = JSON.parse(message);

    console.log(values);

    // get current background

    currentBackground = document.getElementById("background").style.background; // current Background RGB string
    cBA = currentBackground.slice(4, -1).split(","); // current Background Array
    cBH = RGBtoHSL(cBA[0], cBA[1], cBA[2]); // current Background HSL
    [hue, saturation, light] = [cBH[0]*360, cBH[1]*100, cBH[2]*100]; // convert HSL float % to HSL 360, 100%, 100%

    // filter received data

    if (values[0] == 'H') {
        var hue = Math.abs(values[1]);
    };

    if (values[0] == 'S') {
        var saturation = 50 + 50 / 360 * Math.abs(values[1]);
    };

    if (values[0] == 'L') {
        var light = 100 / 360 * Math.abs(values[1]);
    };

    // set the new background

    document.getElementById("background").style.background = onePixelDo(true, hue, saturation, light);

});