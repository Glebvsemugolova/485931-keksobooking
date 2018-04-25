'use strict';

var OFFERS_COUNT = 8;
var TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
];
var TYPES_MAP = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};
var CHECK_TIMES = [
  '12:00',
  '13:00',
  '14:00'
];
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

var mapObjects = [];
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

var createMapObject = function (i) {
  var location = {
    x: randomNumber(300, 900),
    y: randomNumber(150, 500)
  };
  return {
    avatar: 'img/avatars/user0' + (i + 1) + '.png',
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

for (var i = 0; i < OFFERS_COUNT; i++) {
  mapObjects.push(createMapObject(i));
}

function renderPins() {
  // render pins
  var pinTemplate = document.querySelector('#map-card-template').content.querySelector('.map__pin');

  var pinsList = document.createDocumentFragment();

  mapObjects.forEach(function (mapCard, index) {
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
}

var mapPinMain = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var formFilesdsets = document.querySelectorAll('fieldset');
var inputAddress = document.getElementById('address');
var map = document.querySelector('.map');

var openMap = function () {
  map.classList.remove('map--faded');
};

var changeValueInputAdress = function () {
  if (map.classList.contains('map--faded')) {
    inputAddress.value = (mapPinMain.offsetLeft + mapPinMain.offsetWidth / 2) + ', ' + (mapPinMain.offsetTop + mapPinMain.offsetHeight / 2 + 22);
  } else {
    inputAddress.value = (mapPinMain.offsetLeft + mapPinMain.offsetWidth / 2) + ', ' + (mapPinMain.offsetTop + mapPinMain.offsetHeight);
  }
};

var disabledFieldset = function (param) {
  for (var l = 0; l < formFilesdsets.length; l++) {
    formFilesdsets[l].disabled = param;
  }
};

var enabledAdForm = function () {
  adForm.classList.remove('ad-form--disabled');
};

var removeCard = function () {
  for (var j = 0; j < map.childNodes.length; j++) {
    if (map.childNodes[j].className === 'map__card popup') {
      map.removeChild(document.querySelector('.map').childNodes[j]);
    }
  }
};

changeValueInputAdress();
disabledFieldset(true);

mapPinMain.addEventListener('mouseup', function () {
  openMap();
  enabledAdForm();
  disabledFieldset(false);
  changeValueInputAdress();
  renderPins();
  var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  for (var k = 0; k < mapPins.length; k++) {
    mapPins[k].addEventListener('click', function (evt) {
      var currentEl = evt.currentTarget.getAttribute('data-id');
      removeCard();
      renderCards(mapObjects, currentEl);
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


var formFieldType = document.forms[1].type;
var formFieldPrice = document.forms[1].price;
var formFieldTimeIn = document.forms[1].timein;
var formFieldTimeOut = document.forms[1].timeout;
var formFieldRooms = document.forms[1].rooms;
var formFieldCapacity = document.forms[1].capacity;

var changeFieldPriceAttribute = function (price) {
  formFieldPrice.setAttribute('min', price);
  formFieldPrice.setAttribute('placeholder', price);
};
var onFieldsOfStayChange = function (field1, field2) {
  field1.addEventListener('change', function () {
    for (var l = 0; l < field1.options.length; l++) {
      if (field1.options[l].selected) {
        field2.options[l].selected = true;
      }
    }
  });
};
var onFieldsRoomOrGuestChange = function () {
  var numberOfRooms = parseInt(formFieldRooms.value, 10);
  var numberOfGuests = parseInt(formFieldCapacity.value, 10);
  if (numberOfRooms < numberOfGuests) {
    formFieldCapacity.setCustomValidity('Количество комнат не соответствует числу гостей');
  } else if (numberOfRooms === 100 & numberOfGuests !== 0) {
    formFieldCapacity.setCustomValidity('Так много комнат не для гостей');
  } else {
    formFieldCapacity.setCustomValidity('');
  }
};

formFieldType.addEventListener('change', function () {
  if (formFieldType.value === 'bungalo') {
    changeFieldPriceAttribute(0);
  } else if (formFieldType.value === 'flat') {
    changeFieldPriceAttribute(1000);
  } else if (formFieldType.value === 'house') {
    changeFieldPriceAttribute(5000);
  } else if (formFieldType.value === 'palace') {
    changeFieldPriceAttribute(10000);
  }
});

onFieldsOfStayChange(formFieldTimeIn, formFieldTimeOut);
onFieldsOfStayChange(formFieldTimeOut, formFieldTimeIn);

formFieldRooms.addEventListener('change', onFieldsRoomOrGuestChange);
formFieldCapacity.addEventListener('change', onFieldsRoomOrGuestChange);
