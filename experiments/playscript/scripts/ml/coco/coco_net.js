let net;

async function start() {

    document.getElementById("startknap").style.display="none";  // Hide the start buttobn

    // load the model and metadata
    console.log('Loading model..');
    net = await  cocoSsd.load();
    console.log('Successfully loaded model');

    // Setup a webcam
    webcam = new tmImage.Webcam(200, 200, true); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    // append video element (remove/comment line if you do not want the video shown)
    document.getElementById("webcam-container").appendChild(webcam.canvas);
}


async function loop()
{
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}

// run the webcam image through the ML model
async function predict() 
{
    const result = await net.detect(webcam.canvas);
    topresultat = result[0]; 
     console.log(topresultat);

     if (topresultat != undefined)
     {
        document.getElementById("resultat").innerHTML=topresultat.class;
     }
     else
     {
        document.getElementById("resultat").innerHTML="";
     }
   
}



