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
    displayAnalogous();
  } else if (secValue == "Monochromatic") {
    displayMonochromatic();
  } else if (secValue == "Triad") {
    displayTriad();
  } else if (secValue == "Complementary") {
    displayComplementary();
  } else if (secValue == "Compound") {
  } else if (secValue == "Shades") {
    displayShades();
  }
}

function revertToWhite() {
  box1.style.backgroundColor = "white";
  box2.style.backgroundColor = "white";
  box3.style.backgroundColor = "white";
  box4.style.backgroundColor = "white";
}

function calcHSL() {
  const hslColor = document.querySelector("p#hsl").textContent;

  let hslValues = {
    h: 0,
    s: 0,
    l: 0
  };

  hslValues.h = hslColor.substring(hslColor.indexOf(" ") + 1, hslColor.indexOf(","));
  hslValues.s = hslColor.substring(hslColor.indexOf(",") + 2, hslColor.indexOf("%"));
  hslValues.l = hslColor.substring(hslColor.indexOf("%") + 3, hslColor.length - 1);

  //console.log(hslValues);
  return hslValues;
}

function displayAnalogous() {
  let HSL = calcHSL();

  HSL.h = Number(HSL.h);
  HSL.s = Number(HSL.s);
  HSL.l = Number(HSL.l);

  let hNew = HSL.h;

  if (hNew < 30) {
    hNew = hNew + 360 - 30;
    box1.style.backgroundColor = `hsl(${hNew}, ${HSL.s}%, ${HSL.l}%)`;
  } else {
    hNew = hNew - 30;
    box1.style.backgroundColor = `hsl(${hNew}, ${HSL.s}%, ${HSL.l}%)`;
  }

  hNew = HSL.h;

  if (hNew < 15) {
    hNew = hNew + 360 - 15;
    box2.style.backgroundColor = `hsl(${hNew}, ${HSL.s}%, ${HSL.l}%)`;
  } else {
    hNew = hNew - 15;
    box2.style.backgroundColor = `hsl(${hNew}, ${HSL.s}%, ${HSL.l}%)`;
  }

  hNew = HSL.h;

  if (hNew > 345) {
    hNew = (hNew - 345) + 15;
    box3.style.backgroundColor = `hsl(${hNew}, ${HSL.s}%, ${HSL.l}%)`;
  } else {
    hNew = hNew + 15;
    box3.style.backgroundColor = `hsl(${hNew}, ${HSL.s}%, ${HSL.l}%)`;
  }

  hNew = HSL.h;

  if (hNew > 330) {
    hNew = (hNew - 330) + 35;
    box4.style.backgroundColor = `hsl(${hNew}, ${HSL.s}%, ${HSL.l}%)`;
  } else {
    hNew = hNew + 35;
    box4.style.backgroundColor = `hsl(${hNew}, ${HSL.s}%, ${HSL.l}%)`;
  }
}

function displayMonochromatic() {
  let HSL = calcHSL();
  HSL.h = Number(HSL.h);
  HSL.s = Number(HSL.s);
  HSL.l = Number(HSL.l);

  box1.style.backgroundColor = `hsl(${HSL.h}, ${HSL.s}%, ${Math.round(HSL.l * 0.7)}%)`;
  box2.style.backgroundColor = `hsl(${HSL.h}, ${HSL.s}%, ${Math.round(HSL.l * 0.85)}%)`;
  if (HSL.l == 0) {
    box3.style.backgroundColor = `hsl(${HSL.h}, ${HSL.s}%, ${Math.round(HSL.l + 15)}%)`;
    box4.style.backgroundColor = `hsl(${HSL.h}, ${HSL.s}%, ${Math.round(HSL.l + 30)}%)`;
  } else {
    box3.style.backgroundColor = `hsl(${HSL.h}, ${HSL.s}%, ${Math.round(HSL.l * 1.15)}%)`;
    box4.style.backgroundColor = `hsl(${HSL.h}, ${HSL.s}%, ${Math.round(HSL.l * 1.3)}%)`;
  }
}


function displayTriad() {
  let HSL = calcHSL();
  HSL.h = Number(HSL.h);
  HSL.s = Number(HSL.s);
  HSL.l = Number(HSL.l);

  let hNew = HSL.h;
  if (hNew < 60) {
    hNew = hNew + 300;
  } else {
    hNew = hNew - 60;
  }
  box2.style.backgroundColor = `hsl(${hNew}, ${HSL.s}%, ${HSL.l}%)`;
  box1.style.backgroundColor = `hsl(${hNew}, ${HSL.s}%, ${Math.round(HSL.l * 0.5)}%)`;

  hNew = HSL.h;
  if (hNew > 300) {
    hNew = (hNew - 300) + 60;
  } else {
    hNew = hNew + 60;
  }
  box3.style.backgroundColor = `hsl(${hNew}, ${HSL.s}%, ${HSL.l}%)`;
  box4.style.backgroundColor = `hsl(${hNew}, ${HSL.s}%, ${Math.round(HSL.l * 0.5)}%)`;
}

function displayComplementary() {
  let HSL = calcHSL();
  HSL.h = Number(HSL.h);
  HSL.s = Number(HSL.s);
  HSL.l = Number(HSL.l);

  box1.style.backgroundColor = `hsl(${HSL.h}, ${HSL.s}%, ${Math.round(HSL.l * 0.7)}%)`;

  box2.style.backgroundColor = `hsl(${HSL.h}, ${HSL.s}%, ${Math.round(HSL.l * 1.15)}%)`;

  if (HSL.h > 180) {
    HSL.h = HSL.h - 180;
  } else if (HSL.h <= 180) {
    HSL.h = HSL.h + 180;
  }
  box3.style.backgroundColor = `hsl(${HSL.h}, ${HSL.s}%, ${HSL.l}%)`;
  if (HSL.l >= 50) {
    box4.style.backgroundColor = `hsl(${HSL.h}, ${HSL.s}%, ${HSL.l * 0.8}%)`;
  } else {
    box4.style.backgroundColor = `hsl(${HSL.h}, ${HSL.s}%, ${HSL.l * 1.2}%)`;
  }
}

function displayShades() {
  let HSL = calcHSL();
  HSL.h = Number(HSL.h);
  HSL.s = Number(HSL.s);
  HSL.l = Number(HSL.l);

  box1.style.backgroundColor = `hsl(${HSL.h}, ${Math.round(HSL.s * 0.4)}%, ${HSL.l}%)`;
  box2.style.backgroundColor = `hsl(${HSL.h}, ${Math.round(HSL.s * 0.8)}%, ${HSL.l}%)`;

  if (HSL.s == 0) {
    box3.style.backgroundColor = `hsl(${HSL.h}, ${Math.round(HSL.s + 25)}%, ${HSL.l}%)`;
    box4.style.backgroundColor = `hsl(${HSL.h}, ${Math.round(HSL.s + 50)}%, ${HSL.l}%)`;
  } else {
    box3.style.backgroundColor = `hsl(${HSL.h}, ${Math.round(HSL.s * 0.6)}%, ${HSL.l}%)`;
    box4.style.backgroundColor = `hsl(${HSL.h}, ${Math.round(HSL.s * 0.2)}%, ${HSL.l}%)`;
  }
}