/////////* BACKGROUND IMAGE *///////////

$(document).ready(function() {
    "use strict";
    if ($(window).width() > 800) {
        $('body').backstretch("images/slide.jpg");
    }
    //// FOR SMALL MOBILE DEVICES ////
    else {
        $('body').backstretch("images/slide.jpg");
    }
});

/////////* OPENING EFFECTS *///////////

jQuery(window).load(function () {
    "use strict";
    if (jQuery(window).width() > 800) {
    jQuery('body').find('header').stop().animate({
        'marginTop': '0px'
    }, 500);
    setTimeout(function () {
    jQuery('body').find('#main-menu ul').stop().animate({
        'marginLeft': '0px'
    }, 500);
    jQuery('body').find('#sub-menu ul').stop().animate({
        'marginLeft': '0px'
    }, 900);    
    }, 500 );
    }
    var menuheight = jQuery('body').find('#main-menu').height();
    if (jQuery(window).width() < 640) {
        if (jQuery(window).height() > 320) {
            jQuery('body').find('#sub-menu').css('top', menuheight + 90);
        }
        else {
            jQuery('body').find('#sub-menu').css('top', menuheight + 50);
        }
    }
    else
    {
        if (jQuery(window).height() > 320) {
            jQuery('body').find('#sub-menu').css('top', menuheight);
        }
        else {
            jQuery('body').find('#sub-menu').css('top', menuheight + 50);
        }
    }
});

/////////* WINDOW RESIZE EVENTS *///////////

jQuery(window).resize(function () {
    "use strict";
    var menuheight = jQuery('body').find('#main-menu').height();
    if (jQuery(window).width() > 800) {
        jQuery('body').find('header').css('margin-top', '0px');
        jQuery('body').find('nav ul').css('margin-left', '0px');
    } 
    if (jQuery(window).width() < 640) {
        jQuery('body').find('#main-menu').css('display', 'none');
        jQuery('body').find('#sub-menu').css('display', 'none');
        jQuery('body').find('#mobile-menu').removeClass('menu-close');
        if (jQuery(window).height() > 320) {
            jQuery('body').find('#sub-menu').css('top', menuheight + 90);
        }
        else {
            jQuery('body').find('#sub-menu').css('top', menuheight + 50);
        }
    }
    else
    {
        if (jQuery(window).height() > 320) {
            jQuery('body').find('#sub-menu').css('top', menuheight);
        }
        else {
            jQuery('body').find('#sub-menu').css('top', menuheight + 50);
        }
        jQuery('body').find('#main-menu').css('display', 'block'); 
        jQuery('body').find('#sub-menu').css('display', 'block'); 
    }
});

jQuery("body").find('#mobile-menu').on("click", function (e) {
    "use strict";
    e.preventDefault();
    jQuery('body').find('#main-menu').toggle();
    jQuery('body').find('#sub-menu').toggle();
    jQuery('body').find('#mobile-menu').toggleClass('menu-close');
});

if (jQuery(window).width() < 640) {
jQuery("body").find('nav li a').on("click", function (e) {
    "use strict";
    e.preventDefault();
    jQuery('body').find('#main-menu').toggle();
    jQuery('body').find('#sub-menu').toggle();
    jQuery('body').find('#mobile-menu').toggleClass('menu-close');
});
}