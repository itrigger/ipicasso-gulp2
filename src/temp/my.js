$(document).ready(function () {

    $(".tabs li").on("click", function () {
        let tabId = $(this).parents(".tabs").attr("data-tabid");
        /*        let $tabs = $(".tabs_content_wrapper[data-tabcid=" + tabId + "]");
                let index = $(this).index();*/
        let swiperName = eval($(this).parents(".tabs").attr("data-swiper"));
        let slug = $(this).attr('data-slug').toString();
        let array = eval($(this).parents(".tabs").attr('data-array').toString() + '_default_slides_array');

        let temp_array = [];

        if (array) {
            if (slug === 'all') {
                for (const [i, arr] of array.entries()) {
                    temp_array.push(arr['html'])
                }
            } else if(slug === 'selected'){
                for (const [i, arr] of array.entries()) {
                    if (arr['slug'] === slug) {
                        temp_array.push(arr['html'])
                    }
                }
            } else {
                for (const [i, arr] of array.entries()) {
                    if (arr['slug'] === slug) {
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
        swiperName.lazy.load();
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
            $("#sidemenu").removeClass("open catalogonly");
            $(this).removeClass("opened");
            $(".ico-footmenu-catalog").removeClass("opened");
            $(".sidemenu--catalog_heading").find(".ico-close").remove();
        } else {
            $("body").addClass("sidemenu--open");
            $("#sidemenu").removeClass("catalogonly");
            $("#sidemenu").addClass("open");
            $(this).addClass("opened");
        }
    });
    $("#sidemenu .close, .body_overlay").click(function () {
        $("body").removeClass("sidemenu--open");
        $("#sidemenu").removeClass("open");
        $("#sidemenu").removeClass("catalogonly");
        $(".burger--btn").removeClass("opened");
        $(".ico-footmenu-catalog").removeClass("opened");
        $(".sidemenu--catalog_heading").find(".ico-close").remove();
    });
    $(".ico-footmenu-catalog").click(function (){
        if ($(this).hasClass('opened')) {
            $("body").removeClass("sidemenu--open");
            $("#sidemenu").removeClass("open catalogonly");
            $(this).removeClass("opened");
            $(".burger--btn").removeClass("opened");
            $(".sidemenu--catalog_heading").find(".ico-close").remove();
        } else {
            $("body").addClass("sidemenu--open");
            $("#sidemenu").addClass("open catalogonly");
            $(this).addClass("opened");
            $("#sidemenu .sidemenu--catalog_heading").append("<div class='ico-close'></div>");
        }
    })

    $(".sidemenu--catalog_heading").on('click','.ico-close', function (){
        $(".ico-footmenu-catalog").removeClass("opened");
        $("body").removeClass("sidemenu--open");
        $("#sidemenu").removeClass("open catalogonly");
        $(".burger--btn").removeClass("opened");
        $(".sidemenu--catalog_heading").find(".ico-close").remove();
    });

    let screenWidth = $(window).width();
    if (screenWidth < 1140) {
        $('body').addClass("tablet");
    } else {
        $('body').removeClass("tablet");
    }

    /*Мега меню ховер*/
    let MenuSwiper = undefined;

    function initSwiper() {

        let screenWidth = $(window).width();
        if ($('.cm-level-1 .swiper-container.active').length) {
            if (screenWidth < 1140 && MenuSwiper === undefined) {

                let baseWidth = $('.cm-level-1 .swiper-container.active').width();
                let ulWidth = 0;
                $(".cm-level-1 .swiper-container.active ul li").each(function() {
                    ulWidth = ulWidth + $(this).width() + 30
                });

                if((ulWidth+80) > baseWidth) {
                    $(".category_menu.cm-level-1 .swiper-button-prev, .category_menu.cm-level-1 .swiper-button-next").css("display","block");
                    $(".cm-level-1").css("padding","0 40px");
                    MenuSwiper = new Swiper('.cm-level-1 .swiper-container.active', {
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
                        if (MenuSwiper !== undefined) {
                            MenuSwiper.slideTo($(this).index());
                        }
                    });
                } else {
                    $(".category_menu.cm-level-1 .swiper-button-prev, .category_menu.cm-level-1 .swiper-button-next").css("display","none");
                    $(".cm-level-1").css("padding","0 16px");
                    if (MenuSwiper !== undefined) {
                        MenuSwiper.destroy();
                        MenuSwiper = undefined;
                    }
                    $('.cm-level-1 li.mm--item').css("marginRight","30px");
                    $('.cm-level-1 .swiper-wrapper').removeAttr('style');
                    $('.cm-level-1 .swiper-container .swiper-slide').removeAttr('style');
                }
            } else if (screenWidth > 1139) {
                if (MenuSwiper !== undefined) {
                    MenuSwiper.destroy();
                    MenuSwiper = undefined;

                }
                $(".cm-level-1").css("padding","0");
                $(".spoiler_desc").removeAttr('style');
                $('body').removeClass("tablet");
                $('.cm-level-1 .swiper-wrapper').removeAttr('style');
                $('.cm-level-1 .swiper-container .swiper-slide').removeAttr('style');
                $(".footer .line1 .col1 .ul, .footer .line1 .col2 .ul, .footer .line1 .col3 .ul").slideDown();
                $(".footer .line1 .col1 .title, .footer .line1 .col2 .title, .footer .line1 .col3 .title").removeClass("active");

            }
        }
    }

    //Swiper plugin initialization
    initSwiper();

    //Swiper plugin initialization on window resize
    $(window).on('resize', function () {
        let screenWidth = $(window).width();
        if (screenWidth < 1140) {
            $('body').addClass("tablet");
        } else {
            $('body').removeClass("tablet");
        }
         initSwiper();
    });


    $("#category_menu_0 li").hoverIntent(function () {
        $(".category_menu li").removeClass("active");

        $(".cm-level-1 .swiper-container").removeClass("active").removeAttr("style");
        $(".megamenu-swiper-button").css("display", "none");

/*        $( ".category_menu.cm-level-1 .swiper-container" ).animate({
            opacity: 0
        }, 200, function() {
            $(".category_menu.cm-level-1 .swiper-container").removeClass("active");
        });*/

        if (MenuSwiper != undefined) {
            MenuSwiper.destroy();
            MenuSwiper = undefined;
        }

        $('.cm-level-1 .swiper-wrapper').removeAttr('style');
        $('.cm-level-1 .swiper-container .swiper-slide').removeAttr('style');

        $('.cm-level-1').removeClass('active');
        $(".cm-level-1 .ul-level-1 li").removeClass("active");

        $(".megamenu").removeClass("active");
        $(this).addClass("active");
        let catId = $(this).attr("data-menu-id");
        if (catId != undefined) {


            $(".cm-level-1 .ul-level-1[data-menu-id=" + catId + "]").parent().addClass("active").parent().parent().addClass("active");
            $(".category_menu.cm-level-1 .swiper-button-prev, .category_menu.cm-level-1 .swiper-button-next").css("display","block");

            //открываем первый пункт подменю
            let subcatId = $(".cm-level-1 .ul-level-1[data-menu-id=" + catId + "]").find('li.mm--item:first-child').attr('data-menu-id');
            $(".megamenu").removeClass("active");
            $(".mm-popup").removeClass("active");
            $(".cm-level-1 .ul-level-1[data-menu-id=" + catId + "]").find('li.mm--item:first-child').addClass("active");
            $(".megamenu[data-id=" + subcatId + "]").addClass("active");
            $(".mm-popup[data-itemid=" + subcatId + "]").addClass("active");
            loadHiResImg(subcatId);
            //\\
            $(".megamenu-swiper-button").css("display", "block");
            let screenWidth = $(window).width();
            if (screenWidth < 1140 && MenuSwiper == undefined) {

                let baseWidth = $('.cm-level-1 .swiper-container.active').width();
                let ulWidth = 0;
                $(".cm-level-1 .swiper-container.active ul li").each(function() {
                    ulWidth = ulWidth + $(this).width() + 30
                });
               // console.log(baseWidth + '---' + ulWidth);
                if((ulWidth+80) > baseWidth) {

                    $(".category_menu.cm-level-1 .swiper-button-prev, .category_menu.cm-level-1 .swiper-button-next").css("display","block");
                    $(".cm-level-1").css("padding","0 40px");
                    MenuSwiper = new Swiper('.cm-level-1 .swiper-container.active', {
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
                        if (MenuSwiper != undefined) {
                            MenuSwiper.slideTo($(this).index());
                        }
                    });
                } else {
                    $(".category_menu.cm-level-1 .swiper-button-prev, .category_menu.cm-level-1 .swiper-button-next").css("display","none");
                    $(".cm-level-1").css("padding","0 16px");
                    MenuSwiper = new Swiper('.cm-level-1 .swiper-container.active', {
                        slidesPerView: 'auto',
                        spaceBetween: 30,
                        slidesOffsetAfter: 10,
                        slideClass: 'mm--item',
                        slideToClickedSlide: false,
                        navigation: {
                            nextEl: '',
                            prevEl: '',
                        },
                    });
                }

            }

        }
    });

    const loadHiResImg = function(subMenuId){
        $(".megamenu[data-id=" + subMenuId + "] .minicats-flex-wrap .minicat").each(function () {
            let $pic = $(this).find('.pic');
            let $img = $pic.find('img');
            let datasrcbig = $img.attr('data-src-big');
            let datasrc = $img.attr('data-src');
            if(datasrc != undefined){
                $pic.attr("style","background-image: url("+datasrcbig+");");
                $img.attr('src', datasrc);
            }
        });
    };

    $("#category_menu li").hoverIntent(function () {
        $("#category_menu li").removeClass('active');
        $(".megamenu").removeClass("active");
        $(".mm-popup").removeClass("active");
        $(this).addClass("active");
        let catId = $(this).attr("data-menu-id");
        $(".megamenu[data-id=" + catId + "]").addClass("active");
        $(".mm-popup[data-itemid=" + catId + "]").addClass("active");
        loadHiResImg(catId);
    });



    $(document).mouseover(function (e) { // событие клика по веб-документу
        let div = $(".category_menu, .megamenu-inner"); // тут указываем ID элемента

        if (!div.is(e.target) // если клик был не по нашему блоку
            && div.has(e.target).length === 0) { // и не по его дочерним элементам
            if(!($(".category_menu_w").hasClass('standalone_menu'))){
                $(".category_menu.cm-level-1").removeClass("active");
                $(".category_menu.cm-level-1 .swiper-container").removeClass("active");
              /*  $( ".category_menu.cm-level-1 .swiper-container" ).animate({
                    opacity: 0
                }, 200, function() {
                    $(".category_menu.cm-level-1 .swiper-container").removeClass("active");
                });*/

            }
            $(".cm-level-1 li").removeClass("active");
            $(".cm-level-0 li").removeClass("active");
            $(".megamenu").removeClass("active");
            $("#megamenu--catalog li:not(.viewall-margin)").removeClass("active");
            $(".category_menu.cm-level-1 .swiper-button-prev, .category_menu.cm-level-1 .swiper-button-next").css("display","none");

        }
    });

    /*    $(document).click(function (e) { // событие клика по веб-документу
            let div = $(".category_menu, .scroll-element_outer"); // тут указываем ID элемента
            if (!div.is(e.target) // если клик был не по нашему блоку
                && div.has(e.target).length === 0) { // и не по его дочерним элементам
                if(!($(".category_menu_w").hasClass('standalone_menu'))){
                    $(".category_menu.cm-level-1").removeClass("active");
                    $(".category_menu.cm-level-1 .swiper-container").removeClass("active");
                }
                $(".cm-level-1 li").removeClass("active");
                $(".cm-level-0 li").removeClass("active");
                $(".megamenu").removeClass("active");
                $("#megamenu--catalog li:not(.viewall-margin)").removeClass("active");
                $(".category_menu.cm-level-1 .swiper-button-prev, .category_menu.cm-level-1 .swiper-button-next").css("display","none");
            }
        });*/
    $(".mm-popup .minicat").hover(function () {
        //mm height 491
        let containerHeight;

        containerHeight = $(".megamenu-inner").height() - 45;

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


    /* $(".category_menu li").hover(function () {
         $(this).parent().find("li").removeClass("active");
         $(this).addClass("active");
     });*/


    $(".megamenu--catalog li").hover(function () {
        $(".mm-popup").removeClass("active");
        $(".megamenu--catalog li:not(.viewall-margin)").removeClass("active");
        $(this).addClass("active");
        let catId = $(this).attr("data-id");
        $(".mm-popup[data-itemId=" + catId + "]").addClass("active");
    });


    $(document).on("mouseenter", ".card", function() {
        let addHeight = $(this).find(".additions").height();
        $(this).parent().parent().addClass("hovered");
        $(this).find(".shover").css({"height": $(this).height() + addHeight + 55});
        $(this).find(".additions").css({"bottom": -addHeight});
    });

    $(document).on("mouseleave", ".card", function() {
        $(this).find(".shover").removeAttr("style");
        $(this).parent().parent().removeClass("hovered");
        //$(this).css({"paddingBottom": "20px"});
    });



  /*  $(document).on("mouseleave", ".shover", function() {
        $(".swiper-container").removeClass("hovered");
    });*/

    /*мини-карточка товара*/
    $("body").on("click", ".btn-increase", function (e) {
        e.preventDefault();
        let cur = parseInt($(this).parent().find("input").val());
        $(this).parent().find("input").val(cur + 1);
        $(this).parent().parent().find(".notify").removeClass("notify--empty").text(cur + 1);
        $.ajax({
            url: 'index.php?route=checkout/cart/add',
            type: 'post',
            data: 'product_id=' + $(this).data('id') + '&quantity=1',
            dataType: 'json',
            success: function(json) {

                if (json['success']) {

                    if ($('#cart > .cart_block--price').hasClass('empty')){
                        $('#cart > .cart_block--price').removeClass('empty');
                        $('#cart > .cart_block--price').before('<div class="cart_block--notifier">'+json['total']+'</div>');
                        if (json['percent'])
                            $('#cart > .cart_block--price').prepend('<div class="price">'+json['total_text']+'</div><div class="price price--old"> ' + json['total_old_text'] + '</div>');
                        else
                            $('#cart > .cart_block--price').prepend('<div class="price">'+json['total_text']+'</div>');
                    } else {
                        $('#cart_block--notifier').html(json['total']);
                        if (json['percent']){
                            $('#cart > .cart_block--price .price').html( json['total_text'] );
                            $('#cart > .cart_block--price .price--old').html(json['total_old_text']);
                        }
                        else
                            $('#cart > .cart_block--price .price').html( json['total_text'] );
                    }
                }

            }
        });
        checkMinicartCount();
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

        $.ajax({
            url: 'index.php?route=checkout/cart/edit',
            type: 'post',
            data: 'key=' + $(this).data('remove') + '&quantity=' + (cur - 1),
            dataType: 'json',
            beforeSend: function() {
            },
            complete: function() {

            },
            success: function(json) {

                if (json['success']) {

                    if ($('#cart > .cart_block--price').hasClass('empty')){
                        $('#cart > .cart_block--price').removeClass('empty');
                        $('#cart > .cart_block--price').before('<div class="cart_block--notifier">'+json['total']+'</div>');
                        if (json['percent'])
                            $('#cart > .cart_block--price').prepend('<div class="price">'+json['total_text']+'</div><div class="price price--old"> ' + json['total_old_text'] + '</div>');
                        else
                            $('#cart > .cart_block--price').prepend('<div class="price">'+json['total_text']+'</div>');
                    } else {
                        $('#cart_block--notifier').html(json['total']);
                        if (json['percent']){
                            $('#cart > .cart_block--price .price').html( json['total_text'] );
                            $('#cart > .cart_block--price .price--old').html(json['total_old_text']);
                        }
                        else
                            $('#cart > .cart_block--price .price').html( json['total_text'] );
                    }
                }

            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
            }
        });
        checkMinicartCount();
    });

    $("body").on("click", ".cart_btn__incart", function (e) {
        if($(window).width()<860) {
            e.preventDefault();
            $(this).addClass("hasItems");
            let cur = parseInt($(this).parent().find("input").val());
            $(this).parent().find("input").val(cur + 1);
            $(this).parent().parent().find(".notify").removeClass("notify--empty").text(cur + 1);
            $(this).find(".cart_btn__hover").click();
        }
    });

    $("body").on("click", ".cart_btn__hover", function () {
        $(this).parent().addClass("hasItems");
        $(this).parent().find(".add_delete_w input").val("1");
        $(this).parent().parent().find(".notify").removeClass("notify--empty").text("1");
    });

    $('[data-fancybox^="gal"]').fancybox({
        lang: "ru",
        i18n:{
            ru: {
                CLOSE: "Закрыть",
                NEXT: "Next",
                PREV: "Previous",
                ERROR: "The requested content cannot be loaded. <br/> Please try again later.",
                PLAY_START: "Start slideshow",
                PLAY_STOP: "Pause slideshow",
                FULL_SCREEN: "Full screen",
                THUMBS: "Thumbnails",
                DOWNLOAD: "Download",
                SHARE: "Share",
                ZOOM: "Zoom"
            },
        },
        buttons: [
            //"zoom",
            //"share",
            //"slideShow",
            //"fullScreen",
            //"download",
           //"thumbs",
            "close"
        ],
        baseTpl:
            '<div class="fancybox-container" role="dialog" tabindex="-1">' +
            '<div class="fancybox-bg"></div>' +
            '<div class="fancybox-inner">' +
            '<div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div>' +

            '<div class="fancybox-navigation">{{arrows}}</div>' +
            '<div class="fancybox-stage-w">' +
            '<div class="fancybox-toolbar">{{buttons}}</div>' +
            '<div class="fancybox-stage"></div>' +
            '</div>' +
            '<div class="fancybox-caption"><div class="fancybox-caption__body"></div></div>' +
            '</div>' +
            '</div>',
        thumbs: {
            autoStart: true, // Display thumbnails on opening
            hideOnClose: true, // Hide thumbnail grid when closing animation starts
            parentEl: ".fancybox-stage-w", // Container is injected into this element
            axis: "x" // Vertical (y) or horizontal (x) scrolling
        },
        animationEffect: "fade",
        arrows: false,
        toolbar: true,
    });
/*    Fancybox.show(gallery, {
        Image: {
            l10n: {
                CLOSE: "Закрыть",
                NEXT: "Next",
                PREV: "Previous",
                MODAL: "You can close this modal content with the ESC key",
                ERROR: "Something Went Wrong, Please Try Again Later",
                IMAGE_ERROR: "Image Not Found",
                ELEMENT_NOT_FOUND: "HTML Element Not Found",
                AJAX_NOT_FOUND: "Error Loading AJAX : Not Found",
                AJAX_FORBIDDEN: "Error Loading AJAX : Forbidden",
                IFRAME_ERROR: "Error Loading Page",
            }
            // Image-specific options go here, for example:
            // click: 'close'
        },
    });*/

    $('.tooltipstered').tooltipster();

    /* ToDo:
    *   1. Прокрутка вверх в левом меню при ховере на топ меню
    *
    * */


    $(".spoiler_href").on('click', function () {
        $(this).next(".spoiler_desc").slideToggle().toggleClass("active");
    });
    $(".spoilered_text .spoiler_href").on('click', function () {
        $(this).parent().parent().find(".spoiler_desc").slideToggle().toggleClass("active");
    });


    $(".footer .line1 .col1 .title, .footer .line1 .col2 .title, .footer .line1 .col3 .title").on("click", function () {
        if ($("body").hasClass("tablet")) {
            $(this).toggleClass("active").next(".ul").slideToggle();
            return false;
        } else {
            return true;
        }
    })


    //$('select').niceSelect();
    $('select').customSelect({
        includeValue: true
    });
    //https://kvlsrg.github.io/jquery-custom-select/



    $('.pseudolabel').hover(function () {
        let itemId = $(this).attr('data-input');
        let $cb = $('input#'+itemId);
        if(!($cb.attr("disabled"))){
            $(this).addClass("sHover");
        }
    }, function () {
        $(this).removeClass("sHover");
    });


    let showhideFilter = function (){
        let windowWidth = $(this).width();
        let $wrapper = $(".category_content_items");
       // console.log(windowWidth);
       // console.log($wrapper);
        if((windowWidth < 1440) && $wrapper.hasClass("cci-5")){
            $wrapper.removeClass("cci-5").addClass("cci-4");
            $("#select_count li a").removeClass("active");
            $("#select_count li[data-count='4'] a").addClass("active");
        } else if(windowWidth >= 1440){

        }
    }

    showhideFilter();

    $(window).resize(function (){
        showhideFilter();
    });

    $(".ico-toggle").click(function (){
       $(".breadcrumb_w").hasClass("active") ? $(".breadcrumb_w").removeClass("active") : $(".breadcrumb_w").addClass("active");

    });

    if($(".breadcrumb li").length <= 2){
        $(".breadcrumb_w").addClass("short")
    } else {
        $(".breadcrumb_w").removeClass("short");
    }

    $(".head-dd-title").click(function (){
        $(".head-dd-w").hasClass("active") ? $(".head-dd-w").removeClass("active") : $(".head-dd-w").addClass("active");
    });


    $('li').on('click', function (){
        var tab_c = $(this).attr('data-tab-content');
        $(this).parent().find('li').removeClass('active');
        $(this).addClass('active');
        $(`.tab_content[data-tab=${tab_c}]`).parent().children('.tab_content').css('display','none');
        $(`.tab_content[data-tab=${tab_c}]`).css('display','grid');
    })

    // common scroll to script
    // чтобы сделать якорь, нужно создать тег "а", указать ему класс scrollto, а в атрибут href вписать id целевого элемента (включая решетку #)
    $(".scrollto").on('click', function (e){
        e.preventDefault();
        var target = $(this).attr('href');
        $("html").animate({scrollTop: $($(target)).offset().top},800);
    })

}); //document ready


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


//Добавление активного класса полю ввода
let inpsToMonitor = document.querySelectorAll (
    "input[type=text], input[type=tel], input[type=email]"
);
for (let J = inpsToMonitor.length - 1;  J >= 0;  --J) {
    inpsToMonitor[J].addEventListener ("change",    adjustStyling, false);
    inpsToMonitor[J].addEventListener ("keyup",     adjustStyling, false);
    inpsToMonitor[J].addEventListener ("focus",     adjustStyling, false);
    inpsToMonitor[J].addEventListener ("blur",      adjustStyling, false);
    inpsToMonitor[J].addEventListener ("mousedown", adjustStyling, false);

    //-- Initial update. note that IE support is NOT needed.
    let evt = document.createEvent ("HTMLEvents");
    evt.initEvent ("change", false, true);
    inpsToMonitor[J].dispatchEvent (evt);
}

function adjustStyling (zEvent) {
    let inpVal  = zEvent.target.value;
    if (inpVal  &&  inpVal.replace (/^\s+|\s+$/g, "") ) {
        zEvent.target.classList.add("active");

        if (!($(zEvent.target).parent().find('.custom-label').length)) {
            $(zEvent.target).parent().prepend(`<div class="custom-label">${zEvent.target.placeholder}</div>`);
        }
    } else {
        zEvent.target.classList.remove("active");
        $(zEvent.target).parent().find('.custom-label').remove()
    }
}


$('.inputCountTarget').on('keyup change blur', function (e){
    let $target = $(this);
    if(event.keyCode === 46 || event.keyCode === 8){
        $(this).closest("#minicart").length ? inputChange($target, 'backspace', true) : inputChange($target, 'backspace');
    } else {
        $(this).closest("#minicart").length ? inputChange($target, false, true) : inputChange($target, false, false);
    }
}).focusin(function (e){
    let $target = $(this);
    checkInputFocus($target, true)
}).focusout(function (e){
    let $target = $(this);
    checkInputFocus($target, false)
})




$('.inputNumber').each(function () {
    if ($(this).find('input').val() === "1") {
        $(this).find('.ic_minus').addClass('disabled');
    }
})
$('body').on('click', '.ic_plus', function () {
    let $target = $(this).parent().find('input');
    $(this).closest("#minicart").length ? inputChange($target, 'plus', true) : inputChange($target, 'plus');
})
$('body').on('click', '.ic_minus', function () {
    let $target = $(this).parent().find('input');
    $(this).closest("#minicart").length ? inputChange($target, 'minus', true) : inputChange($target, 'minus');
})

//Изменение значения кол-ва в поле ввода
function inputChange(target, state, minicart = false) {   //bug когда появилась звездочка - не позволяет впечатывать значение. Может удалять звезду при фокусе?
    const limit = 20
    let num = parseInt(target.val())
    switch (state) {
        case 'plus':
            num = num + 1;
            if(num > limit){
                num = num + '*';
                target.parent().addClass('high_limit')
                minicart ? target.parent().parent().parent().parent().find('.limit_txt').addClass('active') : target.parent().parent().parent().find('.limit_txt').addClass('active')
            }
            target.val(num).parent().find('.ic_minus').removeClass('disabled');
            checkMinicartCount()

            $.ajax({
                url: 'index.php?route=checkout/cart/edit',
                type: 'post',
                data: 'key=' + $(this).data('remove') + '&quantity=' + (typeof(num) != 'undefined' ? num : 1),
                dataType: 'json',
                beforeSend: function() {
                },
                complete: function() {

                },
                success: function(json) {
                    if (json['success']) {

                        if ($('#cart > .cart_block--price').hasClass('empty')){
                            $('#cart > .cart_block--price').removeClass('empty');
                            $('#cart > .cart_block--price').before('<div class="cart_block--notifier">'+json['total']+'</div>');
                            if (json['percent'])
                                $('#cart > .cart_block--price').prepend('<div class="price">'+json['total_text']+'</div><div class="price price--old"> ' + json['total_old_text'] + '</div>');
                            else
                                $('#cart > .cart_block--price').prepend('<div class="price">'+json['total_text']+'</div>');
                        } else {
                            $('#cart_block--notifier').html(json['total']);
                            if (json['percent']){
                                $('#cart > .cart_block--price .price').html( json['total_text'] );
                                $('#cart > .cart_block--price .price--old').html(json['total_old_text']);
                            }
                            else
                                $('#cart > .cart_block--price .price').html( json['total_text'] );
                        }
                    }

                },
                error: function(xhr, ajaxOptions, thrownError) {
                    alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
                }
            });
        break;
        case 'minus':
            if (num > 1) {
                num = num - 1;

                if(num > limit){
                    num = num + '*';
                    target.parent().addClass('high_limit')
                } else {
                    target.parent().removeClass('high_limit')
                    minicart ? target.parent().parent().parent().parent().find('.limit_txt').removeClass('active') : target.parent().parent().parent().find('.limit_txt').removeClass('active')
                }
                target.val(num)
                if (num === 1) {
                    target.parent().find('.ic_minus').addClass('disabled')
                }

            } else {
                target.parent().find('.ic_minus').addClass('disabled');
            }
            checkMinicartCount()
        break;
        case 'backspace' :
            console.log('key BACKSPACE or DELETE pressed')
        break;
        default:
            if (num > 1) {
                if(num > limit){
                    num = num + '*';
                    target.parent().addClass('high_limit')
                    minicart ? target.parent().parent().parent().parent().find('.limit_txt').addClass('active') : target.parent().parent().parent().find('.limit_txt').addClass('active')
                } else {
                    target.parent().removeClass('high_limit')
                    minicart ? target.parent().parent().parent().parent().find('.limit_txt').removeClass('active') : target.parent().parent().parent().find('.limit_txt').removeClass('active')
                }
                target.val(num)
                if (num === 1) {target.parent().find('.ic_minus').addClass('disabled')}

            } else {
                target.val('1')
                target.parent().removeClass('high_limit')
                minicart ? target.parent().parent().parent().parent().find('.limit_txt').removeClass('active') : target.parent().parent().parent().find('.limit_txt').removeClass('active')
                target.parent().find('.ic_minus').addClass('disabled');
            }
            checkMinicartCount()
    }
}

//Проверяем кол-во единиц у каждой позиции в миникорзине, если больше 1, то отображаем цену за штуку
//Если обновляешь значение в корзине АЯКСом, то запускай каждый раз эту функцию
function checkMinicartCount() {
    if($('#minicart').length){
        $('#minicart .inputCountTarget').each(function (){
            parseInt($(this).val()) > 1 ? $(this).parent().parent().find('.price-per-one').addClass('active') : $(this).parent().parent().find('.price-per-one').removeClass('active')
        })

    }
}

function checkInputFocus(target, state) {
    state ? target.parent().parent().parent().addClass('active') : target.parent().parent().parent().removeClass('active')
}

$('document').ready(function (){
    checkMinicartCount()
})