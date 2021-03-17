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

  // UNFINISHED PART --------------------------------------

  if (values[0] = 'hue') {
    let hue = (100 / 360) * (360 / 180 * Math.abs(beta));
  };

  if (values[0] = 'saturation') {
    let saturation = 100 / 180 * Math.abs(beta);
  };

  if (values[0] = 'light') {
    let light = 100 / 180 * Math.abs(beta);
  };

  let current = document.getElementById("background").style.background;
  console.log(current);

  // convert current background to HSL

  // document.body.style.background = onePixelDo(true, hue, saturation, light);

});

// --- setBackground -----------------------------------

function sendEvent(event) {

  var alpha = event.alpha; // 0, 360
  var beta = event.beta; // -180, 180
  var gamma = event.gamma; // -180, 180

  if (window.option == 'hue') {
    sendMessage(['hue', beta].toString());
  };

  if (window.option == 'saturation') {
    sendMessage(['saturation', beta].toString());
  };

  if (window.option == 'light') {
    sendMessage(['light', beta].toString());
  };

};

// --- PERMISSION --------------------------------------

function networked(option) {

  window.option = option;

  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
          DeviceOrientationEvent.requestPermission()
              .then(permissionState => {
                window.addEventListener("deviceorientation", sendEvent);
              })
              .catch(console.error);
      };
  } else {
    window.addEventListener("deviceorientation", sendEvent);
  };

};