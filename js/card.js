'use strict';

(function () {
  var TYPES_MAP = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  // отрисовывает объявление об имуществе соответствующее нажатой метке на карте
  window.renderCard = function (article, index) {
    var cardTemplate = document.querySelector('#map-card-template').content.querySelector('.map__card');
    var cardsList = document.createDocumentFragment();
    var cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = article[index].offer.title;
    cardElement.querySelector('.popup__text--address').textContent = article[index].offer.address;
    cardElement.querySelector('.popup__text--price').textContent = article[index].offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = TYPES_MAP[article[index].offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = article[index].offer.rooms + ' комнат' + (article[index].offer.rooms === 1 ? 'а' : 'ы') + ' для ' + article[index].offer.guests + ' гост' + (article[index].offer.guests === 1 ? 'я' : 'ей');
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + article[index].offer.checkin + ', выезд до ' + article[index].offer.checkout;
    cardElement.querySelector('.popup__description').textContent = article[index].offer.description;
    cardElement.querySelector('.popup__photos').textContent = article[index].offer.description;
    cardElement.querySelector('img').src = article[index].avatar;
    cardElement.querySelector('.popup__features').innerHTML = ''; // не знаю можно ли так
    article[index].offer.features.forEach(function (feature) {
      var el = document.createElement('LI');
      el.className = 'popup__feature popup__feature--' + feature;
      cardElement.querySelector('.popup__features').appendChild(el);
    });

    article[index].offer.photos.forEach(function (source) {
      var el = document.createElement('IMG');

      el.src = source;
      el.className = 'popup__photo';
      el.alt = 'Фотография жилья';
      el.setAttribute('width', 45);
      el.setAttribute('height', 40);

      cardElement.querySelector('.popup__photos').appendChild(el);
    });

    cardsList.appendChild(cardElement);

    document.querySelector('.map').insertBefore(cardsList, document.querySelector('.map__filters-container'));
  };

})();

