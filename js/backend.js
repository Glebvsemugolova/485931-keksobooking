'use strict';

(function () {
  var UPLOAD_URL = 'https://js.dump.academy/keksobooking';
  var LOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var SERVER_TIMEOUT = 10000;
  var STATUS_OK = 200;

  var setupXhr = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = SERVER_TIMEOUT;

    return xhr;
  };

  // загрузка данных с сервера

  window.load = function (onLoad, onError) {
    var xhr = setupXhr(onLoad, onError);
    xhr.open('GET', LOAD_URL);
    xhr.send();
  };

  // отправка данных на сервер

  window.upload = function (data, onLoad, onError) {
    var xhr = setupXhr(onLoad, onError);
    xhr.open('POST', UPLOAD_URL);
    xhr.send(data);
  };
})();


