var arrow_enabled = 0;
var button_enabled = 1;
var hide_pagenav = 0;
var productContainer = '';
var page = 1;
var limit = 0;
var wh = 0;
var load = false;
var ct = 0;
var pages = [];
var filter_ajax = false;
var tmp_data_productContainer = '';
var productContainer_first_div = '';

function getNextPage() {
    if (load) return;
    if (!filter_ajax) {
        if (page > pages.length) return;
        page++;
    } else {
        if ($('.pagination .pagination_ul ul li.active').next().length == 0) return;
    }
    $(productContainer).find('span.clear').remove();
    load = true;
    removeButton();
    if (filter_ajax) {
        h = parseFloat($(productContainer).css('height'));
        $(productContainer).css('height', h + 'px');
        tmp_data_productContainer = $(productContainer).html();
        productContainer_first_div = $(productContainer).find('div').eq(0).html();
    }
    $(productContainer).append('<div id="ajaxblock" style="height:30px;margin-top:20px;text-align:center;border:none !important; background:none;"><img src="/image/loader.gif" /></div>');
    if (!filter_ajax) {
        $.ajax({
            url: pages[page - 2], type: "GET", data: '', success: function (data) {
                $data = $(data);
                $('#ajaxblock').remove();
                if ($data) {
                    if ($data.find('.product-list').length > 0) {
                        $(productContainer).append($data.find('.product-list').html());
                    } else if ($data.find('.product-grid').length > 0) {
                        $(productContainer).append($data.find('.product-grid').html());
                    } else {
                        $(productContainer).append($data.find(productContainer).html());
                    }
                }
                if (typeof display == 'function') {
                    if ((typeof $.totalStorage == 'function')) {
                        view = $.totalStorage('display');
                    } else {
                        view = $.cookie('display');
                    }
                    if (view) {
                        display(view);
                    } else {
                        display('list');
                    }
                }
                addButton(true);
                load = false;
            }
        });
    } else {
        $('.pagination .pagination_ul ul li.active').next().click();
        setTimeout('checkData()', 100);
    }
}

function checkData() {
    if (productContainer_first_div == $(productContainer).find('div').eq(0).html()) {
        setTimeout('checkData()', 100);
    } else {
        $(productContainer).prepend(tmp_data_productContainer);
        $('#ajaxblock').remove();
        $(productContainer).css('height', 'auto');
        load = false;
    }
}

function scroll_top_page() {
    $('html, body').animate({scrollTop: 0}, 400, function () {
        $('.arrow-scroll-top').remove();
    });
}

function getproductContainer() {
    if ($('.product-list').length > 0) {
        productContainer = '.product-list';
    } else if ($('.product-grid').length > 0) {
        productContainer = '.product-grid';
    } else {
        productContainer = '.products';
    }
    return productContainer;
}

function addButton(replaced_next) {
    $("#ajaxblock").remove();
    if (replaced_next) $('.pagination .pagination_ul ul li.active').last().next().replaceWith("<li class='active'>" + page + "</li>");
    if (!filter_ajax) {
        if (page > pages.length) return;
    } else {
        if ($('.pagination .pagination_ul ul li.active').next().length == 0) return;
        pages = [];
        $('.pagination .pagination_ul ul li').each(function () {
            href = $(this > a).attr('href');
            if (jQuery.inArray(href, pages) == -1) {
                pages.push(href);
            }
        });
        if ($('.pagination .pagination_ul ul li.active').length) {
            a = location.href;
            var b = a.match(/page=(\d+)/);
            if (b) {
                page = b[1];
            }
        }
        console.log(pages);
        console.log('limit--' + limit);
    }
    console.log('page--' + page);
    console.log('page length--' + pages.length);
    if ($('.total-products').length && page == pages.length) {
        next_count = parseFloat($('.total-products').text()) - limit * page;
    } else if (pages.length == 1) {
        next_count = parseFloat($('.total-products').text()) - limit;
    } else {
        next_count = limit;
    }
    console.log('add to ' + productContainer);
    if (filter_ajax) {
        $(productContainer).after('<div id="button_more_ajax" class="btn-w noborder"><a id="button_more_ajax_href"  class="btn btn-bordered btn-arrowed" onclick="getNextPageMega();">' + text_show_more + '<span></span></a></div>');
    } else {
        $(productContainer).after('<div id="button_more_ajax" class="btn-w noborder"><a id="button_more_ajax_href" onclick="getNextPage();"  class="btn btn-bordered btn-arrowed">' + text_show_more + '<span></span></a></div>');
    }
}

function declOfNum(number, titles) {
    cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

function getNextPageMega() {
    if (load) return;
    if ($('.pagination .pagination_ul ul li.active').next('li').length == 0) return;
    load = true;
    removeButton();
    $(productContainer).append('<div id="ajaxblock" style="height:30px;margin:10px;text-align:center;border:none !important; background:none;"><img src="/image/loading.gif" /></div>');
    var a = $('.pagination .pagination_ul ul li.active').next();
    a = a.find('a').attr("href");
    //var a = $('.pagination .pagination_ul ul li.active').next().attr("href");
    console.log(a);
    var b = a.match(/page=(\d+)/);
    $("#filterpro_page").val(b[1]);
    doFilter(false, true);
}

function removeButton() {
    $("#button_more_ajax").remove();
}

function initProductloader() {
    wh = $(window).height();
    productContainer = getproductContainer();
    if ($(productContainer).length > 0) {
        ct = parseFloat($(productContainer).offset().top);
        filter_ajax = (typeof doFiltergs == 'function') || (typeof doFilter == 'function');
        $('.pagination .pagination_ul ul li a').each(function () {
            href = $(this).attr('href');
            if (jQuery.inArray(href, pages) == -1) {
                pages.push(href);
            }
        });
        if ($('.pagination .pagination_ul ul li.active').length) {
            a = location.href;
            var b = a.match(/page=(\d+)/);
            if (b) {
                page = b[1];
            }
        }
        if (hide_pagenav) $('.pagination').hide();
        limit = $(productContainer + " > div").length;
        if (button_enabled && $('.pagination .pagination_ul ul li.active').next().length) addButton(false);
        $(window).scroll(function () {
            productContainer = getproductContainer();
            ch = $(productContainer).height();
            scroll_t = $(this).scrollTop();
            if (arrow_enabled) {
                if (scroll_t > 100) {
                    if ($('.arrow-scroll-top').length == 0) {
                        $('body').append('<a class="arrow-scroll-top" onclick="scroll_top_page();"></a>')
                    }
                } else {
                    $('.arrow-scroll-top').remove();
                }
            }
            if (ct + ch - wh < (scroll_t + 50) && !button_enabled) {
                getNextPage();
            }
        });

    }
}

$(document).ready(function () {
    initProductloader();
});
var fIID = 0;
var interval = 1;
var $cookie = function () {
};
var container = ".product-{view}";
var history_hash = "";
//price_range =  [39,60,78,99];
jQuery.fn.exists = function () {
    return this.length > 0
}
/**
 * fixs for IE
 */
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (obj, start) {
        for (var i = (start || 0), j = this.length; i < j; i++) {
            if (this[i] === obj) {
                return i;
            }
        }
        return -1;
    }
}

function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/’/g, "&#8217;")
        .replace(/'/g, "&#39;")
        .replace(/`/g, "&#96");
}

String.prototype.hashCode = function(){
    var hash = 0, i, ch;
    if (this.length == 0) return hash;
    for (i = 0; i < this.length; i++) {
        ch = this.charCodeAt(i);
        hash = ((hash<<5)-hash)+ch;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
};


var tag_tmpl = $.template(null, '<tr><td><input id="tag_${tag}" class="filtered" type="checkbox" name="tags[]" value="${tag}" {{if checked}} checked="checked" {{/if}}></td>' +
    '<td><label for="tag_${tag}">${name}</label></td></tr>');
var cat_tmpl = $.template(null, '<tr><td><input id="cat_${category_id}" class="filtered" type="checkbox" name="categories[]" value="${category_id}" {{if checked}} checked="checked" {{/if}}></td>'+
    '<td><label for="cat_${category_id}">${name}</label></td></tr>');



$(document).on("change", ".price_limit", (function () {
    var b = parseFloat($("#min_price").val());
    var a = parseFloat($("#max_price").val());
    console.log('b-' + b + ' a-' + a);
    console.log('slider-range1');
    $("#slider-range").slider("option", "values", [ price_range.indexOf(b), price_range.indexOf(a) ]);


    iF()
}));

function synchronizeImgCheckboxes() {
    $("#filterpro input.filtered[type=\"checkbox\"]").each(function() {
        var $img = $(this).next('img');
        if ($(this).is(":checked")) {
            console.log($(this));
            $(this).parent().addClass("selected");
            $(this).parent().removeClass("selected-empty");
            $('#pic-size #' + $(this).attr('id')).parent().addClass("selected");
        } else {
            $('#pic-size-filter #' + $(this).attr('id')).parent().removeClass("selected");
            $(this).parent().removeClass("selected");
            $('#pic-size-filter #' + $(this).attr('id')).parent().removeClass("selected-empty");
            $(this).parent().removeClass("selected-empty");
        }
        if ($img.length) {
            if ($(this).is(":checked")) {
                $img.addClass("selected");
            } else {
                $img.removeClass("selected");
                $img.removeClass("selected-empty");
            }
        }
    });
}
$(document).on("change", "#filterpro .filtered",(function () {
    iF();//поставить true чтобы не добавлялся хэш
}));

var price_start_min = 0;
var price_start_max = 0;



$(function () {

    $("#slider-range").slider({
        range: true, min: 0, max: (price_range.length - 1), values: [0, 0],
        slide: function (a, b) {
            console.log(b);
            console.log('price_range slide' + price_range[b.values[0]]);
            $("#min_price").val(price_range[b.values[0]]);
            $("#max_price").val(price_range[b.values[1]]);
            $("#min_price2").val(price_range[b.values[0]]);
            $("#max_price2").val(price_range[b.values[1]]);
        },
        stop:function (a, b) {
            iF();
            console.log('price_range stop'+price_range[b.values[1]]);
            if ($("#min_price").val() != price_start_min)
                $("#min_price").addClass('price-active');
            else
                $("#min_price").removeClass('price-active');

            if ($("#max_price").val() != price_start_max)
                $("#max_price").addClass('price-active');
            else
                $("#max_price").removeClass('price-active');

        }
    });

    $("#min_price").val($("#slider-range").slider("values", 0));
    console.log('#min_price set'+$("#slider-range").slider("values", 0));
    $("#max_price").val($("#slider-range").slider("values", 1));
    //$("#min_price2").val($("#slider-range").slider("values", 0));
    //$("#max_price2").val($("#slider-range").slider("values", 1));
    $("input#min_price2").on("change", function () {

        console.log(price_range.indexOf(parseFloat(this.value)));
        if(parseFloat(this.value) > parseFloat($("#showmin").text()) && parseFloat(this.value) <= parseFloat($("input#max_price2").val())) {
            console.log('minimal'+this.value);
            if (!price_range.includes(parseFloat(this.value))) {
                price_range.push(parseFloat(this.value));
                price_range.sort(function (a, b) {
                    return a - b
                });
                // price_range.sort();
            }
            console.log('price_range change ' + price_range);
            $("#min_price").val(parseFloat(this.value));
            console.log('min_price2 change ' + price_range.indexOf(parseFloat(this.value)));
            $("#slider-range").slider("option", {
                min: 0,
                max: price_range.length - 1,
                values: [price_range.indexOf(parseFloat(this.value)), price_range.length - 1]
            });
            // $("#slider-range" ).slider( "values",0, price_range.indexOf(parseFloat(this.value)) );
        }


    });
    $("input#max_price2").on("change", function () {
        console.log('new value5-' + this.value);
        if (parseFloat(this.value) >= $("input#min_price2").val() && parseFloat(this.value) < $("#showmax").text()) {
            if (!price_range.includes(parseFloat(this.value))) {
                price_range.push(parseFloat(this.value));
                price_range.sort(function (a, b) {
                    return a - b
                });
            }
            $("#max_price").val(parseFloat(this.value));
            console.log('max_price2 change ' + price_range.indexOf(parseFloat(this.value)));
            $("#slider-range").slider("option", {min: 0, max: price_range.length - 1});
            $("#slider-range").slider("values", 1, price_range.indexOf(parseFloat(this.value)));
        }
    });

});
function iF(hz,cl) {
    clearTimeout(fIID);
    $("#filterpro_page").val(0);
    if (hz) {
        fIID = setTimeout("doFilter(true,false,true)", interval)
    } else {
        fIID = setTimeout("doFilter(false,false,false)", interval)
    }

}

function success(g, b, p) {
    synchronizeImgCheckboxes();
    console.log('synchronizeImgCheckboxes2');
    var cont = getCont();
    var show_clear = false;
    console.log('show_clear = false');
    console.log(g);
    if (g.result_html) {
        if (p) {
            //$(cont).find('span.clear').remove();

            $(cont).append(g.result_html);
        } else {

            $(cont).html(g.result_html);
        }
        /* if(g.result_html.list && g.result_html.grid){
         $(".product-list").html(g.result_html.list);
         $(".product-grid").html(g.result_html.grid);
         } else {
         $(cont).html(g.result_html);
         }*/
        if (typeof (display) != "undefined") {
            if ($cookie) {
                var view = $cookie("display");
            }
            if (!view) {
                view = "grid";
            }
            display(view ? view : "grid");
        }
        afterload();
    }
    console.log('pagination--'+g.pagination);
    if (g.pagination) {
        $("#showmore").show();
        $(".pagination ").html(g.pagination);
    }
    else
    {
        $("#showmore").hide();
        $(".pagination ").html('');
    }
    if (b && g.min_price == g.max_price) {
        $('.price_slider').parent().hide();
    } else if (!$('.price_slider').parent().is(':visible'))
        $('.price_slider').parent().show();
    var d = parseFloat(g.min_price);
    //var c = Math.ceil(parseFloat(g.max_price));
    var c = parseFloat(g.max_price);

    var m1 = parseFloat(g.min_price);
    //var m2 = Math.ceil(parseFloat(g.max_price));
    var m2 = parseFloat(g.max_price);

    var d2 = parseFloat(g.min_price2);
    //var c2 = Math.ceil(parseFloat(g.max_price2));
    var c2 = parseFloat(g.max_price2);

    //  $("#showmin").text(parseFloat(g.min_price));
    // $("#showmax").text(Math.ceil(parseFloat(g.max_price)));
    if (d2 > 0 || c2 > 0) {
        console.log('new value-' + d2);
        /*$("#slider-range").slider("option", {values:[0, price_range.length-1], slide: function( event, ui ) {
         $( "#min_price2" ).val( price_range[ui.values[0]] );
         $( "#max_price2" ).val( price_range[ui.values[1]] );

         }});*/
        console.log('slider-range3');
        $("#slider-range").slider("option", "values", [price_range.indexOf(d2), price_range.indexOf(c2)]);
        $("#min_price2").val(d2);
        $("#max_price2").val(c2);
        if (d2 != parseFloat($('#showmin').text()) || c2 != parseFloat($('#showmax').text())) {
            show_clear = true;
            console.log('show_clear = true');
            console.log($('.price_slider').parent('.option_box').find('.aclearfilter'));
            // $('.price_slider').parent().find('.aclearfilter').show();
        } else {
            $('.price_slider').parent().find('.aclearfilter').hide();
        }
        console.log('186 d2=' + d2 + ' d=' + $('#showmin').text());
        ////iF();
    } else {
        console.log('new value2-' + c);
        $("#min_price2").val(d);
        $("#max_price2").val(c);
        console.log('slider-range4');
        $("#slider-range").slider("option", "values", [price_range.indexOf(d), price_range.indexOf(c)]);
    }
    if (b) {

        price_start_min = parseFloat(g.min_price);
        // price_start_max = Math.ceil(parseFloat(g.max_price));
        price_start_max = parseFloat(g.max_price);
        console.log('(if (b))');
        console.log('slider-range5');

        $("#slider-range").slider("option", {min: price_range.indexOf(d), max: price_range.indexOf(c)});
        //  $("#slider-range").slider();
        $('#showmin').html(d);
        $('#showmax').html(c);
        console.log($("#min_price").val() + ' - 200');
        if (/*$("#min_price").val()!=0 &&*/ $("#min_price").val() != d) {
            $("#min_price").addClass('price-active');
            //  $("#min_price").val(d);
            //  show_clear = true;
            //$('.price_slider').parent().find('.aclearfilter').show();
            console.log($("#min_price").val() + ' show_clear 183');
        } else {
            $("#min_price").removeClass('price-active');
            $('.price_slider').parent().find('.aclearfilter').hide();
        }

        if (/*$("#max_price").val()!=0 && */$("#max_price").val() != c) {
            $("#max_price").addClass('price-active');
            //  $("#max_price").val(c);
            // show_clear = true;
            // $('.price_slider').parent().find('.aclearfilter').show();
            console.log('show_clear 191');
        } else {
            $("#max_price").removeClass('price-active');
            $('.price_slider').parent().find('.aclearfilter').hide();
        }

        if ($("#max_price").val() >= 1) {
            d = parseFloat($("#min_price").val());
            c = parseFloat($("#max_price").val())
        }
        //  $( "#slider-range" ).slider( "option", "values", [ d, c ] );
        console.log(d + '-' + d2 + '-' + c + '-' + c2);
        if ((!d2 && !c2) || (d == d2 && c == c2)) {
            console.log('(!d2  && !c2)||(d==d2  && c==c2)');
            console.log('slider-range6');
            $("#slider-range").slider("option", "values", [price_range.indexOf(d), price_range.indexOf(c)]);
        } else {
            console.log(d + '-' + d2 + '-' + c + '-' + c2);
        }
        $("#min_price").val(d);
        $("#max_price").val(c);

    }
    /* if ($("#max_price").val() >= 1) {
     d = parseFloat($("#min_price").val());
     c = parseFloat($("#max_price").val())
     }*/
    /*$("#slider-range").slider("option", {values:[d, c],step:1});

     $("#min_price").val(d);
     $("#showmin").text(d);
     $("#max_price").val(c);
     $("#showmax").text(c);
     */


    if (g.totals_data) {
        // console.log('totals_special'+g.totals_data);
        if (g.totals_data.tags.length) {
            $('#filter_tags').html('');
            $.tmpl(tag_tmpl, g.totals_data.tags).appendTo('#filter_tags');
            $('#filter_tags').parents('.option_box').show();
        } else {
            $('#filter_tags').parents('.option_box').hide();
        }
        if (g.totals_data.product_total) {
            $(".h1-count > span").html(g.totals_data.product_total);
            $("#m_clear_filter a.show_results span").html(g.totals_data.product_total);
        }
        //   console.log(g.totals_data.product_total);
        $('#filter_categories').html('');
        if (g.totals_data.categories.length) {
            $.tmpl(cat_tmpl, g.totals_data.categories).appendTo('#filter_categories');
            $('#filter_categories').parents('.option_box').show();
        } else {
            $('#filter_categories').parents('.option_box').hide();
        }
        if (g.totals_data.totals_special > 0) { //alert(g.totals_data.totals_special);
            // $.tmpl(cat_tmpl, g.totals_data.categories).appendTo('#filter_categories');
            $('#filer_special').parents('.ramka').show();
        } else {
            $('#filer_special').parents('.ramka').hide();
        }
        //alert(g.totals_data.totals_cost_day2);
        if (g.totals_data.totals_cost_day2 > 0) { //alert(g.totals_data.totals_cost_day2);
            // $.tmpl(cat_tmpl, g.totals_data.categories).appendTo('#filter_categories');
            /* $('#filter_latest').parent().removeClass('disabled');
             $('#filter_latest').removeAttr("disabled");*/
            $('#filter_latest').parent().show();

        } else {
            /*$('#filter_latest').parent().addClass('disabled');
             $('#filter_latest').attr("disabled", "disabled");*/
            $('#filter_latest').parent().hide();
        }

        if (g.totals_data.totals_available > 0) { //alert(g.totals_data.totals_available);
            // $.tmpl(cat_tmpl, g.totals_data.categories).appendTo('#filter_categories');
            $('#filter_available').parent().removeClass('disabled');
            $('#filter_available').removeAttr("disabled");
            $('.checkbox-available').show();
            /*if ($('#filter_available').is(":checked")){
             $('#instock').parent().addClass('disabled');
             $('#instock').attr("disabled", "disabled");
             $('.checkbox-instock').hide();
             }
             else {
             $('#instock').parent().removeClass('disabled');
             $('#instock').removeAttr("disabled");
             $('.checkbox-instock').show();
             }*/
        } else {
            $('#filter_available').parent().addClass('disabled');
            $('#filter_available').attr("disabled", "disabled");
            $('.checkbox-available').hide();
            /*if (!$('#instock').is(":checked")) {
             $('#instock').parent().addClass('disabled');
             $('#instock').attr("disabled", "disabled");
             $('.checkbox-instock').hide();
             }*/
        }
        if (g.totals_data.totals_instock > 0) { //alert(g.totals_data.totals_available);
            // $.tmpl(cat_tmpl, g.totals_data.categories).appendTo('#filter_categories');

            $('#instock').parent().removeClass('disabled');
            $('#instock').removeAttr("disabled");
            $('.checkbox-instock').show();
            /*if ($('#filter_available').is(":checked")){
             $('#instock').parent().addClass('disabled');
             $('#instock').attr("disabled", "disabled");
             $('.checkbox-instock').hide();
             }
             else {
             $('#instock').parent().removeClass('disabled');
             $('#instock').removeAttr("disabled");
             $('.checkbox-instock').show();
             }*/
        } else {
            $('#instock').parent().addClass('disabled');
            $('#instock').attr("disabled", "disabled");
            $('.checkbox-instock').hide();
        }
        hide_options = g.hide_options;
        var atts = {};
        $.each(g.totals_data.attributes, function (k, v) {
            atts[(v.id + "_" + v.text).replace(/\s/g, '_')] = v.t;
        });

        $('.a_name').each(function (k, v) {
            var at_v_i = $(v).attr('at_v_i').replace(/\s/g, '_');
            var at_v_i_e = escapeHtml(at_v_i);

            if (atts[at_v_i]) {
                if($('[at_v_t="' + at_v_i_e + '"]').data('type')!='brush')
                    $('[at_v_t="' + at_v_i_e + '"]').html($('[at_v_t="' + at_v_i_e + '"]').attr('data-value') + " <span>" + atts[at_v_i] + "</span>");

                /* if(hide_options)
                 $(v).show();*/

                $('[at_v_t="' + at_v_i_e + '"]').parent().attr('data', atts[at_v_i]);
                $('[at_v_t="' + at_v_i_e + '"]').parent().removeClass('disabled');
                $(v).removeAttr("disabled");
                if (hide_options)
                    $('[at_v_t="' + at_v_i_e + '"]').parent().show();
            } else if ($(v).is(":checked")) {
                // $('[at_v_t="' + at_v_i_e + '"]').parent().attr('data','0');
                $('[at_v_t="' + at_v_i_e + '"]').parent().addClass('selected-empty');
                $('[at_v_t="' + at_v_i_e + '"]').parent().removeClass('selected');
                //if (!$(v).is(":checked"))
                if($('[at_v_t="' + at_v_i_e + '"]').data('type')!='brush')
                    $('[at_v_t="' + at_v_i_e + '"]').html($('[at_v_t="' + at_v_i_e + '"]').attr('data-value') + " <span>0</span>");

            } else {
                $('[at_v_t="' + at_v_i_e + '"]').parent().attr('data', '0');
                $('[at_v_t="' + at_v_i_e + '"]').parent().addClass('disabled');
                $(v).attr("disabled", "disabled");
                if (hide_options)
                    $('[at_v_t="' + at_v_i_e + '"]').parent().hide();
                $('[at_v_t="' + at_v_i_e + '"]').parent().removeClass('selected');
                $('[at_v_t="' + at_v_i_e + '"]').parent().removeClass('selected-empty');
                if($('[at_v_t="' + at_v_i_e + '"]').data('type')!='brush')
                    $('[at_v_t="' + at_v_i_e + '"]').html($('[at_v_t="' + at_v_i_e + '"]').attr('data-value'));

                if (hide_options)
                    $(v).hide();
                $(v).removeAttr('checked');
                $(v).removeAttr(':selected');
            }
        });
        var x = 0;
        $('.option_box').each(function (k, v) {
            if (hide_options)
                if ($(this).find('.a_name').is(':enabled')) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            if ($(this).find('.a_name').is(':checked') || $(this).find('.manufacturer_value').is(':checked') || $(this).find('.painter_value').is(':checked') || $(this).find('#filter_available').is(':checked') || $(this).find('#instock').is(':checked')) {
                $(this).find('.aclearfilter').show();
                show_clear = true;
                console.log('show_clear = true');
                x = 1;
            } else {
                /*  if($(this).find($('.price_slider')).length){

                 } else*/
                $(this).find('.aclearfilter').hide();
                //$('#clear_filter').hide();

            }
        });
        //отключил сортировку по размеру картин т.к. глючило при бэк хистори
        /*$('.pict-size-block').each(function (k, v) {
         var elements = $(v).find('.pict-size-w');
         var target = $(v);

         elements.sort(function (a, b) {
         console.log('ELEME - ');
         $(a).remove();
         var an = parseFloat($(a).attr('data')),
         bn = parseFloat($(b).attr('data')),
         at = $(a).find('input').prop('value').toLowerCase().replace("/","").replace(",",""),
         bt = $(b).find('input').prop('value').toLowerCase().replace("/","").replace(",","");

         if ((an && bn) || (an == bn)) {


         if ($.isNumeric(at) && $.isNumeric(bt)) {
         return parseFloat(at) - parseFloat(bt);
         } else {
         return at.localeCompare(bt);
         }
         }  else {
         if (bn == 0) return -1;
         if (an == 0) return 1;
         }
         return 0;
         });

         elements.detach().appendTo(target);
         });*/

        $('.attribute_box > .collapsible > #wn2 > #lyr2').each(function (k1, v1) {
            var elements1 = $(v1).find('.pict-size');
            var target1 = $(v1);

            elements1.sort(function (a1, b1) {
                var an1 = parseFloat($(a1).attr('data')),
                    bn1 = parseFloat($(b1).attr('data')),
                    at1 = $(a1).find('input').prop('value').toLowerCase().replace("/", "").replace(",", ""),
                    bt1 = $(b1).find('input').prop('value').toLowerCase().replace("/", "").replace(",", "");
                // alert($(a1).find('input').val());
                if ((an1 && bn1) || (an1 == bn1)) {


                    if ($.isNumeric(at1) && $.isNumeric(bt1)) {
                        return parseFloat(at1) - parseFloat(bt1);
                    } else {
                        return at1.localeCompare(bt1);
                        //return at1 > bt1;
                    }
                } else {
                    if (bn1 == 0) return -1;
                    if (an1 == 0) return 1;
                }
                return 0;
            });

            elements1.detach().appendTo(target1);
        });
        $('#pic-size3 .attribute_box  .collapsible').each(function (k, v) {
            var elements = $(v).find('.pict-size');
            var target = $(v);

            elements.sort(function (a, b) {
                var an = parseFloat($(a).attr('data')),
                    bn = parseFloat($(b).attr('data')),
                    at = $(a).find('input').prop('value').toLowerCase().replace("/", "").replace(",", ""),
                    bt = $(b).find('input').prop('value').toLowerCase().replace("/", "").replace(",", "");

                if ((an && bn) || (an == bn)) {


                    if ($.isNumeric(at) && $.isNumeric(bt)) {
                        return parseFloat(at) - parseFloat(bt);
                    } else {
                        return at.localeCompare(bt);
                    }
                } else {
                    if (bn == 0) return -1;
                    if (an == 0) return 1;
                }
                return 0;
            });

            elements.detach().appendTo(target);
        });

        $('#manufacturer-box .table-manufactur').each(function (k, v) {
            var elements = $(v).find('tr');
            var target = $(v);

            elements.sort(function (a, b) {
                var an = parseFloat($(a).find('td > .pict-size').attr('data')),
                    bn = parseFloat($(b).find('td > .pict-size').attr('data')),
                    at = $(a).find('td > .pict-size input').prop('value').toLowerCase().replace("/", "").replace(",", ""),
                    bt = $(b).find('td > .pict-size input').prop('value').toLowerCase().replace("/", "").replace(",", "");

                if ((an && bn) || (an == bn)) {


                    if ($.isNumeric(at) && $.isNumeric(bt)) {
                        return parseFloat(at) - parseFloat(bt);
                    } else {
                        return at > bt;
                    }
                } else {
                    if (bn == 0) return -1;
                    if (an == 0) return 1;
                }
                return 0;
            });

            elements.detach().appendTo(target);
        });

        $('.attribute_box > .collapsible > .table-pict-size').each(function (k, v) {
            var elements = $(v).find('tr');
            var target = $(v);

            elements.sort(function (a, b) {
                var an = parseFloat($(a).find('td > .pict-size').attr('data')),
                    bn = parseFloat($(b).find('td > .pict-size').attr('data')),
                    at = $(a).find('td > .pict-size input').prop('value').toLowerCase().replace("/","").replace(",",""),
                    bt = $(b).find('td > .pict-size input').prop('value').toLowerCase().replace("/","").replace(",","");

                if ((an && bn) || (an == bn)) {


                    if ($.isNumeric(at) && $.isNumeric(bt)) {
                        return parseFloat(at) - parseFloat(bt);
                    } else {
                        return at > bt;
                    }
                } else {
                    if (bn == 0) return -1;
                    if (an == 0) return 1;
                }
                return 0;
            });

            elements.detach().appendTo(target);
        });
        /* if (x)
         $('#clear_filter').show();
         else
         $('#clear_filter').hide();*/

        if ($('#instock').is(':checked')) {
            $('label[for=instock]').addClass('selected');
            // $('#clear_filter').show();
            $('.checkbox-instock').addClass('selected');
            show_clear = true;
        } else {
            $('label[for=instock]').removeClass('selected');
            $('.checkbox-instock').removeClass('selected');
            // $('#clear_filter').hide();
        }

        if ($('#filer_special').is(':checked')) {
            $('.option_box .ramka').find('label').removeClass('selected');
            $('label[for=filer_special]').addClass('selected');
            // $('#clear_filter').show();
            show_clear = true;
        } else {
            $('label[for=filer_special]').removeClass('selected');
            // $('#clear_filter').hide();
        }
        if ($('#filter_latest').is(':checked')) {
            $('label[for=filter_latest]').addClass('selected');
            // $('#clear_filter').show();
            show_clear = true;
        } else {
            $('label[for=filter_latest]').removeClass('selected');
            // $('#clear_filter').hide();
        }
        if ($('#filter_available').is(':checked')) {
            $('label[for=filter_latest]').addClass('selected');
            $('.checkbox-available').addClass('selected');
            // $('#clear_filter').show();
            show_clear = true;
        } else {
            $('label[for=filter_latest]').removeClass('selected');
            $('.checkbox-available').removeClass('selected');
            // $('#clear_filter').hide();
        }
        if ($('#filer_ucenka').is(':checked')) {
            $('label[for=filer_ucenka]').addClass('selected');
            // $('#clear_filter').show();
            show_clear = true;
        } else {
            $('label[for=filer_ucenka]').removeClass('selected');
            // $('#clear_filter').hide();
        }

        var h = [];
        $.each(g.totals_data.manufacturers, function (f, k) {
            if (k.id) {
                h[h.length] = k.id;
                var j = $("#manufacturer_" + k.id);
                if (j.length == 0) {
                    return;
                }
                j.removeAttr("disabled");
                if (j.get(0).tagName == "OPTION") {
                    j.text($("#m_" + k.id).val() + " (" + k.t + ")")
                } else {
                    $('label[for="manufacturer_' + k.id + '"]').html($("#m_" + k.id).val() + " <span>" + k.t + "</span>");
                    $('label[for="manufacturer_' + k.id + '"]').parent().removeClass('disabled');
                }
            }
        });
        $(".manufacturer_value").each(function (f, k) {
            var j = $(this);
            var l = j.attr("id").match(/manufacturer_(\d+)/);
            if ($.inArray(l[1], h) < 0) {
                j.attr("disabled", "disabled");
                if (this.tagName == "OPTION") {
                    j.text($("#m_" + l[1]).val());
                    j.prop("selected", false)
                } else {
                    $('label[for="manufacturer_' + l[1] + '"]').text($("#m_" + l[1]).val());
                    $('label[for="manufacturer_' + l[1] + '"]').parent().addClass('disabled');
                    j.prop("checked", false)
                }
            }
        });
        var ar = [];
        $.each(g.totals_data.painters, function (f, k) {
            if (k.id) {
                ar[ar.length] = k.id;
                var j = $("#painter_" + k.id);
                if (j.length == 0) {
                    return;
                }
                j.removeAttr("disabled");
                if (j.get(0).tagName == "OPTION") {
                    j.text($("#art_" + k.id).val() + " (" + k.t + ")")
                } else {
                    $('label[for="painter_' + k.id + '"]').html($("#art_" + k.id).val() + " <span>" + k.t + "</span>");
                    $('label[for="painter_' + k.id + '"]').parent().removeClass('disabled');
                }
            }
        });
        $(".painter_value").each(function (f, k) {
            var j = $(this);
            var l = j.attr("id").match(/painter_(\d+)/);
            if ($.inArray(l[1], ar) < 0) {
                j.attr("disabled", "disabled");
                if (this.tagName == "OPTION") {
                    j.text($("#art_" + l[1]).val());
                    j.prop("selected", false)
                } else {
                    $('label[for="painter_' + l[1] + '"]').text($("#art_" + l[1]).val());
                    $('label[for="painter_' + l[1] + '"]').parent().addClass('disabled');
                    j.prop("checked", false)
                }
            }
        });
        var e = [];
        $.each(g.totals_data.options, function (j, k) {
            if (k.id) {
                e[e.length] = k.id;
                var f = $("#option_value_" + k.id);
                if (f.exists()) {
                    f.removeAttr("disabled");
                    if (f.get(0).tagName == "OPTION") {
                        f.text($("#o_" + k.id).val() + " (" + k.t + ")")
                    } else {
                        if($('label[for="option_value_' + k.id + '"]').data('type')!='brush')
                            $('label[for="option_value_' + k.id + '"]').html($("#o_" + k.id).val() + " <span>" + k.t + "</span>")
                    }
                }
            }
        });
        $(".option_value").each(function (j, k) {
            var f = $(this);
            var l = f.attr("id").match(/option_value_(\d+)/);
            if ($.inArray(l[1], e) < 0) {
                f.prop("checked", false);
                f.attr("disabled", "disabled");
                if (hide_options) {
                    f.parent().hide();
                    f.parents('.option_box').hide();
                    console.log('qwertyui' + f.attr("id"));
                }
                if (this.tagName == "OPTION") {
                    f.text($("#o_" + l[1]).val());
                    f.attr("selected", false)
                } else {
                    $('label[for="option_value_' + l[1] + '"]').text($("#o_" + l[1]).val());
                    f.attr("checked", false);
                    f.prop("checked", false);
                }
            }
        });
        $('#filterpro ul.box-filter .filtered').each(function (j, k) {
            var f = $(this);
            var l = f.attr("id").match(/filter(\d+)/);
            if ($.inArray(l[1], e) < 0) {
                f.prop("checked", false);
                f.attr("disabled", "disabled");
                if (hide_options) {
                    f.parent().hide();
                }
            }
        });
        var min_max = [];
        $.each(g.totals_data.attr_slider, function (k, v) {

            if ($("#attribute_value_" + k + "_min_start").val() == $("#attribute_value_" + k + "_min").val()
                && $("#attribute_value_" + k + "_max_start").val() == $("#attribute_value_" + k + "_max").val()) {
                $("#attribute_value_" + k + "_min").val('');
                $("#attribute_value_" + k + "_max").val('');
            }

            console.log($("#attribute_value_" + k + "_min_start").val() + '+++++' + $("#attribute_value_" + k + "_min").val())
            console.log($("#attribute_value_" + k + "_max_start").val() + '+++++' + $("#attribute_value_" + k + "_max").val())
            if (!$("#attribute_value_" + k + "_min").val() && !$("#attribute_value_" + k + "_max").val()) {
                $this = $("#attribute_label_" + k + "_min").closest('.option_box');
                $this.find('.aclearfilter').hide();
                console.log('aclearfilter--12312123');
                // show_clear = false;
            } else if ($("#attribute_value_" + k + "_min_start").val() != $("#attribute_value_" + k + "_min").val()
                || $("#attribute_value_" + k + "_max_start").val() != $("#attribute_value_" + k + "_max").val()) {
                $this = $("#attribute_label_" + k + "_min").closest('.option_box');
                $this.find('.aclearfilter').show();
                show_clear = true;
                console.log('show_clear = true');
                console.log('aclearfilter12312123');
            } else {

                $this = $("#attribute_label_" + k + "_min").closest('.option_box');
                $this.find('.aclearfilter').hide();
                show_clear = false;
                console.log('show_clear = false');
            }

            //остается на своем месте даже если нет
            if ((($("#attribute_value_"+k+"_min_start").val() == $("#attribute_label_"+k+"_min").val()
                && $("#attribute_value_"+k+"_max_start").val()== $("#attribute_label_"+k+"_max").val())
                && $("#attribute_value_"+k+"_min").val()=='' && $("#attribute_value_"+k+"_max").val()=='')
                ||( $("#attribute_value_"+k+"_min").val()=='' && $("#attribute_value_"+k+"_max").val()=='')
                /*||($("#attribute_value_"+k+"_min").val() < v[0] || $("#attribute_value_"+k+"_max").val() > v[v.length -1])*/ ){

                //отскакивает назад если нет
                /*if (($("#attribute_value_"+k+"_min_start").val() == $("#attribute_label_"+k+"_min").text()
                 && $("#attribute_value_"+k+"_max_start").val()== $("#attribute_label_"+k+"_max").text())
                 ||($("#attribute_value_"+k+"_min").val()=='' && $("#attribute_value_"+k+"_max").val()=='')
                 ||($("#attribute_value_"+k+"_min").val() < v[0] || $("#attribute_value_"+k+"_max").val() > v[v.length -1])){*/

                hs = $("#slider-range-" + k).slider();
                var arr = window['attr_arr_' + k];
                window["max" + k] = v[v.length - 1];
                window["min" + k] = v[0];
                b = arr.indexOf(v[v.length - 1]);
                a = arr.indexOf(v[0]);
                $("#slider-range-" + k).slider("option", {values: [a, b]});
                if (v[0] == '' || v[0] == 0)
                    $("#attribute_label_" + k + "_min").val('-');
                else
                    $("#attribute_label_" + k + "_min").val(v[0]);
                $("#attribute_label_" + k + "_max").val(v[v.length - 1]);
            }
        });
    }
//stickyFilterObject.fix().trigger().scroll();//stickyFilter();
    addFadedtoName();
    if (show_clear) {
        $('#clear_filter').show();
        $('#m_clear_filter').addClass('active');
        $('#m-filter-button').addClass('active');
        console.log('clear_filter show');
    } else {
        $('#clear_filter').hide();
        $('#m_clear_filter').removeClass('active');
        $('#m-filter-button').removeClass('active');
        console.log('clear_filter hide');
    }
    $('.tooltipstered').tooltipster();
}


function addFadedtoName() {
    $(".products .item").each(function () {
        if ($(this).find(".name a").height() > 41) {
            $(this).find(".name").addClass("faded");
        }
    });
};

function getCont() {
    if ($cookie) {
        var view = $cookie("display");
    }
    if (!view) {
        view = "grid";
    }
    var cont = container.replace('{view}', view);
    if (!$(cont).exists()) {
        cont = container.replace('{view}', 'grid');
    }
    return cont;
}

var cache = [];
function doFilter(b,p,cl) {
    var a = $("#filterpro").serialize().replace(/[^&]+=\.?(?:&|$)/g, "").replace(/&+$/, "").replace(/&+$/, "");

    a = decodeURIComponent(a);
    a = a.replace(/&apos;/g, '\'');
    if (!b) {
        window.location.hash = history_hash = a
    }
    doFilter2(b, a, p);
}

function doFilter2(b, a, p) {
    var h = a.hashCode();
    if (cache[h]){
        removeButton();
        success(cache[h],false,p);
        //for ajaxload
        addButton(false);
        load = false;
    } else {
        var cont = getCont();
        //$('#filterpro_box').mask();
        /* $(".filterpro, #pic-size-filter").mask();*/
        removeButton();
        console.log('data:'+a);
        $.ajax({url:"index.php?route=module/filterpro/getproducts", type:"POST", data:a + (b ? "&getPriceLimits=true" : ""), dataType:"json",
            success:function (g) {
                success(g, b, p);
                cache[h] = g;
                var cont = getCont();
                //  $('#filterpro_box').unmask();
                /*    $(".filterpro, #pic-size-filter").unmask();*/
                addButton(false);
                // alert(3);
                load = false;
            },
            error:function(jqXHR, textStatus, errorThrown) {
                var cont = getCont();
                /* $(cont).loadunmask();
                 $(".filterpro, #pic-size-filter").loadunmask();*/
            }
        });
    }
}
$(document).ready(function () {
    if ($('#filterpro_container').exists()) {
        container = $('#filterpro_container').val();
    }
    hide_options = $('#filterpro_hide_options').val();
    if ($.totalStorage != undefined && $.totalStorage('display') != null) {
        $cookie = $.totalStorage;
    } else if ($.cookie != undefined && $.cookie('display') != null) {
        $cookie = $.cookie;
    }

    $(".option_box .option_name").click(function (e) {
        let div = $(".aclearfilter"); // тут указываем ID элемента
        if (!div.is(e.target) && div.has(e.target).length === 0) {
            $(this).siblings(".collapsible").toggle();
            $(this).toggleClass("hided");
            $(this).parent().toggleClass("hided");
        }
    });


    $(".view-toggle").click(function () {
        $(this).siblings('.hide-att').toggle();
        $(this).html($(this).siblings('.hide-att').is(':visible') ? '<span>UKRYJ</span>' : '<span>PokaĹź wszystkie</span>');
        $(this).toggleClass("hided");
    });
    $(".option_box .attribute_group_name").click(function () {
        $(this).siblings(".attribute_box").toggle();
        $(this).toggleClass("hided")
    });

    $(".clear_filter").click(function () {
        clear_filter();
        iF(true);
    });



    function clear_filter() {
        $("#filterpro img").removeClass("selected");
        $("#filterpro select").val("");
        $("#filterpro input").each(function () {

            if ($(this).is(":checked")) {
                $(this).attr("checked", false);
                $(this).prop("checked", false);
            }
        });

        var b = price_range[0];
        var a = price_range[price_range.length - 1];
        console.log('clear price_range' + price_range);
        console.log('clear b' + b);
        console.log('clear a' + a);
        $("#min_price").val(b);
        $("#max_price").val(a);
        $("#min_price2").val(b);
        $("#max_price2").val(a);
        // $("#slider-range").slider("option", {min: 0, max: price_range.length - 1, values: [0, price_range.length - 1]});
        $("#min_price").val(b);
        $("#max_price").val(a);
        if ($("#min_price2").val() <= 0)
            $("#min_price2").val(b);
        if ($("#max_price2").val() <= 0)
            $("#max_price2").val(a);


        $("div[id^=slider-range-]").each(function (index, element) {
            var id = this.id.replace(/[^\d]/g, '');

            var b = $(element).slider("option", "min");
            var a = $(element).slider("option", "max");

            hs = $(element).slider();
            hs.slider("option", {values: [b, a]});
            hs.slider("option", "slide").call(hs, null, {handle: $(".ui-slider-handle", hs), values: [b, a]});

            $("#attribute_value_" + id + "_min").val('');
            $("#attribute_value_" + id + "_max").val('');
        });
        var u = new Url();

        var ur = u.path;
        window.history.pushState('', 'Title', ur);

        iF(true,true);
        /*$('#clear_filter_button').hide();*/
    }

    /*$('.aclearfilter').live('click', function(e) {
     e.stopPropagation();
     clear_filter_box($(this));
     //iF();
     });*/

    $(".aclearfilter").click(function (e) {
        e.preventDefault();
        clear_filter_box($(this).parent().parent().parent('.option_box'));
        iF();
    });


    $('body').on('click', '.pseudolabel', function () {
        let itemId = $(this).attr('data-input');
        let $cb = $('input#'+itemId);

        if(!($cb.attr("disabled"))){

            $cb.prop("checked", !$cb.prop("checked"));
            iF();
            if(!$cb.prop("checked")){
                $(this).removeClass("sChecked");
            } else {
                $(this).addClass("sChecked");

            }

        } else {
            $(this).removeClass("sChecked");
        }
    });



    function clear_filter_box(f) {
        f.find("img").removeClass("selected");
        f.find("select").val("");
        f.find(":input").each(function () {
            if ($(this).is(":checked")) {
                $(this).attr("checked", false);
                $(this).prop("checked", false);
            }
        });
        var b = price_range[0];
        var a = price_range[price_range.length - 1];
        // $("#slider-range").slider("option", "values", [ price_range.indexOf(b), price_range.indexOf(a) ]);
        $("#slider-range").slider("option", {min: 0, max: price_range.length - 1, values: [0, price_range.length - 1]});
        $("#min_price").val(b);
        $("#max_price").val(a);
        if ($("#min_price2").val() <= 0)
            $("#min_price2").val(b);
        if ($("#max_price2").val() <= 0)
            $("#max_price2").val(a);
        $("div[id^=slider-range-]").each(function (index, element) {
            var id = this.id.replace(/[^\d]/g, '');

            var b = $(element).slider("option", "min");
            var a = $(element).slider("option", "max");

            hs = $(element).slider();
            hs.slider("option", {values: [b, a]});
            hs.slider("option", "slide").call(hs, null, {handle: $(".ui-slider-handle", hs), values: [b, a]});

            $("#attribute_value_" + id + "_min").val('');
            $("#attrsign_" + id + "_min").val('');
            $("#attribute_value_" + id + "_max").val('');
            $("#attrsign_" + id + "_max").val('');
        });


    }

    $(document).on("click",".pagination a", (function () {
        var a = $(this).attr("href");
        var b = a.match(/page=(\d+)/);
        if (b==null) {
            var b = [];
            b[1] = 1;
        }
        $("#filterpro_page").val(b[1]);

        var u = new Url();
        u.query.page = b[1];    // изменим значение параметра foo в QueryString
        var state = { 'page': b[1]};
        if (b[1]!=1)
            var ur = u.path+'?page='+b[1];
        else
            var ur = u.path;
        window.history.pushState(state, 'Title', ur);
        doFilter(false,false,false);
        var cont = getCont();
        $('html, body').animate({ scrollTop: $(cont).offset().top-210 }, 'slow');
        return false;
    }));

    // $(".sort a").click(function (event) {
    $(".category_sort li").click(function (event) {


        event.preventDefault();
        /*if ($(this).parent().isClass('selected'))
         return;*/
        var d = $(this).data('value');
        var a = gUV(d, "sort");
        var b = gUV(d, "order");

        $(".sort li").removeClass('selected');
        $(".sort a span").remove();
        $(this).parent().addClass('selected');

        $(this).append('<span class="' + b + '"></span>');

        /*if (b=="ASC") {
         d = d.replace("ASC","DESC");
         }
         if (b=="DESC") {
         d = d.replace("DESC","ASC");
         }*/
        // $(this).attr('href', d);
        $("#filterpro_sort").val(a);
        $("#filterpro_order").val(b);
        iF();
    });

    $(".sort em span label").click(function (event) {
        b = $(this).attr('data');
        d = $(this).parents('em').prev().attr('href');
        /*if (b=="ASC") {
         d = d.replace("DESC","ASC");
         }
         if (b=="DESC") {
         d = d.replace("ASC","DESC");
         }*/
        $(this).parents('em').prev().attr('href', d);
        $(this).parents('em').prev().click();
    });

    if ($(".limit select").exists()) {
        $(".limit select").get(0).onchange = null;
        $(".limit select").change(function () {
            $("#filterpro_limit").val(gUV($(this).val(), "limit"));
            // //iF(true)
        });
    }

// deserialize
    var hash = window.location.hash.substr(1);

    $(document).on('click', '.checkbox-instock', function () {

        if ($("#instock").is(':checked')) {
            $('.checkbox-instock').removeClass('selected');
            $('#instock').click();
        } else {
            $('.checkbox-instock').addClass('selected');
            $('#instock').click();
            $("#instock").attr("checked", "checked");
        }
    });

    $(document).on('click', '.checkbox-available', function () {

        if ($("#filter_available").is(':checked')) {
            $('.checkbox-available').removeClass('selected');
            $('#filter_available').click();
        } else {
            $('.checkbox-available').addClass('selected');
            $('#filter_available').click();
            $("#filter_available").attr("checked", "checked");
        }
    });
    history_hash = hash;

    d = parseFloat($("#min_price").val());
    c = parseFloat($("#max_price").val());
    console.log('slider-range7');
    // $("#slider-range").slider("option", {min:1, max:2});
    $("#slider-range").slider("option", {min: price_range.indexOf(d), max: price_range.indexOf(c)});

    // $("#filterpro").deserialize(hash);

    if (hash && $('instock').is(':visible') && $('instock').is(':checked')) {
        $('instock').attr("checked", false);
        $('instock').prop("checked", false);
    }
    $("#filterpro").deserialize(hash);
    if (hash) {
        $("#filterpro_page").val(); // ПОКА НЕ УБРАЛ $("#filterpro_page").val(1); ВСЕГДА НА ПЕРВУЮ ПОРЕКИДЫВАЛА
    }
    synchronizeImgCheckboxes();
    console.log('synchronizeImgCheckboxes1');
    $("#instock").bind("click", function () {
        if ($('#filter_available').is(':checked')){
            $('#filter_available').attr("checked", false);
            $('#filter_available').prop("checked", false);}
    });
    $("#filter_available").bind("click", function () {
        if ($('#instock').is(':checked')){
            $('#instock').attr("checked", false);
            $('#instock').prop("checked", false);}
    });

    $("#filterpro img").bind("click", function () {
        var $input = $(this).prev("input");
        if ($input.attr("disabled")) {
            return;
        }

        $(this).toggleClass("selected");
        $input.prop('checked', !$input.prop('checked'));

        iF(); //поставить true чтобы не добавлялся хэш
    });

    $(document).on("click","#pic-size-filter img", function () {
        var $input = $(this).prev("input");
        if ($input.attr("disabled")) {
            return;
        }
        $(this).toggleClass("selected");
        $input.prop('checked', !$input.prop('checked'));
        if ($('#instock').is(':checked')){
            $('#filter_available').attr("checked", false);
            $('#filter_available').prop("checked", false);}
        if ($('#filter_available').is(':checked')){
            $('#instock').attr("checked", false);
            $('#instock').prop("checked", false);}
        iF();
    });


    $("div[id^=slider-range-]").each(function (index, element) {
        var id = this.id.replace(/[^\d]/g, '');
        var arr = window['attr_arr_' + id];

        var b = parseFloat($("#attribute_value_" + id + "_min").val());
        var a = parseFloat($("#attribute_value_" + id + "_max").val());
        b = arr.indexOf(b);
        a = arr.indexOf(a);

        if (a >= 0 && b >= 0) {
            hs = $(element).slider();
            hs.slider("option", {values: [b, a]});
            hs.slider("option", "slide").call(hs, null, {handle: $(".ui-slider-handle", hs), values: [b, a]});
        }
    });

    if ($(".category_sort li").length) {
        if ($("#filterpro_sort").val()) {
            $(".category_sort li").each(function (i, e) {
                if (gUV($(this).data('value'), "sort") == $("#filterpro_sort").val() && gUV($(this).data('value'), "order") == $("#filterpro_order").val()) {
                    //&& gUV($(this).val(), "order") == $("#filterpro_order").val()
                    $(".category_sort li").removeClass('selected');
                    // $(".sort a span").remove();
                    $(this).addClass('selected');
                    jQuery(".nice-select .current").html($(this).find('div').text() + "<i class='top-contact__list__input_arrow sprite-arr-down'></i>");
                    //$(this).append('<span class="' + $("#filterpro_order").val() + '"></span>');
                    var d = $(this).data('value');
                    var b = $("#filterpro_order").val();
                    /*if (b=="ASC") {
                     d = d.replace("ASC","DESC");
                     }
                     if (b=="DESC") {
                     d = d.replace("DESC","ASC");
                     }*/
                    $(this).data('value', d);
                    return;
                }
            });
        } else {
            $val = $(".sort select").val();
            $("#filterpro_sort").val(gUV($val, "sort"));
            $("#filterpro_order").val(gUV($val, "order"))
        }
    }
    if ($(".limit select").exists()) {
        if ($("#filterpro_limit").val()) {
            $(".limit select option").each(function (i, e) {
                if (gUV($(this).val(), "limit") == $("#filterpro_limit").val()) {
                    $(this).attr('selected', 'selected');
                    return;
                }
            });
        } else {
            $("#filterpro_limit").val(gUV($(".limit select").val(), "limit"));
        }
    }
    doFilter(true,false,true);

    window.onpopstate = function (e) {
        var hash = window.location.hash.substr(1);
        if (hash != history_hash) {
            clear_filter();
            console.log('clear_filter');
            $("#filterpro").deserialize(hash);

            window_hash = false;
            doFilter2(false, hash ? hash : decodeURIComponent($("#filterpro").serialize().replace(/[^&]+=\.?(?:&|$)/g, "").replace(/&+$/, "")));
            history_hash = hash;
            window_hash = true;
        }
    }

    /*    function init_dw_Scroll() {
     // Initialize scroll area
     // arguments: id of scroll area div, id of content div
     if ($("#wn1").length > 0) {
     var wndo1 = new dw_scrollObj('wn1', 'lyr1');
     wndo1.buildScrollControls('scrollbar1', 'v', 'mouseover', true);
     }
     if ($("#wn2").length > 0) {
     var wndo2 = new dw_scrollObj('wn2', 'lyr2');
     wndo2.buildScrollControls('scrollbar2', 'v', 'mouseover', true);
     }

     }*/

    /*    if (dw_scrollObj.isSupported()) {
     // include with link tag when using domReady
     //dw_Util.writeStyleSheet('css/vert.css');
     //dw_Event.add( window, 'load', init_dw_Scroll);

     // flash ads w/o 'polite load' GREATLY delay onload event
     dw_Event.add(window, 'load', init_dw_Scroll);
     }*/


});

function gUV(e, f) {
    var c = String(e).split("?");
    var a = "";
    if (c[1]) {
        var b = c[1].split("&");
        for (var g = 0; g <= (b.length); g++) {
            if (b[g]) {
                var d = b[g].split("=");
                if (d[0] && d[0] == f) {
                    a = d[1]
                }
            }
        }
    }
    return a
}

!function (t) {
    "use strict";

    function r(t) {
        var r = {path: !0, query: !0, hash: !0};
        return t ? (/^[a-z]+:/.test(t) && (r.protocol = !0, r.host = !0, /[-a-z0-9]+(\.[-a-z0-9])*:\d+/i.test(t) && (r.port = !0), /\/\/(.*?)(?::(.*?))?@/.test(t) && (r.user = !0, r.pass = !0)), r) : r
    }

    function e(t, e, o) {
        var u, f, l,
            y = h ? "file://" + (process.platform.match(/^win/i) ? "/" : "") + p("fs").realpathSync(".") : document.location.href;
        e || (e = y), h ? u = p("url").parse(e) : (u = document.createElement("a"), u.href = e);
        var d = r(e);
        l = e.match(/\/\/(.*?)(?::(.*?))?@/) || [];
        for (f in a) t[f] = d[f] ? u[a[f]] || "" : "";
        if (t.protocol = t.protocol.replace(/:$/, ""), t.query = t.query.replace(/^\?/, ""), t.hash = s(t.hash.replace(/^#/, "")), t.user = s(l[1] || ""), t.pass = s(l[2] || ""), t.port = c[t.protocol] == t.port || 0 == t.port ? "" : t.port, !d.protocol && /[^\/#?]/.test(e.charAt(0)) && (t.path = e.split("?")[0].split("#")[0]), !d.protocol && o) {
            var g = new n(y.match(/(.*\/)/)[0]), m = g.path.split("/"), v = t.path.split("/"),
                q = ["protocol", "user", "pass", "host", "port"], w = q.length;
            for (m.pop(), f = 0; w > f; f++) t[q[f]] = g[q[f]];
            for (; ".." === v[0];) m.pop(), v.shift();
            t.path = ("/" !== e.charAt(0) ? m.join("/") : "") + "/" + v.join("/")
        }
        t.path = t.path.replace(/^\/{2,}/, "/"), t.paths(("/" === t.path.charAt(0) ? t.path.slice(1) : t.path).split("/")), t.query = new i(t.query)
    }

    function o(t) {
        return encodeURIComponent(t).replace(/'/g, "%27")
    }

    function s(t) {
        return t = t.replace(/\+/g, " "), t = t.replace(/%([ef][0-9a-f])%([89ab][0-9a-f])%([89ab][0-9a-f])/gi, function (t, r, e, o) {
            var s = parseInt(r, 16) - 224, i = parseFloat(e, 16) - 128;
            if (0 === s && 32 > i) return t;
            var n = parseInt(o, 16) - 128, h = (s << 12) + (i << 6) + n;
            return h > 65535 ? t : String.fromCharCode(h)
        }), t = t.replace(/%([cd][0-9a-f])%([89ab][0-9a-f])/gi, function (t, r, e) {
            var o = parseInt(r, 16) - 192;
            if (2 > o) return t;
            var s = parseInt(e, 16) - 128;
            return String.fromCharCode((o << 6) + s)
        }), t.replace(/%([0-7][0-9a-f])/gi, function (t, r) {
            return String.fromCharCode(parseInt(r, 16))
        })
    }

    function i(t) {
        for (var r, e = /([^=&]+)(=([^&]*))?/g; r = e.exec(t);) {
            var o = decodeURIComponent(r[1].replace(/\+/g, " ")), i = r[3] ? s(r[3]) : "";
            void 0 !== this[o] && null !== this[o] ? (this[o] instanceof Array || (this[o] = [this[o]]), this[o].push(i)) : this[o] = i
        }
    }

    function n(t, r) {
        e(this, t, !r)
    }

    var h = "undefined" == typeof window && "undefined" != typeof global && "function" == typeof require,
        p = h ? t.require : null,
        a = {protocol: "protocol", host: "hostname", port: "port", path: "pathname", query: "search", hash: "hash"},
        c = {ftp: 21, gopher: 70, http: 80, https: 443, ws: 80, wss: 443};
    i.prototype.toString = function () {
        var t, r, e = "", s = o;
        for (t in this) if (!(this[t] instanceof Function || null === this[t])) if (this[t] instanceof Array) {
            var i = this[t].length;
            if (i) for (r = 0; i > r; r++) e += e ? "&" : "", e += s(t) + "=" + s(this[t][r]); else e += (e ? "&" : "") + s(t) + "="
        } else e += e ? "&" : "", e += s(t) + "=" + s(this[t]);
        return e
    }, n.prototype.clearQuery = function () {
        for (var t in this.query) this.query[t] instanceof Function || delete this.query[t];
        return this
    }, n.prototype.queryLength = function () {
        var t, r = 0;
        for (t in this) this[t] instanceof Function || r++;
        return r
    }, n.prototype.isEmptyQuery = function () {
        return 0 === this.queryLength()
    }, n.prototype.paths = function (t) {
        var r, e = "", i = 0;
        if (t && t.length && t + "" !== t) {
            for (this.isAbsolute() && (e = "/"), r = t.length; r > i; i++) t[i] = !i && t[i].match(/^\w:$/) ? t[i] : o(t[i]);
            this.path = e + t.join("/")
        }
        for (t = ("/" === this.path.charAt(0) ? this.path.slice(1) : this.path).split("/"), i = 0, r = t.length; r > i; i++) t[i] = s(t[i]);
        return t
    }, n.prototype.encode = o, n.prototype.decode = s, n.prototype.isAbsolute = function () {
        return this.protocol || "/" === this.path.charAt(0)
    }, n.prototype.toString = function () {
        return (this.protocol && this.protocol + "://") + (this.user && o(this.user) + (this.pass && ":" + o(this.pass)) + "@") + (this.host && this.host) + (this.port && ":" + this.port) + (this.path && this.path) + (this.query.toString() && "?" + this.query) + (this.hash && "#" + o(this.hash))
    }, t[t.exports ? "exports" : "Url"] = n
}("undefined" != typeof module && module.exports ? module : window);