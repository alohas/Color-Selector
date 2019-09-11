"use strict";

let selector = document.querySelector(
  "#colorSelector > div.input > input[type=color]"
);
const box = document.querySelector("#colorBoxMain");
const harmony = document.querySelector(".harmonyPicker");
const box1 = document.querySelector("#colorBox1");
const box2 = document.querySelector("#colorBox2");
const box3 = document.querySelector("#colorBox3");
const box4 = document.querySelector("#colorBox4");

selector.addEventListener("input", function () {
  showHex(this.value);
  showRGB(this.value);
  changeColorMain(this.value);
  initHarmony(harmony.value);
});

function changeColorMain(hex) {
  box.style.backgroundColor = hex;
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
  )}, ${Math.round(s)}%, ${Math.round(l)}%`;
}

harmony.addEventListener("change", initHarmony);

function initHarmony(secValue) {
  let checkpoint = event.target.value.startsWith("#");
  if (checkpoint) {
  } else {
    secValue = event.target.value;
  }

  if (secValue == "None") {
    revertToWhite();
  } else if (secValue == "Analogous") {
    calcAnalogous();
  } else {
  }
}

function revertToWhite() {
  box1.style.backgroundColor = "white";
  box2.style.backgroundColor = "white";
  box3.style.backgroundColor = "white";
  box4.style.backgroundColor = "white";
}

function calcAnalogous() {
  const hslColor = document.querySelector("p#hsl").textContent;
  let h = 0,
    s = 0,
    l = 0;

  h = hslColor.substring(hslColor.indexOf(" ") + 1, hslColor.indexOf(","));
  s = hslColor.substring(hslColor.indexOf(",") + 2, hslColor.indexOf("%"));
  l = hslColor.substring(hslColor.indexOf("%") + 3, hslColor.length - 1);

  //console.log(h);
  displayAnalogous(h, s, l);
}

function displayAnalogous(h, s, l) {
  h = Number(h);
  const baseH = h;

  if (h < 30) {
    h = h + 360 - 30;
    box1.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
  } else {
    h = h - 30;
    box1.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
  }

  h = baseH;

  if (h < 15) {
    h = h + 360 - 15;
    box2.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
  } else {
    h = h - 15;
    box2.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
  }

  h = baseH;

  if (h > 345) {
    h = (h - 345) + 15;
    box3.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
  } else {
    h = h + 15;
    box3.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
  }

  h = baseH;

  if (h > 330) {
    h = (h - 330) + 35;
    box4.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
  } else {
    h = h + 30;
    box4.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
  }
}
