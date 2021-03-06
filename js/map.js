'use strict';

(function () {
  var PIN_MAIN_WIDTH = 65;
  var PIN_MAIN_HEIGHT = 65;
  var PIN_MAIN_TAIL = 22;
  var BISECT = 2;
  var DRAG_LOCATION = {
    xMin: 65,
    xMax: 1200,
    yMin: 150,
    yMax: 500
  };
  var KEY_CODE = {
    ENTER: 13,
    ESC: 27
  };

  var mapPinMain = document.querySelector('.map__pin--main');
  window.adForm = document.querySelector('.ad-form');
  var formFilesdsets = document.querySelectorAll('fieldset');
  var inputAddress = document.getElementById('address');
  window.map = document.querySelector('.map');

  // делает карту активной
  var openMap = function () {
    window.map.classList.remove('map--faded');
  };

  window.closeMap = function () {
    window.map.classList.add('map--faded');
    mapPinMain.style.left = '570px';
    mapPinMain.style.top = '375px';
  };

  // меняет значение в поле адресс в зависимости от активности карты
  window.changeValueInputAdress = function () {
    if (window.map.classList.contains('map--faded')) {
      inputAddress.value = (mapPinMain.offsetLeft + mapPinMain.offsetWidth / BISECT) + ', ' + (mapPinMain.offsetTop + mapPinMain.offsetHeight / BISECT + PIN_MAIN_TAIL);
    } else {
      inputAddress.value = (mapPinMain.offsetLeft + mapPinMain.offsetWidth / BISECT) + ', ' + (mapPinMain.offsetTop + mapPinMain.offsetHeight);
    }
  };

  // активириует или дезактивирует разделы полей в зависимоти от param = true или false
  var disableFieldset = function (param) {
    for (var l = 0; l < formFilesdsets.length; l++) {
      formFilesdsets[l].disabled = param;
    }
  };

  // включает возможность редактирования формы
  var enableAdForm = function () {
    window.adForm.classList.remove('ad-form--disabled');
  };

  // зыкрывает(удаляет) объявление о недвижимости, если оно открыто(отрисовано)
  window.removeCard = function () {
    for (var j = 0; j < window.map.childNodes.length; j++) {
      if (window.map.childNodes[j].className === 'map__card popup') {
        window.map.removeChild(document.querySelector('.map').childNodes[j]);
        document.removeEventListener('keydown', window.onPopupEscPress);
      }
    }
  };

  window.onPopupEscPress = function (evt) {
    if (evt.keyCode === KEY_CODE.ESC) {
      window.removeCard();
    }
  };

  var onPopupButtonClosePress = function (evt) {
    if (evt.keyCode === KEY_CODE.ENTER) {
      window.removeCard();
    }
  };

  window.listenToPins = function () {
    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var k = 0; k < mapPins.length; k++) {
      mapPins[k].addEventListener('click', function (evt) {
        var currentEl = evt.currentTarget.getAttribute('data-id');
        window.removeCard();
        window.renderCard((window.mapObjectsNow || window.filteredMapObjects || window.mapObjects), currentEl);
        var buttonPopupClose = window.map.querySelector('.popup__close');
        buttonPopupClose.addEventListener('click', window.removeCard);
        buttonPopupClose.addEventListener('keydown', onPopupButtonClosePress);
      });
    }
  };

  // обработчик события на нажатие на главную метку
  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      var newY = mapPinMain.offsetTop - shift.y;
      var newX = mapPinMain.offsetLeft - shift.x;
      if (newY >= DRAG_LOCATION.yMin - PIN_MAIN_HEIGHT && newY <= DRAG_LOCATION.yMax - (PIN_MAIN_HEIGHT + PIN_MAIN_TAIL)
        && newX >= DRAG_LOCATION.xMin - PIN_MAIN_WIDTH && newX <= DRAG_LOCATION.xMax - PIN_MAIN_WIDTH) {
        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
        mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
        window.changeValueInputAdress();
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var onMapPinMainDrop = function () {
    openMap();
    enableAdForm();
    disableFieldset(false);
    window.changeValueInputAdress();
    window.filteredMapObjects = null;
    window.renderPins();
    window.listenToPins();
  };

  var onPinMainKeydown = function (evt) {
    if (evt.keyCode === KEY_CODE.ENTER) {
      onMapPinMainDrop();
    }
  };

  mapPinMain.addEventListener('mouseup', onMapPinMainDrop);
  mapPinMain.addEventListener('keydown', onPinMainKeydown);

  window.changeValueInputAdress();
  disableFieldset(true);
})();

