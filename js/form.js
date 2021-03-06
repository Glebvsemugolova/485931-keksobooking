'use strict';

(function () {
  var PRICES_FOR_HOUSE_TYPES = {
    palace: 10000,
    flat: 1000,
    house: 5000,
    bungalo: 0
  };
  var DATA_ROOMS = [
    [2],
    [2, 1],
    [2, 1, 0],
    [3]
  ];

  var formFieldType = document.getElementById('type');
  var formFieldPrice = document.getElementById('price');
  var formFieldTimeIn = document.getElementById('timein');
  var formFieldTimeOut = document.getElementById('timeout');
  var formFieldRooms = document.getElementById('room_number');
  var formFieldCapacity = document.getElementById('capacity');
  var successUploadPopup = document.querySelector('.success');
  var errorUploadPopup = document.querySelector('.error');
  var formResetButton = document.querySelector('.ad-form__reset');
  var filterForm = document.querySelector('.map__filters');

  formResetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.removeCard();
    window.closeMap();
    window.removePins();
    window.adForm.reset();
    window.changeValueInputAdress();
  });

  // действия при успешном/неуспешном запросе на отправку данных на сервер
  var showUploadPopup = function (popup) {
    popup.classList.remove('hidden');
  };

  var hideUploadPopup = function (popup) {
    setTimeout(function () {
      popup.classList.add('hidden');
    }, 3000);
  };

  var onFormSuccessSubmit = function () {
    showUploadPopup(successUploadPopup);
    window.removeCard();
    window.closeMap();
    window.removePins();
    window.adForm.reset();
    window.changeValueInputAdress();
    hideUploadPopup(successUploadPopup);
    filterForm.reset();
  };

  var onFormErrorSubmit = function () {
    showUploadPopup(errorUploadPopup);
    hideUploadPopup(errorUploadPopup);
  };

  // меняет значение поля цена в зависимоти от выбранного типа недвижимости
  var changeFieldPriceAttribute = function (price) {
    formFieldPrice.setAttribute('min', price);
    formFieldPrice.setAttribute('placeholder', price);
  };

  // устанавливает заисимость одного поля над другим (взаимное изменение option обоих полей)
  var onFieldsOfStayChange = function (field1, field2) {
    field1.addEventListener('change', function () {
      for (var l = 0; l < field1.options.length; l++) {
        if (field1.options[l].selected) {
          field2.options[l].selected = true;
        }
      }
    });
  };

  // отключает все варианты в поле с выбором количества гостей
  var disabledOptionCapacity = function () {
    for (var k = 0; k < formFieldCapacity.length; k++) {
      formFieldCapacity[k].disabled = true;
    }
  };
  // Устанавливает ограничения на поле с выбором кол-ва гостей в зависимости от выбора кол-ва комнат
  var onFieldRoomsChange = function (evt) {
    var selectedRoomsCount = evt.target.selectedIndex;
    var guestNumber = DATA_ROOMS[selectedRoomsCount];

    disabledOptionCapacity();
    for (var l = 0; l < guestNumber.length; l++) {
      formFieldCapacity[guestNumber[l]].disabled = false;
      formFieldCapacity.selectedIndex = guestNumber[l];
    }
  };

  window.adForm.addEventListener('submit', function (evt) {
    window.upload(new FormData(window.adForm), onFormSuccessSubmit, onFormErrorSubmit);
    evt.preventDefault();
  });

  formFieldType.addEventListener('change', function () {
    changeFieldPriceAttribute(PRICES_FOR_HOUSE_TYPES[formFieldType.value]);
  });

  onFieldsOfStayChange(formFieldTimeIn, formFieldTimeOut);
  onFieldsOfStayChange(formFieldTimeOut, formFieldTimeIn);
  disabledOptionCapacity();
  formFieldCapacity[DATA_ROOMS[0]].disabled = false;
  formFieldRooms.addEventListener('change', onFieldRoomsChange);
})();


