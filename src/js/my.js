$(document).ready(function () {


    //


    /*tabs*/
    $(".tabs li").on("click", function () {
        let tabId = $(this).parents(".tabs").attr("data-tabid");
        /*        let $tabs = $(".tabs_content_wrapper[data-tabcid=" + tabId + "]");
                let index = $(this).index();*/
        let swiperName = eval($(this).parents(".tabs").attr("data-swiper"));
        let slug =  $(this).attr('data-slug').toString();
        let array = eval($(this).parents(".tabs").attr('data-array').toString()+'_default_slides_array');

        let temp_array = [];


        if (array) {
            if (slug === 'all'){
                for (const [i, arr] of array.entries()) {
                    temp_array.push(arr['html'])
                }
            } else {
                for (const [i, arr] of array.entries()) {
                    if(arr['slug'] === slug) {
                        temp_array.push(arr['html'])
                    }
                }
            }
        }

        $(this).parents(".tabs").find("li").removeClass("active");
        $(this).addClass("active");
        swiperName.removeAllSlides();
        swiperName.appendSlide(temp_array);
        swiperName.update();
        swiperName.slideTo(0, 0);
        swiperName.lazy.load();;
    });


    /*Первый аккордеон для сео блока*/
    $("#mp-accordion [data-accordion]").accordion({
        singleOpen: false
    });

    /*https://jquery-mosaic.tin.cat/*/
    /*Скрипт мозаики для главной*/
    $('.js-mosaic').Mosaic({
        maxRows: 2,
        innerGap: 20,
        maxRowHeight: 279
    });

    /*кастом аккордеон для бокового меню*/
    $(".accordion_tab").click(function (e) {
        if ($(this).hasClass("active")) {
            $(this).parent().removeClass("active");
            $(this).next().slideUp();
            $(this).removeClass("active");
            return;
        }
        $(this).parent().addClass("active");
        $(this).next().slideDown();
        $(this).addClass("active");

    });

    /*обертка для скриптра кастом скролла*/
    /*http://gromo.github.io/jquery.scrollbar/*/
    const myScroll = function () {
        $('.j-sidemenu-scrollbar-wrapper .scrollbar-inner').scrollbar({
            //autoScrollSize:!1,
            autoUpdate: true,
            disableBodyScroll: false
        });
    };
    const myScroll2 = function () {
        $('.j-megamenu-scrollbar-wrapper .scrollbar-inner').scrollbar({
            //autoScrollSize:!1,
            autoUpdate: true,
            disableBodyScroll: false
        });
    };
    /*запускаем кастом скролл при загрузке документа*/
    myScroll();
    myScroll2();

    /*Открытие / закрытие бокового меню*/
    $(".burger--btn").click(function () {
        if ($(this).hasClass('opened')) {
            $("body").removeClass("sidemenu--open");
            $("#sidemenu").removeClass("open");
            $(this).removeClass("opened");
        } else {
            $("body").addClass("sidemenu--open");
            $("#sidemenu").addClass("open");
            $(this).addClass("opened");
        }
    });
    $("#sidemenu .close, .body_overlay").click(function () {
        $("body").removeClass("sidemenu--open");
        $("#sidemenu").removeClass("open");
        $(".burger--btn").removeClass("opened");
    })


    /*Мега меню ховер*/
    let MenuSwiper = undefined;

    function initSwiper() {
        var screenWidth = $(window).width();
        if(screenWidth < 1140 && MenuSwiper == undefined) {
            $('body').addClass("tablet");
            MenuSwiper  = new Swiper('.cm-level-1 .swiper-container.active', {
                slidesPerView: 'auto',
                spaceBetween: 30,
                slidesOffsetAfter: 10,
                slideClass: 'mm--item',
                slideToClickedSlide: true,
                watchOverflow: true,
                navigation: {
                    nextEl: '.cm-level-1 .swiper-button-next',
                    prevEl: '.cm-level-1 .swiper-button-prev',
                },
            });
            $(".tablet .cm-level-1 .swiper-container.active li").hover(function () {
                MenuSwiper.slideTo($(this).index());
            });
        } else if (screenWidth > 991 && MenuSwiper != undefined) {
            MenuSwiper.destroy();
            MenuSwiper = undefined;
            $(".spoiler_desc").removeAttr('style');
            $('body').removeClass("tablet");
            jQuery('.cm-level-1 .swiper-wrapper').removeAttr('style');
            jQuery('.cm-level-1 .swiper-container .swiper-slide').removeAttr('style');
            $(".footer .line1 .col1 .ul, .footer .line1 .col2 .ul, .footer .line1 .col3 .ul").slideDown();
            $(".footer .line1 .col1 .title, .footer .line1 .col2 .title, .footer .line1 .col3 .title").removeClass("active");
        }
    }

        //Swiper plugin initialization
    initSwiper();

        //Swiper plugin initialization on window resize
    $(window).on('resize', function(){
        initSwiper();
    });


    $("#category_menu_0 li").hover(function () {
        $(".cm-level-1 .swiper-container").removeClass("active");
        $(".megamenu-swiper-button").css("display","none");
        if(MenuSwiper != undefined) {
            MenuSwiper.destroy();
            MenuSwiper = undefined;
        }
        jQuery('.cm-level-1 .swiper-wrapper').removeAttr('style');
        jQuery('.cm-level-1 .swiper-container .swiper-slide').removeAttr('style');


        $(".cm-level-1 .ul-level-1 li").removeClass("active");
        $(".megamenu").removeClass("active");
        $(this).addClass("active");
        let catId = $(this).attr("data-menu-id");
        if(catId != undefined) {
            $(".cm-level-1 .ul-level-1[data-menu-id=" + catId + "]").parent().addClass("active");
            $(".megamenu-swiper-button").css("display","block");
            MenuSwiper  = new Swiper('.cm-level-1 .swiper-container.active', {
                slidesPerView: 'auto',
                spaceBetween: 30,
                slidesOffsetAfter: 10,
                slideClass: 'mm--item',
                slideToClickedSlide: true,
                watchOverflow: true,
                navigation: {
                    nextEl: '.cm-level-1 .swiper-button-next',
                    prevEl: '.cm-level-1 .swiper-button-prev',
                },
            });
            $(".tablet .cm-level-1 .swiper-container.active li").hover(function () {
                MenuSwiper.slideTo($(this).index());
            });
        }
    });
    $("#category_menu_0 li").mouseenter(function () {
       // MenuSwiper.update();
    });

    $("#category_menu li").hover(function () {
        $(".megamenu").removeClass("active");
        $(".mm-popup").removeClass("active");
        $(this).addClass("active");
        let catId = $(this).attr("data-menu-id");
        $(".megamenu[data-id=" + catId + "]").addClass("active");
        $(".mm-popup[data-itemid=" + catId + "]").addClass("active");
    });

    $(".megamenu-inner").mouseleave(function () {
        $(".megamenu").removeClass("active");
        $(".cm-level-1 li").removeClass("active");
        $(".megamenu--catalog li:not(.viewall-margin)").removeClass("active");
    });
    $("#header").hover(function () {
        $(".cm-level-1 li").removeClass("active");
        $(".megamenu").removeClass("active");
        $("#megamenu--catalog li:not(.viewall-margin)").removeClass("active");
    });

    $(".minicat").hover(function () {
        //mm height 491
        let containerHeight = $(".megamenu-inner").height() - 45;
        let nameHeight = $(this).find(".name").height();
        let imgHeight = $(this).find("img").height();
        let myFullHeight = $(this).find(".submenu").height() + imgHeight + nameHeight;
        let myOffset = $(this).position().top + myFullHeight;
        let myOffset2 = $(this).position().top + $(this).height() - 40;

        let sub = myOffset - containerHeight;

        if (myOffset2 < containerHeight) {
            $(this).addClass("hover");
            $(this).find(".submenu").css({"paddingTop": nameHeight + 130});

            if (myOffset > containerHeight) {
                $(this).find(".submenu").css({"top": sub * (-1) - 8 - 20});
                $(this).find(">a").css("top", sub * (-1) - 10);
            }
        }
    }, function () {
        $(this).find(".submenu, >a").removeAttr("style");
        $(this).removeClass("hover");
    });


    const basePopImgHeight = $(".no-left-col .mm--popular>ul>li img").height();

    $(".mm--popular>ul>li").hover(function () {
            let ulHeight = $(this).find(".submenu ul").height();
            // $(this).find(".submenu").css({"paddingTop":basePopImgHeight + 80 - ulHeight, "maxHeight":"auto"});
            $(this).find(".submenu").css({"maxHeight": ulHeight + 10});
            $(this).find(".pic img").css({"height": basePopImgHeight - ulHeight + 54});
        },
        function () {
            $(this).find(".pic img").css({"height": basePopImgHeight});
            $(this).find(".submenu").removeAttr("style");
        }
    );



    $(".category_menu li").hover(function () {
        $(this).parent().find("li").removeClass("active");
        $(this).addClass("active");
    });


    $(".megamenu--catalog li").hover(function () {
        $(".mm-popup").removeClass("active");
        $(".megamenu--catalog li:not(.viewall-margin)").removeClass("active");
        $(this).addClass("active");
        let catId = $(this).attr("data-id");
        $(".mm-popup[data-itemId=" + catId + "]").addClass("active");
    });


    $(".card").hover(function () {
        let addHeight = $(this).find(".additions").height();
        $(this).find(".shover").css({"height": $(this).height() + addHeight * 2});
        //$(this).css({"paddingBottom": addHeight * 2});
    }, function () {
        $(this).find(".shover").removeAttr("style");
        //$(this).css({"paddingBottom": "20px"});
    });


    /*мини-карточка товара*/
    $("body").on("click", ".btn-increase", function (e) {
        e.preventDefault();
        let cur = parseInt($(this).parent().find("input").val());
        $(this).parent().find("input").val(cur + 1);
        $(this).parent().parent().find(".notify").removeClass("notify--empty").text(cur + 1);
    });
    $("body").on("click", ".btn-decrease", function (e) {
        e.preventDefault();
        let cur = parseInt($(this).parent().find("input").val());
        if (cur > 0) {
            $(this).parent().find("input").val(cur - 1);
            $(this).parent().parent().find(".notify").text(cur - 1);
            if ((cur - 1) == 0) {
                $(this).parent().parent().removeClass("hasItems");
                $(this).parent().parent().find(".notify").addClass("notify--empty").text("+");
            }
        } else {
            $(this).parent().parent().removeClass("hasItems");
        }
    });
    $("body").on("click", ".cart_btn__hover", function () {
        $(this).parent().addClass("hasItems");
        $(this).parent().find(".add_delete_w input").val("1");
        $(this).parent().parent().find(".notify").removeClass("notify--empty").text("1");
    })

    $('.tooltipstered').tooltipster();

    /* ToDo:
    *   1. Прокрутка вверх в левом меню при ховере на топ меню
    *
    * */


    $(".spoiler_href").on('click', function () {
        $(this).next(".spoiler_desc").slideToggle().toggleClass("active");
    });

    $(".footer .line1 .col1 .title, .footer .line1 .col2 .title, .footer .line1 .col3 .title").on("click", function () {
        if($("body").hasClass("tablet")){
            $(this).toggleClass("active").next(".ul").slideToggle();
            return false;
        } else {
            return true;
        }
    })

});


//https://github.com/hsynlms/zeynepjs
$(function () {
    // loop all zeynepjs menus for initialization
    $('.zeynep').each(function () {
        // init zeynepjs side menu
        $(this).zeynep({
            opened: function (el) {
                // log
                //console.log(el.attr('data-menu-name') + ' side menu opened')
            },
            closed: function (el) {
                // log
                //console.log(el.attr('data-menu-name') + ' side menu closed')
            }
        })
    })

    // handle zeynepjs overlay click

    $('.zeynep-overlay').on('click', function () {
        // close all zeynepjs menus
        $('.zeynep.opened').each(function () {
            $(this).data('zeynep').close()
        })
    });

});

/*проверяем, докручен ли скролл до конца, чтобы убрать затемнение нижнего элемента в меню*/

/*$('.j-megamenu-scrollbar-wrapper').scrollbar({
    "onScroll": function(y, x){

        if(y.scroll == y.maxScroll){
            $(".col--left").addClass("isbottom");
        } else {
            $(".col--left").removeClass("isbottom");
        }
    }
});*/



