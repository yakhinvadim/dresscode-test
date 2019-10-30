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
