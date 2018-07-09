/*
Ascensor.js 
version: 1.6.2 (2013-06-05)
description: Ascensor is a jquery plugin which aims to train and adapt content according to an elevator system
repository: https://github.com/kirkas/Ascensor.js
license: BSD
author: Léo Galley <contact@kirkas.ch>
*/
(function($, window) {
    function Plugin(element, options) {
        this.element = element, this.options = $.extend({}, defaults, options), this._defaults = defaults, 
        this._name = pluginName, this.init();
    }
    var pluginName = "ascensor", defaults = {
        ascensorName: "ascensor",
        ascensorFloorName: null,
        childType: "div",
        windowsOn: 0,
        direction: "y",
        loop: !0,
        ascensorMap: "",
        time: "1000",
        easing: "linear",
        keyNavigation: !1,
        queued: !1,
        queuedDirection: "x",
        overflow: "scroll"
    };
    Plugin.prototype.init = function() {
        function hashChange(onLoad) {
            window.location.hash && (
            hash = window.location.hash.split("/").pop(),
            $(self.options.ascensorFloorName).each(function(index) {
                hash === self.options.ascensorFloorName[index] && (
                floorActive = index,
                $("." + self.options.ascensorName + "Link").removeClass(self.options.ascensorName + "LinkActive").eq(floorActive).addClass(self.options.ascensorName + "LinkActive"), 
                onLoad || targetScroll(floorActive, self.options.time, !0));
            }));
        }
        function resize() {
            WW = $(window).width(), WH = $(window).height(),
            $(nodeChildren).width(WW).height(WH), $(node).width(WW).height(WH),
            "y" === self.options.direction &&
            $(node).stop().scrollTop(floorActive * WH),
            "x" === self.options.direction && (
            $(node).stop().scrollLeft(floorActive * WW),
            $(nodeChildren).each(function(index) {
                $(this).css("left", index * WW);
            })), //if direction is chocolate
            "chocolate" === self.options.direction && (
            $(nodeChildren).each(function(index) {
                $(this).css({
                    left: self.options.ascensorMap[index][1] * WW,
                    top: self.options.ascensorMap[index][0] * WH
                });
            }),
            $(node).stop().scrollLeft(self.options.ascensorMap[floorActive][1] * WW).scrollTop(self.options.ascensorMap[floorActive][0] * WH));
        }
        function targetScroll(floor, time, hashChange) {
            hashChange && scrollStart(),
            "y" === self.options.direction &&
            $(node).stop().animate({
                scrollTop: floor * WH
            }, time, self.options.easing, function() {
                scrollEnd();
            }),
            "x" === self.options.direction &&
            $(node).stop().animate({
                scrollLeft: floor * WW
            }, time, self.options.easing, function() {
                scrollEnd();
            }),
            "chocolate" === self.options.direction && (
            self.options.queued ?
            "x" === self.options.queuedDirection ? 
            $(node).scrollLeft() === self.options.ascensorMap[floor][1] * WW ?
            $(node).stop().animate({
                scrollTop: self.options.ascensorMap[floor][0] * WH
            }, time, self.options.easing, function() {
                scrollEnd();
            }) :
            $(node).stop().animate({
                scrollLeft: self.options.ascensorMap[floor][1] * WW
            }, time, self.options.easing, 
            function() {
                $(node).stop().animate({
                    scrollTop: self.options.ascensorMap[floor][0] * WH
                }, time, self.options.easing, function() {
                    scrollEnd();
                });
            }) : "y" === self.options.queuedDirection && (
            $(node).scrollTop() === self.options.ascensorMap[floor][0] * WH ?
            $(node).stop().animate({
                scrollLeft: self.options.ascensorMap[floor][1] * WW
            }, time, self.options.easing, function() {
                scrollEnd();
            }) :
            $(node).stop().animate({
                scrollTop: self.options.ascensorMap[floor][0] * WH
            }, time, self.options.easing, 
            function() {
                $(node).stop().animate({
                    scrollLeft: self.options.ascensorMap[floor][1] * WW
                }, time, self.options.easing, function() {
                    scrollEnd();
                });
            })) : 
            $(node).stop().animate({
                scrollLeft: self.options.ascensorMap[floor][1] * WW,
                scrollTop: self.options.ascensorMap[floor][0] * WH
            }, time, self.options.easing, function() {
                scrollEnd();
            })), hashChange || null !== self.options.ascensorFloorName && (
            window.location.hash = "/" + self.options.ascensorFloorName[floor]),
            $("." + self.options.ascensorName + "Link").removeClass(self.options.ascensorName + "LinkActive"), 
            $("." + self.options.ascensorName + "Link" + floor).addClass(self.options.ascensorName + "LinkActive"), 
            floorActive = floor;
        }
        function checkKey(e) {
            if ($("input, textarea, button").is(":focus"))
            {   
                if(key == 37 || key == 65 || key == 39 || key == 68 )
                {
                    return false;
                }
            }
            else{
            
            switch (e.which) {
                case 37:
              case 65:
                $(node).trigger({
                    type: "ascensorLeft",
                    floor: floorActive
                });
                break;

                case 39:
              case 68:
                $(node).trigger({
                    type: "ascensorRight",
                    floor: floorActive
                });
            }
            }
        }
        function scrollStart() {
            $(node).trigger({
                type: "ascensorStart",
                floor: floorActive
            });
        }
        function scrollEnd() {
            $(node).trigger({
                type: "ascensorEnd",
                floor: floorActive
            });
        }
        function down() {
            "y" == self.options.direction ? $(node).trigger({
                type: "ascensorNext",
                floor: floorActive
            }) : "chocolate" == self.options.direction && chocolatedirection(1, 0);
        }
        function up() {
            "y" == self.options.direction ? $(node).trigger({
                type: "ascensorPrev",
                floor: floorActive
            }) : "chocolate" == self.options.direction && chocolatedirection(-1, 0);
        }
        function left() {
            "x" == self.options.direction ? $(node).trigger({
                type: "ascensorPrev",
                floor: floorActive
            }) : "chocolate" == self.options.direction && chocolatedirection(0, -1);
        }
        function right() {
            "x" == self.options.direction ? $(node).trigger({
                type: "ascensorNext",
                floor: floorActive
            }) : "chocolate" == self.options.direction && chocolatedirection(0, 1);
        }
        function prev() {
            var prevFloor = floorActive - 1;
            0 > prevFloor && (prevFloor = self.options.loop ? floorCounter : 0), targetScroll(prevFloor, self.options.time);
        }
        function next() {
            var nextFloor = floorActive + 1;
            nextFloor > floorCounter && (nextFloor = self.options.loop ? 0 : floorCounter), 
            targetScroll(nextFloor, self.options.time);
        }
        function chocolatedirection(addCoordY, addCoordX) {
            var floorReference = [ self.options.ascensorMap[floorActive][0] + addCoordY, self.options.ascensorMap[floorActive][1] + addCoordX ];
            $.each(self.options.ascensorMap, function(index) {
                "" + floorReference == "" + self.options.ascensorMap[index] && targetScroll(index, self.options.time);
            });
        }
        var
        WW, WH, 
        hash, self = this, node = this.element, nodeChildren = $(node).children(self.options.childType), 
        floorActive = self.options.windowsOn, floorCounter = -1;
        if (self.options.direction,
        $(node).css("position", "absolute").width(WW).height(WH), $(node).css("overflow", self.options.overflow), 
        $(nodeChildren).width(WW).height(WH).each(function() {
            floorCounter += 1, 
            $(this).attr("id", self.options.ascensorName + "Floor" + floorCounter).addClass(self.options.ascensorName + "Floor");
        }),
        ("x" === self.options.direction || "chocolate" === self.options.direction) &&
        $(nodeChildren).css({
            position: "absolute",
            overflow: "auto"
        }),
        $(window).resize(function() {
            resize();
        }).load(function() {
            resize();
        }).resize(),
        window.DeviceOrientationEvent && 
        $(window).bind("orientationchange", function() {
            resize();
        }), self.options.keyNavigation) {
            $(document).keydown(checkKey);
        }
        $(node).on("ascensorLeft", function() {
            left();
        }), $(node).on("ascensorRight", function() {
            right();
        }), $(node).on("ascensorUp", function() {
            up();
        }), $(node).on("ascensorDown", function() {
            down();
        }), $(node).on("ascensorNext", function() {
            next();
        }), $(node).on("ascensorPrev", function() {
            prev();
        }),
        $("." + self.options.ascensorName + "LinkPrev").on("click", function() {
            prev();
        }),
        $("." + self.options.ascensorName + "LinkNext").on("click", function() {
            next();
        }),
        $("." + self.options.ascensorName + "LinkLeft").on("click", function() {
            left();
        }),
        $("." + self.options.ascensorName + "LinkRight").on("click", function() {
            right();
        }),
        $("." + self.options.ascensorName + "LinkUp").on("click", function() {
            down();
        }),
        $("." + self.options.ascensorName + "LinkDown").on("click", function() {
            up();
        }), $("." + self.options.ascensorName + "Link").on("click", function() {
            var floorReference = parseInt($(this).attr("class").split(" ")[1].split(self.options.ascensorName + "Link")[1], 10);
            targetScroll(floorReference, self.options.time);
        }),
        targetScroll(floorActive, 1, !0),
        $(window).on("hashchange", function() {
            hashChange();
        }),
        hashChange(!0);
    }, $.fn[pluginName] = function(options) {
        return this.each(function() {
            $.data(this, "plugin_" + pluginName) || $.data(this, "plugin_" + pluginName, new Plugin(this, options));
        });
    };
})(jQuery, window);