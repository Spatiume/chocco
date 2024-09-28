export function onePageScroll() {

  const sections = document.querySelectorAll('.section');
  const display = document.querySelector('.maincontent');
  let inScroll = false;

  function performTransition(sectionEq) {
    if (!inScroll) {
      inScroll = true;

      const position = sectionEq * -100;
      display.style.transform = `translateY(${position}%)`

      Array.from(sections).find(item => item.classList.contains('active')).classList.remove('active');
      sections[sectionEq].classList.add('active');
    }

    const fixedMenu = document.querySelector('.fixed-menu');
    const darkMode = [1, 2, 3, 5, 6, 7, 8];
    darkMode.includes(+sectionEq) ? fixedMenu.classList.add('dark') : fixedMenu.classList.remove('dark');

    setTimeout(() => {
      fixedMenu.querySelector('.active').classList.remove('active');
      fixedMenu.querySelector(`[data-scroll-to='${sectionEq}']`).closest('.fixed-menu__item').classList.add('active');
      inScroll = false;
    }, 1500);
    // display.addEventListener("transitionend", (event) => {
    //   console.log('dooo')
    //   inScroll = false;
    // });
  }

  function scrollSection(direction) {
    const activeSection = Array.from(sections).find(item => item.classList.contains('active'));

    const activeSectionIndex = Array.from(sections).indexOf(activeSection);
    const nextSectionIndex = activeSectionIndex + 1;
    const prevSectionIndex = activeSectionIndex - 1;
    if (nextSectionIndex < sections.length && direction == 'next') {
      performTransition(nextSectionIndex);
    }

    if (prevSectionIndex >= 0 && direction == 'prev') {
      performTransition(prevSectionIndex);
    }

  }

  function onWheel(event) {
    if (event.ctrlKey) return;
    // window.removeEventListener('wheel', onWheel);
    const deltaY = event.deltaY;
    if (!inScroll) {
      if (deltaY > 0) {
        scrollSection('next');
      }
      if (deltaY < 0) {
        scrollSection('prev');
      }
    }
    // setTimeout(() => {
    //   window.addEventListener('wheel', onWheel);
    // }, 1000);
  }

  window.addEventListener('wheel', onWheel);

  document.addEventListener('keydown', function (event) {
    const tagName = event.target.tagName.toLowerCase();

    if (tagName !== 'input' && tagName !== 'textarea') {

      switch (event.code) {
        case 'ArrowUp':
          scrollSection('prev');
          break;
        case 'ArrowDown':
          scrollSection('next')
          break;
        case 'Space':
          scrollSection('next')
          break;
      }
    }
  })

  let links = document.querySelectorAll('[data-scroll-to]');

  document.querySelectorAll('[data-scroll-to]').forEach(item => {
    item.addEventListener('click', function (event) {
      event.preventDefault();
      const sectionIndex = event.target.dataset.scrollTo;
      performTransition(sectionIndex);
    })
  })



  /// http://hgoebl.github.io/mobile-detect.js/
  const md = new MobileDetect(window.navigator.userAgent);
  const isMobile = md.mobile();
  // console.log(isMobile);

  if (isMobile) {
    // http://github.com/mattbryson/TouchSwipe-Jquery-Plugin
    $("body").swipe({
      //Generic swipe handler for all directions
      swipe: function (event, direction) {
        const windowScroller = scrollSection;

        if (direction === 'up') windowScroller('next');
        if (direction === 'down') windowScroller('prev');
      }
    });
  }
}