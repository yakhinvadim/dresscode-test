$(document).on('kdxInitPlugins', function() {

  $('.js-popup').magnificPopup();

  $('.js-popup-map').magnificPopup({
    callbacks: {
      open: function() {
        initMap();
      }
    }
  });

});
