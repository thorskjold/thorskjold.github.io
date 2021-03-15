/* cursor */

const cursor = parent.document.querySelector("#cursor");

const DEFAULT_CURSOR_SIZE = cursor.style.getPropertyValue("--height");

let isCursorLocked = false;

parent.document.addEventListener("mousedown", () => {
  if (!isCursorLocked) {
    cursor.style.setProperty("--scale", 0.9);
  }
});

parent.document.addEventListener("mouseup", () => {
  if (!isCursorLocked) {
    cursor.style.setProperty("--scale", 1);
  }
});

parent.document.addEventListener("mousemove", ({ x, y }) => {
  if (!isCursorLocked) {
    cursor.style.setProperty("--top", y + "px");
    cursor.style.setProperty("--left", x + "px");
  }
});

parent.document.addEventListener("mouseout", () => {
  if (!isCursorLocked) {
    cursor.style.setProperty("--display", "none");
  }
});

parent.document.addEventListener("mousemove", () => {
  if (!isCursorLocked) {
    cursor.style.setProperty("--display", "block");
  }
});

parent.document.querySelectorAll(".select").forEach((select) => {
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

/* preloading */

window.addEventListener('load', function () {

  if (document.getElementById("page") != null) {
    document.getElementById("page").classList.add("fadeIn");
  };

});

/* navigation */

window.destination = 'home';

function navigate(id) {

  if (id != parent.window.destination) {
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