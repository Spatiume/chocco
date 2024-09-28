export function myTeam() {
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

}