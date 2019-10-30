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
