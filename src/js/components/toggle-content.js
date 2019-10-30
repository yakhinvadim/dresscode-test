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
