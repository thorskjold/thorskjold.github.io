if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
} else {
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }
}

window.addEventListener('load', function () {
    var element = document.getElementById("animated");
    element.classList.remove("preload");
})