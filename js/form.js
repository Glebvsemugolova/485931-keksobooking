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

  // Устанавливает взаимоограничения на поля с выбором кол-ва госте и кол-ва комнат
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
    changeFieldPriceAttribute(PRICES_FOR_HOUSE_TYPES[formFieldType.value]);
  });

  onFieldsOfStayChange(formFieldTimeIn, formFieldTimeOut);
  onFieldsOfStayChange(formFieldTimeOut, formFieldTimeIn);

  formFieldRooms.addEventListener('change', onFieldsRoomOrGuestChange);
  formFieldCapacity.addEventListener('change', onFieldsRoomOrGuestChange);
})();


