window.addEventListener('load', function () {

  if (document.getElementById("loading") != null) {
    document.getElementById("loading").classList.add("fadeIn");
  };

});

var selected = "home"
function navigate(tab) {
  parent.document.getElementById(selected).classList.remove("select")
  selected = tab
  parent.document.getElementById(selected).classList.add("select")
  parent.document.getElementById("page").src = "pages/" + selected + ".html"
}

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
  
};

/* highlight screenshot */

function highlight(id) {

  if (document.getElementById('page') != null) {

    document.getElementById('page').style.filter = "blur(8vw)";
    document.getElementById('page').style.webkitFilter = "blur(8vw)";
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
    document.getElementById('highlight').style.display = "none";
    document.getElementById('highlight').classList.remove("enlarge");
  
  };

};