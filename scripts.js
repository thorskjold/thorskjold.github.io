/* preloading */

window.addEventListener('load', function () {

  if (document.getElementById("loading") != null) {
    document.getElementById("loading").classList.add("fadeIn");
  };

});

/* toggle */

window.toggled = false;

function toggle() {

  window.toggled = !window.toggled; // toggle variable

  if (window.toggled) {

    // dark mode

    document.getElementById("window").style.color = "white";
    document.getElementById("window").style.background = "black";
    document.getElementById("toggle").src = "resources/icons/sun.svg";
    document.getElementById("toggle").style.filter = "invert(1)";
    document.getElementById("toggle").style.webkitFilter = "invert(1)";

  } else {

    // light mode

    document.getElementById("window").style.color = "black";
    document.getElementById("window").style.background = "white";
    document.getElementById("toggle").src = "resources/icons/moon.svg";
    document.getElementById("toggle").style.filter = "invert(0)";
    document.getElementById("toggle").style.webkitFilter = "invert(0)";

  };

};

/* navigation */

window.destination = 'home';

function navigate(id) {

  if (id != parent.window.destination) {
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

  for (i = 0; i < coded.length; i++) {
    if (key.indexOf(coded.charAt(i)) == -1) {
      ltr = coded.charAt(i);
      link += (ltr);
    } else {
      ltr = (key.indexOf(coded.charAt(i)) - shift + key.length) % key.length;
      link += (key.charAt(ltr));
    }
  };

  document.getElementById('mail').href = 'mailto:' + link;

};