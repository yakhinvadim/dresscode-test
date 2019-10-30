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

function initMap() {
  var icon = 'resources/img/marker.svg';
  var position = { lat: 40.7077319, lng: -74.0108166 };

  // maps
  var mapOptions = {
    center: position,
    zoom: 17
  }
  var mapDesktop = new google.maps.Map(document.getElementById('map-desktop'), mapOptions);
  var mapMobile  = new google.maps.Map(document.getElementById('map-mobile'),  mapOptions);


  // markers
  var markerDesktopOptions = {
    position: position,
    map: mapDesktop,
    icon: icon
  }
  var markerMobileOptions = {
    position: position,
    map: mapMobile,
    icon: icon
  }
  var markerDesktop = new google.maps.Marker(markerDesktopOptions);
  var markerMobile =  new google.maps.Marker(markerMobileOptions);
}

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

$(document).on('kdxInitPlugins', function() {

  /*** range slider for PRICE ***/
  $('.sliderConnector').not('.sliderInited').each(function(e) {
    if (typeof window.sliderCounter == "undefined") {
      window.sliderCounter = 0;
    }
    if (typeof window.kdxSlider == "undefined") {
      window.kdxSlider = [];
    }
    window.sliderCounter++;

    var code = $(this).attr('data-code');
    var sliderValueFirst = $(this).closest('.js_slider_wrapper').find('#' + code + '-from').eq(0),
      sliderValueSecond = $(this).closest('.js_slider_wrapper').find('#' + code + '-to').eq(0);

    var startValueMin = parseInt(sliderValueFirst.val());
    var startValueMax = parseInt(sliderValueSecond.val());
    var rangeValueMin = parseInt($(this).closest('.js_slider_wrapper').find('#' + code + 'Slider').eq(0).attr('data-min-val'));
    var rangeValueMax = parseInt($(this).closest('.js_slider_wrapper').find('#' + code + 'Slider').eq(0).attr('data-max-val'));
    var rangeStep = parseInt($(this).closest('.js_slider_wrapper').find('#' + code + 'Slider').eq(0).attr('data-step'));

    var Slider = this;
    var props = {
      start: [startValueMin, startValueMax], // Handle start position
      connect: true, // Display a colored bar between the handles
      behaviour: 'tap', // Move handle on tap, bar is draggable
      range: { // Slider can select '0' to '100'
        'min': rangeValueMin,
        'max': rangeValueMax
      }
    };
    if (!isNaN(rangeStep) && rangeStep > 0) {
      props.step = rangeStep;
      props.margin = rangeStep;
    }
    noUiSlider.create(Slider, props);

    // When the slider value changes, update the input and span
    Slider.noUiSlider.on('update', function(values, handle) {
      if (handle) {
        sliderValueSecond.val(parseInt(values[handle]));
      } else {
        sliderValueFirst.val(parseInt(values[handle]));
      }
    });
    Slider.noUiSlider.on('set', function(values, handle) {
      if (typeof window.kdx_clear_filter != "undefined" && window.kdx_clear_filter) {
        return;
      }
      $(Slider).closest('form').submit()
    });

    $(document).on('change', '#' + code + '-from', function() {
      Slider.noUiSlider.set([this.value, null]);
    });
    $(document).on('change', '#' + code + '-to', function() {
      Slider.noUiSlider.set([null, this.value]);
    });

    var f_val = $(this).closest('.filter_item').find('.f_value');
    defaultVal = f_val.html();

    if (startValueMin > rangeValueMin || startValueMax < rangeValueMax)
      f_val.html(defaultVal + ': ' + '<span>' + startValueMin + '</span> — <span>' + startValueMax + '</span>');


    $(this).addClass('sliderInited');
  });

});

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

$(function() {
  svg4everybody();
});

GetNoun = function(number, one, two, five) {
    number = Math.abs(number);
    number %= 100;
    if (number >= 5 && number <= 20) {
        return five;
    }
    number %= 10;
    if (number == 1) {
        return one;
    }
    if (number >= 2 && number <= 4) {
        return two;
    }
    return five;
}

function checkboxChoose(currentSelector){
    $(currentSelector).each(function(){

        var defaultVal = $(this).attr('data-default');


        var checksCount = $(this).find('.check_list input:checked').length,
//          totalChecksCount = $(this).find('.check_list input').length,
            nounOne = $(this).attr('data-one'),
            nounTwo = $(this).attr('data-two'),
            nounFive = $(this).attr('data-five');


        if(checksCount>0){

            $(this).find('.check_list li.current').removeClass('current');

            var choosenArray = [];
            $(this).find('.check_list input:checked').each(function(){
                choosenArray.push($(this).parents('label').find('.label_value, .check_label_value').html());

                $(this).closest('li').addClass('current');
            });

            if(checksCount<4 || !$(this).hasClass('makecounts')){$(this).find('.f_value').html(defaultVal+': '+choosenArray.join(', '));}
            else {$(this).find('.f_value').html(defaultVal+': '+checksCount + ' ' + GetNoun(checksCount, nounOne, nounTwo, nounFive));}

            $(this).addClass('current');

        }
        else {

            $(this).find('.f_value').html(defaultVal);

            $(this).removeClass('current');
            $(this).find('.check_list li.current').removeClass('current');
        }

    });
}


$(document).on('change','.filter_item.checks input',function(){
    checkboxChoose($(this).parents('.filter_item.checks'));
    if($(this).parents('.radios').length && $(this).parents('.superspecial').length == 0){
        $(this).parents('.js_hasdrop').removeClass('active').find('.dropdown').stop().animate({'height':0},250,function(){
            $(this).find('.active').removeClass('active');
        });
    }
});

  // in case of F5
  checkboxChoose('.filter_item.checks');


$(function() {

    // VALUES of checkboxes in dropdowns
    $('.filter_item').each(function(){
        if(!$(this).attr('data-default')) {
            defaultVal = $(this).find('.f_value').html();
            $(this).attr('data-default', defaultVal);
        }
    });

  });

  //    close filter when click outside
  $(document).mouseup(function (e){
      var container = $(".filter_item");

      if (!container.is(e.target) // if the target of the click isn't the container...
          && container.has(e.target).length === 0) // ... nor a descendant of the container
      {
          container.closest('.js_hasdrop').removeClass('active').find('.dropdown').stop().animate({'height':0},250,function(){
              $(this).find('.active').removeClass('active');
          });
      }
  });

$(function() {
  $(document).on('click', '.js-filter-toggle', function() {
    $('.js-filters_block').slideToggle();
  });
});

$(document).on('click','.js_hasdrop .trigger, .js_hasdrop .btn_ready',function(){
    if($(this).closest('.js_hasdrop').hasClass('disabled')){
        return;
    }

    if($(this).parents('.superspecial').length == 0){

        if(!$(this).parents('.js_hasdrop').hasClass('active')){
            var targetHeight = $(this).parents('.js_hasdrop').find('.drop_content').innerHeight();

            $('.js_hasdrop.active').removeClass('active').find('.dropdown').stop().animate({'height':0},250,function(){
                $(this).find('.active').removeClass('active');
            });

            $('.js_opened_input').attr('disabled','disabled');
            $(this).parents('.js_hasdrop').find('.js_opened_input').removeAttr('disabled');
            $(this).parents('.js_hasdrop').addClass('active')
                .find('.dropdown').stop().animate({'height':targetHeight},250, function(){
                    $(this).height('auto');
                });
        }

        else {
            $(this).parents('.js_hasdrop').find('.js_opened_input').attr('disabled','disabled');
            $(this).parents('.js_hasdrop').removeClass('active').find('.dropdown').stop().animate({'height':0},250,function(){
                $(this).find('.active').removeClass('active');
            });
        }
    }
    return false;
});

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

$('.js_tabs .js_tab_content').each(function(){$(this).addClass('hidden');});

// by default shows first tab element. Assign class current to show not first element
$('.js_tabs').each(function(){

    if(!$(this).find('.js_tab_btn.current').length){
        var tabElement = $(this).find('.js_tab_btn').first().addClass('current');
        var tabContent = tabElement.attr('href');
        $(tabContent).addClass('current').removeClass('hidden');
    }
});

$(document).on('click', '.js_tab_btn', function(){
    var tabElement = $(this).attr('href');
    $(tabElement).removeClass('hidden').siblings().addClass('hidden');
    $(this).addClass('current').siblings().removeClass('current');
    return false;
});

$('.js_toggle .js_toggle_content').each(function(){$(this).addClass('hidden');});

// by default shows first toggle element. Assign class current to show not first element
$('.js_toggle').each(function(){

    if(!$(this).find('.js_toggle_content.current').length){
        var toggleElement = $(this).find('.js_toggle_content').first().addClass('current').removeClass('hidden');
    }
});

$(document).on('click', '.js_toggle_btn', function(){
    var toggle_element = $(this).attr('href');
    $(toggle_element).addClass('current').removeClass('hidden');
    $(toggle_element).closest('.js_toggle_content').siblings().addClass('hidden').removeClass('current');
    return false;
});
