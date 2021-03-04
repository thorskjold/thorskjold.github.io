function setBackground(colors, delay) {

    window.audio.pause();
    clearInterval(window.running);

    var iteration = 0;
    
    window.running = setInterval(function() {

        if (iteration < colors.length - 1) {
            document.body.style.background = "rgb(" + String(colors[iteration]) + ")";
            iteration++;
        } else {
        	document.body.style.background = "rgb(" + String(colors[iteration]) + ")";
            iteration = 0;
        };

    }, delay);

};

function play() {

    window.audio = document.getElementById("audio");
    window.audio.volume = 0.1;
    window.audio.play();

};