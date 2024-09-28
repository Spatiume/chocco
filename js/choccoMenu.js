export function choccoMenu(){

  const choccoMenu = document.querySelector('.chocco-menu');

  choccoMenu.addEventListener('click', function (event) {
    if (!event.target.closest('.chocco-menu__trigger') && !event.target.closest('.chocco-menu__btn')) return;
    event.preventDefault();

    let target = event.target.closest('.chocco-menu__item');
    let activeEl = choccoMenu.querySelector('.chocco-menu__item--active');

    if (target == activeEl) {
      close();
    } else {
      open();
    }

    function open() {
      if (activeEl) close();
      target.classList.add('chocco-menu__item--active');
    }

    function close() {
      activeEl.classList.remove('chocco-menu__item--active');
    }

  })
}