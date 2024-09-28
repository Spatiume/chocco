export function myMap() {

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
}