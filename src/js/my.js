

$(document).ready(function () {
    /*карусель для модуля Новинки каталога на главной*/
  const mySwiper = new Swiper('.module-mp-cat-news .swiper-container', {
        slidesPerView: 5,
        spaceBetween: 20,
        navigation: {
            nextEl: '.module-mp-cat-news .swiper-button-next',
            prevEl: '.module-mp-cat-news .swiper-button-prev',
        },
    });
    /!*карусель для модуля Акционный товар на главной*!/
    const mySwiper2 = new Swiper('.module-mp-cat-actions .swiper-container', {
        slidesPerView: 5,
        spaceBetween: 20,
        navigation: {
            nextEl: '.module-mp-cat-actions .swiper-button-next',
            prevEl: '.module-mp-cat-actions .swiper-button-prev',
        },
    });
    /!*карусель для модуля медиацентр на главной*!/
    const mySwiper3 = new Swiper('.module-mp-media-center .swiper-container', {
        slidesPerView: 3,
        spaceBetween: 20,
        navigation: {
            nextEl: '.module-mp-media-center .swiper-button-next',
            prevEl: '.module-mp-media-center .swiper-button-prev',
        },
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
    $(".accordion_tab").click(function(e){
        if($(this).hasClass("active")){
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
    const myScroll = function() {
        $('.j-sidemenu-scrollbar-wrapper .scrollbar-inner').scrollbar({
            //autoScrollSize:!1,
            autoUpdate: true,
            disableBodyScroll: false
        });
    };
    const myScroll2 = function() {
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
        if($(this).hasClass('opened')){
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

    $("#category_menu li").hover(function () {
        $(".megamenu").removeClass("active");
        $(".mm-popup").removeClass("active");
        $(this).addClass("active");
        let catId = $(this).attr("data-menu-id");
        $(".megamenu[data-id="+catId+"]").addClass("active");
        $(".mm-popup[data-itemid="+catId+"]").addClass("active");
    });



    $(".minicat").hover(function () {
        //mm height 491
        let containerHeight = $(".megamenu-inner").height() - 45;
        let nameHeight = $(this).find(".name").height();
        let imgHeight = $(this).find("img").height();
        let myFullHeight = $(this).find(".submenu").height() + imgHeight + nameHeight;
        let myOffset = $(this).position().top + myFullHeight;
        let myOffset2 = $(this).position().top + $(this).height()-40;

        let sub = myOffset - containerHeight;

        if(myOffset2<containerHeight) {
            $(this).addClass("hover");
            $(this).find(".submenu").css({"paddingTop": nameHeight + 130});

            if (myOffset > containerHeight) {
                $(this).find(".submenu").css({"top": sub * (-1) -8 - 20});
                $(this).find(">a").css("top", sub * (-1) -10);
            }
        }
    }, function () {
        $(this).find(".submenu, >a").removeAttr("style");
        $(this).removeClass("hover");
    });




    const basePopImgHeight = $(".mm--popular>ul>li img").height();

    $(".mm--popular>ul>li").hover(function () {
        let ulHeight = $(this).find(".submenu ul").height();
       // $(this).find(".submenu").css({"paddingTop":basePopImgHeight + 80 - ulHeight, "maxHeight":"auto"});
        $(this).find(".submenu").css({"maxHeight":ulHeight+10});
        $(this).find(".pic img").css({"height":basePopImgHeight-ulHeight+54});
    },
    function () {
        $(this).find(".pic img").css({"height":basePopImgHeight});
        $(this).find(".submenu").removeAttr("style");
    }
    );

    $(".megamenu-inner").mouseleave(function(){
        $(".megamenu").removeClass("active");
        $(".category_menu li").removeClass("active");
        $(".megamenu--catalog li:not(.viewall-margin)").removeClass("active");
    });

    $(".category_menu li").hover(function () {
        $(".category_menu li").removeClass("active");
        $(this).addClass("active");
    });
    $("#header").hover(function () {
        $(".category_menu li").removeClass("active");
        $(".megamenu").removeClass("active");
        $("#megamenu--catalog li:not(.viewall-margin)").removeClass("active");
    });

    $(".megamenu--catalog li").hover(function () {
        $(".mm-popup").removeClass("active");
        $(".megamenu--catalog li:not(.viewall-margin)").removeClass("active");
        $(this).addClass("active");
        let catId = $(this).attr("data-id");
        $(".mm-popup[data-itemId="+catId+"]").addClass("active");
    });


    $(".module_carousel--item").hover(function () {
        let addHeight = $(this).find(".additions").height();
       $(this).find(".shover").css({"height": $(this).height()+addHeight*2+16});
    }, function () {
        $(this).find(".shover").removeAttr("style");
    });




    /*tabs*/
    $(".tabs li").on("click", function () {
        let tabId = $(this).parent().parent().attr("data-tabid");
        let $tabs = $(".tabs_content_wrapper[data-tabcid="+tabId+"]");
        let index = $(this).index();
        let swiperName = eval($(this).parent().parent().attr("data-swiper"));
        $(this).parent().parent().find("li").removeClass("active");
        $(this).addClass("active");
        $tabs.find(".tabs_content").each(function () {
            $(this).removeClass('active');
        });
        $tabs.find(".tabs_content").eq(index).addClass("active");
        $tabs.parent().find(".swiper-button-prev").addClass("swiper-button-disabled");
        swiperName[index].update();
        swiperName[index].slideTo(0,0);
    })

});



//https://github.com/hsynlms/zeynepjs
$(function() {
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
