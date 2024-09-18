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
  let activeItem = slider.querySelector('.slidermenu__item--active')
  let moveStart = false;

  if (event.target.closest('a').classList.value.includes('prev')) {
    direction = 'left';
  } else {
    direction = 'right'
  }

  loop(direction, event);


  function loop(direction, event) {
    if (moveStart) return;

    let delay = 400;

    const mediaQuery = window.matchMedia('(max-width: 768px)')

    if (mediaQuery.matches) {
      delay = 200;
    }


    let prevActiveElement = slider.querySelector('.slidermenu__item--active');

    let prevActiveElementClass = 'prev-' + direction;

    prevActiveElement.classList.add(prevActiveElementClass);

    setTimeout(function () {
      moveStart = true;
      prevActiveElement.classList.remove(prevActiveElementClass);

      slider.querySelector('.slidermenu__item--active').classList.remove('slidermenu__item--active');

      if (direction === 'right') {
        for (let item of slidermenuList.children) {
          item.classList.remove('transition-left');
          item.classList.add('transition-right');
        }
        slidermenuList.append(slidermenuList.firstElementChild);
      } else {
        for (let item of slidermenuList.children) {
          item.classList.remove('transition-right');
          item.classList.add('transition-left');
        }
        slidermenuList.prepend(slidermenuList.lastElementChild);
      }
      setTimeout(function () {
        slidermenuList.firstElementChild.classList.add('slidermenu__item--active');
      }, delay)

    }, delay)

  }

})


const teamlist = document.querySelector('.team__list');

teamlist.addEventListener('click', function (event) {

  if (!event.target.closest('.teammate')) return;

  if (event.target.closest('.teammate').classList.contains('teammate--active')) {
    event.target.closest('.teammate').classList.remove('teammate--active');
    return;
  }
  if(teamlist.querySelector('.teammate--active')){
    teamlist.querySelector('.teammate--active').classList.remove('teammate--active');
  }
  event.target.closest('.teammate').classList.add('teammate--active');
})