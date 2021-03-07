/* reloading */

if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
} else {
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    };
};

/* preloading */

window.addEventListener('load', function () {

    if (document.getElementById("page") != null) {
        var element = document.getElementById("page");
        element.classList.add("fadeIn");
    };

    if (document.getElementById("background") != null) {
        var element = document.getElementById("background");
        element.classList.add("borderScale");
    };

    if (document.getElementById("index") != null) {
        var element = document.getElementById("index");
        element.classList.add("fadeZoomUp");
    };
    
    if (document.getElementById("view1") != null) {
        var element = document.getElementById("view1");
        element.classList.add("fadeZoomUp");
    };

    if (document.getElementById("view2") != null) {
        var element = document.getElementById("view2");
        element.classList.add("fadeZoomUp");
    };

    if (document.getElementById("view3") != null) {
        var element = document.getElementById("view3");
        element.classList.add("fadeZoomUp");
    };

    if (document.getElementById("view4") != null) {
        var element = document.getElementById("view4");
        element.classList.add("fadeZoomUp");
    };

    if (document.getElementById("view5") != null) {
        var element = document.getElementById("view5");
        element.classList.add("fadeZoomUp");
    };

    if (document.getElementById("view6") != null) {
        var element = document.getElementById("view6");
        element.classList.add("fadeZoomUp");
    };

    if (document.getElementById("view7") != null) {
        var element = document.getElementById("view7");
        element.classList.add("fadeZoomUp");
    };

    if (document.getElementById("view8") != null) {
        var element = document.getElementById("view8");
        element.classList.add("fadeZoomUp");
    };

    if (document.getElementById("view9") != null) {
        var element = document.getElementById("view9");
        element.classList.add("fadeZoomUp");
    };

});

/* daylight cycling

let night = [22, 23, 24, 0, 1, 2, 3, 4, 5]

var date = new Date();
var hour = date.getHours();

if (night.includes(hour)) {

    document.body.style.background = "black";

    var all = document.getElementsByClassName("menu");
    for (var i = 0; i < all.length; i++) {
        all[i].style.background = "rgba(0, 0, 0, 0.6)";
    };

    var all = document.getElementsByClassName("tab");
    for (var i = 0; i < all.length; i++) {
        all[i].style.color = "white";
    };

    var all = document.getElementsByClassName("stroke");
    for (var i = 0; i < all.length; i++) {
        all[i].style.background = "rgba(255, 255, 255, 0.1)";
    };

    var all = document.getElementsByClassName("view");
    for (var i = 0; i < all.length; i++) {
        all[i].style.background = "rgba(255, 255, 255, 0.05)";
    };

    var all = document.getElementsByClassName("viewTitle");
    for (var i = 0; i < all.length; i++) {
        all[i].style.color = "white";
    };

};

 */