$(document).on('kdxInitPlugins', function() {

  // UI spinner (cart)
  if ($(".js_spinner").length > 0) {
    $(".js_spinner").not('.js_spinner_inited').each(function() {
      var option = {
        min: 1
      };
      if ($(this).attr("data-max-value")) {
        option['max'] = $(this).attr("data-max-value");
      }
      $(this).spinner(option).addClass('js_spinner_inited');
    });
  }


});
