'use strict';

(function () {
  var PRICES_FOR_HOUSE_TYPES = {
    palace: 10000,
    flat: 1000,
    house: 5000,
    bungalo: 0
  };

  var formFieldType = document.getElementById('type');
  var formFieldPrice = document.getElementById('price');
  var formFieldTimeIn = document.getElementById('timein');
  var formFieldTimeOut = document.getElementById('timeout');
  var formFieldRooms = document.getElementById('room_number');
  var formFieldCapacity = document.getElementById('capacity');
  var successUploadPopup = document.querySelector('.success');
  var errorUploadPopup = document.querySelector('.error');
  var formReset = document.querySelector('.ad-form__reset');

  formReset.addEventListener('click', function (evt) {
    evt.preventDefault();
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
  var formSuccessHandler = function () {
    showUploadPopup(successUploadPopup);
    window.closeMap();
    window.removePins();
    window.adForm.reset();
    window.changeValueInputAdress();
    hideUploadPopup(successUploadPopup);
  };
  var formErrorHandler = function () {
    showUploadPopup(errorUploadPopup);
    hideUploadPopup(errorUploadPopup);
  };

  window.adForm.addEventListener('submit', function (evt) {
    window.upload(new FormData(window.adForm), formSuccessHandler, formErrorHandler);
    evt.preventDefault();
  });

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

  // Устанавливает ограничения на поле с выбором кол-ва гостей в зависимости от выбора кол-ва комнат
  var onFieldRoomsChange = function () {
    var roomNumberSel = formFieldRooms.options[formFieldRooms.selectedIndex].value;
    if (roomNumberSel === '1') {
      formFieldCapacity.options[0].disabled = true;
      formFieldCapacity.options[1].disabled = true;
      formFieldCapacity.options[2].selected = true;
      formFieldCapacity.options[2].disabled = false;
      formFieldCapacity.options[3].disabled = true;
    } else if (roomNumberSel === '2') {
      formFieldCapacity.options[0].disabled = true;
      formFieldCapacity.options[1].selected = true;
      formFieldCapacity.options[1].disabled = false;
      formFieldCapacity.options[2].disabled = false;
      formFieldCapacity.options[3].disabled = true;
    } else if (roomNumberSel === '3') {
      formFieldCapacity.options[0].selected = true;
      formFieldCapacity.options[0].disabled = false;
      formFieldCapacity.options[1].disabled = false;
      formFieldCapacity.options[2].disabled = false;
      formFieldCapacity.options[3].disabled = true;
    } else if (roomNumberSel === '100') {
      formFieldCapacity.options[0].disabled = true;
      formFieldCapacity.options[1].disabled = true;
      formFieldCapacity.options[2].disabled = true;
      formFieldCapacity.options[3].disabled = false;
      formFieldCapacity.options[3].selected = true;
    }
  };

  // Устанавливает ограничения на поле с выбором кол-ва комнат в зависимости от выбора кол-ва гостей
  var onFieldCapacityChange = function () {
    var capacitySel = formFieldCapacity.options[formFieldCapacity.selectedIndex].value;

    if (capacitySel === '3') {
      formFieldRooms.options[0].disabled = true;
      formFieldRooms.options[1].disabled = true;
      formFieldRooms.options[2].selected = true;
      formFieldRooms.options[2].disabled = false;
      formFieldRooms.options[3].disabled = true;
    } else if (capacitySel === '2') {
      formFieldRooms.options[0].disabled = true;
      formFieldRooms.options[1].disabled = false;
      formFieldRooms.options[2].selected = true;
      formFieldRooms.options[2].disabled = false;
      formFieldRooms.options[3].disabled = true;
    } else if (capacitySel === '1') {
      formFieldRooms.options[0].disabled = false;
      formFieldRooms.options[1].selected = true;
      formFieldRooms.options[1].disabled = false;
      formFieldRooms.options[2].disabled = true;
      formFieldRooms.options[3].disabled = true;
    } else if (capacitySel === '0') {
      formFieldRooms.options[0].disabled = true;
      formFieldRooms.options[1].disabled = true;
      formFieldRooms.options[2].disabled = true;
      formFieldRooms.options[3].selected = true;
      formFieldRooms.options[3].disabled = false;
    }
  };

  formFieldType.addEventListener('change', function () {
    changeFieldPriceAttribute(PRICES_FOR_HOUSE_TYPES[formFieldType.value]);
  });

  onFieldsOfStayChange(formFieldTimeIn, formFieldTimeOut);
  onFieldsOfStayChange(formFieldTimeOut, formFieldTimeIn);
  formFieldRooms.addEventListener('change', onFieldRoomsChange);
  formFieldCapacity.addEventListener('change', onFieldCapacityChange);
})();


