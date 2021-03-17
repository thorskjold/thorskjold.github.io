// --- SETTING UP --------------------------------------

const myBroker = "wss://edp21:Ko5z2bU0Uf7ajNzv@edp21.cloud.shiftr.io"; 
const myID = "itu" + parseInt(Math.random() * 1000000, 10); //Construct a random unique ID
const client = mqtt.connect(myBroker, {clientId: myID});

// --- CONNECTING--------------------------------------

client.on('connect', function() {
  console.log('connected!');
  client.subscribe(myTopic);
});

// --- SEND MESchromath.min.jsSAGE --------------------------------------

function sendMessage(msg) {
  client.publish(myTopic, msg);
};

// --- RECEIVING MESSAGE --------------------------------------

client.on('message', function(topic, message) {

  let msg = message.toString();
  console.log(msg);

  let values = msg.split(",");
  let [alpha, beta, gamma] = [values[0], values[1], values[2]];

  // convert alpha, beta, gamma to hue, saturation, light

  let hue = 100 / 360 * alpha;
  let saturation = 100 / 180 * Math.abs(beta);
  let light = 100 / 180 * Math.abs(gamma);

  document.body.style.background = onePixelDo(true, hue, saturation, light);

});

// --- setBackground -----------------------------------

function setBackground(event) {

  var alpha = event.alpha; // 0, 360
  var beta = event.beta; // -180, 180
  var gamma = event.gamma; // -180, 180

  let output = [alpha,beta,gamma];

  sendMessage(output.toString());

};

// --- PERMISSION --------------------------------------

function grantPermission() {

  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
          DeviceOrientationEvent.requestPermission()
              .then(permissionState => {
                window.addEventListener("deviceorientation", setBackground);
              })
              .catch(console.error);
      };
  } else {
    window.addEventListener("deviceorientation", setBackground);
  };

};