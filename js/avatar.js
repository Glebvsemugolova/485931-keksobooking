'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var UPPER_IMAGE_SIZES = {
    width: 60,
    height: 70
  };
  var LOWER_IMAGES_SIZES = {
    width: 70,
    height: 70
  };

  var fileChooser = document.querySelector('#avatar');
  var preview = document.querySelector('.ad-form-header__preview img');
  var lowerFileChooser = document.querySelector('#images');
  var lowerPreview = document.querySelector('.ad-form__photo');
  var dropContainer = document.querySelector('.ad-form-header__drop-zone');
  var fileInput = document.querySelector('#avatar');
  var lowerDropContainer = document.querySelector('.ad-form__drop-zone');
  var lowerFileInput = document.querySelector('#images');

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
        preview.setAttribute('width', UPPER_IMAGE_SIZES.width);
        preview.setAttribute('height', UPPER_IMAGE_SIZES.height);
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
        el.setAttribute('width', LOWER_IMAGES_SIZES.width);
        el.setAttribute('height', LOWER_IMAGES_SIZES.height);
      });

      reader.readAsDataURL(file);
    }
  };

  /*var onLowerFileChooserChange = function () {
    var file = lowerFileChooser.files;
    var filesNames = [];
    for (var i = 0; i < file.length; i++) {
      filesNames.push(file[i]);
      file[i].name.toLowerCase();
    }
    for (var l = 0; l < file.length; l++) {
      var matches = FILE_TYPES.some(function (it) {
        return filesNames[l].endsWith(it);
      });
    }

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var el = document.createElement('IMG');
        lowerPreview.appendChild(el);
        el.src = reader.result;
        el.setAttribute('width', '70');
        el.setAttribute('height', '70');
      });

      for (var k = 0; k < files.length; k++) {
        reader.readAsDataURL(files[k]);
      }
    }
  };*/

  dropContainer.ondragover = dropContainer.ondragenter = function (evt) {
    evt.preventDefault();
  };

  dropContainer.ondrop = function(evt) {
    // pretty simple -- but not for IE :(
    fileInput.files = evt.dataTransfer.files;
    evt.preventDefault();
  };

  dropContainer.ondragover = dropContainer.ondragenter = function (evt) {
    evt.preventDefault();
  };

  dropContainer.ondrop = function(evt) {
    fileInput.files = evt.dataTransfer.files;
    evt.preventDefault();
  };

  lowerDropContainer.ondragover = lowerDropContainer.ondragenter = function (evt) {
    evt.preventDefault();
  };

  lowerDropContainer.ondrop = function(evt) {
    lowerFileInput.files = evt.dataTransfer.files;
    evt.preventDefault();
  };

  fileChooser.addEventListener('change', onFileChooserChange);
  lowerFileChooser.addEventListener('change', onLowerFileChooserChange);

})();
