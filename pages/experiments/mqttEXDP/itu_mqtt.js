// --- SETTING UP --------------------------------------
const myBroker = "wss://edp21:Ko5z2bU0Uf7ajNzv@edp21.cloud.shiftr.io"; 
const myID = "itu" + parseInt(Math.random() * 1000000, 10); //Construct a random unique ID
const client = mqtt.connect(myBroker, {clientId: myID});


// --- CONNECTING--------------------------------------
client.on('connect', function() {
  console.log('connected!');
  client.subscribe(myTopic);
});



// --- SEND MESSAGE --------------------------------------
function sendMessage(msg)
{
  client.publish(myTopic, msg);
}



// --- RECEIVING MESSAGE --------------------------------------
client.on('message', function(topic, message) 
{
  let msg = message.toString();
  console.log(msg);
  // do your thing here when a message arrives
});




