if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
} else {
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    };
};

window.addEventListener('load', function () {

    var element = document.getElementById("page");
    element.style.opacity = "1";

    var element = document.getElementById("index");
    element.classList.add("fadeZoomUp");

    var element = document.getElementById("view1");
    element.classList.add("fadeZoomUp");

    var element = document.getElementById("view2");
    element.classList.add("fadeZoomUp");

    var element = document.getElementById("view3");
    element.classList.add("fadeZoomUp");

    var element = document.getElementById("view4");
    element.classList.add("fadeZoomUp");

    var element = document.getElementById("view5");
    element.classList.add("fadeZoomUp");

    var element = document.getElementById("view6");
    element.classList.add("fadeZoomUp");

    var element = document.getElementById("view7");
    element.classList.add("fadeZoomUp");

    var element = document.getElementById("view8");
    element.classList.add("fadeZoomUp");

    var element = document.getElementById("view9");
    element.classList.add("fadeZoomUp");

});