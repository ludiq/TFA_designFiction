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


//SECTIONS CONTENT
//comme slide--X = contentContainer--X -> on peut faire une boucle pour pas devoir écrire la fonction pour chaque heure
//puis on récupère avec des doc.querySelector
//on vérifie que ça existe pour pas tout bugger et on écoute le click + on add la classe open
for (let i = 1; i <= 9; i++){
    const slide = document.querySelector('.sliderContainer__slide--' + i);
    const section = document.querySelector('.contentContainer--' + i);

    if (slide && section){
        slide.addEventListener('click', function() {
            section.classList.add('open');
            console.log("c'est booon")
        });

        //section et pas document.querySelector pour chercher que la croix qui est dans la section
        const closeBtn = section.querySelector('.closeBtn');

        if (closeBtn){
            closeBtn.addEventListener('click', function() {
                section.classList.remove('open');
                body.classList.remove('no-scroll');
            });
        }
    }
}

//HOUR CHANGE
//code du slider dans codeKit + boucle forEach pour tous les boutons
const allBtnPrev = document.querySelectorAll('.hourChange__btn--prev');
const allBtnNext = document.querySelectorAll('.hourChange__btn--next');
const sectionContainer = document.querySelector('.sectionContainer');

allBtnPrev.forEach(function(btnPrev){
    btnPrev.addEventListener('click', prevSection);
});

allBtnNext.forEach(function(btnNext){
    btnNext.addEventListener('click', nextSection);
});

function prevSection(){
    const elShow = document.querySelector('.open');
    const elPrev = elShow.previousElementSibling;

    elShow.classList.remove('open');

    if(elPrev){
        elPrev.classList.add('open');
    }else{
        const elLast = sectionContainer.lastElementChild;
        elLast.classList.add('open');
    }
}

function nextSection(){
    const elShow = document.querySelector('.open');
    const elNext = elShow.nextElementSibling;

    elShow.classList.remove('open');

    if(elNext){
        elNext.classList.add('open');
    }else{
        const elFirst = sectionContainer.firstElementChild;
        elFirst.classList.add('open');
    }
}


//FOOTER
var currentYear = new Date().getFullYear();
var yearFooter = document.querySelector(".annee");
yearFooter.textContent = currentYear