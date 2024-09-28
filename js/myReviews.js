export function myReviews() {

  const reviewDom = document.querySelector('.review');
  const reviewsDom = document.querySelector('.reviews');
  const formReview = document.querySelector('.form-review');
  const reviewBtnNewReview = document.querySelector('.reviews-btn__new');
  let overlay;
  let overlayMessage = document.querySelector('.overlay');
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
    reviewBtnNewReview.closest('.reviews__item').style.display = 'none';
    overlay = createOverlay(overlayMessage, `Спасибо за отзыв! 
      Он будет размещен на сайте после проверки администратора. 
      <br> (Будьте внимательны, Вы можете оставить только один отзыв. 
      Если вы совершили ошибку или хотите изменить отзыв - перезагрузите страницу.)`)
    overlay.open();
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



  reviewBtnNewReview.addEventListener('click', function (event) {
    event.preventDefault();
    const template = event.target.closest('section').querySelector('.overlay-review')
    if (!template) return;
    overlay = createOverlay(template);
    overlay.open();
  });

  function createOverlay(template, message) {
    const overlay = template;
    const closeBtn = template.querySelector('.closebtn');
    if (message) {
      let overlayMessage = overlay.querySelector('.overlay__text') || null;
      if (overlayMessage) overlayMessage.innerHTML = message;
    }

    overlay.addEventListener('click', (event) => {
      if (event.target == overlay) closeBtn.click();
    })

    closeBtn.addEventListener('click', (event) => {
      event.preventDefault();
      document.body.style.overflow = '';
      document.body.classList.remove('overlay--active');
      overlay.style.display = 'none';
    })

    return {
      open() {
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        document.body.classList.add('overlay--active');
      },
      close() {
        closeBtn.click();
      },
    }
  }
}