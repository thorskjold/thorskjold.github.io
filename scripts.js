var searching = false
function search() {
  if (searching) {
    document.getElementById("search").style.animationName = "hide"
    setTimeout(function() { document.getElementById("search").style.display = "none" }, 250);
  } else {
    document.getElementById("search").style.animationName = "present"
    document.getElementById("search").style.display = "block"
  }
  searching = !searching
}

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
  
}

function highlight(id) {

  document.getElementById('page').style.filter = "blur(50px)";
  document.getElementById('page').style.webkitFilter = "blur(50px)";
  document.getElementById('page').style.cursor = "pointer";

  document.getElementById('highlight').src = "resources/images/" + id;
  document.getElementById('highlight').style.animationName = "enlarge";
  document.getElementById('highlight').style.display = "block";

}

function dehighlight() {

  document.getElementById('page').style.filter = "";
  document.getElementById('page').style.webkitFilter = "";
  document.getElementById('page').style.cursor = "default";
  
  document.getElementById('highlight').style.animationName = "minimize";
  setTimeout(function() {
    document.getElementById('highlight').src = "";
    document.getElementById("highlight").style.display = "none";
  }, 250);

}

var toggled = false
function toggle() {
  if (toggled) {
    document.getElementById("body").classList.remove("body-dark");
    var glyphs = document.getElementsByClassName('glyph');
    for (var i = 0; i < glyphs.length; i++) {
      glyphs[i].classList.remove("glyph-dark")
    }
  } else {
    document.getElementById("body").classList.add("body-dark");
    var glyphs = document.getElementsByClassName('glyph');
    for (var i = 0; i < glyphs.length; i++) {
      glyphs[i].classList.add("glyph-dark")
    }
  }
  toggled = !toggled
}