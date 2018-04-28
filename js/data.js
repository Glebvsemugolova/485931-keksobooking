'use strict';

(function () {
  var OFFERS_COUNT = 8;
  var TYPES = [
    'palace',
    'flat',
    'house',
    'bungalo'
  ];
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

  // функция которая выбирает произвольное число из допустимой области.
  function randomNumber(min, max, exclude) {
    var number = Math.floor(Math.random() * (max - min) + min);

    if (exclude && exclude.includes(number)) {
      return randomNumber(min, max, exclude);
    }

    return number;
  }

  // меняет порядок елементов в массиве на произвольный
  function randomize(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // возвращает массив произвольной длинны
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

  // создает объект содержащий информацию о недвижимости
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
  window.mapObjects = mapObjects;
})();


