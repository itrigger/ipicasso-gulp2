<!DOCTYPE html>
<html dir="<?php echo $direction; ?>" lang="<?php echo $lang; ?>">
<head>
<meta charset="UTF-8" />
<meta content="width=device-width, initial-scale=1" name="viewport">
<title><?php echo $title; if (isset($_GET['page'])) { echo " - ". ((int) $_GET['page'])." ".$text_page;} ?></title>
<base href="<?php echo $base; ?>" />
<?php if ($description) { ?>
<meta name="description" content="<?php echo $description; if (isset($_GET['page'])) { echo " - ". ((int) $_GET['page'])." ".$text_page;} ?>" />
<?php } ?>
<?php if ($keywords) { ?>
<meta name="keywords" content="<?php echo $keywords; ?>" />
<?php } ?>
<meta property="og:title" content="<?php echo $title; if (isset($_GET['page'])) { echo " - ". ((int) $_GET['page'])." ".$text_page;} ?>" />
<meta property="og:type" content="website" />
<meta property="og:url" content="<?php echo $og_url; ?>" />
<?php if ($og_image) { ?>
<meta property="og:image" content="<?php echo $og_image; ?>" />
<?php } else { ?>
<meta property="og:image" content="<?php echo $logo; ?>" />
<?php } ?>
<meta property="og:site_name" content="<?php echo $name; ?>" />
<?php if ($icon) { ?>
<link href="<?php echo $icon; ?>" rel="icon" />
<?php } ?>
<?php foreach ($links as $link) { ?>
<link href="<?php echo $link['href']; ?>" rel="<?php echo $link['rel']; ?>" />
<?php } ?>

<?php foreach ($styles as $style) { ?>
<link rel="<?php echo $style['rel']; ?>" property="stylesheet"  type="text/css" href="<?php echo $style['href']; ?>" media="<?php echo $style['media']; ?>" />
<?php } ?>


    <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap&v=88c6808f66d22f8b52cb605588409771" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;800&display=swap&v=88c6808f66d22f8b52cb605588409771" rel="stylesheet">
    <link href="catalog/view/theme/pic/libs/normalize.css?v=88c6808f66d22f8b52cb605588409771" rel="stylesheet" />
    <link href="catalog/view/theme/pic/libs/swiper-bundle.min.css?v=88c6808f66d22f8b52cb605588409771" rel="stylesheet" />
	 <link href="catalog/view/theme/pic/libs/swiper-bundle.min.css?v=88c6808f66d22f8b52cb605588409771" rel="stylesheet" />
	 
	<link href="catalog/view/theme/pic/libs/jquery.custom-select.css?v=1" rel="stylesheet" />
	<link href="catalog/view/theme/pic/libs/intlTelInput/css/intlTelInput.css?v=1" rel="stylesheet"/>
	<link href="catalog/view/theme/pic/libs/tooltipster.bundle.min.css?v=1" rel="stylesheet" />

    <link href="catalog/view/theme/pic/css/main.css?v=88c6808f66d22f8b52ceb605588409771" rel="stylesheet" />

    <script
            src="https://code.jquery.com/jquery-3.5.1.min.js"
            integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
            crossorigin="anonymous"></script>
    <script src="catalog/view/theme/pic/js/vendor/swiper-bundle.min.js?v=8fd61e76913e59249d1e4a9ada9cea45"></script>
    <link
            rel="stylesheet"
            href="catalog/view/theme/pic/libs/fancybox.min.css?v=486979a49f3dea95ca46e610232ec7d5"
    />
    <?php if ($stores) { ?>
<script type="text/javascript"><!--
$(document).ready(function() {
<?php foreach ($stores as $store) { ?>
$('body').prepend('<iframe src="<?php echo $store; ?>" style="display: none;"></iframe>');
<?php } ?>
});
//--></script>
<?php } ?>
<?php echo $google_analytics; ?>

    <script type="text/javascript">window.dataLayer = window.dataLayer || [];</script>

    <meta content="#fafafa" name="theme-color">


    <script src="catalog/view/theme/pic/js/vendor/jquery-ui.min.js?v=2b1f41938264fa9adbc53b548585649a"></script>
    <script defer type="text/javascript" src="/index.php?route=module/js_lang"></script>
</head>

<body>
<?php
//удаляет таблицу остатков в корзине, если мы ее покинули
if (!isset($this->request->get['route']) || isset($this->request->get['route']) && $this->request->get['route'] != 'checkout/simplecheckout') {
/*setcookie('code2', '', '','/','.'.$_SERVER['HTTP_HOST']);
setcookie ('code','','','/','.'.$_SERVER['HTTP_HOST']);*/
unset($_COOKIE['code2']);
unset($_COOKIE['code']);
}
?>
<div class="body_overlay"></div>
<!-- start of header -->
<header class="header" id="header">
    <div class="in">
        <div class="burger">
            <a class="burger--btn" href="javascript:void(0);">Menu</a>
        </div>
        <?php if ($logo) { ?>
            <div class="logo-wrapper">
              <?php if ($home == $og_url) { ?>
                <a href="#" class="logo" onclick="return false;" style="cursor: default;"></a>
              <?php } else { ?>
                <a class="logo" href="<?php echo $home; ?>"></a>
              <?php } ?>
            </div>
        <?php } ?>
        <div class="sign-block">
            <div class="greetings">Hello</div>
            <div class="sign-line">
                <a class="ico-user" href="/login"><?php //echo $text_cabinet;?></a>
            </div>
        </div>
        <?php echo $cart; ?>
        <div class="mobile_search_block">
            <a href="#" class="ico-search"></a>
        </div>
    </div>
</header>
<!-- end of header -->

    <!-- side menu -->
    <!-- side menu -->
    <!-- side menu -->
    <!-- side menu -->
    <div class="sidemenu" id="sidemenu">
        <div class="heading">
            <div class="sign-block">
                <div class="greetings">Hello</div>
                <div class="sign-line">
                    <a class="ico-user white" href="/login"><?php //echo $text_cabinet;?></a>
                </div>
            </div>
            <div class="close"></div>
        </div>


        <div class="j-sidemenu-scrollbar-wrapper">
            <div class="scrollbar-inner">
                <div class="sidemenu--catalog">
                    <div class="sidemenu--catalog_heading">CATALOG</div>
                    <ul class="ul sidemenu--catalog_ul zeynep">
                        <?php echo $category_superfish; ?>
                    </ul>
                </div>
                <div class="sidemenu--catalog_block2">
                    <ul class="ul sidemenu--catalog_ul">
                        <li class="sidemenu--ico-sale2"><a href="#">Sale</a></li>
                        <li class="sidemenu--ico-new"><a href="#">Новинки</a></li>
                        <li class="sidemenu--ico-soon"><a href="#">Coming soon</a></li>
                    </ul>
                </div>
                <div class="sidemenu--accordion">
                    <div class="js-accordion">
                        <div class="accordion_tab">
                            <?php echo $this->config->get('themer_menu20'.$lang); ?>
                            <div class="accordion_arrow"></div>
                        </div>
                        <div class="accordion_content">
                            <div class="accordion_item">
                                <ul class="ul js-accordion--ul">
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
                        </div>
                    </div>
                    <div class="js-accordion">
                        <div class="accordion_tab">
                            <?php echo $this->config->get('themer_menu19'.$lang); ?>
                            <div class="accordion_arrow"></div>
                        </div>
                        <div class="accordion_content">
                            <div class="accordion_item">
                                <ul class="ul js-accordion--ul">
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
                        </div>
                    </div>
                    <div class="js-accordion">
                        <div class="accordion_tab">
                            Media center
                            <div class="accordion_arrow"></div>
                        </div>
                        <div class="accordion_content">
                            <div class="accordion_item">
                                <ul class="ul js-accordion--ul">
                                    <li><a href="#">Wszystko</a></li>
                                    <li><a href="#">Aktualności</a></li>
                                    <li><a href="#">Artykuły i recenzje</a></li>
                                    <li><a href="#">Wideo</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="sidemenu--contacts">
                        <div class="mediacenter--heading">CONTACT</div>
                        <ul class="ul mediacenter--contacts">
                            <li class="ico-sidebar-phone">
                                <a href="tel:+48881044186">+48 881-044-186</a><br/>
                                <a href="tel:+48733782620">+48 733-782-620</a>
                            </li>
                            <li class="ico-sidebar-clock">
                                Pracujemy<br/>
                                pon-pt 9.00-17.00
                            </li>
                            <li class="ico-sidebar-mail">
                                <a href="mailto:ipicasso.pl@gmail.com">ipicasso.pl@gmail.com</a>
                            </li>
                        </ul>
                        <ul class="ul social sidemenu--social">
                            <li><a class="ico-ig" href="#"></a></li>
                            <li><a class="ico-fb" href="#"></a></li>
                            <li><a class="ico-yt" href="#"></a></li>
                        </ul>
                    </div>

                    </div>
                </div>
            </div>

        </div>


    <!-- end of side menu -->
    <!-- end of side menu -->



<?php echo $main_menu; ?>
<!-- end of main category menu -->
<div id="notification"></div>