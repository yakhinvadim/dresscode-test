$(function() {

  // hide dropdown when click on letter
  $(document).on('click', '.brands__dropdown-link', function(){
    $(this).closest('.js_hasdrop')
           .removeClass('active')
           .find('.dropdown')
           .stop()
           .animate({'height':0},250,function(){
             $(this).find('.active').removeClass('active');
           });
  });

});
