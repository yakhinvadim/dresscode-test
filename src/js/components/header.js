$(function() {

  // open/hide mobile menu on click on burger menu
  $(document).on('click', '.js-burger-toggle', function(){
    $(this).toggleClass('burger-toggle--opened');
    $('.page-header__nav-area').toggleClass('page-header__nav-area--opened');
  });

  // open/hide submenu on click submenu title
  $(document).on('click', '.navigation__submenu-toggle', function(){
    $(this).closest('.navigation__item--submenu').toggleClass('navigation__item--submenu--opened');
  });

});
