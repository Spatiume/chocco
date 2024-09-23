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










// YANDEX map



let myMap;
const init = () => {
  myMap = new ymaps.Map("map", {
    center: [59.889140, 30.325289],
    zoom: 15,
    controls: [],
  });

  let coords = [
    [59.889240, 30.330789],
  ],
    myCollection = new ymaps.GeoObjectCollection({}, {
      draggable: false,
      iconLayout: 'default#image',
      iconImageHref: './icons/marker.svg',
      iconImageSize: [46, 57],
      iconImageOffset: [-35, -52]
    });

  for (let i = 0; i < coords.length; i++) {
    myCollection.add(new ymaps.Placemark(coords[i]));
  }

  myMap.geoObjects.add(myCollection);

  var myPolyline = new ymaps.Polyline([
    [59.891723, 30.318062],
    [59.891286, 30.318389],
    [59.891033, 30.318968],
    [59.890166, 30.319011],
    [59.888799, 30.319169],
    [59.888810, 30.319963],
    [59.888824, 30.323808],
    [59.888826, 30.323838],
    [59.888834, 30.324264],
    [59.888875, 30.325052],
    [59.888949, 30.330295],
    [59.8890801, 30.330295],
  ], {},
    {
      strokeWidth: 4,
      strokeColor: '#365a49',
      draggable: false
    });

  myMap.geoObjects.add(myPolyline);
  myPolyline.editor.startEditing();

  myMap.behaviors.disable('scrollZoom');
};

ymaps.ready(init);

const mapInfo = document.querySelector('.map-info');

mapInfo.addEventListener('click', function (event) {
  if (event.target.classList.contains('map-info__trigger')) {
    event.preventDefault();
    event.target.closest('.map-info').classList.toggle('map-info--active')
  }
});

let player;
const playerContainer = document.querySelector('.player')

let eventsInit = () => {

  document.querySelector('.player__start').addEventListener('click', (e) => {
    e.preventDefault();
    player.playVideo();
  });

  document.querySelector('.player__pause').addEventListener('click', (e) => {
    e.preventDefault();
    player.pauseVideo();
  });

  document.querySelector('.player__splash-start').addEventListener('click', (e) => {
    e.preventDefault();
    player.playVideo();
  });

  document.querySelector('.player__playback').addEventListener('click', (e) => {
    const bar = e.target;
    const clickedPosition = e.clientX - bar.getBoundingClientRect().left;
    const newButtonPositionPercent = (clickedPosition / bar.getBoundingClientRect().width) * 100;
    const newPlaybackPositionSec = (player.getDuration() / 100) * newButtonPositionPercent;

    document.querySelector('.player__playback-button').style.left = newPlaybackPositionSec + '%';

    player.seekTo(newPlaybackPositionSec);

  })

  document.querySelector('.volume__button').addEventListener('click', (e) => {
    if (player.isMuted()) {
      playerContainer.classList.remove('player--mute');
      document.querySelector('.volume__level-button').style.left = player.getVolume() + '%';
      player.unMute()
    } else {
      playerContainer.classList.add('player--mute');
      document.querySelector('.volume__level-button').style.left = 0 + '%';
      player.mute()
    }
  });

  document.querySelector('.volume__level').addEventListener('click', (e) => {
    const bar = e.target;
    const clickedPosition = e.clientX - bar.getBoundingClientRect().left;
    const newButtonPositionPercent = (clickedPosition / bar.getBoundingClientRect().width) * 100;


    if (playerContainer.classList.contains('player--mute') && newButtonPositionPercent > 0) {
      playerContainer.classList.remove('player--mute');
    }

    if (newButtonPositionPercent == 0) {
      playerContainer.classList.add('player--mute');
    }

    document.querySelector('.volume__level-button').style.left = newButtonPositionPercent + '%';

    player.setVolume(newButtonPositionPercent);

  });
}

function formatTime(timeSec) {
  const roundTime = Math.round(timeSec);

  const minutes = addZero(Math.floor(roundTime / 60));
  const seconds = addZero(Math.floor(roundTime - minutes * 60));

  function addZero(num) {
    return num < 10 ? `0${num}` : num;
  }

  return `${minutes}:${seconds}`
}

const onPlayerReady = () => {
  let interval;

  const durationSec = player.getDuration();
  document.querySelector('.player__duration-estimate').textContent = formatTime(durationSec);

  if (interval !== undefined) {
    clearInterval(interval);
  }

  interval = setInterval(() => {
    const completedSec = player.getCurrentTime();
    document.querySelector('.player__duration-completed').textContent = formatTime(completedSec);

    const completedPercent = (completedSec / durationSec * 100);
    document.querySelector('.player__playback-button').style.left = completedPercent + '%'
  }, 1000)

  const volumeLevel = player.getVolume();
  document.querySelector('.volume__level-button').style.left = volumeLevel + '%';
}

const onPlayerStateChange = event => {
  /*
    -1 (воспроизведение видео не начато), 0 (воспроизведение видео завершено)
    1 (воспроизведение), 2 (пауза), 3 (буферизация), 5 (видео подают реплики).
  */
  switch (event.data) {
    case 1:
      playerContainer.classList.add('player--active')
      playerContainer.classList.remove('player--paused');
      break;
    case 2:
      playerContainer.classList.remove('player--active')
      playerContainer.classList.add('player--paused');
      break;
  }
};



function onYouTubeIframeAPIReady() {
  player = new YT.Player("yt-player", {
    height: "405",
    width: "660",
    videoId: "DISjdfkSjc8",
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    },
    playerVars: {
      controls: 0,
      disablekb: 1,
      showinfo: 0,
      rel: 0,
      autoplay: 0,
      modestbranding: 0
    }
  });
}

eventsInit();