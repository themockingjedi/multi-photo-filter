var fgimage = null;
var bgimage = null;
var fgcanvas;
var bgcanvas;
var canvas;

function loadfgimage() {
  var imgfile = document.getElementById("fgfile");
  fgimage = new SimpleImage(imgfile);
  fgcanvas = document.getElementById("yo");
  fgimage.drawTo(fgcanvas);
}

function loadbgimage() {
  var imgfile = document.getElementById("bgfile");
  bgimage = new SimpleImage(imgfile);
  bgcanvas = document.getElementById("ey");
  bgimage.drawTo(bgcanvas);
}

function composite() {
  var output = new SimpleImage(fgimage.getWidth(), fgimage.getHeight());
  var greenThreshold = 240;
  for (var pixel of fgimage.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    if (pixel.getGreen() > greenThreshold) {
      var bgpixel = bgimage.getPixel(x, y);
      output.setPixel(x, y, bgpixel);
    } else {
      output.setPixel(x, y, pixel);
    }
  }
}

function dogreenscreen() {
  if (fgimage == null || !fgimage.complete()) {
    alert("foreground not loaded");
    return;
  }
  if (bgimage == null || !bgimage.complete()) {
    alert("background not loaded");
  }
  clear();
  var finalimage = composite();
  finalimage.drawTo(fgcanvas);
}

function doclear() {
  fgcanvas = document.getElementById("yo");
  bgcanvas = document.getElementById("ey");
  var context1 = canvas.getContext("2d");
  var context2 = canvas.getContext("2d");
  context1.clearRect(0, 0, canvas.width, canvas.height);
  context2.clearRect(0, 0, canvas.width, canvas.height);
}
