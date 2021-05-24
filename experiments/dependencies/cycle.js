/* experiment 1

This experiment explores the ability of a singular pixel to illustrate five unique behaviours,
through variance in color and speed of change. The behaviours consist of analogies
for a ticking clock, beating heart, falling rain,
lightning strike during falling rain, and a flashing rainbow with audio.

Each behaviour shifts between a selection of pre-determined colours,
leveraging timing as an element of behavioural perception.
The speed of the color shift is modulated to provide transitions that
reference the real-world conceptualisation, within the constraints of a singular pixel.

There is no ability to rely on shape or color differentiation within each transition,
and thus the color shift timing is the only behavioural trait utilised,
beyond the colours associated with the behavioural perceptions.

*/

function cycle(colors, delay) {

    // kill any running audio
    window.audio.pause();
    window.audio.currentTime = 0;
    clearInterval(window.running);

    // instantitate the recursion variable as zero
    var iteration = 0;
    
    // run an instance of the recursive function with the given delay
    window.running = setInterval(function() {

        // determine if the recursion variable is iterating below or at the max index of colors
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

    // play the audio file
    window.audio = document.getElementById("audio");
    window.audio.play();

};