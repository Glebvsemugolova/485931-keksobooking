'use strict';

(function () {
  var MIN_PRICE = 10000;
  var MAX_PRICE = 50000;
  var MAX_NUMBER_OF_PINS = 5;

  var priceHelpers = {
    low: function (value) {
      return value <= MIN_PRICE;
    },
    middle: function (value) {
      return value > MIN_PRICE && value <= MAX_PRICE;
    },
    high: function (value) {
      return value > MAX_PRICE;
    }
  };

  // отрисовывает метки похожих объявлений на карте
  window.renderPins = function () {
    var pinTemplate = document.querySelector('#map-card-template').content.querySelector('.map__pin');
    var pinsList = document.createDocumentFragment();
    window.mapObjectsNow = window.filteredMapObjects || window.mapObjects.slice(0, 5);

    window.mapObjectsNow.forEach(function (mapCard, index) {
      var pinElement = pinTemplate.cloneNode(true);
      var pinImg = pinTemplate.querySelector('img');

      pinElement.style.left = (mapCard.location.x - pinImg.offsetWidth / 2) + 'px';
      pinElement.style.top = (mapCard.location.y - pinImg.offsetHeight) + 'px';
      pinElement.querySelector('img').src = mapCard.author.avatar;
      pinElement.querySelector('img').alt = mapCard.offer.title;
      pinElement.setAttribute('data-id', index);

      pinsList.appendChild(pinElement);
    });
    document.querySelector('.map__pins').appendChild(pinsList);
  };

  window.updatePins = function () {
    window.removeCard();
    window.removePins();
    window.filteredMapObjects = window.mapObjects.filter(function (mapCard) {
      var checks = [];

      if (window.mapFilter.features.length) {
        checks.push(window.mapFilter.features.every(function (filter) {
          return mapCard.offer.features.includes(filter);
        }));
      }

      if (window.mapFilter.type &&
        window.mapFilter.type !== 'any') {
        checks.push(window.mapFilter.type === mapCard.offer.type);
      }

      if (window.mapFilter.price &&
        window.mapFilter.price !== 'any') {
        checks.push(priceHelpers[window.mapFilter.price](mapCard.offer.price));
      }

      if (window.mapFilter.rooms &&
        window.mapFilter.rooms !== 'any') {
        checks.push(Number(window.mapFilter.rooms) === mapCard.offer.rooms);
      }

      if (window.mapFilter.guests &&
        window.mapFilter.guests !== 'any') {
        checks.push(Number(window.mapFilter.guests) === mapCard.offer.guests);
      }

      return checks.every(function (isValid) {
        return isValid;
      });
    });
    window.filteredMapObjects.splice(MAX_NUMBER_OF_PINS);
    window.renderPins();
    window.listenToPins();
  };

  window.removePins = function () {
    var buttons = document.querySelectorAll('.map__pins button[type="button"]');
    for (var i = 0; i < buttons.length; i++) {
      document.querySelector('.map__pins').removeChild(buttons[i]);
    }
  };
})();

