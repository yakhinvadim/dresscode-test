$(document).ready(function() {

    $('body').append('<div class="layout_fix_nav" >' +
        '<div class="layout_fix_nav_arrows">⊙</div>' +

        '<div class="layout_fix_nav_body clearfix">' +

            '<div class="layout_fix_nav_column">' +
                '<a href="index.html">✔✔ main</a><br>' +
                '<a href="catalog.html">✔✔ catalog</a><br>' +
                '<a href="product.html">✔✔ product</a><br>' +
                '<a href="cart.html">✔✔ cart</a><br>' +
                '<a href="checkout.html" >✔✔ checkout</a><br>' +
                '<hr>' +
                '<a href="account-profile.html">✔✔ account: profile</a><br>' +
                '<a href="account-orders.html">✔✔ account: orders</a><br>' +
                '<a href="account-order.html">✔✔ account: order</a><br>' +
                '<a href="account-favorite.html">✔✔ account: favorite</a><br>' +
                '<hr>' +
                '<a href="sign-in.html">✔✔ sign in</a><br>' +
                '<a href="sign-up.html">✔✔ sign up</a><br>' +

            '</div>' +
            '<div class="layout_fix_nav_column clearfix">' +
                '<a href="blog.html" >✔✔ blog</a><br>' +
                '<a href="blog-post.html" >✔✔ blog-post</a><br>' +
                '<a href="contacts.html" >✔✔ contacts</a><br>' +
                '<a href="search-results.html" >✔✔ search</a><br>' +
                '<a href="search-empty.html" >✔✔ search empty</a><br>' +
                '<hr>' +
                '<a href="msg-success.html">✔✔ msg success</a><br>' +
                '<a href="msg-error.html">✔✔ msg error</a><br>' +
                '<a href="msg-empty-cart.html">✔✔ msg empty cart</a><br>' +
                '<a href="msg-404.html">✔✔ msg page 404</a><br>' +
                '<hr>' +
                '<a href="brands.html">✔✔ brands</a><br>' +
                '<a href="brand.html">✔✔ brand</a><br>' +
            '</div>' +
            '<div class="components">' +
              '<a href="components.html">components</a>' +
            '</div>' +
        '</div>');
});

// layout fix nav close / open
$(document).on('click','.layout_fix_nav_arrows',function(){
    $(this).parents('.layout_fix_nav').toggleClass('opened').find('.layout_fix_nav_body').slideToggle();
    return false;
});

//    close menu when click outside
$(document).mouseup(function (e){
    var container = $(".layout_fix_nav");

    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        container.removeClass('opened');
        container.find('.layout_fix_nav_body').slideUp()
    }
});

// ––––––––––––––––––––––––––––––––––––––––––––––––– end layout stuff –––––––––––––––––––––

// kdx plugins
$(document).trigger('kdxInitPlugins');


// special main menu position
$(document).on("click", ".sub_nav_item.has_sub_menu", function(){
    $(this).toggleClass('active');
    if ($(this).hasClass('active')) {
        $('.content_main').addClass('special-menu-position');
    }
    else {
        $('.content_main').removeClass('special-menu-position');
    }
    return false
});

//    close menu when click outside
$(document).mouseup(function (e){
    var container = $(".layout_fix_nav");

    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        container.removeClass('opened');
        container.find('.layout_fix_nav_body').slideUp()
    }
});
