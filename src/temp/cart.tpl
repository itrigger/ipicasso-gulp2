<div  id="cart" class="header--cart_block">
    <?php if ($text_items) { ?><div class="cart_block--notifier"><?php echo $text_items; ?></div><? } ?>
    <div class="cart_block--price ico-cart <?php if (empty($products)) echo 'empty';?> " >
        <?php if ($products){ ?>
            <div class="price"><?php echo $total_real_text; ?></div>
            <?php if($percent){ ?>
                <div class="price price--old"> <?php echo $total_old_text; ?></div>
            <?php } else { ?>
            <?php } ?>
        <?php } ?>
    </div>
    <?php if ($text_items) { ?>
        <div id="minicart" style="display: none">
            <div class="mc_table cart_panel">
                <?php foreach ($products as $product) { ?>
                    <div class="mc_table_row">

                        <div class="mc_img">
                            <?php if ($product['thumb']) { ?>
                            <img src="<?php echo $product['thumb']; ?>" alt="<?php echo $product['name']; ?>" title="<?php echo $product['name']; ?>">
                            <?php } ?>
                        </div>
                        <div class="mc_title_w">
                            <a href="<?php echo $product['href']; ?>"><?php echo $product['name']; ?></a>
                            <div class="code"><?php echo $product['model']; ?></div>
                            <?php if ($product['percent']) { ?><div class="labels"><span class="label label--discount">-<?php echo $product['percent']; ?>%</span></div><?php } ?>
                        </div>
                        <div class="mc_count_w">
                            <div class="h100 | inputNumber">
                                <a href="javascript:;" class="inputNumber_control ic_minus" data-onclick="decreaseProductQuantity" data-id="<?php echo $product['metrika_product_id']; ?>" data-remove="<?php echo $product['key']; ?>"></a>
                                <input class="inputCountTarget quantity<?php echo $product['metrika_product_id']; ?>" type="text" data-onchange="changeProductQuantity"  name="quantity<?php echo $product['metrika_product_id']; ?>" value="<?php echo $product['quantity']; ?>" size="1"/>
                                <a href="javascript:;" class="inputNumber_control ic_plus" data-onclick="increaseProductQuantity"></a>
                            </div>
                            <?php if ($product['quantity']>1) { ?><div class="price-per-one"><?php echo $product['price']; ?></div><?php } ?>
                        </div>
                        <div class="mc_total_price">
                            <?php echo $product['total']; ?>
                            <?php if ($product['total_old']) { ?><div class="price price--old"><?php echo $product['total_old']; ?></div><?php } ?>
                        </div>
                        <div class="del_w remove" onclick="removeYandexEcommerce('<?php echo $product['metrika_product_id']; ?>','<?php echo htmlspecialchars($product['metrika_product_name']); ?>',<?php echo $product['metrika_product_price']; ?>); (getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout') ? location = 'index.php?route=checkout/cart&remove=<?php echo $product['key']; ?>' : $('#cart').load('index.php?route=module/cart&remove=<?php echo $product['key']; ?>' + ' #cart > *',
                                function(){
                                var wheight = $(window).height();
                                var needheight = wheight / 3 * 2;
                                var cartheight = $('.c_in').height();
                                if(cartheight > needheight){
                                $('.c_in').css({'overflow-y':'auto','max-height':needheight});
                                }
                                }
                                );" >Удалить</div>
                    </div>
                <?php } ?>
                <div class="separator"></div>
                <div class="limit_txt"><sup>*</sup>Для оптового заказа свяжитесь с менеджером</div>
                <div class="d_f ai_c | row total">
                    <div class="name">Cart total: <span class="count"><?php echo $text_items; ?></span> <span class="items">item(s)</span></div>
                    <div class="d_f ai_end fd_c | price">
                        <?php  foreach ($totals as $total) { ?>
                            <?php  if($total['code'] == 'sub_total' ) { ?>
                                <div><?php echo $text_subtotal; ?> <?php echo $total['text']; ?></div>
                            <?php } ?>
                        <?php } ?>
                        <?php  if($percent) { ?> <div class="price price--old"><?php echo $total_old_text; ?></div> <?php } ?>
                    </div>
                </div>
                <a href="/cart/" class="btn btn-big">view cart and checkout</a>
            </div>
        </div>
    <?php } ?>
 </div>

</div>
<?php //print_r($products); ?>
<script>
    function p_array() {
    <?php foreach ($products as $product) { ?>
        <?php if($product['option']) { ?>
                replace_button('<?php echo $product['metrika_product_id']; ?>','<?php echo $product['quantity']; ?>','<?php echo $product['key']; ?>', 1);
            <?php } else { ?>
                replace_button('<?php echo $product['metrika_product_id']; ?>','<?php echo $product['quantity']; ?>',  '<?php echo $product['key']; ?>', 0);
            <?php } ?>
        <?php } ?>
        /*mySwiper2.update();
        mySwiper.update();
        mySwiper2.slideTo(0, 0);
        mySwiper.slideTo(0, 0);*/
    }

    function replace_button(product_id,quantity, key_cart, options){

        console.log('.addcart'+product_id);

        $('.addcart'+product_id).html('<div class="cart_btn__incart hasItems">\n' +
                '                                                <div class="notify">'+quantity+'</div>\n' +
                '                                                <a class="cart_btn__hover">В корзину</a>\n' +
                '                                                <div class="add_delete_w">\n' +
                '                                                    <a href="#" class="btn-decrease" data-id="'+product_id+'" data-remove="'+key_cart+'"  >−</a>\n' +
                '                                                    <input type="text" class="quantity'+product_id+'"  name="quantity'+product_id+'" value="'+quantity+'" size="1" />\n' +
                '                                                    <a href="#" class="btn-increase" data-id="'+product_id+'"  >+</a>\n' +
                '                                                </div>\n' +
                '                                            </div>');
    }
    function return_button(product_id) {
        $('.'+product_id).html('<i class="<?php echo $cart_btn_icon; ?>" aria-hidden="true"></i> <span class="hidden-sm"><?php echo $cart_btn_text; ?></span>').removeClass('in_cart');
    }

    $(document).ready(function() {
        setTimeout(function(){
            p_array();
        }, 2000);
    });
</script>