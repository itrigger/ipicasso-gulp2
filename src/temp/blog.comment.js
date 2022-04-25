comments_vote = function (thisis) {
    var acr = load_acr(thisis);
    var acc = load_acc(thisis);
    var prefix = acr['prefix'];
    var mark = acc['mark'];
    if (typeof(acr['exec']) == "undefined" || acr['exec'] == '') {
        exec = '';
    } else {
        exec = acr['exec'];
    }
    var mylist_position_var = acr['mylist_position'];
    var text_voted_blog_plus_var = acc['text_voted_blog_plus'];
    var text_voted_blog_minus_var = acc['text_voted_blog_minus'];
    var text_all_var = acc['text_all'];
    var comment_id = $('#' + $(thisis).parents().prev('.container_comment_vars:first').attr('id')).find('.comment_id:first').text();
    var delta = 0;
    if ($(thisis).hasClass('blog_plus')) {
        delta = '1';
    } else {
        delta = '-1';
    }
    if ($(thisis).hasClass('loading')) {
    } else {
        $(thisis).addClass('loading');
        $.ajax({
            type: 'POST',
            url: 'index.php?route=record/treecomments/comments_vote&mylist_position=' + mylist_position_var + '&mark=' + mark,
            dataType: 'json',
            data: 'comment_id=' + encodeURIComponent(comment_id) + '&delta=' + encodeURIComponent(delta),
            beforeSend: function () {
                $('.success, .warning, .success-comment, .warning-comment, .attention-comment').remove();
            },
            success: function (data) {
                if (data.error) {
                    alert('error');
                }
                if (data.success) {
                    if (data.messages == 'ok') {
                        var voting = $('#voting_' + comment_id);
                        if (delta == '1') {
                            voting.addClass('voted_blog_plus').attr('title', text_voted_blog_plus_var);
                            $('.comment_yes', voting).addClass('voted_comment_plus');
                        } else if (delta == '-1') {
                            voting.addClass('voted_blog_minus').attr('title', text_voted_blog_minus_var);
                            $('.comment_no', voting).addClass('voted_comment_minus');
                        }
                        $('.score', voting).replaceWith('<span class="score" title="' + text_all_var + ' ' + data.success.rate_count + ': &uarr;' + data.success.rate_delta_blog_plus + ' и &darr;' + data.success.rate_delta_blog_minus + '">' + data.success.rate_delta + '</span>');
                        $('.score_plus', voting).html(data.success.rate_delta_blog_plus);
                        $('.score_minus', voting).html(data.success.rate_delta_blog_minus);
                        $('.mark', voting).attr('class', 'mark ' + data.sign);
                        if (exec != '') {
                            eval(exec);
                        }
                    } else {
                        $('#' + prefix + 'comment_work_' + comment_id).append('<div class="warning-comment">' + data.success + ' </div>');
                        remove_success();
                    }
                }
            }
        });
        $(thisis).removeClass('loading');
    }
    return false;
}
comments_vote_loader = function () {
    if ($.isFunction($.fn.on)) {
        $(document).on('click', '.comments_vote', function () {
            comments_vote(this);
            return false;
        });
    } else {
        $(document).ready(function () {
            $(document).on('click', '.comments_vote', function () {
                comments_vote(this);
                return false;
            });
        });
    }
}
document.documentElement.id = "js";
$(document).ready(function () {
    comments_vote_loader();
});
function captcha_fun() {
}
function subcaptcha(e) {
}
FSelectedText = function () {
    if (!$('#ctrlcopy').length > 0) {
        $('body').append('<div id=\"ctrlcopy\"><\/div>');
    }
    if ($.isFunction($.fn.on)) {
        $(document).on('mouseup', function (e) {
            var selectedText = '';
            if (selectedText = window.getSelection) {
                selectedText = window.getSelection().toString();
            } else {
                selectedText = document.selection.createRange().text;
            }
            $('#ctrlcopy').text(selectedText + '');
            return selectedText;
        });
    } else {
        $(document).on('mouseup', function () {
            var selectedText = '';
            if (selectedText = window.getSelection) {
                selectedText = window.getSelection().toString();
            } else {
                selectedText = document.selection.createRange().text;
            }
            $('#ctrlcopy').text(' ' + selectedText + ' ');
            return selectedText;
        });
    }
}
$(document).ready(function () {
    FSelectedText();
});
insertSelectText = function (command, value, queryState) {
    var seltxt = $('#ctrlcopy').html();
    if (seltxt == 'false')seltxt = '';
    this.wbbInsertCallback(command, {seltext: seltxt})
}
wisybbinit = function (cid, prefix) {
    var my_id = '0';
    if (typeof(this.id) == "undefined") {
        my_id = '0';
    } else {
        my_id = this.id;
    }
    if (my_id == '0') {
        my_id = 'editor_' + cid;
    }
    var wbbOpt = {
        img_uploadurl: "catalog/view/javascript/wysibb/iupload.php",
        buttons: 'bold,italic',
        allButtons: {
            quote: {
                cmd: insertSelectText,
                transform: {'<div class="quote"><cite>{AUTHOR}</cite>{SELTEXT}</div>': '[quote={AUTHOR}]{SELTEXT}[/quote]'}
            }
        }
    }
    $('#' + prefix + my_id).wysibb(wbbOpt);
    $('.wysibb-body').css('height', $('.blog-textarea_height').css('height'));
    $('span.powered').hide();
}
wisybbdestroy = function (prefix, acr) {
    if (acr['visual_editor'] == '1') {
        $('.' + prefix + 'editor').each(function () {
            var data = $(this).data("wbb");
            if (data) {
                $(this).destroy();
            }
        });
    }
    if (acr['visual_rating'] == '1') {
        ratingdestroy('.visual_star');
    }
}
uploaderinit = function (prefix, my_id) {
    if (!($("div").is(".add_photo_block"))) {
        var count = 0;
        var settings = {
            url: "index.php?route=module/downloads/usdownload",
            dragDrop: false,
            fileName: "fileToUpload",
            showPreview: true,
            previewHeight: "100px",
            previewWidth: "100px",
            allowedTypes: "jpeg,jpg,png,gif",
            returnType: "json",
            maxFileCount: 5,
            customProgressBar: function (obj, s) {
                this.statusbar = $("<div class='photo_item'></div>");
                this.preview = $("<img class='ajax-file-upload-preview' />").width(s.previewWidth).height(s.previewHeight).appendTo(this.statusbar).hide();
                this.filename = $("<div class='ajax-file-upload-filename'></div>");
                this.progressDiv = $("<div class='ajax-file-upload-progress' style='display: none'>").appendTo(this.statusbar).hide();
                this.progressbar = $("<div class='ajax-file-upload-bar'  style='display: none'></div>").appendTo(this.progressDiv);
                this.abort = $("<div class='ajax-file-upload-loading'></div>").appendTo(this.statusbar).hide();
                this.cancel = $("<div>" + s.cancelStr + "</div>").appendTo(this.statusbar).hide();
                this.done = $("<div>" + s.doneStr + "</div>").appendTo(this.statusbar).hide();
                this.download = $("<div>" + s.downloadStr + "</div>").appendTo(this.statusbar).hide();
                this.del = $("<div class='ajax-file-upload-del'></div>").appendTo(this.statusbar).hide();
                this.abort.addClass("custom-red");
                this.done.addClass("custom-green");
                this.download.addClass("custom-green");
                this.cancel.addClass("custom-red");
                this.del.addClass("custom-red");
                return this;
            },
            onSuccess: function (files, data, xhr) {
                $('.dodik').hide();
                $('#user-photo-block').prepend('<input type="hidden" name="user_foto[]" value="' + data + '" >');
            },
            showDelete: true,
            deleteCallback: function (data, pd) {
                for (var i = 0; i < data.length; i++) {
                    $('input[value="' + data[i] + '"]').remove();
                    $.post("delete.php", {op: "delete", name: data[i]}, function (resp, textStatus, jqXHR) {
                        $("#status").append("<div>Файл удален</div>");
                    });
                }
                pd.statusbar.hide();
                $('.ajax-file-upload-error').html('');
            }
        }
        $('#user-photo-block').prepend('<div  class="add_photo_block"> <div id="fileuploader2" class="add_photo_btn_w" ><span class="ico ico-add-photo"></span></div> </div>');
        var uploadObj = $("#fileuploader2").uploadFile(settings);
    }
}
wisybbloader = function (cid, prefix, acr) {
    if (acr['visual_editor'] == '1') {
        wisybbdestroy(prefix, acr);
        wisybbinit(cid, prefix);
    }
    if (acr['visual_rating'] == '1') {
        ratingloader('.visual_star');
    }
    uploaderinit(acr['prefix'], 'editor_' + cid);
}
imageboxinit = function (str) {
    if (str == 'colorbox') {
        $('.imagebox').colorbox({overlayClose: true, opacity: 0.5});
    }
    if (str == 'fancybox') {
        $('.imagebox').fancybox({
            cyclic: false, autoDimensions: true, autoScale: false, 'onComplete': function () {
                $.fancybox.resize();
            }
        });
    }
}
ratingdestroy = function (id) {
    $('.star-rating-control').each(function () {
        $(this).remove();
        $(id).removeClass('star-rating-applied').show();
    });
}
ratingloader = function (id) {
    $(id).rating({
        focus: function (value, link) {
            var tip = $('#hover-test');
            var rcolor = $(this).attr('alt');
            tip[0].data = tip[0].data || tip.html();
            tip.html('<ins style="color:' + rcolor + ';">' + link.title + '<\/ins>' || 'value: ' + value);
            $('.rating-cancel').hide();
        }, blur: function (value, link) {
            var tip = $('#hover-test');
            $('#hover-test').html(tip[0].data || '');
            $('.rating-cancel').hide();
        }
    });
    $('.rating-cancel').hide();
}
remove_success = function () {
    $('.success, .warning, .attention, .success-comment, .warning-comment, .attention-comment').fadeIn().animate({opacity: 1}, 4000, function () {
        $('.success, .warning, .attention, .success-comment, .warning-comment, .attention-comment').remove();
    });
}
load_acr = function (this_data) {
    var avars = {};
    avars['mark'] = $('#' + $(this_data).closest('div[id] .container_reviews').attr('id')).find('.mark:first').text();
    avars['exec'] = $('#' + $(this_data).closest('div[id] .container_reviews').attr('id')).find('.exec:first').text();
    avars['mark_id'] = $('#' + $(this_data).closest('div[id] .container_reviews').attr('id')).find('.mark_id:first').text();
    avars['theme'] = $('#' + $(this_data).closest('div[id] .container_reviews').attr('id')).find('.theme:first').text();
    avars['visual_editor'] = $('#' + $(this_data).closest('div[id] .container_reviews').attr('id')).find('.visual_editor:first').text();
    avars['mylist_position'] = $('#' + $(this_data).closest('div[id] .container_reviews').attr('id')).find('.mylist_position:first').text();
    avars['thislist'] = $('#' + $(this_data).closest('div[id] .container_reviews').attr('id')).find('.thislist:first').text();
    avars['text_wait'] = $('#' + $(this_data).closest('div[id] .container_reviews').attr('id')).find('.text_wait:first').text();
    avars['visual_rating'] = $('#' + $(this_data).closest('div[id] .container_reviews').attr('id')).find('.visual_rating:first').text();
    avars['signer'] = $('#' + $(this_data).closest('div[id] .container_reviews').attr('id')).find('.signer:first').text();
    avars['imagebox'] = $('#' + $(this_data).closest('div[id] .container_reviews').attr('id')).find('.imagebox:first').text();
    avars['prefix'] = $('#' + $(this_data).closest('div[id] .container_reviews').attr('id')).find('.prefix:first').text();
    return avars;
}
load_acc = function (this_data) {
    var avars = {};
    avars['sorting'] = $('#' + $(this_data).parents().find('.container_comments').attr('id')).find('.sorting:first').text();
    avars['page'] = $('#' + $(this_data).parents().find('.container_comments').attr('id')).find('.page:first').text();
    avars['mark'] = $('#' + $(this_data).parents().find('.container_comments').attr('id')).find('.mark:first').text();
    avars['mark_id'] = $('#' + $(this_data).parents().find('.container_comments').attr('id')).find('.mark_id:first').text();
    avars['text_rollup_down'] = $('#' + $(this_data).parents().find('.container_comments').attr('id')).find('.text_rollup_down:first').text();
    avars['text_rollup'] = $('#' + $(this_data).parents().find('.container_comments').attr('id')).find('.text_rollup:first').text();
    avars['visual_editor'] = $('#' + $(this_data).parents().find('.container_comments').attr('id')).find('.visual_editor:first').text();
    avars['mylist_position'] = $('#' + $(this_data).parents().find('.container_comments').attr('id')).find('.mylist_position:first').text();
    avars['text_voted_blog_plus'] = $('#' + $(this_data).parents().find('.container_comments').attr('id')).find('.text_voted_blog_plus:first').text();
    avars['text_voted_blog_minus'] = $('#' + $(this_data).parents().find('.container_comments').attr('id')).find('.text_voted_blog_minus:first').text();
    avars['text_all'] = $('#' + $(this_data).parents().find('.container_comments').attr('id')).find('.text_all:first').text();
    avars['prefix'] = $('#' + $(this_data).parents().find('.container_comments').attr('id')).find('.prefix:first').text();
    return avars;
}
$.fn.comments = function (acr, acc) {
    var sorting = acc['sorting'];
    var page = acc['page'];
    var mark = acr['mark'];
    var mark_id = acr['mark_id'];
    var thislist = acr['thislist'];
    var mylist_position = acr['mylist_position'];
    var prefix = acr['prefix'];
    if (typeof(sorting) == "undefined") {
        sorting = 'none';
    }
    if (typeof(page) == "undefined") {
        page = '1';
    }
    var url_str = 'index.php?route=record/treecomments/comment&prefix=' + prefix + '&' + mark + '=' + mark_id + '&sorting=' + sorting + '&page=' + page + '&mylist_position=' + mylist_position + '&ajax=1';
    return $.ajax({
        type: 'POST',
        url: url_str,
        data: {thislist: thislist},
        dataType: 'html',
        async: 'false',
        beforeSend: function () {
        },
        success: function (data) {
            $('#' + prefix + 'comment_' + mark_id).html(data);
        },
        complete: function (data) {
            captcha_fun();
        }
    });
}
function comment_write(event) {
    var acr = event.data.acr;
    var acc = event.data.acc;
    $('.success, .warning, .success-comment, .warning-comment, .attention-comment').remove();
    if (typeof(event.data.acc['sorting']) == "undefined") {
        sorting = 'none';
    } else {
        sorting = event.data.acc['sorting'];
    }
    if (typeof(event.data.acc['page']) == "undefined") {
        page = '1';
    } else {
        page = event.data.acc['page'];
    }
    if (typeof(event.data.acr['mark']) == "undefined") {
        mark = 'product_id';
    } else {
        mark = event.data.acr['mark'];
    }
    if (typeof(event.data.acr['exec']) == "undefined" || event.data.acr['exec'] == "") {
        exec = '';
    } else {
        exec = event.data.acr['exec'];
    }
    if (typeof(event.data.acr['thislist']) == "undefined") {
        thislist = '';
    } else {
        thislist = event.data.acr['thislist'];
    }
    if (typeof(event.data.acr['prefix']) == "undefined") {
        prefix = '';
    } else {
        prefix = event.data.acr['prefix'];
    }
    if (typeof(event.data.acr['mark_id']) == "undefined") {
        mark_id = false;
    } else {
        mark_id = event.data.acr['mark_id'];
    }
    if (typeof(event.data.acr['theme']) == "undefined") {
        theme = 'default';
    } else {
        theme = event.data.acr['theme'];
    }
    if (typeof(event.data.acr['visual_editor']) == "undefined") {
        visual_editor = '0';
    } else {
        visual_editor = event.data.acr['visual_editor'];
    }
    if (typeof(event.data.acr['mylist_position']) == "undefined") {
        mylist_position = '0';
    } else {
        mylist_position = event.data.acr['mylist_position'];
    }
    if (typeof(event.data.acr['text_wait']) == "undefined") {
        text_wait = 'Please wait...';
    } else {
        text_wait = event.data.acr['text_wait'];
    }
    if (typeof(this.id) == "undefined") {
        myid = '0';
    } else {
        myid = this.id.replace(prefix + 'button-comment-', '');
    }
    if (visual_editor == '1') {
        $('#' + prefix + 'editor_' + myid).wysibb().sync();
    }
    if(myid==0){
        $('#' + prefix + 'editor_' + myid).val($('span.rev_form_text').html());
        $('#' + prefix + 'zlety_' + myid).val($('span.rev_form_pos').html());
        $('#' + prefix + 'wady_' + myid).val($('span.rev_form_neg').html());
    }
    var data_form = $('#' + prefix + 'form_work_' + myid).serialize();
    var url_end = mark + '=' + mark_id + '&parent=' + myid + '&page=' + page + '&mylist_position=' + mylist_position + '&mark=' + mark;
    var url_str = 'index.php?route=record/treecomments/write&' + url_end;
    $.ajax({
        type: 'POST', url: url_str, dataType: 'html', data: data_form, beforeSend: function () {
            $('.success, .warning, .attention, .success-comment, .warning-comment, .attention-comment').remove();
            $('.button-comment').hide();
            if (myid == '0')$('#' + prefix + 'comment_work_' + myid).prepend('<div class="attention">' + text_wait + '</div>'); else $('#' + prefix + 'comment_work_' + myid).append('<div class="attention">' + text_wait + '</div>');
        }, error: function () {
            $('.success, .warning, .attention, .success-comment, .warning-comment, .attention-comment').remove();
            alert('error');
        }, success: function (data) {
            $('#' + prefix + 'comment_work_' + myid).prepend(data);
            if ($("div").is("#g-recaptcha")) {
                grecaptcha.reset();
            }
            if (wdata['code'] == 'error') {
                $('#' + prefix + 'comment_work_' + myid).show();
                if (myid == '0')$('#' + prefix + 'button-comment-0').parents('.buttons').after('<div class="warning-comment">' + wdata['message'] + ' </div>'); else
                    $('#' + prefix + 'comment_work_' + myid).append('<div class="warning-comment">' + wdata['message'] + ' </div>');
                remove_success();
            }
            if (wdata['code'] == 'success') {
                if (myid == '0' && page != 1)location.replace('/index.php?route=catalog/product&product_id=' + mark_id + '#tab-review');
                $.when($('#' + prefix + 'comment_' + mark_id).comments(acr, acc)).done(function () {
                    if (myid == '0') {
                        $('#' + prefix + 'comment-title').after('<div class="success">' + wdata['message'] + ' </div>');
                    } else {
                        $('#' + prefix + 'comment_work_' + myid).append('<div class="success">' + wdata['message'] + ' </div>');
                    }
                    $('#user-photo-block').remove();
                    remove_success();
                });
                $('#tabs').find('a[href=\'#tab-review\']').html(wdata['review_count']);
                $('input[name=\'name\']').val(wdata['login']);
                $('.wysibb-text-editor').html('');
                $('input[name=\'rating\']:checked').attr('checked', '');
                $('textarea[name=\'text\']').val('');
                $('input[name=\'captcha\']').val('');
                if (myid == '0') {
                    $('html, body').animate({scrollTop: $('.container_comments').offset().top - 100}, 1000);
                }
                if (exec != '') {
                    eval(exec);
                }
            }
            $('.button-comment').show();
            {
                wisybbloader(myid, acr['prefix'], acr);
            }
        }
    });
}
$(document).ready(function () { 
    $('textarea').on('keyup', function () {
        var max = this.maxLength;
        var count = max - this.value.length;
        $(this).parent().find('.text_note > span').html(count + ' iz ');
    });
    if ($.isFunction($.fn.on)) {
        $(document).on('click', '.comments_rollup', function () {
            var acc = load_acc(this);
            var text_rollup_down = $(this).data('down');
            var text_rollup = $(this).data('up');
            var parent_id = $(this).parents().next('.comments_parent:first').attr('id');
            var child_id = $(this).siblings('.sub_comment_block').attr('id');
            console.log(child_id);
            if ($('#' + child_id).is(':hidden') == false) {
                $(this).removeClass("rollup");
                $(this).addClass("rolldown");
                $(this).find('span').text(text_rollup_down);
            } else {
                $(this).removeClass("rolldown");
                $(this).addClass("rollup");
                $(this).find('span').text(text_rollup);
            }
            $('#' + child_id).toggle();
            return false;
        });
    } else {
        $(document).on('click', '.comments_rollup', function () {
            var acc = load_acc(this);
            var text_rollup_down = acc['text_rollup_down'];
            var text_rollup = acc['text_rollup'];
            var child_id = $(this).parents().next('.comments_parent:first').attr('id');
            if ($('#' + child_id).is(':hidden') == false) {
                $(this).removeClass("rollup");
                $(this).addClass("rolldown");
            } else {
                $(this).removeClass("rolldown");
                $(this).addClass("rollup");
            }
            $('#' + child_id).toggle();
            return false;
        });
    }
    if ($.isFunction($.fn.on)) {
        $(document).on('click', '.reply_bottom', function () {
            $('#' + $(this).data('id')).click();
            return false;
        });
    } else {
        $(document).on('click', '.comments_rollup', function () {
            $('#' + $(this).data('id')).click();
            return false;
            return false;
        });
    }
    if ($.isFunction($.fn.on)) {
        $(document).on('click', '.cancel', function () {
            console.log($(this).data('id'));
            $('#' + $(this).data('id')).html('');
            $('.wysibb-text-editor').html('');
            $('input[name=\'rating\']:checked').attr('checked', '');
            $('textarea[name=\'text\']').val('');
            $('input[name=\'captcha\']').val('');
            return false;
        });
    } else {
        $(document).on('click', '.cancel', function () {
            $('#' + $(this).data('id')).click();
            return false;
            return false;
        });
    }
    if ($.isFunction($.fn.on)) {
        $(document).on('click', '.comment_reply', function (e) {

            // здесь запускать фанси
                
            //

            e.preventDefault();
            $('.rev_form_photoblock_desc').css("display","block");
            $('.ajax-file-upload').css("display","flex");
            $('.rev_form_photo_counter span').text(0);

            $(this).addClass("active");
            var acr = load_acr(this);
            var acc = load_acc(this);
            var cid = $('#' + $(this).parents().prev('.container_comment_vars:first').attr('id')).find('.comment_id:first').text();
            console.log($('#' + $(this).parents().prev('.container_comment_vars:first').attr('id')));
            $(".reply_bottom").show();
            $('#parent' + cid).find(".reply_bottom").hide();
            if (cid == '')cid = 0;
            var prefix = acr['prefix'];
            wisybbdestroy(prefix, acr);

            $('.success, .warning, .success-comment, .warning-comment, .attention-comment').remove();
            console.log('810-' + cid);
            if ($(this).parent().parent().parent().parent().children(".comments_parent").find("div").is('.level_1')) {
                y_n = 1;
            } else {
                y_n = 0;
            }
            ;
            $('.' + acr['prefix'] + 'comment_work').html('');
            if (cid != 0)html_reply = $('#' + acr['prefix'] + 'reply_comments2').html(); else
                html_reply = $('#' + acr['prefix'] + 'reply_comments').html();
            console.log('822-' + html_reply);
            console.log($('#' + acr['prefix'] + 'comment_work_' + cid));
            $('#' + acr['prefix'] + 'comment_work_' + cid).html(html_reply);

             if (cid==0){
                 $(".rating-selectable").on('click', function (e) {
                     let parentOffset = $(this).offset();
                     let relX = e.pageX - parentOffset.left;
                     let rvalue=0;
                     console.log(relX)
                     if (relX > 0 && relX < 29) {
                         $(this).find('.stars').removeClass();
                         $(this).find('div').addClass('stars star-1')
                         rvalue =1;
                     } else if(relX > 28 && relX < 57){
                         $(this).find('.stars').removeClass();
                         $(this).find('div').addClass('stars star-2')
                         rvalue =2;
                     } else if(relX > 57 && relX < 85){
                         $(this).find('.stars').removeClass();
                         $(this).find('div').addClass('stars star-3')
                         rvalue =3;
                     } else if(relX > 85 && relX < 113){
                         $(this).find('.stars').removeClass();
                         $(this).find('div').addClass('stars star-4')
                         rvalue =4;
                     } else if(relX > 113 && relX < 141){
                         $(this).find('.stars').removeClass();
                         $(this).find('div').addClass('stars star-5')
                         rvalue =5;
                     }
                     $('input[name="rating"]').removeAttr('checked');
                     $("input[name='rating'][value='" + rvalue + "']").prop("checked", true);
                 });
                /*$.fancybox.open({
                    src: '#' + acr['prefix'] + 'comment_work_' + cid,
                    type: 'inline',
                    opts: {
                        touch: false,
                        keyboard: false
                    },
                });*/
            }
            $('#' + acr['prefix'] + 'comment_work_' + cid).show();
            $('html, body').animate({scrollTop: $('#' + acr['prefix'] + 'comment_work_' + cid).offset().top - 200}, 1000);
            if (y_n > 0) {
                $('#' + acr['prefix'] + 'comment_work_' + cid).addClass("sec_level");
            } else {
                $('#' + acr['prefix'] + 'comment_work_' + cid).addClass("first_level");
            }
            $('#' + acr['prefix'] + 'comment_work_' + cid).find('#' + acr['prefix'] + 'comment_work_').attr('id', acr['prefix'] + 'c_w_' + cid);
            $('#' + acr['prefix'] + 'comment_work_' + cid).find('#' + acr['prefix'] + 'form_work_').attr('id', acr['prefix'] + 'form_work_' + cid);
            $('#' + acr['prefix'] + 'comment_work_' + cid).find('#' + acr['prefix'] + 'editor_').attr('id', acr['prefix'] + 'editor_' + cid);
            $('#' + acr['prefix'] + 'comment_work_' + cid).find('#' + acr['prefix'] + 'zlety_').attr('id', acr['prefix'] + 'zlety_' + cid);
            $('#' + acr['prefix'] + 'comment_work_' + cid).find('#' + acr['prefix'] + 'wady_').attr('id', acr['prefix'] + 'wady_' + cid);
            $('#' + acr['prefix'] + 'comment_work_' + cid).find('.button-comment').attr('id', '' + acr['prefix'] + 'button-comment-' + cid);
            if ($("div").is("#g-recaptcha")) {
                var CaptchaCallback = function () {
                    grecaptcha.render('g-recaptcha', {'sitekey': '6LcYnT4UAAAAAPCm3TMLwOYxH2A5-DBUw-NbgefE'});
                };
                CaptchaCallback();
            }
            $('.bkey').unbind();
            $('.bkey').bind('click', {id: cid}, subcaptcha);
            $('#' + acr['prefix'] + 'button-comment-' + cid).bind('click', {acr: acr, acc: acc}, comment_write);
            {
                wisybbloader(cid, acr['prefix'], acr);
            }
            return false;
        });
    } else {
        $(document).on('click', '.comment_reply', function () {
            $(this).addClass("active");
            var acr = load_acr(this);
            var acc = load_acc(this);
            var cid = $('#' + $(this).parents().prev('.container_comment_vars:first').attr('id')).find('.comment_id:first').text();
            if (cid == '')cid = 0;
            var prefix = acr['prefix'];
            wisybbdestroy(prefix, acr);
            $('.success, .warning, .success-comment, .warning-comment, .attention-comment').remove();
            $('.' + acr['prefix'] + 'comment_work').html('');
            if (cid != 0)html_reply = $('#' + acr['prefix'] + 'reply_comments2').html(); else
                html_reply = $('#' + acr['prefix'] + 'reply_comments').html();
            if ($(this).parent().parent().parent().parent().children(".comments_parent").find("div").is('.level_1')) {
                y_n = 1;
            } else {
                y_n = 0;
            }
            ;
            $('#' + acr['prefix'] + 'comment_work_' + cid).html(html_reply);
            $('#' + acr['prefix'] + 'comment_work_' + cid).show();
            if (y_n > 0) {
                $('#' + acr['prefix'] + 'comment_work_' + cid).addClass("sec_level");
            } else {
                $('#' + acr['prefix'] + 'comment_work_' + cid).addClass("first_level");
            }
            $('#' + acr['prefix'] + 'comment_work_' + cid).find('#' + acr['prefix'] + 'comment_work_').attr('id', acr['prefix'] + 'c_w_' + cid);
            $('#' + acr['prefix'] + 'comment_work_' + cid).find('#' + acr['prefix'] + 'form_work_').attr('id', acr['prefix'] + 'form_work_' + cid);
            $('#' + acr['prefix'] + 'comment_work_' + cid).find('#' + acr['prefix'] + 'editor_').attr('id', acr['prefix'] + 'editor_' + cid);
            $('#' + acr['prefix'] + 'comment_work_' + cid).find('#' + acr['prefix'] + 'zlety_').attr('id', acr['prefix'] + 'zlety_' + cid);
            $('#' + acr['prefix'] + 'comment_work_' + cid).find('#' + acr['prefix'] + 'wady_').attr('id', acr['prefix'] + 'wady_' + cid);
            $('#' + acr['prefix'] + 'comment_work_' + cid).find('.button-comment').attr('id', '' + acr['prefix'] + 'button-comment-' + cid);
            $('.bkey').unbind();
            $('.bkey').bind('click', {id: cid}, subcaptcha);
            $('#' + acr['prefix'] + 'button-comment-' + cid).bind('click', {acr: acr, acc: acc}, comment_write);
            captcha_fun();
            {
                wisybbloader(cid, acr['prefix'], acr);
            }
            return false;
        });
    }
    customer_enter = function (thisis) {
        var acr = load_acr(thisis);
        var html_form_customer = $('#' + acr['prefix'] + 'form_customer').clone();
        $('#' + acr['prefix'] + 'form_customer').remove();
        $('#' + $(thisis).parents('div[id] .' + acr['prefix'] + 'form_customer_pointer').attr('id') + '.' + acr['prefix'] + 'form_customer_pointer').prepend(html_form_customer);
        $('#' + acr['prefix'] + 'form_customer').show("slide", {direction: "down"}, "slow");
        return false;
    }
    if ($.isFunction($.fn.on)) {
        $(document).on('click', '.customer_enter', function () {
            return false;
        });
    } else {
        $(document).on('click', '.customer_enter', function () {
            customer_enter(this);
            return false;
        });
    }
    comments_sorting = function (thisis) {
        var acc = load_acc(thisis);
        var acr = load_acr(thisis);
        acc['sorting'] = thisis.value;
        $('#' + acr['prefix'] + 'comment_' + acr['mark_id']).comments(acr, acc);
        return false;
    }
    if ($.isFunction($.fn.on)) {
        $(document).on('change', '.comments_sorting', function (event) {
            comments_sorting(this);
            return false;
        });
    } else {
        $(document).on('change', '.comments_sorting', function () {
            comments_sorting(this);
            return false;
        });
    }
    if ($.isFunction($.fn.on)) {
        $(document).on('click', '#tab-review .pagination a', function () {
            var acr = load_acr(this);
            var theme_var = acr['theme'];
            var text_wait_var = acr['text_wait'];
            $('#tab-review .buttons').prepend('<div class="attention"><img src="catalog/view/theme/' + theme_var + '/image/loading.gif" alt="">' + text_wait_var + '</div>');
            urll = this.href + '#tab-review';
            location = urll;
            $('.attention').remove();
            return false;
        });
    } else {
        $(document).on('click', '#tab-review .pagination a', function () {
            var acr = load_acr(this);
            var theme_var = acr['theme'];
            var text_wait_var = acr['text_wait'];
            $('#tab-review').prepend('<div class="attention"><img src="catalog/view/theme/' + theme_var + '/image/loading.gif" alt="">' + text_wait_var + '</div>');
            urll = this.href + '#tab-review';
            location = urll;
            $('.attention').remove();
            return false;
        });
    }
    if ($.isFunction($.fn.on)) {
        $(document).on('click', '#customer_enter', function () {
            $('#form_customer').show('slow');
            return false;
        });
    } else {
        $(document).on('click', '#customer_enter', function () {
            $('#form_customer').show('slow');
            return false;
        });
    }
    if ($.isFunction($.fn.on)) {
        $(document).on('click', '.comments_signer', function () {
            var acr = load_acr(this);
            var mark_var = acr['mark'];
            var mark_id_var = acr['mark_id'];
            $.ajax({
                type: 'POST',
                url: 'index.php?route=record/signer/subscribe&id=' + mark_id_var + '&pointer=' + mark_var + '&prefix=' + acr['prefix'],
                dataType: 'html',
                data: $('#' + acr['prefix'] + 'form_signer').serialize() + '&subscribe=' + $('#customer_subscribe').serialize(),
                beforeSend: function () {
                    $('#' + acr['prefix'] + 'js_signer').html('');
                },
                error: function () {
                    $('.success, .warning, .attention, .success-comment, .warning-comment, .attention-comment').remove();
                    alert('error');
                },
                success: function (data) {
                    $('#' + acr['prefix'] + 'js_signer').prepend(data).show('slide', {direction: 'up'}, 'slow');
                    if (sdata['code'] == 'error') {
                    }
                    if (sdata['code'] == 'success') {
                        if (sdata['success'] == 'remove') {
                            $('#' + acr['prefix'] + 'comments_signer').attr('checked', false);
                        }
                        if (sdata['success'] == 'set') {
                            $('#' + acr['prefix'] + 'comments_signer').attr('checked', true);
                        }
                    }
                }
            });
            return false;
        });
    } else {
        $(document).on('click', '.comments_signer', function () {
            var acr = load_acr(this);
            var mark_var = acr['mark'];
            var mark_id_var = acr['mark_id'];
            $.ajax({
                type: 'POST',
                url: 'index.php?route=record/signer/subscribe&id=' + mark_id_var + '&pointer=' + mark_var,
                dataType: 'html',
                data: $('#' + acr['prefix'] + 'form_signer').serialize(),
                beforeSend: function () {
                    $('#' + acr['prefix'] + 'js_signer').html('');
                },
                error: function () {
                    $('.success, .warning, .attention, .success-comment, .warning-comment, .attention-comment').remove();
                    alert('error');
                },
                success: function (data) {
                    $('#' + acr['prefix'] + 'js_signer').prepend(data).show('slide', {direction: 'up'}, 'slow');
                    if (sdata['code'] == 'error') {
                    }
                    if (sdata['code'] == 'success') {
                        if (sdata['success'] == 'remove') {
                            $('#' + acr['prefix'] + 'comments_signer').attr('checked', false);
                        }
                        if (sdata['success'] == 'set') {
                            $('#' + acr['prefix'] + 'comments_signer').attr('checked', true);
                        }
                    }
                }
            });
            return false;
        });
    }
});