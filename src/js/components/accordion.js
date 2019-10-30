$(function() {

  // open predefined item on page load
  $('.accordion__item--opened').children('.accordion__content').show();

  $(document).on('click', '.js-accordion__title', function() {
    var $thisContent = $(this).next();

    // hide content of all other accordion items
    $(this).closest('.js-accordion__item')
           .siblings()
           .removeClass('accordion__item--opened')
           .children('.js-accordion__content')
           .slideUp();

    // show content of clicked accordion item
    $thisContent.not(':animated')
                .slideToggle()
                .parent()
                .toggleClass('accordion__item--opened');
  });

});
