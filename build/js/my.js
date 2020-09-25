

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
    }

    /*запускаем кастом скролл при загрузке документа*/
    myScroll();

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

});



//https://github.com/hsynlms/zeynepjs
$(function() {
    // loop all zeynepjs menus for initialization
    $('.zeynep').each(function () {
        // init zeynepjs side menu
        $(this).zeynep({
            opened: function (el) {
                // log
                console.log(el.attr('data-menu-name') + ' side menu opened')
            },
            closed: function (el) {
                // log
                console.log(el.attr('data-menu-name') + ' side menu closed')
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
