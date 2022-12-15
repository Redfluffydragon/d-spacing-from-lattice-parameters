'use strict'

const hInput = document.getElementById('hInput');
const kInput = document.getElementById('kInput');
const lInput = document.getElementById('lInput');

const aInput = document.getElementById('aInput');
const bInput = document.getElementById('bInput');
const cInput = document.getElementById('cInput');

const alphaInput = document.getElementById('alphaInput');
const betaInput = document.getElementById('betaInput');
const gammaInput = document.getElementById('gammaInput');

const showDSpacing = document.getElementById('showDSpacing');

/**
 * Convert an angle from degrees to radians
 * @param {Number} degrees Input angle in degrees
 * @returns {Number} Input angle in radians
 */
const degToRad = degrees => degrees * Math.PI/180;

/**
 * Take the sine of an angle in radians
 * @param {Number} angle Input angle in radians
 * @returns {Number} Sine of the input angle
 */
const SIN = angle => Math.sin(angle);

/**
 * Take the cosine of an angle in radians
 * @param {Number} angle Input angle in radians
 * @returns {Number} Cosine of the input angle
 */
const COS = angle => Math.cos(angle);

/**
 * Calculate the d-spacing of a plane in a lattice given all the lattice parameters and the hkl values for the plane
 * @param {Object} plane 
 * @param {Object} latticeParams 
 * @returns {Number}
 */
function DSpacing(params) {
  const {
    h,
    k,
    l,
    a,
    b,
    c,
  } = params;
  const alpha = degToRad(params.alpha);
  const beta = degToRad(params.beta);
  const gamma = degToRad(params.gamma);
  
  const volume = a * b * c * 
                 Math.sqrt(1 - Math.pow(COS(alpha), 2) - 
                 Math.pow(COS(beta), 2) - 
                 Math.pow(COS(gamma), 2) + 
                 2 * COS(alpha) * COS(beta) * COS(gamma));


  return Math.sqrt(1 / ((a * a * b * b * c * c / (volume * volume)) *
                  (h * h * Math.pow(SIN(alpha), 2) / (a * a) +
                  k * k * Math.pow(SIN(beta), 2) / (b * b) +
                  l * l * Math.pow(SIN(gamma), 2) / (c * c) +
                  2 * h * k * (COS(alpha) * COS(beta) - COS(gamma)) / (a * b) +
                  2 * k * l * (COS(beta) * COS(gamma) - COS(alpha)) / (b * c) +
                  2 * l * h * (COS(gamma) * COS (alpha) - COS(beta)) / (a * c))))
}

document.getElementById('calcBtn').addEventListener('click', () => {
  showDSpacing.value = DSpacing({
    h: hInput.value,
    k: kInput.value,
    l: lInput.value,
    a: aInput.value,
    b: bInput.value,
    c: cInput.value,
    alpha: alphaInput.value,
    beta: betaInput.value,
    gamma: gammaInput.value,
  });
}, false);
/* 
// Question 2
console.log(DSpacing({h: 1, k: 1, l: 0, a: 1, b: 2, c: 3, alpha: 30, beta: 60, gamma: 85}));
console.log(DSpacing({h: 1, k: 1, l: 0, a: 1, b: 2, c: 6, alpha: 30, beta: 60, gamma: 85}));

// Question 3
console.log(DSpacing({h: 1, k: 0, l: 1, a: 1, b: 2, c: 3, alpha: 30, beta: 60, gamma: 85}));
console.log(DSpacing({h: 1, k: 0, l: 1, a: 1, b: 2, c: 6, alpha: 30, beta: 60, gamma: 85}));

// Question 4
// console.log(DSpacing({h: 1, k: 1, l: 2, a: 1, b: 2, c: 3, alpha: 30, beta: 60, gamma: 85}));
// console.log(DSpacing({h: 1, k: 1, l: 2, a: 4, b: 4, c: 4, alpha: 90, beta: 90, gamma: 90}));
 */