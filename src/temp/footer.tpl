<?php $lang = $this->language->get('code2'); ?>
<!-- FOOTER -->
<div class="footer" id="footer">
    <div class="line1">
        <div class="inner">
            <div class="col col1">
                <div class="title"><?php if ($this->config->get('themer_link20'.$lang) and $this->config->get('themer_menu20'.$lang)) { ?>
                    <a class="arrow-white" href="<?php echo $this->config->get('themer_link20'.$lang); ?>"><?php echo $this->config->get('themer_menu20'.$lang); ?></a>
                    <?php } ?></div>
                <ul class="ul">
                    <?php if ($this->config->get('themer_link1'.$lang) and $this->config->get('themer_menu1'.$lang)) { ?>
                    <li><a href="<?php echo $this->config->get('themer_link1'.$lang); ?>"><?php echo $this->config->get('themer_menu1'.$lang); ?></a></li>
                    <?php } ?>
                    <?php if ($this->config->get('themer_link2'.$lang) and $this->config->get('themer_menu2'.$lang)) { ?>
                    <li><a href="<?php echo $this->config->get('themer_link2'.$lang); ?>"><?php echo $this->config->get('themer_menu2'.$lang); ?></a></li>
                    <?php } ?>
                    <?php if ($this->config->get('themer_link3'.$lang) and $this->config->get('themer_menu3'.$lang)) { ?>
                    <li><a href="<?php echo $this->config->get('themer_link3'.$lang); ?>"><?php echo $this->config->get('themer_menu3'.$lang); ?></a></li>
                    <?php } ?>
                    <?php if ($this->config->get('themer_link4'.$lang) and $this->config->get('themer_menu4'.$lang)) { ?>
                    <li><a href="<?php echo $this->config->get('themer_link4'.$lang); ?>"><?php echo $this->config->get('themer_menu4'.$lang); ?></a></li>
                    <?php } ?>
                </ul>
            </div>
            <div class="col col2">
                <div class="title"><?php if ($this->config->get('themer_link19'.$lang) and $this->config->get('themer_menu19'.$lang)) { ?>
                    <a class="arrow-white" href="<?php echo $this->config->get('themer_link19'.$lang); ?>"><?php echo $this->config->get('themer_menu19'.$lang); ?></a>
                    <?php } ?></div>
                <ul class="ul">
                    <?php if ($this->config->get('themer_link5'.$lang) and $this->config->get('themer_menu5'.$lang)) { ?>
                    <li><a href="<?php echo $this->config->get('themer_link5'.$lang); ?>"><?php echo $this->config->get('themer_menu5'.$lang); ?></a></li>
                    <?php } ?>
                    <?php if ($this->config->get('themer_link6'.$lang) and $this->config->get('themer_menu6'.$lang)) { ?>
                    <li><a href="<?php echo $this->config->get('themer_link6'.$lang); ?>"><?php echo $this->config->get('themer_menu6'.$lang); ?></a></li>
                    <?php } ?>
                    <?php if ($this->config->get('themer_link7'.$lang) and $this->config->get('themer_menu7'.$lang)) { ?>
                    <li><a href="<?php echo $this->config->get('themer_link7'.$lang); ?>"><?php echo $this->config->get('themer_menu7'.$lang); ?></a></li>
                    <?php } ?>
                    <?php if ($this->config->get('themer_link8'.$lang) and $this->config->get('themer_menu8'.$lang)) { ?>
                    <li><a href="<?php echo $this->config->get('themer_link8'.$lang); ?>"><?php echo $this->config->get('themer_menu8'.$lang); ?></a></li>
                    <?php } ?>
                </ul>
            </div>
            <div class="col col3">
                <div class="title"><?php if ($this->config->get('themer_link18'.$lang) and $this->config->get('themer_menu18'.$lang)) { ?>
                    <a class="arrow-white" href="<?php echo $this->config->get('themer_link18'.$lang); ?>"><?php echo $this->config->get('themer_menu18'.$lang); ?></a>
                    <?php } ?></div>
                <ul class="ul">
                    <li><a class="ico-tel" href="tel:<?php echo str_replace(array(' ','-'),'',$this->config->get('themer_phone_number')); ?>"><?php echo $this->config->get('themer_phone_number'); ?></a></li>
                    <?php if(!empty($this->config->get('themer_mobile_phone_number'))) { ?>
                        <li><a class="ico-tel" href="tel:<?php echo str_replace(array(' ','-'),'', $this->config->get('themer_mobile_phone_number')); ?>"><?php echo $this->config->get('themer_mobile_phone_number'); ?></a></li>
                    <?php } ?>
                    <?php if(!empty($this->config->get('themer_email'))) { ?>
                        <li><a class="ico-mail" href="mailto:<?php echo str_replace(array(' ','-'),"",$this->config->get('themer_email')); ?>"><?php echo $this->config->get('themer_email'); ?></a></li>
                    <?php } ?>

                    <li class="ico-clock"><?php echo $this->config->get('themer_working_hoursru'); ?></li>
                </ul>
            </div>
            <div class="col col4">
                <div class="title"><?php if ($this->config->get('themer_link17'.$lang) and $this->config->get('themer_menu17'.$lang)) { ?><?php echo $this->config->get('themer_menu17'.$lang); ?><?php } ?></div>
                <ul class="ul social">
                    <li><a class="ico-ig" href="#"></a></li>
                    <li><a class="ico-fb" href="#"></a></li>
                    <li><a class="ico-yt" href="#"></a></li>
                </ul>
                <a href="#" class="switcher">Мобильная версия</a>
            </div>
        </div>
    </div>
    <div class="line2">
        <div class="inner">
            <div class="col col1">
                <?php echo $text_free_shipping; ?>
            </div>
            <div class="col col2">
                <?php echo $text_copyright; ?>
            </div>
            <div class="col col3">
                <?php echo $text_picasso; ?>
            </div>
            <div class="col col4">
                <img src="/img/payments.jpg" alt="">
            </div>
        </div>
    </div>
</div>
<div class="footer--pan">
    <a class="active ico-footmenu-home" href="/">Home</a>
    <a class="ico-footmenu-catalog" href="javascript:;">Catalog</a>
    <a class="ico-footmenu-favorite" href="/wishes">Favorite</a>
    <a class="ico-footmenu-profile" href="/profile">Profile</a>
    <a class="ico-footmenu-cart" href="/cart">Cart</a>
</div>
<!-- end of FOOTER -->

<link rel="stylesheet" href="catalog/view/theme/pic/libs/tooltipster.bundle.min.css?v=486979a49f3dea95ca46e610232ec7d5">

<script src="catalog/view/theme/pic/js/vendor/jquery.custom-select.js?v=486979a49f3dea95ca46e610232ec7d5"></script>
<!--<script src="catalog/view/theme/pic/js/vendor/jquery.nice-select.min.js?v=486979a49f3dea95ca46e610232ec7d5"></script>-->
<script src="catalog/view/theme/pic/js/vendor/zeynep.js?v=486979a49f3dea95ca46e610232ec7d5"></script>
<script src="catalog/view/theme/pic/js/vendor/jquery.accordion.js?v=486979a49f3dea95ca46e610232ec7d5"></script>
<script src="catalog/view/theme/pic/js/vendor/mosaic.js?v=486979a49f3dea95ca46e610232ec7d5"></script>
<script src="catalog/view/theme/pic/js/vendor/jquery.colorbox-min.js?v=486979a49f3dea95ca46e610232ec7d5"></script>
<script src="catalog/view/theme/pic/js/vendor/hoverintent.js?v=486979a49f3dea95ca46e610232ec7d5"></script>
<script src="catalog/view/theme/pic/js/vendor/scrollbar.min.js?v=486979a49f3dea95ca46e610232ec7d5"></script>
<script src="catalog/view/theme/pic/js/vendor/tooltipster.bundle.min.js?v=486979a49f3dea95ca46e610232ec7d5"></script>
<script src="catalog/view/theme/pic/js/vendor/fancybox3.min.js?v=486979a49f3dea95ca46e610232ec7d5"></script>

<script src="catalog/view/theme/pic/js/my.js?v=486979a49f3dea95ca46e610232ec7d5"></script>


<script type="text/javascript" src="catalog/view/javascript/common.js?v18"></script>

<?php foreach ($scripts as $script) { ?>
<script type="text/javascript" src="<?php echo $script; ?>"></script>
<?php } ?>
<!-- Yandex.Metrika counter -->
<script type="text/javascript" >
    /* закоментил чтобы гугл пахал (function (d, w, c) {
     (w[c] = w[c] || []).push(function() {
     try {
     w.yaCounter51139301 = new Ya.Metrika({
     id:51139301,
     clickmap:true,
     trackLinks:true,
     accurateTrackBounce:true,
     webvisor:true,
     ecommerce:"dataLayer"
     });
     } catch(e) { }
     });

     var n = d.getElementsByTagName("script")[0],
     s = d.createElement("script"),
     f = function () { n.parentNode.insertBefore(s, n); };
     s.type = "text/javascript";
     s.async = true;
     s.src = "https://mc.yandex.ru/metrika/watch.js";

     if (w.opera == "[object Opera]") {
     d.addEventListener("DOMContentLoaded", f, false);
     } else { f(); }
     })(document, window, "yandex_metrika_callbacks");*/
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/51139301" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
<!-- /Yandex.Metrika counter -->
<script type="text/javascript">
    function removeYandexEcommerce(id, name, price) {
        console.log('Rem-'+name);
        if(typeof dataLayer == 'undefined')
            return false;

        dataLayer.push({
            "ecommerce": {
                "remove": {
                    "products": [
                        {
                            "id": id,
                            "name": name,
                            "price": price
                        }
                    ]
                }
            }
        });
        return false;
    }
    function addYandexEcommerce(array) {
        console.log('Add-'+array['metrika_product_name']);
        if(typeof dataLayer == 'undefined')
            return false;

        dataLayer.push({
            "ecommerce": {
                "add": {
                    "products": [
                        {
                            "id": array['metrika_product_id'],
                            "name": array['metrika_product_name'],
                            "price": array['metrika_product_price'],
                            "brand": array['metrika_product_manufacturer'],
                            "category": array['metrika_product_category'],
                            "quantity": array['metrika_product_quantity']
                        }
                    ]
                }
            }
        });
        return false;
    }
</script>
</body>
</html>