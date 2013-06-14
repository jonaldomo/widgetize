(function($) {
    $.fn.widgetize = function(options) {
        var settings = $.extend({
            color: "#556b2f",
            backgroundColor: "white"
        }, options );

        $(this).html(' \
            <div class="widget-header header-color-blue widget-header-small"> \
                <h5 id="widget-title" class="lighter"></h5> \
                <div class="widget-toolbar"> \
                    <a href="#" data-action="settings"> \
                        <i class="icon-cog"></i> \
                    </a> \
                    <a href="#" data-action="reload"> \
                        <i class="icon-refresh"></i> \
                    </a> \
                    <a href="#" data-action="collapse"> \
                        <i class="icon-chevron-up"></i> \
                    </a> \
                    <a href="#" data-action="close"> \
                        <i class="icon-remove"></i> \
                    </a> \
                </div> \
            </div> \
            <div class="widget-body"> \
                <div class="widget-body-inner"> \
                    <div class="widget-main"> \
                    </div> \
                </div> \
            </div> \
        ');

        $(this).each(function(){
            $(this).find('.widget-main').attr('id', $(this).attr('id'));
            $(this).attr('id', '');
            $(this).find('#widget-title').html($(this).attr('data-title'));
        });

        $(".widget-toolbar > a[data-action]").each(function () {
            var f = $(this);
            var h = f.data("action");
            var e = f.closest(".widget-box");
            if (h == "collapse") {
                var d = e.find(".widget-body");
                var b = f.find("[class*=icon-]").eq(0);
                var a = b.attr("class").match(/icon\-(.*)\-(up|down)/);
                var c = "icon-" + a[1] + "-down";
                var g = "icon-" + a[1] + "-up";
                d = d.wrapInner('<div class="widget-body-inner"></div>').find(":first-child").eq(0);
                f.on("click", function (i) {
                    if (e.hasClass("collapsed")) {
                        if (b) {
                            b.addClass(g).removeClass(c)
                        }
                        e.removeClass("collapsed");
                        d.slideDown(200)
                    } else {
                        if (b) {
                            b.addClass(c).removeClass(g)
                        }
                        d.slideUp(300, function () {
                            e.addClass("collapsed")
                        })
                    }
                    i.preventDefault()
                });
                if (e.hasClass("collapsed") && b) {
                    b.addClass(c).removeClass(g)
                }
            } else {
                if (h == "close") {
                    f.on("click", function (i) {
                        e.hide(300, function () {
                            e.remove()
                        });
                        i.preventDefault()
                    })
                } else {
                    if (h == "reload") {
                        f.on("click", function (j) {
                            f.blur();
                            var i = false;
                            if (!e.hasClass("position-relative")) {
                                i = true;
                                e.addClass("position-relative")
                            }
                            e.append('<div class="widget-box-layer"><i class="icon-spinner icon-spin icon-2x white"></i></div>');
                            setTimeout(function () {
                                e.find("> div:last-child").remove();
                                if (i) {
                                    e.removeClass("position-relative")
                                }
                            }, parseInt(Math.random() * 1000 + 1000));
                            j.preventDefault()
                        })
                    } else {
                        if (h == "settings") {
                            f.on("click", function (i) {
                                i.preventDefault()
                            })
                        }
                    }
                }
            }
        });
    });
}( jQuery ));