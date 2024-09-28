export function myPlayer() {

  let player;
  let playerOn = false; // долгая загрузка youtube, без vpn
  const playerContainer = document.querySelector('.player')

  let eventsInit = () => {

    document.querySelector('.player__start').addEventListener('click', (e) => {
      e.preventDefault();
      if (playerOn) {
        player.playVideo();
      } else {
        playerOff();
      } 
    });

    document.querySelector('.player__pause').addEventListener('click', (e) => {
      if (!playerOn) return;
      e.preventDefault();
      player.pauseVideo();
    });

    document.querySelector('.player__splash-start').addEventListener('click', (e) => {
      e.preventDefault();
      if (playerOn) {
        player.playVideo();
      } else {
        playerOff();
      }
    });

    function playerOff() {
      playerContainer.classList.add('player--loading');
      setTimeout(() => {
        playerContainer.classList.remove('player--loading');
        playerContainer.classList.add('player--error')
      }, 5000)
    }

    document.querySelector('.player__playback').addEventListener('click', (e) => {
      if (!playerOn) return;
      const bar = e.target;
      const clickedPosition = e.clientX - bar.getBoundingClientRect().left;
      const newButtonPositionPercent = (clickedPosition / bar.getBoundingClientRect().width) * 100;
      const newPlaybackPositionSec = (player.getDuration() / 100) * newButtonPositionPercent;

      document.querySelector('.player__playback-button').style.left = newPlaybackPositionSec + '%';

      player.seekTo(newPlaybackPositionSec);

    })

    document.querySelector('.volume__button').addEventListener('click', (e) => {
      if (!playerOn) return;
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
      if (!playerOn) return;

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
}