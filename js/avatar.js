'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooser = document.querySelector('#avatar');
  var preview = document.querySelector('.ad-form-header__preview img');
  var lowerFileChooser = document.querySelector('#images');
  var lowerPreview = document.querySelector('.ad-form__photo');

  var onFileChooserChange = function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
        preview.setAttribute('width', '60');
        preview.setAttribute('height', '70');
        preview.parentNode.style.padding = 0;
      });

      reader.readAsDataURL(file);
    }
  };

  var onLowerFileChooserChange = function () {
    var file = lowerFileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var el = document.createElement('IMG');
        lowerPreview.appendChild(el);
        el.src = reader.result;
        el.setAttribute('width', '70');
        el.setAttribute('height', '70');
      });

      reader.readAsDataURL(file);
    }
  };

  fileChooser.addEventListener('change', onFileChooserChange);
  lowerFileChooser.addEventListener('change', onLowerFileChooserChange);

})();
