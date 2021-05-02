// pressure points for swiping
let dots = {
    "dot1" : [100, 100], "dot2" : [200, 100], "dot3" : [300, 100], "dot4" : [400, 100], "dot5" : [500, 100],
    "dot6" : [600, 100], "dot7" : [700, 100], "dot8" : [800, 100], "dot9" : [900, 100], "dot10" : [1000, 100],
    "dot11" : [100, 200], "dot12" : [200, 200], "dot13" : [300, 200], "dot14" : [400, 200], "dot15" : [500, 200],
    "dot16" : [600, 200], "dot17" : [700, 200], "dot18" : [800, 200], "dot19" : [900, 200], "dot20" : [1000, 200],
    "dot21" : [100, 300], "dot22" : [200, 300], "dot23" : [300, 300], "dot24" : [400, 300], "dot25" : [500, 300],
    "dot26" : [600, 300], "dot27" : [700, 300], "dot28" : [800, 300], "dot29" : [900, 300], "dot30" : [1000, 300],
    "dot31" : [100, 400], "dot32" : [200, 400], "dot33" : [300, 400], "dot34" : [400, 400], "dot35" : [500, 400],
    "dot36" : [600, 400], "dot37" : [700, 400], "dot38" : [800, 400], "dot39" : [900, 400], "dot40" : [1000, 400],
    "dot41" : [100, 500], "dot42" : [200, 500], "dot43" : [300, 500], "dot44" : [400, 500], "dot45" : [500, 500],
    "dot46" : [600, 500], "dot47" : [700, 500], "dot48" : [800, 500], "dot49" : [900, 500], "dot50" : [1000, 500],
    "dot51" : [100, 600], "dot52" : [200, 600], "dot53" : [300, 600], "dot54" : [400, 600], "dot55" : [500, 600],
    "dot56" : [600, 600], "dot57" : [700, 600], "dot58" : [800, 600], "dot59" : [900, 600], "dot60" : [1000, 600],
    "dot61" : [100, 700], "dot62" : [200, 700], "dot63" : [300, 700], "dot64" : [400, 700], "dot65" : [500, 700],
    "dot66" : [600, 700], "dot67" : [700, 700], "dot68" : [800, 700], "dot69" : [900, 700], "dot70" : [1000, 700],
    "dot71" : [100, 800], "dot72" : [200, 800], "dot73" : [300, 800], "dot74" : [400, 800], "dot75" : [500, 800],
    "dot76" : [600, 800], "dot77" : [700, 800], "dot78" : [800, 800], "dot79" : [900, 800], "dot80" : [1000, 800],
    "dot81" : [100, 900], "dot82" : [200, 900], "dot83" : [300, 900], "dot84" : [400, 900], "dot85" : [500, 900],
    "dot86" : [600, 900], "dot87" : [700, 900], "dot88" : [800, 900], "dot89" : [900, 900], "dot90" : [1000, 900],
    "dot91" : [100, 1000], "dot92" : [200, 1000], "dot93" : [300, 1000], "dot94" : [400, 1000], "dot95" : [500, 1000],
    "dot96" : [600, 1000], "dot97" : [700, 1000], "dot98" : [800, 1000], "dot99" : [900, 1000], "dot100" : [1000, 1000]
}

document.getElementById("gesture").addEventListener("mousemove", touch);

function touch(event) {

    let xPos = event.clientX;
    let yPos = event.clientY;

    for (var dot in dots) {
        if (xPos <= dots[dot][0] && yPos <= dots[dot][1]) {
            document.getElementById(dot).style.fill = "black"
        }
    }
    
}

// handle swipe input
function swipe() {
    
    document.getElementById("gesture").addEventListener("mousemove", touch);
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

        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) { /*most significant*/
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