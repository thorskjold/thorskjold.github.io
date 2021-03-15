/* cursor */

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
    cursor.style.setProperty("--display", "block");
  }
});

document.addEventListener("mouseout", () => {
  if (!isCursorLocked) {
    cursor.style.setProperty("--display", "none");
  }
});

/* cursor text-selection */

document.querySelectorAll(".select").forEach((select) => {
  select.addEventListener(
    "mouseover",
    () => {
      cursor.style.setProperty("--width", "0.2em");
      cursor.style.setProperty("--height", "1.5em");
    },
    { passive: true }
  );

  select.addEventListener(
    "mouseout",
    () => {
      cursor.style.setProperty("--width", DEFAULT_CURSOR_SIZE);
      cursor.style.setProperty("--height", DEFAULT_CURSOR_SIZE);
    },
    { passive: true }
  );
});

/* cursor sticky */

document.querySelectorAll(".sticky").forEach((sticky) => {
  let rect = null;

  sticky.addEventListener(
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

  sticky.addEventListener(
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

  sticky.addEventListener(
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

/* preloading */

window.addEventListener('load', function () {

  if (parent.document.getElementById("loading") != null) {
    parent.document.getElementById("loading").style.animation = "spin 1.5s linear infinite, out 0.5s";
    setTimeout(function() { parent.document.getElementById("loading").style.display = "none"; }, 500);
  };

  if (document.getElementById("page") != null) {
    document.getElementById("page").classList.add("fadeIn");
  };

});

/* navigation */

window.destination = 'home';

function navigate(id) {

  if (id != parent.window.destination) {
    parent.document.getElementById("loading").style.animation = "spin 1.5s linear infinite, in 0.5s";
    parent.document.getElementById("loading").style.display = "block";
    parent.document.getElementById(window.destination).classList.remove('selected');
    parent.document.getElementById(id).classList.add('selected');
    parent.document.getElementById('destination').src = 'pages/' + id + '.html';
    parent.window.destination = id;
  };

};

/* proper resizing */

if (document.getElementById('window') != null) {

  window.addEventListener('resize', function () {

    document.getElementById('window').style.height = '100vh';
  
  });

};

/* decoding email address */

if (document.getElementById('mail') != null) {

  coded = "8r5YumADBKY9@mLu5HD.L5p";
  key = "zATW3jm8LErkFdNHvag2owSUQe1bxpslIYZyDq6Gn905RitcKhBfCJuPMV7XO4";
  shift = coded.length;
  link = "";

  for (i=0; i<coded.length; i++) {
    if (key.indexOf(coded.charAt(i))==-1) {
      ltr = coded.charAt(i);
      link += (ltr);
    } else {     
      ltr = (key.indexOf(coded.charAt(i))-shift+key.length) % key.length;
      link += (key.charAt(ltr));
    }
  };

  document.getElementById('mail').href = 'mailto:' + link;

};