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


//reviews section 

const reviewDom = document.querySelector('.review');
const reviewsDom = document.querySelector('.reviews');
const formReview = document.querySelector('.form-review');
let overlay;
let reviewJson = [{
  id: 0,
  title: 'Лучший перекус',
  text: 'Я ем малыми порциями, но часто. Это повышает мою продуктивность в разы. В течение дня сижу за компьютером и часто отходить в кафе или на кухню просто не могу себе позволить. А батончик – он всегда под рукой. Это приятно и удобно.',
  author: 'Алёна Хмельницкая',
  img: './img/reviews/review1.jpg',
},
{
  id: 1,
  title: 'Супер, я люблю покушать',
  text: 'Я ем малыми порциями, но часто. Это повышает мою продуктивность в разы. В течение дня сижу за компьютером и часто отходить в кафе или на кухню просто не могу себе позволить. А батончик – он всегда под рукой. Это приятно и удобно.',
  author: 'Виктор Устрица',
  img: './img/reviews/review2.jpg',
},
{
  id: 2,
  title: 'Кайф, очень понравилось',
  text: 'Я ем малыми порциями, но часто. Это повышает мою продуктивность в разы. В течение дня сижу за компьютером и часто отходить в кафе или на кухню просто не могу себе позволить. А батончик – он всегда под рукой. Это приятно и удобно.',
  author: 'Евгения Гагарина',
  img: './img/reviews/review3.jpg',
},];


formReview.addEventListener('submit', function (event) {
  event.preventDefault();
  let review = createNewReview();
  reviewJson.push(review)
  createNewReviewDom(review);
  showReview(review);
  overlay.close();
  formReview.reset();
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



reviewsDom.addEventListener('click', function (event) {
  event.preventDefault();
  let item = event.target.closest('[data-review-id]');
  if (!item) return;
  let itemId = item.dataset.reviewId
  item.closest('.reviews__list').querySelector('.reviews__item--active').classList.remove('reviews__item--active');
  item.classList.add('reviews__item--active')
  showReview(reviewJson[itemId]);
});


function createNewReview() {
  let newReview = { id: '', title: '', text: '', author: '', img: '', };
  newReview.title = formReview.querySelector('#form-review__title').value;
  newReview.author = formReview.querySelector('#form-review__author').value;
  newReview.text = formReview.querySelector('#form-review__text').value;
  newReview.img = formReview.querySelector('img').src;
  newReview.id = reviewJson.length;
  if (newReview.img < 100) newReview.img.src = './../img/reviews/camera.png';
  return newReview;
}

function createNewReviewDom(review) {
  let newReviewDom = reviewsDom.querySelector('.reviews__item').cloneNode(true);
  reviewsDom.querySelector('.reviews__list').lastElementChild.before(newReviewDom);
  newReviewDom.dataset.reviewId = review.id;
  newReviewDom.querySelector('img').src = review.img;
  newReviewDom.click();
}

function showReview(review) {
  let title = reviewDom.querySelector('.review__title');
  let text = reviewDom.querySelector('.review__text');
  let author = reviewDom.querySelector('.review__author');
  let img = reviewDom.querySelector('.review__img');

  title.textContent = review.title;
  text.innerHTML = `<p>${review.text}</p>`;
  author.textContent = review.author;
  img.src = review.img;
}

const reviewBtnNewReview = document.querySelector('.reviews-btn__new');

reviewBtnNewReview.addEventListener('click', function (event) {
  event.preventDefault();
  const template = event.target.closest('section').querySelector('.overlay')
  if (!template) return;
  overlay = createOverlay(template);
  overlay.open();
});

function createOverlay(template) {
  const overlay = template;
  const closeBtn = template.querySelector('.closebtn');

  overlay.addEventListener('click', (event) => {
    if (event.target == overlay) closeBtn.click();
  })

  closeBtn.addEventListener('click', (event) => {
    event.preventDefault();
    document.body.style.overflow = '';
    overlay.style.display = 'none';
  })

  return {
    open() {
      overlay.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    },
    close() {
      closeBtn.click();
    },
  }
}
