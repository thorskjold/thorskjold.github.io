// experiment 1

function cycle(colors, delay) {

    window.audio.pause();
    window.audio.currentTime = 0;
    clearInterval(window.running);

    var iteration = 0;
    
    window.running = setInterval(function() {

        if (iteration < colors.length - 1) {
            document.getElementById("background").style.background = "rgb(" + String(colors[iteration]) + ")";
            iteration++;
        } else {
        	document.getElementById("background").style.background = "rgb(" + String(colors[iteration]) + ")";
            iteration = 0;
        };

    }, delay);

};

function play() {

    window.audio = document.getElementById("audio");
    window.audio.play();

};