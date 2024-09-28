export function mySlider() {


  const slider = document.querySelector('.slidermenu');
  let isMoving = false;

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
    if (!isMoving) {
      loop(direction);
    }



    function loop(direction) {
      isMoving = true;

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
          isMoving = false;
        }, 200)

      }, delay)

    }

  });
}