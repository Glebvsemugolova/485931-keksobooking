'use strict';

var NUMBERS = ['01', '02', '03', '04', '05', '06', '07', '08'];
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

function generateRandomArrayFromSource(arr) {
  var count = randomNumber(0, arr.length);
  var excluded = [];
  var result = [];

  for (var i = 0; i < count; i++) {
    var index = randomNumber(0, arr.length, excluded);

    excluded.push(index);
    result.push(arr[index]);
  }

  return result;
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

for (var i = 0; i < NUMBERS.length; i++) {
  result.push({
    avatar: 'img/avatars/user' + NUMBERS[i] + '.png',
    offer: {
      title: TITLES[i],
      address: location.x + ', ' + location.y,
      price: randomNumber(1000, 1000000),
      type: randomize(TYPES),
      rooms: randomNumber(1, 5),
      guests: randomNumber(1, 10),
      checkin: randomize(CHECK_TIMES),
      checkout: randomize(CHECK_TIMES),
      features: generateRandomArrayFromSource(FEATURES),
      description: '',
      photos: stirArray(PHOTOS)
    },
    location: {
      x: randomNumber(300, 900),
      y: randomNumber(150, 500)
    }
  });
}

document.querySelector('.map').classList.remove('map--faded');

function renderPins() {
  // render pins
  var pinTemplate = document.querySelector('#map-card-template').content.querySelector('.map__pin');

  var pinsList = document.createDocumentFragment();

  result.forEach(function (mapCard) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = (mapCard.location.x + pinElement.offsetWidth / 2) + 'px';
    pinElement.style.top = (mapCard.location.y - pinElement.offsetHeight) + 'px';
    pinElement.querySelector('img').src = mapCard.avatar;
    pinElement.querySelector('img').alt = mapCard.offer.title;

    pinsList.appendChild(pinElement);
  });

  document.querySelector('.map__pins').appendChild(pinsList);
}

function renderCards() {
  // render cards
  var cardTemplate = document.querySelector('#map-card-template').content.querySelector('.map__card');
  var cardsList = document.createDocumentFragment();

  result.forEach(function (mapCard) {
    var cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = mapCard.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = mapCard.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = mapCard.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = TYPES_MAP[mapCard.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = mapCard.offer.rooms + ' комнат' + (mapCard.offer.rooms == 1 ? 'а' : 'ы') + ' для ' + mapCard.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + mapCard.offer.checkin + ', выезд до ' + mapCard.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = mapCard.offer.description;
    cardElement.querySelector('.popup__photos').textContent = mapCard.offer.description;
    cardElement.querySelector('img').src = mapCard.avatar;
    mapCard.offer.features.forEach(function (feature) {
      var el = document.createElement('LI');
      el.className = 'popup__feature popup__feature--' + feature;
      cardElement.querySelector('.popup__features').appendChild(el);
    });


    mapCard.offer.photos.forEach(function (source) {
      var el = document.createElement('IMG');

      el.src = source;
      el.className = 'popup__photo';
      el.alt = 'Фотография жилья';
      el.setAttribute('width', 45);
      el.setAttribute('height', 40);

      cardElement.querySelector('.popup__photos').appendChild(el);
    });

    cardsList.appendChild(cardElement);
  });

  document.querySelector('.map').insertBefore(cardsList, document.querySelector('.map__filters-container'));
}

renderPins();
renderCards();


