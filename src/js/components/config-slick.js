$(document).on('kdxInitPlugins', function() {

  // main page sliders
  $('.js-slider-jumbotron').not('.slick-initialized').slick({
    dots: true,
    arrows: false
  });

  $('.js-slider-sale').not('.slick-initialized').slick({
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    dots: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });


  // blog-post slider
  $('.js-slider-img').not('.slick-initialized').slick({
    dots: true,
    arrows: false,
    adaptiveHeight: true
  });


  // product page sliders
  $('.js-slider-product-main').not('.slick-initialized').slick({
    arrows: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    asNavFor: '.js-slider-product-thumb',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: true
        }
      }
    ]
  });


  $('.js-slider-product-thumb').not('.slick-initialized').slick({
    arrows: true,
    infinite: false,
    vertical: true,
    verticalSwiping: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerPadding: "0",
    centerMode: true,
    asNavFor: '.js-slider-product-main',
    focusOnSelect: true
  });

  // add custom current class for current thumb
  $('.js-slider-product-main').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {

      //remove all active class
      $('.js-slider-product-thumb .slick-slide').removeClass('current');
      //set active class for current slide
      var index = $('.js-slider-product-main .slick-active').data('slick-index');
      $('.js-slider-product-thumb .slick-slide[data-slick-index='+index+']').addClass('current');
  });

  //set active class to first slide
  $('.js-slider-product-thumb .slick-slide').eq(0).addClass('current');


  // other sliders
  $('.js-slider-products').not('.slick-initialized').slick({
    arrows: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  $('.js-slider-last-viewed').not('.slick-initialized').slick({
    slidesToShow: 6,
    slidesToScroll: 6,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  });

});
