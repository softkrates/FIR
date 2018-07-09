			(function ($) {
                "use strict";
				$.fn.preload = function (options) {
					var opts = $.extend({}, $.fn.preload.defaults, options);
					var o = $.meta ? $.extend({}, opts, this.data()) : opts;
					var c = this.length,
						l = 0;
					return this.each(function () {
						var $i = $(this);
						$('<img/>').load(function () {
							++l;
                          if (l === c) { o.onComplete(); }
						}).attr('src', $i.attr('src'));
					});
				};
				$.fn.preload.defaults = {
					onComplete: function () {
						return false;
					}
				};
			})(jQuery);

			$(function () {
                "use strict";
				var $slider_bg = $('#slider_bg'),
					$slider_bg_images = $slider_bg.find('img'),
					$slider_bg_img = $slider_bg_images.eq(0),
					total = $slider_bg_images.length,
					current = 0,
					$slider_content_wrapper = $('#slider_content_wrapper'),
					$slider_next = $('#slider_next'),
					$slider_prev = $('#slider_prev'),
					$slider_loading = $('#slider_loading'),
                    $slider_autoplay = false,
                    $slider_time = 5000;

				$slider_bg_images.preload({
					onComplete: function () {
						$slider_loading.hide();
						init();
					}
				});

				function scroll(dir) {
					current = (dir === 'tb') ? current + 1 : current - 1;
                  if (current === total) { current = 0; }
                  else if (current < 0) { current = total - 1; }
					var $slider_bg_img_next = $slider_bg_images.eq(current),
						dim = getImageDim($slider_bg_img_next),
						top = (dir === 'tb') ? $(window).height() + 'px' : -parseFloat(dim.height, 10) + 'px';

					$slider_bg_img_next.css({
						width: dim.width,
						height: dim.height,
						left: dim.left,
						top: top
					}).show();

					$slider_bg_img_next.stop().animate({
						top: dim.top
					}, 1000);

					var slideTo = (dir === 'tb') ? -$slider_bg_img.height() + 'px' : $(window).height() + 'px';
					$slider_bg_img.stop().animate({
						top: slideTo
					}, 1000, function () {
						$(this).hide();
						$slider_bg_img = $slider_bg_img_next;
						$slider_content_wrapper.children().eq(current).removeClass("fadeOutLeft").addClass("fadeInLeft").fadeIn(1000);
					});
					$slider_content_wrapper.children(':visible').removeClass("fadeInLeft").addClass("fadeOutLeft").fadeOut(1000);

				}

				function getImageDim($img) {
					var w_w = $(window).width(),
						w_h = $(window).height(),
						r_w = w_h / w_w,
						i_w = $img.width(),
						i_h = $img.height(),
						r_i = i_h / i_w,
						new_w, new_h;

					if (r_w > r_i) {
						new_h = w_h;
						new_w = w_h / r_i;
					} else {
						new_h = w_w * r_i;
						new_w = w_w;
					}

					return {
						width: new_w + 'px',
						height: new_h + 'px',
						left: (w_w - new_w) / 2 + 'px',
						top: (w_h - new_h) / 2 + 'px'
					};
				}
                if ($slider_autoplay === true) {
                $(document).ready(function() {
                    setInterval(function() { 
                        scroll('tb');
                    }, $slider_time);
                });
                }                
                function init() {
					var dim = getImageDim($slider_bg_img);
					$slider_bg_img.css({
						width: dim.width,
						height: dim.height,
						left: dim.left,
						top: dim.top
					}).fadeIn();

					$(window).bind('resize', function () {
						var dim = getImageDim($slider_bg_img);
						$slider_bg_img.css({
							width: dim.width,
							height: dim.height,
							left: dim.left,
							top: dim.top
						});
					});

					$slider_next.bind('click', function () {
                      if ($slider_bg_img.is(':animated')) {
							return false;
                      }
						scroll('tb');
					});

					$slider_prev.bind('click', function () {
                      if ($slider_bg_img.is(':animated')) {
							return false;
                      }
						scroll('bt');
					});

					$(document).keydown(function (e) {
                      if ($slider_bg_img.is(':animated')) {
							return false;
                      }
						switch (e.which) {
						case 38:
							scroll('bt');
							break;

						case 40:
							scroll('tb');
							break;
						}
					});
				}
			});