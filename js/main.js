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

  loop(direction);


  function loop(direction) {

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


const review = document.querySelector('.review');

const formReview = document.querySelector('.form-review');

formReview.addEventListener('submit', function (event) {
  event.preventDefault();

  function createNewReview() {
    let newReview = { title: '', text: '', author: '', img: '' };
    newReview.title = formReview.querySelector('#form-review__title').value;
    newReview.author = formReview.querySelector('#form-review__author').value;
    newReview.text = formReview.querySelector('#form-review__text').value;
    newReview.img = formReview.querySelector('img').src;
    if (newReview.img < 100) newReview.img.src = './../img/reviews/camera.png';
    return newReview;
  }

  console.log(createNewReview());

});

formReview.querySelector('input[type=file]').addEventListener('change', function (event) {
  toBase64(event.target.files[0], getReviewImgSrc);

  function getReviewImgSrc(url) {
    formReview.querySelector('img').src = url;
  }
  
  function toBase64(file, getReviewImgSrc) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      getReviewImgSrc(reader.result);
    };
  }
});












let newReview = [{
  title: 'Лучший перекус',
  text: 'Я ем малыми порциями, но часто. Это повышает мою продуктивность в разы. В течение дня сижу за компьютером и часто отходить в кафе или на кухню просто не могу себе позволить. А батончик – он всегда под рукой. Это приятно и удобно.',
  author: 'Алёна Хмельницкая',
  img: './img/reviews/review1.jpg',
},
{
  title: 'Супер, я люблю покушать',
  text: 'Я ем малыми порциями, но часто. Это повышает мою продуктивность в разы. В течение дня сижу за компьютером и часто отходить в кафе или на кухню просто не могу себе позволить. А батончик – он всегда под рукой. Это приятно и удобно.',
  author: 'Виктор Устрица',
  img: './img/reviews/review2.jpg',
},
{
  title: 'Кайф, очень понравилось',
  text: 'Я ем малыми порциями, но часто. Это повышает мою продуктивность в разы. В течение дня сижу за компьютером и часто отходить в кафе или на кухню просто не могу себе позволить. А батончик – он всегда под рукой. Это приятно и удобно.',
  author: 'Евгения Гагарина',
  img: './img/reviews/review3.jpg',
},


]


review.addEventListener('click', function (event) {
  console.log('click');
  createReview(review, newReview[2]);
})

function createReview(review, newReview) {
  let title = review.querySelector('.review__title');
  let text = review.querySelector('.review__text');
  let author = review.querySelector('.review__author');
  let img = review.querySelector('.review__img');

  title.textContent = newReview.title;
  text.innerHTML = `<p>${newReview.text}</p>`;
  author.textContent = newReview.author;
  console.log(img);
  img.src = './../img/reviews/review3.jpg';

}


