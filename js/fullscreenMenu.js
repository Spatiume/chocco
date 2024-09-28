
export function fullScreenMenu() {
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const fullScreenMenu = document.querySelector('.fullscreen-menu')

  fullScreenMenu.addEventListener('click', function (event) {
    event.preventDefault();
    if (event.target.hasAttribute(['data-scroll-to'])) {
      close();
    }

    if (event.target.classList.contains('fullscreen-menu__close')) {
      close();
    }

    function close() {
      fullScreenMenu.classList.remove('fullscreen-menu--active');
      document.body.style.overflow = '';
    }
  })

  hamburgerMenu.addEventListener('click', function (event) {
    event.preventDefault();
    fullScreenMenu.classList.add('fullscreen-menu--active');
    document.body.style.overflow = 'hidden';
  })
}


