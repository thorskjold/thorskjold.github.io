/* reloading */

/*
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
} else {
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    };
};
*/

/* preloading */

window.addEventListener('load', function () {

    if (document.getElementById("page") != null) {
        var element = document.getElementById("page");
        element.classList.add("fadeIn");
    };

    if (document.getElementById("index") != null) {
        var element = document.getElementById("index");
        element.classList.add("fadeZoomUp");
    };
    
    if (document.getElementById("view1") != null) {
        var element = document.getElementById("view1");
        element.classList.add("fadeZoomUp2");
    };

    if (document.getElementById("view2") != null) {
        var element = document.getElementById("view2");
        element.classList.add("fadeZoomUp2");
    };

    if (document.getElementById("view3") != null) {
        var element = document.getElementById("view3");
        element.classList.add("fadeZoomUp2");
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
        element.classList.add("fadeZoomUp2");
    };

    if (document.getElementById("view7") != null) {
        var element = document.getElementById("view7");
        element.classList.add("fadeZoomUp2");
    };

    if (document.getElementById("view8") != null) {
        var element = document.getElementById("view8");
        element.classList.add("fadeZoomUp");
    };

    if (document.getElementById("view9") != null) {
      var element = document.getElementById("view9");
      element.classList.add("fadeZoomUp2");
    };

    if (document.getElementById("view10") != null) {
      var element = document.getElementById("view10");
      element.classList.add("fadeZoomUp");
    };

    if (document.getElementById("view11") != null) {
      var element = document.getElementById("view11");
      element.classList.add("fadeZoomUp2");
    };

});

/* cursor

const cursor = document.querySelector("#cursor");

const DEFAULT_CURSOR_SIZE = cursor.style.getPropertyValue("--height");

let isCursorLocked = false;

document.addEventListener("mousedown", () => {
  if (!isCursorLocked) {
    cursor.style.setProperty("--scale", 0.9);
  }
});

document.addEventListener("mouseup", () => {
  if (!isCursorLocked) {
    cursor.style.setProperty("--scale", 1);
  }
});

document.addEventListener("mousemove", ({ x, y }) => {
  if (!isCursorLocked) {
    cursor.style.setProperty("--top", y + "px");
    cursor.style.setProperty("--left", x + "px");
  }
});

document.querySelectorAll("a").forEach((a) => {
  let rect = null;

  a.addEventListener(
    "mouseenter",
    ({ target }) => {
      isCursorLocked = true;

      rect = target.getBoundingClientRect();

      cursor.classList.add("is-locked");
      cursor.style.setProperty("--top", rect.top + rect.height / 2 + "px");
      cursor.style.setProperty("--left", rect.left + rect.width / 2 + "px");
      cursor.style.setProperty("--width", rect.width + "px");
      cursor.style.setProperty("--height", rect.height + "px");

      target.style.setProperty("--scale", 1.05);
    },
    { passive: true }
  );

  a.addEventListener(
    "mousemove",
    ({ target }) => {
      const halfHeight = rect.height / 2;
      const topOffset = (event.y - rect.top - halfHeight) / halfHeight;
      const halfWidth = rect.width / 2;
      const leftOffset = (event.x - rect.left - halfWidth) / halfWidth;

      cursor.style.setProperty("--translateX", `${leftOffset * 3}px`);
      cursor.style.setProperty("--translateY", `${topOffset * 3}px`);

      target.style.setProperty("--translateX", `${leftOffset * 6}px`);
      target.style.setProperty("--translateY", `${topOffset * 4}px`);
    },
    { passive: true }
  );

  a.addEventListener(
    "mouseleave",
    ({ target }) => {
      isCursorLocked = false;

      cursor.style.setProperty("--width", DEFAULT_CURSOR_SIZE);
      cursor.style.setProperty("--height", DEFAULT_CURSOR_SIZE);
      cursor.style.setProperty("--translateX", 0);
      cursor.style.setProperty("--translateY", 0);

      target.style.setProperty("--translateX", 0);
      target.style.setProperty("--translateY", 0);
      target.style.setProperty("--scale", 1);

      setTimeout(() => {
        if (!isCursorLocked) {
          cursor.classList.remove("is-locked");
        }
      }, 100);
    },
    { passive: true }
  );
});

document.querySelectorAll("p").forEach((p) => {
  p.addEventListener(
    "mouseover",
    () => {
      cursor.style.setProperty("--width", "0.2em");
      cursor.style.setProperty("--height", "1.5em");
    },
    { passive: true }
  );

  p.addEventListener(
    "mouseout",
    () => {
      cursor.style.setProperty("--width", DEFAULT_CURSOR_SIZE);
      cursor.style.setProperty("--height", DEFAULT_CURSOR_SIZE);
    },
    { passive: true }
  );
});

*/

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