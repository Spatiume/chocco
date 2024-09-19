const hamburgerMenu = document.querySelector('.hamburger-menu');
const fullScreenMenu = document.querySelector('.fullscreen-menu')
const closeFullScreenMenu = document.querySelector('.fullscreen-menu__close')

closeFullScreenMenu.addEventListener('click', function (event) {
  event.preventDefault();
  fullScreenMenu.classList.remove('fullscreen-menu--active');
  document.body.style.overflow = '';
})

hamburgerMenu.addEventListener('click', function (event) {
  event.preventDefault();
  fullScreenMenu.classList.add('fullscreen-menu--active');
  document.body.style.overflow = 'hidden';
})


const slider = document.querySelector('.slidermenu');

slider.addEventListener('click', function (event) {

  if (!event.target.closest('a')) return;
  event.preventDefault();

  let direction = '';
  let slidermenuList = slider.querySelector('.slidermenu__list');

  if (event.target.closest('a').classList.value.includes('prev')) {
    direction = 'left';
  } else {
    direction = 'right'
  }

  loop(direction, event);


  function loop(direction, event) {

    let delay = (window.matchMedia('(max-width: 768px)').matches) ? 200 : 400;

    let prevActiveElement = slider.querySelector('.slidermenu__item--active');
    prevActiveElement.classList.add('prev-' + direction);

    setTimeout(function () {
      prevActiveElement.classList.remove('prev-' + direction);
      prevActiveElement.classList.remove('slidermenu__item--active');

      if (direction === 'right') {
        slidermenuList.append(slidermenuList.firstElementChild);
        slidermenuList.firstElementChild.classList.add('prev-' + 'left');
      } else {
        slidermenuList.prepend(slidermenuList.lastElementChild);
        slidermenuList.firstElementChild.classList.add('prev-' + 'right');
      }
      setTimeout(() => {
        slidermenuList.firstElementChild.classList.add('slidermenu__item--active');
        slidermenuList.firstElementChild.classList.remove('prev-' + 'left');
        slidermenuList.firstElementChild.classList.remove('prev-' + 'right');
      }, 200)

    }, delay)

  }

});


const teamlist = document.querySelector('.team__list');

teamlist.addEventListener('click', function (event) {

  if (!event.target.closest('.teammate')) return;
  event.preventDefault();

  if (event.target.closest('.teammate').classList.contains('teammate--active')) {
    event.target.closest('.teammate').classList.remove('teammate--active');
    return;
  }
  if (teamlist.querySelector('.teammate--active')) {
    teamlist.querySelector('.teammate--active').classList.remove('teammate--active');
  }
  event.target.closest('.teammate').classList.add('teammate--active');
})


const choccoMenu = document.querySelector('.chocco-menu');

choccoMenu.addEventListener('click', function (event) {
  if (!event.target.closest('.chocco-menu__trigger')) return;
  event.preventDefault();

  let activeItem = choccoMenu.querySelector('.chocco-menu__item--active');
  if (activeItem) {
    activeItem.classList.remove('chocco-menu__item--active')
  }

  let item = event.target.closest('.chocco-menu__item');
  item.classList.add('chocco-menu__item--active');
})
