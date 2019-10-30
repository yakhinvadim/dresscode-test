mobileFlag = function() {
  if ($(window).width() < 768) {
    $('body').addClass('mobile');
  } else {
    $('body').removeClass('mobile');
  }
};
mobileFlag();

$(window).resize(function() {
  mobileFlag();
});


$(document).on('kdxInitPlugins', function() {
  $(".js-chosen-select").chosen({
    disable_search: true
  });

  $(".addr-chosen-select").chosen({
    disable_search: true
  });

  $(document).on('chosen:showing_dropdown', '.addr-chosen-select', function() {
    $(".js_address-select .chosen-drop li").append("<span class='checkout__edit-trigger js_edit-trigger'>" +
    "<svg class='icon-pencil'>" +
    "<use xmlns:xlink='http://www.w3.org/1999/xlink' xlink:href='resources/img/sprite.svg#pencil'></use>" +
    "</svg>" +
    "</span>"+
    "<span class='checkout__remove-trigger js_remove-trigger'><svg class='icon-cross--big'><use xlink:href='resources/img/sprite.svg#cross'></use></svg></span>")

    function showEditForm(){
        $('.js_address-edit').removeClass('hidden');
    }

    var elems = document.querySelectorAll('.js_edit-trigger');

    for (var i = 0; i < elems.length; i++) {
        elems[i].addEventListener("click", showEditForm, true);
    }
  });

  $('.mobile .js-chosen-select').each(function() {
    if ($(this).attr('data-placeholder')) {
      var first_option = $(this).children('option').first();
      var placeholder = $(this).attr('data-placeholder');
      first_option.html(placeholder).prop('disabled', true);
    }
  });
});
