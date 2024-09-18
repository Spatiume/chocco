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

  if (event.target.closest('a').classList.value.includes('prev')) {
    direction = 'left';
  } else {
    direction = 'right'
  }

  loop(direction, event);


  function loop(direction, event) {
    let prevActiveElement = slider.querySelector('.slidermenu__item--active');
    let prevActiveElementClass = 'prev-' + direction;
    prevActiveElement.classList.add(prevActiveElementClass)
    setTimeout(function () {
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
      }, 400)

    }, 400)





  }


})