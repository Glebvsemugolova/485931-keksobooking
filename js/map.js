'use strict';
var OFFERS_COUNT = 8;
var numbers = [];
for (var i = 1; i <= OFFERS_COUNT; i++) {
  numbers.push('0' + i);
}

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TYPES_MAP = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var CHECK_TIMES = ['12:00', '13:00', '14:00'];

var TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

/**
 *
 * @param {number} min
 * @param {number} max
 * @param {Array} exclude
 */

function randomNumber(min, max, exclude) {
  var number = Math.floor(Math.random() * (max - min) + min);

  if (exclude && exclude.includes(number)) {
    return randomNumber(min, max, exclude);
  }

  return number;
}

/**
 *
 * @param {Array} arr
 */

function randomize(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 *
 * @param {Array} arr
 */

function stirArray(arr) {
  var excluded = [];
  var result = [];

  for (var i = 0; i < arr.length; i++) {
    var index = randomNumber(0, arr.length, excluded);

    excluded.push(index);
    result.push(arr[index]);
  }

  return result;
}

var result = [];

var createMapObj = function () {
  var location = {
    x: randomNumber(300, 900),
    y: randomNumber(150, 500)
  };
  return {
    avatar: 'img/avatars/user' + numbers[i] + '.png',
    offer: {
      title: TITLES[i],
      address: location.x + ', ' + location.y,
      price: randomNumber(1000, 1000000),
      type: randomize(TYPES),
      rooms: randomNumber(1, 5),
      guests: randomNumber(1, 10),
      checkin: randomize(CHECK_TIMES),
      checkout: randomize(CHECK_TIMES),
      features: FEATURES.slice(randomNumber(0, FEATURES.length)),
      description: '',
      photos: stirArray(PHOTOS)
    },
    location: {
      x: location.x,
      y: location.y
    }
  };
};

for (var i = 0; i < numbers.length; i++) {
  result.push(createMapObj());
}

function renderPins() {
  // render pins
  var pinTemplate = document.querySelector('#map-card-template').content.querySelector('.map__pin');

  var pinsList = document.createDocumentFragment();

  result.forEach(function (mapCard, index) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = (mapCard.location.x + pinElement.offsetWidth / 2) + 'px';
    pinElement.style.top = (mapCard.location.y - pinElement.offsetHeight) + 'px';
    pinElement.querySelector('img').src = mapCard.avatar;
    pinElement.querySelector('img').alt = mapCard.offer.title;
    pinElement.setAttribute('data-id', index);

    pinsList.appendChild(pinElement);
  });

  document.querySelector('.map__pins').appendChild(pinsList);
}

function renderCards(article, index) {
  // render cards
  var cardTemplate = document.querySelector('#map-card-template').content.querySelector('.map__card');
  var cardsList = document.createDocumentFragment();


  var cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = article[index].offer.title;
  cardElement.querySelector('.popup__text--address').textContent = article[index].offer.address;
  cardElement.querySelector('.popup__text--price').textContent = article[index].offer.price + ' ₽/ночь';
  cardElement.querySelector('.popup__type').textContent = TYPES_MAP[article[index].offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = article[index].offer.rooms + ' комнат' + (article[index].offer.rooms == 1 ? 'а' : 'ы') + ' для ' + article[index].offer.guests + ' гостей';
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
}

var mapPinMain = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var formFilesdsets = document.querySelectorAll('fieldset');
var inputAddress = document.getElementById('address');
var map = document.querySelector('.map');

inputAddress.value = (mapPinMain.offsetLeft + mapPinMain.offsetWidth / 2) + ', ' + (mapPinMain.offsetTop + mapPinMain.offsetHeight);

for (var i = 0; i < formFilesdsets.length; i++) {
  formFilesdsets[i].disabled = true;
}

mapPinMain.addEventListener('mouseup', function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  for (var i = 0; i < formFilesdsets.length; i++) {
    formFilesdsets[i].disabled = false;
  }
  inputAddress.value = (mapPinMain.offsetLeft + mapPinMain.offsetWidth / 2) + ', ' + (mapPinMain.offsetTop + mapPinMain.offsetHeight / 2 + 22);
  renderPins();
  var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  var removeCard = function () {
    for (var j= 0; j < map.childNodes.length; j++) {
      if (map.childNodes[j].className === 'map__card popup') {
        map.removeChild(document.querySelector('.map').childNodes[j]);
      }
    }
  };
  for (var i = 0; i < mapPins.length; i++) {
    mapPins[i].addEventListener('click', function (evt) {
      var currentEl = evt.currentTarget.getAttribute('data-id');
      removeCard();
      renderCards(result, currentEl);
      document.addEventListener('keydown', function (evt2) {
        if (evt2.keyCode === 27) {
          removeCard();
        }
      });
      var buttonPopupClose = map.querySelector('.popup__close');
      buttonPopupClose.addEventListener('click', removeCard);
      buttonPopupClose.addEventListener('keydown', function (evt3) {
        if (evt3.keyCode === 13) {
          removeCard();
        }
      });
    });
  }
});

