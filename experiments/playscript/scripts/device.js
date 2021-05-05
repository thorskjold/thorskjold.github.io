// toggle desktop-mobile mode

if (window.device["mobile"]) {
    document.getElementById('mobile').style.display = "flex"
} else {
    document.getElementById("desktop").style.display = "flex"
}