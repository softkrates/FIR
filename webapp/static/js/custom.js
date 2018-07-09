/////////* ASCENSOR *///////////

$('#ascensorBuilding').ascensor({
    direction:"x",
    time:1300,
    childType: "article",
    loop: false,
    overflow: 'hidden'
});

/////////* STELLAR EFFECT *///////////

if ($(window).width() > 1024) {
    $('#ascensorBuilding').stellar();
}

/////////* BACKGROUND IMAGES *///////////

$(document).ready(function() {
    "use strict";
    if ($(window).width() > 800) {
        $('#ascensorFloor1').backstretch("images/slide.jpg");
        $('#ascensorFloor2').backstretch("images/slide.jpg");
        $('#ascensorFloor3').backstretch("images/slide.jpg");
    }
    //// FOR SMALL MOBILE DEVICES ////
    else {
        $('#ascensorFloor1').backstretch("images/slide.jpg");
        $('#ascensorFloor2').backstretch("images/slide.jpg");
        $('#ascensorFloor3').backstretch("images/slide.jpg");
    }
});

/////////* OPENING EFFECT *///////////

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
    googlemap();
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

/////////* RESPONSIVE MENU *///////////

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
    jQuery('body').find('#main-menu').toggle();
    jQuery('body').find('#sub-menu').toggle();
    jQuery('body').find('#mobile-menu').toggleClass('menu-close');
});
}

/////////* TESTIMONIALS *///////////
(function($) {
    "use strict";
	$.fn.quovolver = function(speed, delay) {
		if (!speed) { speed = 500; }
		if (!delay) { delay = 6000; }
		var quaSpd = (speed*4);
		if (quaSpd > (delay)) { delay = quaSpd; }
		var	quote = $(this),
			firstQuo = $(this).filter(':first'),
			lastQuo = $(this).filter(':last'),
			wrapElem = '<div id="quote_wrap"></div>';
		$(this).wrapAll(wrapElem);
		$(this).hide().removeClass('fadeInUp').addClass('fadeOutRight');
		$(firstQuo).show().removeClass('fadeOutRight').addClass('fadeInUp');
		$(this).parent().css({height: $(firstQuo).height()});		
		setInterval(function(){
			if($(lastQuo).is(':visible')) {
				var nextElem = $(firstQuo);
				var wrapHeight = $(nextElem).height();
			} else {
				var nextElem = $(quote).filter(':visible').next();
				var wrapHeight = $(nextElem).height();
			}
			$(quote).filter(':visible').fadeOut(speed).removeClass('fadeInUp').addClass('fadeOutRight');
			setTimeout(function() {
				$(quote).parent().animate({height: wrapHeight}, speed);
			}, speed);
			
			if($(lastQuo).is(':visible')) {
				setTimeout(function() {
					$(firstQuo).fadeIn(speed*2).removeClass('fadeOutRight').addClass('fadeInUp');
				}, speed*2);
				
			} else {
				setTimeout(function() {
					$(nextElem).fadeIn(speed).removeClass('fadeOutRight').addClass('fadeInUp');
				}, speed*2);
			}
			
		}, delay);
	
	};
})(jQuery);

jQuery(window).load(function () { 
    "use strict";
    jQuery('.testimonial-item').quovolver(); 
});

/////////////////* ACCORDION */////////////////////////

jQuery(document).ready(function () {
    "use strict";
    jQuery('.accordion-header').toggleClass('inactive-header');

    jQuery('.accordion-content').css({ 'width': '100%' });

    jQuery('.accordion-header').click(function () {
        if (jQuery(this).is('.inactive-header')) {
            jQuery('.active-header').toggleClass('active-header').toggleClass('inactive-header').next().slideToggle().toggleClass('open-content');
            jQuery(this).toggleClass('active-header').toggleClass('inactive-header');
            jQuery(this).next().slideToggle().toggleClass('open-content');
        }

        else {
            jQuery(this).toggleClass('active-header').toggleClass('inactive-header');
            jQuery(this).next().slideToggle().toggleClass('open-content');
        }
    });

    return false;
});