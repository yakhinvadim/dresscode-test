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
