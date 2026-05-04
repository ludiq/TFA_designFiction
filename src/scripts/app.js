"use strict";

//SLIDER
const sliderContainer = document.querySelector('.sliderContainer');

// mouvement de translation
// on prend le sliderContainer et on modifie son transform -> la translationX = le scrollY en px
function syncScroll() {
  sliderContainer.style.transform = `translateX(${-window.scrollY}px)`;
}
// écouter le scroll
window.addEventListener('scroll', syncScroll);

//FOOTER
var currentYear = new Date().getFullYear();
var yearFooter = document.querySelector(".annee");
yearFooter.textContent = currentYear