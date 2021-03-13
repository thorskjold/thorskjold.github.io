/* preloading */

window.addEventListener('load', function () {

  if (document.getElementById("page") != null) {
    document.getElementById("page").classList.add("fadeIn");
  };

});

/* navigation */

window.destination = 'browse';

function navigate(id) {

  if (id != window.destination && window.destination == 'browse') {
    parent.document.getElementById(id).classList.add('selected');
    parent.document.getElementById('content').src = 'pages/' + id + '.html';
    window.destination = id;
  };

  if (id != window.destination && window.destination != 'browse') {
    parent.document.getElementById(window.destination).classList.remove('selected');
    parent.document.getElementById(id).classList.add('selected');
    parent.document.getElementById('content').src = 'pages/' + id + '.html';
    window.destination = id;
  };

  if (window.destination != 'browse') {
    parent.document.getElementById('menu').style.display = 'flex';
  } else {
    parent.document.getElementById('menu').style.display = 'none';
  };

};

/* proper resizing */

window.addEventListener('resize', function () {

  document.getElementById('window').style.height = '100vh';

});

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