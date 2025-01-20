export default class MobileMenu {
}

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const menu = document.querySelector('.hamburger__items');
  const closeButton = document.querySelector('.hamburger__close');

  if (hamburger && menu) {
    hamburger.addEventListener('click', () => {
      menu.classList.toggle('active');
      hamburger.classList.toggle('open');
    });
  }

  if (closeButton) {
    closeButton.addEventListener('click', () => {
      menu.classList.remove('active');
      hamburger.classList.remove('open');
    });
  }
});