window.swiping = false
function swipe() {
    if (window.swiping) {

        document.getElementById("gesture").removeEventListener('touchstart', handleTouchStart, false);        
        document.getElementById("gesture").removeEventListener('touchmove', handleTouchMove, false);


    } else {

        document.getElementById("gesture").addEventListener('touchstart', handleTouchStart, false);        
        document.getElementById("gesture").addEventListener('touchmove', handleTouchMove, false);

        var xDown = null;                                                        
        var yDown = null;

        function getTouches(evt) {
            return evt.touches || // browser API
            evt.originalEvent.touches; // jQuery
        }                                                     

        function handleTouchStart(evt) {
            const firstTouch = getTouches(evt)[0];                                      
            xDown = firstTouch.clientX;                                      
            yDown = firstTouch.clientY;                                      
        }                                                

        function handleTouchMove(evt) {
            if ( ! xDown || ! yDown ) { return }

            var xUp = evt.touches[0].clientX;                                    
            var yUp = evt.touches[0].clientY;

            var xDiff = xDown - xUp;
            var yDiff = yDown - yUp;

            if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
                if ( xDiff > 0 ) {
                    /* left swipe */ 
                } else {
                    /* right swipe */
                }                       
            } else {
                if ( yDiff > 0 ) {
                    send()
                } else { 
                    /* down swipe */
                }                                                                 
            }
            /* reset values */
            xDown = null;
            yDown = null;                                             
        }

    }
    window.swiping = !window.swiping
}