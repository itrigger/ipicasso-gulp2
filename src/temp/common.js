$(document).ready(function() {
	setTimeout(function() {$('.warng').fadeOut(1000)},10000);
	if ($.isFunction($.fn.on)) {
		$(document).on('click', '.cart_notifyme', function () {

			$.colorbox({
				//open: true,
				iframe: true,
				href:'/index.php?route=module/avail/openForm&product_id_avail='+$(this).data('id'),
				width:544,
				height:390
				});

			return false;
		});

	} else {

		$(".cart_notifyme").on('click',function(e){
			e.preventDefault();

			$.colorbox({
				//open: true,
				iframe: true,
				href:'/index.php?route=module/avail/openForm&product_id_avail='+$(this).data('id'),
				width:544,
				height:390
			});
		});

	}


	/* Search */
	$('#button-search').on('click', function() {
		
		url = $('base').attr('href') + 'index.php?route=product/search';
			 
		var search = $('.maincontent input[name=\'search\']').prop('value');
		
		if (search) {
			url += '&search=' + encodeURIComponent(search);
		}

		location = url;
	});
		$('#header .button-search').on('click', function() {
		
		url = $('base').attr('href') + 'index.php?route=product/search';
			 
		var search = $('#header input[name=\'search\']').prop('value');

		if (search) {
			url += '&search=' + encodeURIComponent(search);
		}

		location = url;
	});
	$('#header input[name=\'search\']').keypress(function(e) {
		if(e.which == 13) {
			url = $('base').attr('href') + 'index.php?route=product/search';

			var search = $('#header input[name=\'search\']').prop('value');

			if (search) {
				url += '&search=' + encodeURIComponent(search);
			}

			location = url;
		}
	});
    function fixBoxCategories () {

        scroll_t = $(window).scrollTop();
        max_t = $('#content').offset().top +  $('#content').height() - $('.container-category').height()-40;

        if (scroll_t>=180  && scroll_t<max_t && $('.container-category').css('position')=='static') {
            $('.container-category').css({
                'position':'fixed',
                'top':'40px'
            });
        } else if (scroll_t>180 && scroll_t>=max_t && $('.container-category').css('position')!='absolute'){
            $('.container-category').css({
                'position':'absolute',
                'top':(max_t+40)+'px'
            });
        } else if (scroll_t>180 && scroll_t<max_t && $('.container-category').css('position')=='absolute'){
            $('.container-category').css({
                'position':'fixed',
                'top':'40px'
            });
        } else if (scroll_t<180 && $('.container-category').css('position')!='static'){
            $('.container-category').css({
                'position':'static',
                'top':'auto'
            });
        }
    }

	$('#header input[name=\'search\']').on('keydown', function(e) {
		if (e.keyCode == 13) {
			url = $('base').attr('href') + 'index.php?route=product/search';
			 
			var search = $('input[name=\'search\']').attr('value');
			
			if (search) {
				url += '&search=' + encodeURIComponent(search);
			}
			
			location = url;
		}
	});
	
	
	
	/* Ajax Cart */
	$(document).on('click', '#cart .cart_block--price', function() {
		console.log('cart clicked');
		if($( window ).width() < 990) {
			window.location.href = '/cart/';
		}
		
		$('#cart').load('index.php?route=module/cart #cart > *', function() {
			var wheight = $(window).height();
			var needheight = wheight / 3 * 2;
			var cartheight = $(".c_in").height();
			console.log("win height - " + wheight);
			console.log("need height - " + needheight);
			console.log("cart height - " + cartheight);
			if(cartheight > needheight){
				$(".c_in").css({"overflow-y":"auto","max-height":needheight});
			}
			$('#minicart').show();
		}); 

	});
	
	$(document).on('mouseleave','#minicart', function() {
		$('#minicart').hide();
	});
	
	/* Mega Menu */
	$('#menu ul > li > a + div').each(function(index, element) {
		// IE6 & IE7 Fixes
		/*if ($.browser.msie && ($.browser.version == 7 || $.browser.version == 6)) {
			var category = $(element).find('a');
			var columns = $(element).find('ul').length;
			
			$(element).css('width', (columns * 143) + 'px');
			$(element).find('ul').css('float', 'left');
		}	*/	
		
		var menu = $('#menu').offset();
		var dropdown = $(this).parent().offset();
		
		i = (dropdown.left + $(this).outerWidth()) - (menu.left + $('#menu').outerWidth());
		
		if (i > 0) {
			$(this).css('margin-left', '-' + (i + 5) + 'px');
		}
	});

	// IE6 & IE7 Fixes
	/*if ($.browser.msie) {
		if ($.browser.version <= 6) {
			$('#column-left + #column-right + #content, #column-left + #content').css('margin-left', '195px');
			
			$('#column-right + #content').css('margin-right', '195px');
		
			$('.box-category ul li a.active + ul').css('display', 'block');	
		}
		
		if ($.browser.version <= 7) {
			$('#menu > ul > li').bind('mouseover', function() {
				$(this).addClass('active');
			});
				
			$('#menu > ul > li').bind('mouseout', function() {
				$(this).removeClass('active');
			});	
		}
	}*/
	
	$('.success img, .warning img, .attention img, .information img').on('click', function() {
		$(this).parent().fadeOut('slow', function() {
			$(this).remove();
		});
	});	
});

function getURLVar(key) {
	var value = [];
	
	var query = String(document.location).split('?');
	
	if (query[1]) {
		var part = query[1].split('&');

		for (i = 0; i < part.length; i++) {
			var data = part[i].split('=');
			
			if (data[0] && data[1]) {
				value[data[0]] = data[1];
			}
		}
		
		if (value[key]) {
			return value[key];
		} else {
			return '';
		}
	}
} 

function addToCart(product_id, quantity, page_type) {
	quantity = typeof(quantity) != 'undefined' ? quantity : 1;
	page_type = typeof(page_type) != 'undefined' ? page_type : 'other';

	$.ajax({
		url: 'index.php?route=checkout/cart/add',
		type: 'post',
		data: 'product_id=' + product_id + '&quantity=' + quantity,
		dataType: 'json',
		success: function(json) {
			console.log(json);
			$('.success, .warning, .attention, .information, .error').remove();
			
			if (json['redirect']) {
				location = json['redirect'];
			}
			
			if (json['success']) {
				if ($('#cart > .cart_block--price').hasClass('empty')){
					$('#cart > .cart_block--price').removeClass('empty');
					$('#cart > .cart_block--price').before('<div class="cart_block--notifier">'+json['total']+'</div>');
					if (json['percent'])
						$('#cart > .cart_block--price').prepend('<div class="price">'+json['total_text']+'</div><div class="price price--old"> ' + json['total_old_text'] + '</div>');
					else
						$('#cart > .cart_block--price').prepend('<div class="price">'+json['total_text']+'</div>');
				} else {
					$('#cart  .cart_block--notifier').html(json['total']);
					if (json['percent']){
						$('#cart > .cart_block--price .price').html( json['total_text'] );
						$('#cart > .cart_block--price .price--old').html(json['total_old_text']);
					}
					else
						$('#cart > .cart_block--price .price').html( json['total_text'] );
				}

				/*if (json['percent']) {
					$('#cart .heading a').addClass("dblstroke").html('<i class="totalprice">' + json['total_text']+'</i>'+'<br><s>' + json['total_old_text'] + '</s> <i class="percent">'+json['percent']+'%');
				}
				else
					$('#cart .heading a').html(json['total_text']);*/
				$('#notification').html('<div class="success" style="display: none;">' + json['success'] + '<img src="catalog/view/theme/ava/image/close.png" alt="" class="close" /></div>');
				
				$('.success').fadeIn('slow');


				//$('html, body').animate({ scrollTop: 0 }, 'slow'); 
				//addYandexEcommerce(json);
				 /*ga('ec:addProduct', {
					'id': json.metrika_product_id,
					'name': json.metrika_product_name,
					'category': json.metrika_product_category,
					'brand': json.metrika_product_manufacturer,
					'price': json.metrika_product_price,
					'quantity': json.metrika_product_quantity
				});
				ga('ec:setAction', 'add');
				ga('send', 'event', 'UX', 'click', 'add to cart'); */    // Send data using an event.*/
				gtag('event', 'add_to_cart', {
					"ecomm_totalvalue": json.metrika_product_price,
					"ecomm_prodid": json.metrika_product_id,
					"ecomm_pagetype": page_type,
					"items": [
						{
							"id": json.metrika_product_id,
							"name": json.metrika_product_name,
							"list_name": page_type,
							"brand": json.metrika_product_manufacturer,
							"category": json.metrika_product_category,
							"quantity": json.metrika_product_quantity,
							"price": json.metrika_product_price,
							"google_business_vertical": "retail"
						}
					]
					
				});
				var image = $('#image-'+product_id).offset();
                var cart = $('#cart');
                var cart_offset = cart.offset();
                    $('body').append('<img src="' + $('#image-'+product_id).attr('src') + '" id="temp" style="position: absolute; z-index:9999; top: ' + image.top + 'px; left: ' + image.left + 'px;" />');
                    params = {
                        top : cart_offset.top + 'px',
                        left : cart_offset.left + 'px',
                        opacity : 0.0,
                        width : cart.width(),
                        height : cart.height()
                    };
                    $('#temp').animate(params, 'slow', false, function () {
                        $('#temp').remove();
                    });
                setTimeout(function() {$('.success').fadeOut(1000)},3000);
				
			}	
			
		}
	});
}
function addToWishList(product_id,elem) {
	$.ajax({
		url: 'index.php?route=account/wishlist/add',
		type: 'post',
		data: 'product_id=' + product_id,
		dataType: 'json',
		success: function(json) {
			$('.success, .warning, .attention, .information').remove();
			/*$(elem).tooltipster({
				animation: 'fade',
				animationDuration: 150,
				multiple: true,
				interactive: true,
				side: 'bottom'
			});*/
			if (json['success']) {
				$('#notification').html('<div class="success" style="display: none;">' + json['success'] + '<img src="catalog/view/theme/ava/image/close.png" alt="" class="close" /></div>');
				
				$('.success').fadeIn('slow');
				if ($('span').is('.like-total')) {
					$('.like-total').html(json['total']);
				} else {
					$('.like-heart').append('<span class="like-total">'+json['total']+'</span>');
				}
			
				if(json['total'] != 0){
						$('.like-heart-link').show();
					}
				if (json['remove']) {
					$(elem).removeClass('active');
					/*$(elem).tooltipster('content', text_addtowhishlist);*/

				}
				else {
					$(elem).addClass('active');
					/*$(elem).tooltipster('content', text_removewhishlist);*/
					//$(elem).prop("title", "Usunąć z wybranych");
				}
				
				var image = $('#image-'+product_id).parent().parent().parent().find(".like").offset();
                var like = $('#like-heart');
                var like_offset = like.offset();
				var like_mini = $('.rate-panel .like');
				var like_mini_offset = like_mini.offset();					
				
				if ($('.rate-panel').length > 0) {
					
					if(($('.rate-panel .like a').hasClass("active"))){
						$('#temp2').remove();
						$('body').append('<div id="temp2" class="likefly" style="position: absolute; z-index:9999; top: ' + like_mini_offset.top + 'px; left: ' + like_mini_offset.left + 'px;" />');
						params = {
							top : like_offset.top + 'px',
							left : like_offset.left + 'px',
							opacity : 0.0
						};
						$('#temp2').animate(params, 'slow', false, function () {
							$('#temp2').remove();
						});
					} else {
						$('#temp3').remove();
						$('body').append('<div id="temp3" class="likefly" style="position: absolute; z-index:9999; top: ' + like_offset.top + 'px; left: ' + like_offset.left + 17 + 'px;" />');
						params = {
							top : like_offset.top - 60 + 'px',
							//left : like_offset.left + 'px',
							opacity : 0.0
						};
						$('#temp3').animate(params, 1000, false, function () {
							$('#temp3').remove();
						});
					}
					
					
				} else {
					if(($('#image-'+product_id).parent().parent().parent().find(".like").hasClass("active"))){
						$('#temp2').remove();
						$('body').append('<div id="temp2" class="likefly" style="position: absolute; z-index:9999; top: ' + image.top + 'px; left: ' + image.left + 'px;" />');
						params = {
							top : like_offset.top + 'px',
							left : like_offset.left + 'px',
							opacity : 0.0
						};
						$('#temp2').animate(params, 'slow', false, function () {
							$('#temp2').remove();
						});
					} else {
						$('#temp3').remove();
						$('body').append('<div id="temp3" class="likefly" style="position: absolute; z-index:9999; top: ' + like_offset.top + 'px; left: ' + like_offset.left + 17 + 'px;" />');
						params = {
							top : like_offset.top - 60 + 'px',
							//left : like_offset.left + 'px',
							opacity : 0.0
						};
						$('#temp3').animate(params, 1000, false, function () {
							$('#temp3').remove();
						});
					}
				}

					
				
				
				
				
					if(json['total'] == 0){
						$('.like-heart-link').hide();
					}
			
				
				setTimeout(function() {$('.success').fadeOut(1000)},3000);

			}	
		}
	});
}

function addToCompare(product_id) { 
	$.ajax({
		url: 'index.php?route=product/compare/add',
		type: 'post',
		data: 'product_id=' + product_id,
		dataType: 'json',
		success: function(json) {
			$('.success, .warning, .attention, .information').remove();
						
			if (json['success']) {
				$('#notification').html('<div class="success" style="display: none;">' + json['success'] + '<img src="catalog/view/theme/ava/image/close.png" alt="" class="close" /></div>');
				
				$('.success').fadeIn('slow');
				
				$('#compare-total').html(json['total']);
				$('#compare-total-2').html($('#compare-total').html());
				
				$('html, body').animate({ scrollTop: 0 }, 'slow'); 
				
				setTimeout(function() {$('.success').fadeOut(1000)},3000);
			}	
		}
	});
}


function popup_modal_close() {
	$.cookie("pop", '1')
	jQuery('#popup_modal_layer').fadeOut(500, function() {
		jQuery('#popup_modal_layer').hide().css('opacity','1');
	});
	jQuery('#popup_modal').fadeOut(500, function() {
		jQuery('#popup_modal').hide();
		jQuery('#popup_modal_content').empty();
	});

}


function showPop(param) {
	var pop = $.cookie(param);
	if (pop) return;
	//document.getElementById(id).style.display='block';


	var parent_position = jQuery('#popup_modal_layer').parent().css('position');
	if (jQuery('#popup_modal_layer').length == 0 || parent_position == 'fixed' || parent_position == 'relative' || parent_position == 'absolute') {
		jQuery('#popup_modal_layer').remove();
		jQuery('#popup_modal').remove();
		jQuery('body').append('<div id="popup_modal_layer" onclick="popup_modal_close();"></div><div id="popup_modal"><div id="popup_modal_header"><img style="cursor:pointer;" src="catalog/view/image/close.png" onclick="popup_modal_close();"></div><div id="popup_modal_content"></div></div>');
	}
	jQuery('#popup_modal').show();
	// jQuery('#popup_modal_content').load('index.php?'+simple_route+'route=checkout/simplecheckout_customer/login');
	jQuery('#popup_modal_content').html('<div style="text-align: left"><p>Dear customers!</p>' +
		' ' +
		'<p style="text-align: left" >Due to new Brexit customs regulations we currently don`t deliver goods to the UK.</p>' +
		'<p style="text-align: left">We apologize for this inconvenience.</p>' +
		' </div>'
	);
	var loginHeight = jQuery(document).height();
	var loginWidth = jQuery(window).width();
	jQuery('#popup_modal_layer').css('height', loginHeight);
	var winH = jQuery(window).height();
	var winW = jQuery(window).width();
	jQuery('#popup_modal').css('top',  winH/2-jQuery('#popup_modal').height()/2);
	jQuery('#popup_modal').css('left', winW/2-jQuery('#popup_modal').width()/2);
	jQuery('#popup_modal_layer').fadeTo(500,0.8);
	return false;


}

$(document).ready(function() {
	//showPop('pop');
});

