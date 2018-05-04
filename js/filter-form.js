'use strict';

(function () {
  window.mapFilter = {
    features: [],
    type: null,
    price: null,
    rooms: null,
    guests: null
  };

  var mapFilters = document.querySelector('.map__filters');
  mapFilters.addEventListener('change', function (evt) {
    if (evt.target.nodeName === 'INPUT') {
      if (evt.target.checked) {
        window.mapFilter.features.push(evt.target.value);
        window.removePins();
        window.updatePins();
      } else {
        window.mapFilter.features = window.mapFilter.features.filter(function (filter) {
          return filter !== evt.target.value;
        });
        window.removePins();
        window.updatePins();
      }
    }
    if (evt.target.nodeName === 'SELECT') {
      window.mapFilter[evt.target.id.replace(/housing-/, '')] = evt.target.options[evt.target.selectedIndex].value;

      window.removePins();
      window.updatePins();
    };
  });
})();
