'use strict';

(function () {

  var UPPER_IMAGE_SIZES = {
    width: 60,
    height: 70
  };
  var LOWER_IMAGES_SIZES = {
    width: 70,
    height: 70
  };
  var FILE_TYPES = [
    'image/jpeg',
    'image/pjpeg',
    'image/png',
    'image/gif'
  ];

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
    if (validFileType(file)) {
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

  function validFileType(file) {
    for (var i = 0; i < FILE_TYPES.length; i++) {
      if (file.type === FILE_TYPES[i]) {
        return true;
      }
    }

    return false;
  }

  var onLowerFileChooserChange = function () {
    while (lowerPreview.firstChild) {
      lowerPreview.removeChild(lowerPreview.firstChild);
    }

    var curFiles = lowerFileInput.files;
    var list = document.createElement('ol');
    lowerPreview.appendChild(list);
    for (var i = 0; i < curFiles.length; i++) {
      var listItem = document.createElement('li');
      if (validFileType(curFiles[i])) {
        var image = document.createElement('img');
        image.src = window.URL.createObjectURL(curFiles[i]);
        listItem.appendChild(image);
        image.setAttribute('width', LOWER_IMAGES_SIZES.width);
        image.setAttribute('height', LOWER_IMAGES_SIZES.height);
        list.style.padding = 0;
        list.style.margin = 0;
        list.style.listStyle = 'none';
      }
      list.appendChild(listItem);
    }
  };

  dropContainer.ondragover = dropContainer.ondragenter = function (evt) {
    evt.preventDefault();
  };

  dropContainer.ondrop = function (evt) {
    fileInput.files = evt.dataTransfer.files;
    evt.preventDefault();
  };

  dropContainer.ondragover = dropContainer.ondragenter = function (evt) {
    evt.preventDefault();
  };

  dropContainer.ondrop = function (evt) {
    fileInput.files = evt.dataTransfer.files;
    evt.preventDefault();
  };

  lowerDropContainer.ondragover = lowerDropContainer.ondragenter = function (evt) {
    evt.preventDefault();
  };

  lowerDropContainer.ondrop = function (evt) {
    lowerFileInput.files = evt.dataTransfer.files;
    evt.preventDefault();
  };

  fileChooser.addEventListener('change', onFileChooserChange);
  lowerFileChooser.addEventListener('change', onLowerFileChooserChange);

})();
