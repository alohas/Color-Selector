"use strict";

let selector = document.querySelector("#colorSelector > input[type=color]");
const box = document.querySelector("#colorSelector > div");

selector.addEventListener("input", function() {
  changeColor(this.value);
  showHex(this.value);
  showRGB(this.value);
});

function changeColor(hex) {
  box.style.setProperty("--box-clr", hex);
}

function showHex(hex) {
  document.querySelector("#hex").textContent = "HEX: " + hex.toUpperCase();
}

function showRGB(hex) {
  let r = 0,
    g = 0,
    b = 0;

  r = parseInt(hex.substring(1, 2) + hex.substring(2, 3), 16);
  g = parseInt(hex.substring(3, 4) + hex.substring(4, 5), 16);
  b = parseInt(hex.substring(5, 6) + hex.substring(6, 7), 16);

  //console.log(r, g, b);
  document.querySelector("#rgb").textContent = `RGB: ${r}, ${g}, ${b}`;
  showHSL(r, g, b);
}

function showHSL(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }

  s *= 100;
  l *= 100;

  //console.log("hsl(%f,%f%,% f%)", h, s, l); // just for testing
  document.querySelector("#hsl").textContent = `HSL: ${Math.round(
    h
  )}°, ${Math.round(s)}%, ${Math.round(l)}%`;
}
