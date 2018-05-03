'use strict';

(function () {
  // отрисовывает метки похожих объявлений на карте
  window.renderPins = function () {
    var pinTemplate = document.querySelector('#map-card-template').content.querySelector('.map__pin');
    var pinsList = document.createDocumentFragment();

    window.mapObjects.forEach(function (mapCard, index) {
      var pinElement = pinTemplate.cloneNode(true);

      pinElement.style.left = (mapCard.location.x + pinElement.offsetWidth / 2) + 'px';
      pinElement.style.top = (mapCard.location.y - pinElement.offsetHeight) + 'px';
      pinElement.querySelector('img').src = mapCard.author.avatar;
      pinElement.querySelector('img').alt = mapCard.offer.title;
      pinElement.setAttribute('data-id', index);

      pinsList.appendChild(pinElement);
    });
    document.querySelector('.map__pins').appendChild(pinsList);
  };
})();
