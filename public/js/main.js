document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.querySelector('.burger-menu');
    const burgerIcon = document.querySelector('.burger-icon');
    const nav = document.querySelector('.nav');
    
    burgerMenu.addEventListener('click', () => {
      burgerIcon.classList.toggle('open');
      nav.classList.toggle('active');
    });
    
    // Fermer le menu quand on clique sur un lien
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        burgerIcon.classList.remove('open');
        nav.classList.remove('active');
      });
    });
  });


const body = document.querySelector('body')
document.body.style.background = 'linear-gradient(to left, wheat, white, wheat)';
const lien1 = document.getElementsByClassName('img-container')[0]
const lien2 = document.getElementsByClassName('img-container')[1]
const lien3 = document.getElementsByClassName('img-container')[2]

lien1.addEventListener('click',()=>{
    window.location.href="https://kadirdolek.github.io/CBienBon-KD/"
})
lien2.addEventListener('click',()=>{
    window.location.href="https://kadirdolek.github.io/Projet-Romyk_KD/"
})
lien3.addEventListener('click',()=>{
    window.location.href="https://kadirdolek.github.io/Calculette-KD/"
})








 


