/* mode toggling */

function toggleMode() {

  if (document.getElementById('body') != null) {
    document.getElementById('body').style.background = "black";
    document.getElementById('body').style.color = "white";
  };

  if (document.getElementById('sidebar') != null) {
    document.getElementById('sidebar').style.background = "rgba(25, 25, 25, 0.7)";
    document.getElementById('sidebar').style.borderRight = "1px solid rgba(255, 255, 255, 0.1)";
    document.getElementById('sidebar').style.backdropFilter = "brightness(50%) saturate(200%) blur(15vw)";
    document.getElementById('sidebar').style.webkitBackdropFilter = "brightness(50%) saturate(200%) blur(15vw)";
  };

  if (document.getElementById('menu') != null) {
    document.getElementById('menu').style.borderBottom = "1px solid rgb(35, 35, 35)";
  };

  if (document.getElementById('product') != null) {
    document.getElementById('product').src = document.getElementById('product').src.replace("light", "dark");
  };

  if (document.getElementsByClassName('glyph') != null) {
    var elements = document.getElementsByClassName('glyph');
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.filter = 'invert(1)';
      elements[i].style.webkitFilter = 'invert(1)';
    };
  };

  if (document.getElementsByClassName('divider') != null) {
    var elements = document.getElementsByClassName('divider');
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.background = 'rgb(35, 35, 35)';
    };
  };

  if (document.getElementsByClassName('link') != null) {
    var elements = document.getElementsByClassName('link');
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.color = 'white';
    };
  };

  if (document.getElementsByClassName('viewContent') != null) {
    var elements = document.getElementsByClassName('viewContent');
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.background = 'rgb(15, 15, 15)';
    };
  };

};

var date = new Date();
var hour = date.getHours();

let night = [22, 23, 24, 0, 1, 2, 3, 4, 5];

if (night.includes(hour)) {

  toggleMode();

};

/* highlight screenshot */

function highlight(id) {

  if (document.getElementById('page') != null) {

    document.getElementById('page').style.filter = "blur(5vw)";
    document.getElementById('page').style.webkitFilter = "blur(5vw)";
    document.getElementById('page').style.cursor = "pointer";

  };

  if (parent.document.getElementById('highlight') != null) {

    parent.document.getElementById('highlight').src = "resources/images/" + id;
    parent.document.getElementById('highlight').style.display = "block";
    parent.document.getElementById('highlight').classList.add("enlarge");

  };

};

function dehighlight() {

  if (document.getElementById("destination").contentWindow.document.getElementById('page') != null) {

    document.getElementById("destination").contentWindow.document.getElementById('page').style.filter = "";
    document.getElementById("destination").contentWindow.document.getElementById('page').style.webkitFilter = "";
    document.getElementById("destination").contentWindow.document.getElementById('page').style.cursor = "default";
  
  };
  
  if (document.getElementById('highlight') != null) {
  
    document.getElementById('highlight').src = "";
    document.getElementById('highlight').classList.remove("enlarge");
    setTimeout(document.getElementById('highlight').style.display = "none", 500);
  
  };

};

/* preloading */

window.addEventListener('load', function () {

  if (document.getElementById("loading") != null) {
    document.getElementById("loading").classList.add("fadeIn");
  };

});

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

/*
if (document.getElementById('window') != null) {

  window.addEventListener('resize', function () {

    document.getElementById('window').style.height = '100vh';

  });

};
*/

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