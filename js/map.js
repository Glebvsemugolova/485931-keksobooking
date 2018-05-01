'use strict';

(function () {
  var PIN_MAIN_WIDTH = 65;
  var PIN_MAIN_HEIGHT = 65;
  var PIN_MAIN_TAIL = 22;
  var DRAG_LOCATION = {
    xMin: 65,
    xMax: 1200,
    yMin: 150,
    yMax: 500
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
  };

  // меняет значение в поле адресс в зависимости от активности карты
  window.changeValueInputAdress = function () {
    if (window.map.classList.contains('map--faded')) {
      inputAddress.value = (mapPinMain.offsetLeft + mapPinMain.offsetWidth / 2) + ', ' + (mapPinMain.offsetTop + mapPinMain.offsetHeight / 2 + 22);
    } else {
      inputAddress.value = (mapPinMain.offsetLeft + mapPinMain.offsetWidth / 2) + ', ' + (mapPinMain.offsetTop + mapPinMain.offsetHeight);
    }
  };

  // активириует или дезактивирует разделы полей в зависимоти от param = true или false
  var disabledFieldset = function (param) {
    for (var l = 0; l < formFilesdsets.length; l++) {
      formFilesdsets[l].disabled = param;
    }
  };

  // включает возможность редактирования формы
  var enabledAdForm = function () {
    window.adForm.classList.remove('ad-form--disabled');
  };

  // зыкрывает(удаляет) объявление о недвижимости, если оно открыто(отрисовано)
  var removeCard = function () {
    for (var j = 0; j < window.map.childNodes.length; j++) {
      if (window.map.childNodes[j].className === 'map__card popup') {
        window.map.removeChild(document.querySelector('.map').childNodes[j]);
      }
    }
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === 27) {
      removeCard();
    }
  };
  var onPopupButtonClosePress = function (evt) {
    if (evt.keyCode === 13) {
      removeCard();
    }
  };

  window.changeValueInputAdress();
  disabledFieldset(true);

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

  mapPinMain.addEventListener('mouseup', function onMapPinMainDrop() {
    openMap();
    enabledAdForm();
    disabledFieldset(false);
    window.changeValueInputAdress();
    window.renderPins();
    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var k = 0; k < mapPins.length; k++) {
      mapPins[k].addEventListener('click', function (evt) {
        var currentEl = evt.currentTarget.getAttribute('data-id');
        removeCard();
        window.renderCard(window.mapObjects, currentEl);
        document.addEventListener('keydown', onPopupEscPress);
        var buttonPopupClose = window.map.querySelector('.popup__close');
        buttonPopupClose.addEventListener('click', removeCard);
        buttonPopupClose.addEventListener('keydown', onPopupButtonClosePress);
      });
    }
    mapPinMain.removeEventListener('mouseup', onMapPinMainDrop);
  });
})();

