(function($) {
    $.fn.widgetize = function(options) {
        var settings = $.extend($.fn.widgetize.defaults, options ),
            container, toolbar = '';

        $.each(settings.components, function(){
            toolbar += ' \
                <a href="#" data-action="' + this.name +'"> \
                    <i class="' + this.iconCls +'"></i> \
                </a>';
        });
        container = ' \
            <div class="widget-header ' + settings.headerCls + '"> \
                <h5 id="widget-title" class="lighter"></h5> \
                <div class="widget-toolbar"> ' + toolbar +
                '</div> \
            </div> \
            <div class="widget-body"> \
                <div class="widget-body-inner"> \
                    <div class="widget-main"> \
                    </div> \
                </div> \
            </div>';
        $(this).html(container);

        $(this).each(function(){
            $(this).find('.widget-main').attr('id', $(this).attr('id'));
            $(this).attr('id', '');
            $(this).find('#widget-title').html($(this).attr('data-title'));
        });

        $(".widget-toolbar > a[data-action]").each(function () {
            var f = $(this),
                h = f.data("action"),
                e = f.closest(".widget-box"),
                d, b, a, c, g,
                i = false;

            if (h === "collapse") {
                d = e.find(".widget-body");
                b = f.find("[class*=icon-]").eq(0);
                a = b.attr("class").match(/icon\-(.*)\-(up|down)/);
                c = "icon-" + a[1] + "-down";
                g = "icon-" + a[1] + "-up";
                d = d.wrapInner('<div class="widget-body-inner"></div>').find(":first-child").eq(0);
                f.on("click", function (i) {
                    if (e.hasClass("collapsed")) {
                        if (b) {
                            b.addClass(g).removeClass(c);
                        }
                        e.removeClass("collapsed");
                        d.slideDown(200);
                    } else {
                        if (b) {
                            b.addClass(c).removeClass(g);
                        }
                        d.slideUp(300, function () {
                            e.addClass("collapsed");
                        });
                    }
                    i.preventDefault();
                });
                if (e.hasClass("collapsed") && b) {
                    b.addClass(c).removeClass(g);
                }
            } else {
                if (h === "close") {
                    f.on("click", function (i) {
                        e.hide(300, function () {
                            e.remove();
                        });
                        i.preventDefault();
                    });
                } else {
                    if (h === "reload") {
                        f.on("click", function (j) {
                            f.blur();
                            i = false;
                            if (!e.hasClass("position-relative")) {
                                i = true;
                                e.addClass("position-relative");
                            }
                            e.append('<div class="widget-box-layer"><i class="icon-spinner icon-spin icon-2x white"></i></div>');
                            setTimeout(function () {
                                e.find("> div:last-child").remove();
                                if (i) {
                                    e.removeClass("position-relative");
                                }
                            }, parseInt(Math.random() * 1000 + 1000, 10));
                            j.preventDefault();
                        });
                    } else {
                        if (h === "settings") {
                            f.on("click", function (i) {
                                i.preventDefault();
                            });
                        }
                    }
                }
            }
        });
    };

    $.fn.widgetize.defaults = {
        headerCls: "header-color-blue widget-header-small",
        components: [{
            name: "settings",
            iconCls: "icon-cog"
        },{
            name: "refresh",
            iconCls: "icon-refresh"
        },{
            name: "collapse",
            iconCls: "icon-chevron-down"
        },{
            name: "close",
            iconCls: "icon-remove"
        }]
    };
}( jQuery ));