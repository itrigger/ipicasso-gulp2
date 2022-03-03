<?php echo $header; ?>
<div itemscope  itemtype="//schema.org/Product" class="productclass">
	<div class="in">
		<div class="breadcrumb_w">
			<ul class="breadcrumb" itemscope itemtype="https://schema.org/BreadcrumbList">
				<?php $w_bc_total = count($breadcrumbs); if ($w_bc_total > 0) {
				$w_bc_last = $w_bc_total - 1; $k=1;
				foreach ($breadcrumbs as $i => $breadcrumb) { ?>
				<?php if ($i == $w_bc_last) { break; } ?>
				<?php if($k==1) { ?>
				<li class="home" itemprop="itemListElement" itemscope
					itemtype="https://schema.org/ListItem" ><a href="<?php echo $breadcrumb['href']; ?>" itemprop="item" ><span itemprop="name" > </span></a><meta itemprop="position" content="<?php echo $k; ?>" /></li>
				<? } else { ?>
				<li itemprop="itemListElement" itemscope
					itemtype="https://schema.org/ListItem" ><a href="<?php echo $breadcrumb['href']; ?>" itemprop="item" ><span itemprop="name" ><?php echo $breadcrumb['text']; ?></span></a><meta itemprop="position" content="<?php echo $k; ?>" /></li>
				<?php } $k++; } ?>
				<li itemprop="itemListElement" itemscope
					itemtype="https://schema.org/ListItem" ><span itemprop="name" ><?php echo $breadcrumbs[$w_bc_last]['text']; ?><?php } ?></span><meta itemprop="position" content="<?php echo $w_bc_total; ?>" /></li>
			</ul>

			<div class="ico-toggle"></div>
		</div>
	</div>
	<?php echo $content_top; ?>		<div class="in pd_grid">
			<div class="pd_title_860 s-col-6 xs-col-4">
				<div class="d_f jc_sb">
					<div class="pd_title"><?php echo $heading_title; ?></div>
					<div class="labels ml_auto">
						<?php if ($product_info['special']) { ?>
						<span class="label label--discount">-<?php echo $product_info['saving']; ?>%</span>
						<?php } ?>
						<span class="label label--soon">coming soon</span>
					</div>
					<div class="d_f ai_top | pi_stock"><span>Available from</span> 06.09.2021</div>
				</div>
				<div class="d_f jc_sb">
					<div class="d_f rating-star-w">
						<div class="rating-star">
							<div class="stars star-<?php echo $product_info['rating']; ?>"></div>
						</div>
						<div class="pd_review_count"><a href="#"><?php echo $product_info['reviews']; ?> <?php echo $text_reviews_text; ?></a></div>
						<div class="pd_share"></div>
					</div>
					<div class="pd_title_code_w d_f">
						<div class="grey"><?php echo $product_info['model']; ?></div>
						<div class="pd_title_code">
							<?php echo $text_item_code; ?> <b><?php echo $product_info['sku']; ?></b>
						</div>
					</div>
				</div>
			</div>
			<div class="product_img col-4 l-col-4 m-col-5 xs-col-4">
				<?php if ($product_info['thumb']) { ?>
				<div class="product_img--image">
					<a href="<?php echo $product_info['popup']; ?>" data-fancybox="gal-prettyPhoto[pp_gal1]"
					   id="zoom_link1">
						<img itemprop="image" id="image"
							 src="<?php echo $product_info['thumb']; ?>"
							 title="<?php echo $heading_title; ?> <?php echo $alt_product_category; ?>"  alt='<?php echo $heading_title; ?> <?php echo $alt_product_category; ?>'
							 data-zoom-image="<?php echo $product_info['popup']; ?>"/>
					</a>
					<div class="product_img--image-btn btn-left"></div>
					<div class="product_img--image-btn btn-right"></div>
					<div class="product_img--image-counter"></div>
				</div>
				<?php } else { ?>
				<div class="product_img--image">
					<img src="/catalog/view/image/no_image-460x347.jpg"  id="image" />
				</div>
				<?php }?>

				<?php if ($product_info['images']) { ?>
				<div class="hidden" id="duplicate_of_thumbs">
					<a href="<?php echo $product_info['popup']; ?>"
					   title="<?php echo $heading_title; ?> <?php echo $alt_product_category; ?>"  data="<?php echo $product_info['thumb']; ?>"  class="selected <?php echo ($product_info['popup']==$product_info['popup']) ? " " : "";?>" class="zoom_additional" data-image="<?php echo $product_info['thumb2']; ?>" data-zoom-image="<?php echo $product_info['popup']; ?>"
					rel="prettyPhoto[pp_gal1]"
					></a>
					<?php foreach ($product_info['images'] as $image) { ?>
					<a href="<?php echo $image['popup']; ?>"
					   title="<?php echo $heading_title; ?> <?php echo $alt_product_category; ?>"
					   data="<?php echo $image['thumb']; ?>"
					   class=" <?php echo ($image['popup']==$popup) ? " " : "";?>"                                                                                                                                                                                                                                      class="zoom_additional"
					data-image="<?php echo $image['thumb2']; ?>"
					data-zoom-image="<?php echo $popup; ?>"
					rel="prettyPhoto[pp_gal1]"
					/>
					</a>
					<?php } ?>
				</div>
				<?php } ?>
				<?php if ($product_info['images']) { ?>
				<div class="image-additional">
					<div id="gallery">
						<div class="swiper-container">
							<div class="swiper-wrapper">
								<div class="swiper-slide ">
									<a
											href="<?php echo $product_info['popup']; ?>"
											title="<?php echo $heading_title; ?> <?php echo $alt_product_category; ?>"
											data="<?php echo $product_info['thumb']; ?>"
											class="selected <?php echo ($product_info['popup']==$product_info['popup']) ? " " : "";?>"                                                                                                                                                                                                                                   class="zoom_additional"
									data-image="<?php echo $product_info['thumb2']; ?>"
									data-zoom-image="<?php echo $product_info['popup']; ?>"
									>
									<img src="<?php echo $product_info['thumbadditional']; ?>"
										 title="<?php echo $heading_title; ?> <?php echo $alt_product_category; ?>"
										 alt="<?php echo $heading_title; ?> <?php echo $alt_product_category; ?>"
									/>
									</a>
								</div>
								<?php foreach ($product_info['images'] as $image) { ?>
								<div class="swiper-slide">
									<a
											href="<?php echo $image['popup']; ?>"
											title="<?php echo $heading_title; ?>"
											data="<?php echo $image['thumb']; ?>"
											class=" <?php echo ($image['popup']==$popup) ? " " : "";?>"                                                                                                                                                                                                                                      class="zoom_additional"
									data-image="<?php echo $image['thumb2']; ?>"
									data-zoom-image="<?php echo $popup; ?>"
									>
									<img src="<?php echo $image['thumb']; ?>"
										 title="<?php echo $heading_title; ?> <?php echo $alt_product_category; ?>"
										 alt="<?php echo $heading_title; ?> <?php echo $alt_product_category; ?>">
									</a>
								</div>
								<?php } ?>
							</div>
						</div>
						<div class="swiper-button-prev"></div>
						<div class="swiper-button-next"></div>
					</div>
				</div>
				<?php } ?>
			</div>
			<div class="product_desc col-4 l-col-3 m-col-3 s-col-3  xs-col-4">
				<div class="labels_min d_f jc_sb">
					<div class="labels">
						<span class="label label--discount">-10%</span>
						<span class="label label--soon">coming soon</span>
					</div>
					<div class="d_f ai_top | pi_stock">Available from 06.09.2021</div>
				</div>

				<div class="pd_title"><?php echo $heading_title; ?></div>
				<div class="pd_title_code_w d_f">
					<div class="grey"><?php echo $product_info['model']; ?></div>
					<div class="pd_title_code">
						<?php echo $text_item_code; ?> <b><?php echo $product_info['sku']; ?></b>
					</div>
				</div>
				<div class="d_f rating-star-w">
					<div class="rating-star">
						<div class="stars star-<?php echo $product_info['rating']; ?>"></div>
					</div>
					<div class="pd_review_count"><a href="#"><?php echo $product_info['reviews']; ?> <?php echo $text_reviews_text; ?></a></div>
					<div class="pd_share"></div>
				</div>


				<div class="pd_new_sale">
					<? if ($product_info['ucen_href']){ ?>
					<ul class="tab_btns">
						<li  data-tab-content="11" class="active"><a href="#">Najnowsze towary</a></li>
						<li  data-tab-content="12"><a href="<?=$product_info['ucen_href']; ?>">Wszystkie towary</a></li>
					</ul>
					<? } elseif ($product_info['original_href']) { ?>
					<ul class="tab_btns">
						<li  data-tab-content="11"><a href="<?=$product_info['original_href']; ?>">Najnowsze towary</a></li>
						<li data-tab-content="12" class="active"><a href="#">Wszystkie towary</a></li>
					</ul>
					<? } ?>
					<div class="tabs_content_w">
						<div class="tab_content" data-tab="11" style="display: grid;"></div>
						<div class="tab_content" data-tab="12" style="display: none;">
							<ul class="sale_ul">
								<li class="active">
									<div class="desc">
										Краткое описание уцененного товара, основные
										дефекты и так далее.
										<div class="link_more">Подробнее</div>
									</div>
									<div class="price">80.00 <span>zt</span></div>
								</li>
								<li>
									<div class="desc">
										Краткое описание уцененного товара, основные
										дефекты и так далее.
										<div class="link_more">Подробнее</div>
									</div>
									<div class="price">85.00 <span>zt</span></div>
								</li>
								<li class="hidden">
									<div class="desc">
										Краткое описание уцененного товара, основные
										дефекты и так далее.
										<div class="link_more">Подробнее</div>
									</div>
									<div class="price">85.00 <span>zt</span></div>
								</li>
								<li class="hidden">
									<div class="desc">
										Краткое описание уцененного товара, основные
										дефекты и так далее.
										<div class="link_more">Подробнее</div>
									</div>
									<div class="price">85.00 <span>zt</span></div>
								</li>
								<li class="hidden">
									<div class="desc">
										Краткое описание уцененного товара, основные
										дефекты и так далее.
										<div class="link_more">Подробнее</div>
									</div>
									<div class="price">85.00 <span>zt</span></div>
								</li>
							</ul>
							<a href="javascript:;" class="show_hidden_saleitems col-4">еще <span>3</span> товара</a>
						</div>
					</div>

				</div>
				<div class="pd_specification_title active"><?php echo $text_characteristic_header; ?> <span class="ico ico-arr_dd"></span></div>
				<div class="pd_spec_w">
					<div class="pd_specification">

						<ul class="pd_specification_ul">
							<?php  if ($product_info['attribute_groups']) { ?>

							<?php foreach ($product_info['attribute_groups'] as $attribute_group) { ?>
							<?php foreach ($attribute_group['attribute_top'] as $attribute) { ?>
							<li>
								<span class="text"><?php echo $attribute['name']; ?></span>
								<span class="page"><?php echo $attribute['text']; ?></span>
							</li>
							<?php } ?>
							<?php } ?>
							<?php } ?>

						</ul>
					</div>

					<div class="pd_sizes">
						Image size, cm
						<ul class="filter--ul">
							<li class="active"><a href="#">30x30</a></li>
							<li><a href="#">30x40</a><span>+ 15zt</span></li>
							<li><a href="#">30x50</a><span>+ 20zt</span></li>
						</ul>







					</div>
					<?php  if ($product_info['attribute_groups']) { ?>
					<div class="pd_detailed_specification">
						<?php if(!empty($product_info['orign_href'])){?><a href="<?=$orign_href?>"> <?php echo $text_more_characteristic; ?></a><?} else {?>
						<a href="#detailed_specification" class="title scrollto"><?php echo $text_more_characteristic; ?></a>
						<?php } ?>
					</div>
					<?php } ?>
				</div>

			</div>
			<div class="product_info col-4 l-col-3 m-col-8 s-col-3  xs-col-4">
				<div class="spoiler_title">Delivery <span class="ico ico-arr_dd"></span></div>
				<div class="labels">
					<?php if ($product_info['special']) { ?>
					<span class="label label--discount">-<?php echo $product_info['saving']; ?>%</span>
					<? } ?>
					<?php if ($product_info['date_available']) { ?>
					<span class="label label--soon">coming soon</span>
					<? } ?>
				</div>
				<?php if ($product_info['price']) { ?>
	    		<span itemprop="offers" itemscope itemtype = "https://schema.org/Offer">
					<link itemprop="url" href="<?php echo $product_info['url'] ?>" />
					<meta itemprop="price" content="<?php echo rtrim(preg_replace("/[^0-9\.]/", "", ($product_info['special'] ? $product_info['special'] : $product_info['price'])), '.'); ?>" />
					<meta itemprop="priceCurrency" content="<?php echo $_SESSION['currency']; ?>" />
					<meta itemprop="sku" content="<?php echo $product_info['sku']; ?>" />
					<link itemprop="availability" href="https://schema.org/<?=$product_info['quantity']?'InStock':'OutOfStock' ?>" />
					<link itemprop="itemCondition" href="https://schema.org/NewCondition" />
					<meta itemprop="name" content="<?php echo $heading_title; ?> <?php echo $size; ?>" />
					<span itemprop="seller" itemscope  itemtype="https://schema.org/Organization" >
					<meta itemprop="name" content="IPICASSO Sp. z o.o."  />
					</span>

	  			</span>
				<?php } ?>
				<div itemprop="brand" itemtype="https://schema.org/Brand" itemscope>
					<meta itemprop="name" content="Picasso" />
				</div>
				<div class="d_f jc_sb pi_price_w">
					<div class="pi_price">
						<?php if (!$product_info['special']) { ?>
						<?php echo $product_info['price']; ?>
						<?php } else { ?>
						<div class="new-price"><?php echo $product_info['special']; ?></div>
						<div class="old-price"><?php echo $product_info['price']; ?></div>
						<?php } ?>
					</div>
					<?php if ($product_info['date_available']) { ?>
					<div class="d_f ai_top | pi_stock"><?php echo $product_info['stock']; ?></div>
					<?php } ?>
				</div>

				<div class="pi_btns d_f">
					<div class="cartbutton">
						<div class="newcartbtn_w" style="display: none;">
							<div class="plusone hint tooltipstered">+1</div>
							<a href="/cart/" class="newcartbtn btn-big">
								<div class="getcarthint">В корзине <span><i>1</i> шт.</span></div>
								<?php echo $text_go_cart; ?>
							</a>
						</div>
						<a type="button" title="<?php echo $product_info['quantity'] ? $button_cart :  $text_out_of_stock; ?>" id="<?php echo $product_info['quantity'] ? "button-cart" : "button-nocart"; ?>" <?php echo $product_info['quantity'] ? "" : "disabled"; ?> class="btn btn-big <?php echo $product_info['quantity'] ? "" : "button-disabled"; ?>"><?php echo $product_info['quantity'] ? $button_cart :  $text_out_of_stock; ?></a>
					</div>

					<!--
                    <a href="#" class="btn btn-big btn-yellow">Сообщить о поступлении</a>
                    -->
					<div class="pi_like_w d_f jc_c ai_c">
						<div class="pi_like"></div>
					</div>
					<? if($product_info['quantity']){ ?>
					<div class="hidden">
						<br />
						<?php echo $text_qty; ?><br />
						<span id="minus" class="quantity-operator">-</span>
						<input class="quantity-productcart" type="text" style="width:36px!important;" name="quantity" size="2" value="<?php echo $product_info['minimum']; ?>" />
						<span id="plus" class="quantity-operator">+</span>
						<input type="hidden" name="product_id" size="2" value="<?php echo $product_id; ?>" />
						<?php if ($product_info['minimum'] > 1) { ?>
						<div class="minimum"><?php echo $text_minimum; ?></div>
						<?php } ?>
					</div>
					<?php } ?>
				</div>


				<div class="pi_delivery_block">
					<div class="pi_deliv_item d_f">
						<div class="pid_img d_f ai_c jc_c">
							<img src="/catalog/view/theme/pic/img/ic-dispatch.svg" height="40" width="39"/>
						</div>
						<div class="pid_desc d_f fd_c">
							<div class="pid_title">Dispatch</div>
							<div class="pid_info"></div>
							<a href="#" class="pid_link">Dispatch terms</a>
						</div>
						<div class="pid_price_h">
							<div class="pid_price"></div>
							<div class="pid_time">24h</div>
						</div>
					</div>
					<div class="pi_deliv_item d_f">
						<div class="pid_img d_f ai_c jc_c">
							<img src="/catalog/view/theme/pic/img/ic-inpost.svg" height="34" width="56"/>
						</div>
						<div class="pid_desc d_f fd_c">
							<div class="pid_title">Paczkomat</div>
							<div class="pid_info">free on orders from 30zt</div>
							<a href="#" class="pid_link">Delivery terms</a>
						</div>
						<div class="pid_price_h">
							<div class="pid_price">8.00 zt</div>
							<div class="pid_time">1 working day</div>
						</div>
					</div>
					<div class="pi_deliv_item d_f">
						<div class="pid_img d_f ai_c jc_c">
							<img src="/catalog/view/theme/pic/img/ic-ukdelivery.svg" height="26" width="43"/>
						</div>
						<div class="pid_desc d_f fd_c">
							<div class="pid_title">UK delivery</div>
							<div class="pid_info">free on orders from 30zt</div>
							<a href="#" class="pid_link">Delivery terms</a>
						</div>
						<div class="pid_price_h">
							<div class="pid_price">8.00 zt</div>
							<div class="pid_time">1 working day</div>
						</div>
					</div>
					<div class="pi_deliv_item d_f">
						<div class="pid_img d_f ai_c jc_c">
							<img src="/catalog/view/theme/pic/img/ic-pickup.svg" height="40" width="40"/>
						</div>
						<div class="pid_desc d_f fd_c">
							<div class="pid_title">Pickup</div>
							<div class="pid_info">Stoneczna 194, Kolonia Lesznowola</div>
							<a href="#" class="pid_link">Dispatch terms</a>
						</div>
						<div class="pid_price_h">
							<div class="pid_price">FREE</div>
							<div class="pid_time">pon-pt: 9:00-17:00</div>
						</div>
					</div>

					<div class="pi_deliv_item d_f">
						<div class="pid_img d_f ai_c jc_c">
							<img src="/catalog/view/theme/pic/img/ic-internat.svg" height="33" width="47"/>
						</div>
						<div class="pid_desc d_f fd_c">
							<div class="pid_title">International Shipping</div>
							<div class="pid_info">free on orders from 30zt</div>
							<a href="#" class="pid_link">Shipping terms</a>
						</div>
						<div class="pid_price_h">
							<div class="pid_price">from 20.00 zt</div>
							<div class="pid_time">from 3 working days</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="in product_body_w">
			<div class="product_body">
				<?php if ($product_info['count_works']) { ?>
				<div class="customers_works">
					<h2><?php echo $text_user_image; ?></h2>

					<div class="swiper-container pp_works">
						<div class="swiper-wrapper">
							<?php foreach ($product_info['user_images'] as $user_image) { ?>
							<div class="swiper-slide">
								<div class="item">
									<?php if ($user_image['thumb']) { ?>
									<div class="image">
										<a href="<?php echo $user_image['popup']; ?>" title="<?php echo $user_image['alt']; ?>"
										   data="<?php echo $user_image['thumb']; ?>"
										   class="uimage zoom_additional" data-fancybox="gal-rev_photo-2"
										   data-image="<?php echo $user_image['popup']; ?>"
										   data-zoom-image="<?php echo $user_image['popup']; ?>">
											<img src="<?php echo $user_image['thumb']; ?>"
												 alt="<?php echo $user_image['alt']; ?>" />
										</a>
									</div>
									<?php } ?>
								</div>
							</div>
							<?php } ?>
						</div>
					</div>
					<div class="swiper-button-prev"></div>
					<div class="swiper-button-next"></div>
				</div>
				<?php } ?>
				<!--        <div class="tabs_head swiper-container-wrapper">
                            <div class="swiper-container">
                                <ul class="ul swiper-wrapper">-->

				<div class="p_tabs" id="detailed_specification">
					<div class="tabs_head swiper-container-wrapper">
						<div class="swiper-container">
							<ul class="ul swiper-wrapper">
								<li class="active swiper-slide" data-tab-content="1"><?php echo $tab_description; ?></li>
								<?php if ($product_info['review_status']) { ?>
								<li class=" swiper-slide" data-tab-content="2"><?php echo $tab_review; ?></li>
								<?php } ?>
								<?php if ($products) { ?>
								<li class=" swiper-slide" data-tab-content="3"><?php echo $tab_related; ?></li>
								<?php } ?>
							</ul>
						</div>
					</div>
					<div class="tabs_content_w">
						<div class="tab_content" data-tab="1" style="display: grid;">
							<div class="p_desc_w">
								<?php echo $product_info['description']; ?>
								<meta itemprop="description" content="<?php echo $product_info['meta_description']; ?>" />
							</div>

							<div class="last_review_w">
								<h2>Last Reviews <span class="rev_count"><?php echo $product_info['reviews']; ?></span></h2>

								<div class="d_f | rev_main_rate">
									<div class="rating-star">
										<div class="stars star-<?php echo $average_rating; ?>"></div>
									</div>
									<div class="rev_rate">
										<?php echo $average_rating; ?>
									</div>
								</div>
								<div class="review_item">
									<div class="d_f jc_sb | rev_name_w">
										<div class="rev_name"><?php echo $last_review['author']; ?></div>
										<div class="rev_date"><?php echo $last_review['date_added']; ?></div>
									</div>
									<div class="d_f jc_sb | rev_stars_w">
										<div class="rating-star">
											<div class="stars star-<?php echo $last_review['rating']; ?>"></div>
										</div>
										<?php if(!empty($last_review['POLECAM'])){ ?>
										<div class="d_f ai_c | rev_irecommend">
											<span class="ico ico-left ico-recommend"></span>  <?php echo $text_recommend; ?>
										</div>
										<?php } ?>
									</div>
									<div class="d_f | rev_desc">
										<?php echo $last_review['text']; ?>
									</div>
									<div class="rev_posneg_w">
										<div class="rev_posneg">
											<?php if($last_review['Wady']) { ?>
											<div class="rev_pos">
												<div class="rev_pos--title"><?php echo $text_wady; ?></div>
												<div class="rev_pos--text"><?php echo $last_review['Wady']; ?></div>
											</div>
											<?php } ?>
											<?php if($last_review['Zlety']) { ?>
											<div class="rev_neg">
												<div class="rev_neg--title"><?php echo $text_zlety; ?></div>
												<div class="rev_neg--text"><?php echo $last_review['Zlety']; ?></div>
											</div>
											<?php } ?>
											<div class="rev_more">
												<a href="#" class="d_f ai_c"><?php echo $text_all; ?> <span class="ico ico-arr-more"></span></a>
											</div>
										</div>
										<?php if(!empty($last_review_photo))?>
										<div class="rev_imgs">
											<div class="rev_img">
												<?php $i=0; foreach($last_review_photo as $photo) { $i++; ?>
												<a href="<?php echo $photo['popup']; ?>" data-fancybox="gal-rev_photo-1"><img src="<?php echo $photo['thumb']; ?>" alt=""><?php if($i==2 && count($last_review_photo)>2){ ?> <span>+<?php echo count($last_review_photo)-2 ?></span> <?php } ?></a>

											</div>
										</div>
										<?php } ?>
									</div>
								</div>
							</div>

					<span class="pd_specification_w" style="margin-top: 46px;">
						<?php foreach ($product_info['attribute_groups'] as $attribute_group) { ?>
						<?php if (!empty($attribute_group['attribute'])) { ?>
						<div class="pd_specification">
							<div class="pd_specification_title"><?php echo $attribute_group['name']; ?></div>
						<ul class="pd_specification_ul">
							<?php  foreach ($attribute_group['attribute'] as $attribute) { ?>
							<?php if ($attribute['explode'] && count($split_attr = explode(';', $attribute['text']))>1){ ?>
							<?php foreach ($split_attr as $attr) { ?>
							<li>- <?php echo $attr; ?> </li>
							<?php } ?>
							<? } else { ?>
							<li>
								<span class="text"><?php echo $attribute['name']; ?></span>
								<span class="page"><?php echo $attribute['text']; ?></span>
							</li>
							<?php } ?>
							<? } ?>
						</ul>
						</div>
						<?php } ?>

						<?php } ?>
						</div>
						<div id="tabs" class="htabs" style="display: none" >
							<div class="in">
								<a href="#tab-description"><?php echo $tab_description; ?></a>
								<?php if ($product_info['review_status']) { ?>
								<a href="#tab-review"><?php echo $tab_review; ?></a>
								<?php } ?>
								<?php if ($products) { ?>
								<a href="#tab-related"><?php echo $tab_related; ?> (<?php echo count($products); ?>)</a>
								<?php } ?>
								<?php if ($product_info['quantity']) { ?>
								<!--<a href="#tab-availability">Наличие</a>-->
								<?php } ?>
							</div>
						</div>
						<div class="tab_content" id="tab-review" data-tab="2" style="display: none;">
							<div id="review"></div>


						</div>
						<div class="tab_content" data-tab="3" style="display: none;">
							<div class="tab_in">
								<h2>Related products</h2>
								 <div class="tabs_w">
									<div class="tabs_d" >
										<div class="swiper-container-wrapper">
											<div class="swiper-container">
												<ul class="ul swiper-wrapper">
													<li class="cm--item active" data-tab-content="all">All</li>
													<li class="cm--item" data-tab-content="malowanie-po-numerach">Рамки</li>
													<li class="cm--item" data-tab-content="ramy-do-obrazow">Кисти</li>
													<li class="cm--item" data-tab-content="diamentowa-mozaika">Краски</li>
												</ul>
											</div>
										</div>
									</div>
								</div> 

								<div class="category_content_items  cci-5 tab_content" data-tab="all">
									<?php if ($products){ //print_r($products); ?>
									<?php foreach ($products as $product){ ?>
									<div class=" category--item card">
										<div class="shover"></div>
										<a class="pic" href="#">
											<img loading="lazy" src="<?php echo $product['thumb']; ?>" class="imgbig" alt="">
											<img loading="lazy" src="<?php echo $product['thumb']; ?>" class="imgsmall" alt=""/>
										</a>
										<div class="price_w">
											<?php if (!$product['special']) { ?>
											<div class="price"><?php echo $product['price']; ?></div>
											<?php } else { ?>

											<?php } ?>
											<div class="cart_btn_w">
												<div class="cart_btn__like tooltipstered like <?php if (in_array($product['product_id'], $this->session->data['wishlist'])){ ?> active <?php } ?>" onclick="addToWishList('<?php echo $product['product_id']; ?>',this);"  >

												</div>
												<div class="addcart<?php echo $product['product_id']; ?>" >
													<?php if ($product['quantity']) { ?>
													<div class="cart_btn__incart">
														<div class="notify notify--empty">+</div>
														<a onclick="addToCart('<?php echo $product['product_id']; ?>',1,'category');" class="cart_btn__hover"><?php echo $button_cart; ?></a>
														<div class="add_delete_w">
															<a href="#" class="btn-decrease"  data-id="<?php echo $product['product_id']; ?>"></a>
															<input type="text" data-onchange="changeProductQuantity" name="quantity<?php echo $product['product_id']; ?>" value="1" size="1" />
															<a href="#" class="btn-increase" data-onclick="increaseProductQuantity"  onclick="addToCart('<?php echo $product['product_id']; ?>');"></a>
														</div>
													</div>
													<?php } ?>
												</div>
											</div>
										</div>
										<!--<div class="labels"><span class="label label--soon">coming soon</span> from 31.05.2020</div>-->
										<div class="cat"><?php echo $product['category_name']; ?></div>
										<a  class="name" href="<?php echo $product['href']; ?>"><?php echo $product['name']; ?></a>
										<div class="attrs">
											<div class="rating">
												<div class="rating-star">
													<div class="stars star-<?php echo $product['rating']; ?>"></div>
												</div>
											</div>
											<a class="comments" href="#"><?php echo $product['reviews']; ?></a>
											<a class="pics" href="#"><?php echo count($product['user_images']); ?></a>
										</div>
										<div class="additions">
											<div class="sizes">
												Size, cm
												<ul class="filter--ul">
													<li><a href="#">30x30</a></li>
													<li><a href="#">30x40</a></li>
													<li><a href="#">30x50</a></li>
												</ul>
											</div>
											<div class="colors"><?php echo $product['count_color']?$text_count_color.' '.$product['count_color']:'' ?>
												<div class="brushes">
													<div class="brush brush-<?php echo $product['brush']; ?>"></div>
												</div>
											</div>
										</div>
									</div>
									<?php } } ?>

								</div>
							 <div class="category_content_items cci-5 tab_content" data-tab="malowanie-po-numerach" style="display:none;">
       2
    </div>
    <div class="category_content_items cci-5 tab_content" data-tab="ramy-do-obrazow" style="display:none;">
        3
    </div>
    <div class="category_content_items cci-5 tab_content" data-tab="diamentowa-mozaika" style="display:none;">
        4
    </div>
							</div>
						</div>
					</div>
				</div>

			</div>
		</div>
		<div id="popup_sale_item" style="display: none;">
			<div class="review_form">
				<div class="col-4">
					<h3>Информация об уцененном товаре<br> Mirror of the soul</h3>
				</div>

				<div class="col-4">
					<div class="psi-desc">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
						dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
						ex ea commodo consequat.
					</div>
				</div>

				<div class="pd_specification col-4">
					<ul class="pd_specification_ul">
						<li>
							<span class="text">Brand</span>
							<span class="page"><a href="#">Picasso</a></span>
						</li>
						<li>
							<span class="text">Subject</span>
							<span class="page">People and Animals</span>
						</li>
						<li>
							<span class="text">Number of colors</span>
							<span class="page">42</span>
						</li>
						<li>
							<span class="text">Picture format</span>
							<span class="page">Single</span>
						</li>
					</ul>
				</div>

				<div class="psi_mini_gallery col-4">
					<a href="https://ipicasso.pl/image/cache/data/goods/00000005031_2-800x800.jpg"
					   title="Zwierciadło duszy"
					   data="https://ipicasso.pl/image/cache/data/goods/00000005031_2-94x76.jpg"
					   data-image="https://ipicasso.pl/image/cache/data/goods/00000005031_2-460x347.jpg"
					   data-zoom-image="">
						<img src="/catalog/view/theme/pic/img/product/00000005031_2-94x76.jpg"
							 title="Zwierciadło duszy malowanie po numerach"
							 alt="Zwierciadło duszy malowanie po numerach">
					</a>
					<a href="https://ipicasso.pl/image/cache/data/goods/00000005031_3-800x800.jpg"
					   title="Zwierciadło duszy"
					   data="https://ipicasso.pl/image/cache/data/goods/00000005031_3-94x76.jpg"
					   data-image="https://ipicasso.pl/image/cache/data/goods/00000005031_3-460x347.jpg"
					   data-zoom-image="">
						<img src="/catalog/view/theme/pic/img/product/00000005031_3-94x76.jpg"
							 title="Zwierciadło duszy malowanie po numerach"
							 alt="Zwierciadło duszy malowanie po numerach">
					</a>
					<a href="/catalog/view/theme/pic/img/product/00000005031_4-800x800.jpg"
					   title="Zwierciadło duszy"
					   data="/catalog/view/theme/pic/img/product/00000005031_4-94x76.jpg"
					   data-image="/catalog/view/theme/pic/img/product/00000005031_4-460x347.jpg"
					   data-zoom-image="">
						<img src="/catalog/view/theme/pic/img/product/00000005031_4-94x76.jpg"
							 title="Zwierciadło duszy malowanie po numerach"
							 alt="Zwierciadło duszy malowanie po numerach">
					</a>
					<a href="/catalog/view/theme/pic/img/product/00000005031_5-800x800.jpg"
					   title="Zwierciadło duszy"
					   data="/catalog/view/theme/pic/img/product/00000005031_5-94x76.jpg"
					   data-image="/catalog/view/theme/pic/img/product/00000005031_5-460x347.jpg"
					   data-zoom-image="">
						<img src="/catalog/view/theme/pic/img/product/00000005031_5-94x76.jpg"
							 title="Zwierciadło duszy malowanie po numerach"
							 alt="Zwierciadło duszy malowanie po numerach">
					</a>
					<a href="https://ipicasso.pl/image/cache/data/goods/00000005031_3-800x800.jpg"
					   title="Zwierciadło duszy"
					   data="https://ipicasso.pl/image/cache/data/goods/00000005031_3-94x76.jpg"
					   data-image="https://ipicasso.pl/image/cache/data/goods/00000005031_3-460x347.jpg"
					   data-zoom-image="">
						<img src="/catalog/view/theme/pic/img/product/00000005031_3-94x76.jpg"
							 title="Zwierciadło duszy malowanie po numerach"
							 alt="Zwierciadło duszy malowanie po numerach">
					</a>
				</div>

				<div class="col-4 | psi_btn_w">
					<a type="button" title="Do Koszyka" id="button-cart" class="btn btn-big">В корзину</a>
				</div>

			</div>

		</div>
	<?php echo $content_bottom; ?>
</div>

<script src="catalog/view/theme/pic/js/vendor/jquery.touchSwipe.min.js"></script>
<script>
	var Start_state = 1; // 1 - max, 0 - min
	var myCurSlideIndex = 0;

	// костыль для перемещения блоков по странице
	var wrapPd = function (state) {
		var SlidesCount = $("#gallery .swiper-wrapper .swiper-slide").length;
		if (state === 1) {
			$('.product_desc').wrap("<div class='pd_wrap_860_2 s-col-6'></div>");
			$(".pd_wrap_860_2").append($('.product_info'));
			$(".pd_wrap_860_2").prepend($('.product_info .pi_btns'));
			$(".pd_wrap_860_2").prepend($('.product_info .pi_price_w'));
			$(".product_img--image").prepend($(".pi_like_w"));
			Start_state = 0;
			$(".product_img--image a.colorbox").swipe({
				swipeLeft: function (event, direction, distance, duration, fingerCount) {
					if (myCurSlideIndex < SlidesCount) {
						$("#gallery .swiper-slide").eq(myCurSlideIndex + 1).find("a").click();
					}
				},
				swipeRight: function (event, direction, distance, duration, fingerCount) {
					if (myCurSlideIndex > 0) {
						$("#gallery .swiper-slide").eq(myCurSlideIndex - 1).find("a").click();
					}
				}

			});
		} else {
			$('.product_desc').insertAfter(".product_img");
			$('.product_info').insertAfter(".product_desc");
			$(".pi_btns, .pi_price_w").insertAfter($('.product_info .labels'));
			$(".pi_like_w").insertAfter($(".pi_btns .cartbutton"));
			$(".pd_wrap_860_2").remove()
			Start_state = 1;
		}
	}

	$('document').ready(function () {

		var sale_btn_spoiler_text = "";
		var sale_btn_spoiler_status = 0;

		$(".sale_ul li").on('click', function () {
			$.fancybox.open({
				src: '#popup_sale_item',
				type: 'inline',
				opts: {
					touch: false,
					keyboard: false
				},
			});
		})

		var swiper = new Swiper('#gallery .swiper-container', {
			slidesPerView: 5,
			speed: 400,
			navigation: {
				nextEl: '#gallery .swiper-button-next',
				prevEl: '#gallery .swiper-button-prev',
			},
			on: {
				slideChange: function () {
					$("#gallery").find(".swiper-slide-active").click();
					console.log(swiper.activeIndex)
				}
			},
			breakpoints: {
				320: {
					direction: 'vertical',
				},
				860: {
					direction: 'vertical',
				},
				1140: {
					direction: 'vertical',
					slidesPerView: 5,
				},
				1440: {
					direction: 'horizontal'
				}
			}
		});

		var pp_works = new Swiper('.pp_works', {
			slidesPerView: 7,
			spaceBetween: 20,
			speed: 400,
			//slidesPerView: 'auto',
			slidesOffsetAfter: 10,
			// slideClass: 'mm--item',
			slideToClickedSlide: true,
			watchOverflow: true,
			navigation: {
				nextEl: '.customers_works .swiper-button-next',
				prevEl: '.customers_works .swiper-button-prev',
			},
			breakpoints: {
				320: {
					slidesPerView: 'auto',
					spaceBetween: 17,
					navigation: false,
				},
				860: {
					slidesPerView: 'auto',
					spaceBetween: 20,
					navigation: false,
				},
				1140: {
					slidesPerView: 6
				},
				1440: {
					slidesPerView: 7
				}
			}
		});

		/*var pp_tabs_ul = new Swiper('#detailed_specification .swiper-container', {
			slidesPerView: 'auto',
			spaceBetween: 20,
			speed: 400,
			slidesOffsetAfter: 0,
			slideToClickedSlide: true,
			breakpoints: {
				320: {
					slidesPerView: 'auto',
					allowTouchMove: true,
					watchOverflow: true,
				},
				860: {
					allowTouchMove: false,
					slideToClickedSlide: false,
				}
			}
		});
*/

		var pp_tabs_related_ul = new Swiper('#detailed_specification .tabs_d .swiper-container', {
            slidesPerView: 'auto',
            spaceBetween: 20,
            speed: 400,
            slidesOffsetAfter: 0,
            slideToClickedSlide: true,
            breakpoints: {
                320: {
                    slidesPerView: 'auto',
                    allowTouchMove: true,
                    watchOverflow: true,
                },
                860: {
                    allowTouchMove: false,
                    slideToClickedSlide: false,
                }
            }
        });

		var SlidesCount = $("#gallery .swiper-wrapper .swiper-slide").length;

		$(".product_img--image-counter").text("1/" + SlidesCount);

		$("#gallery .swiper-slide a").click(function (e) {

			$("#gallery .swiper-slide a").each(function () {
				$(this).removeClass("selected");
			});
			$(this).addClass("selected");
			myCurSlideIndex = $(this).parent().index();

			$(".product_img--image-counter").text(myCurSlideIndex + 1 + "/" + SlidesCount);

			e.preventDefault();
			var temp1 = $(this).attr("href");


			$("#duplicate_of_thumbs a").removeClass("selected").each(function () {
				if ($(this).attr("href") === temp1) {
					$(this).addClass("selected");
				}
			});

			var m1 = $(this).attr("href");
			var m2 = $(this).attr("data-image");
			$("#zoom_link1").attr("href", m1);
			$("#zoom_link1 img").attr("src", m2);
		});


		$(".product_img--image-btn.btn-left").on("click", function () {
			if (!($(this).hasClass("disabled"))) {
				if (myCurSlideIndex > 0) {
					$("#gallery .swiper-slide").eq(myCurSlideIndex - 1).find("a").click();
				}
			}
		})
		$(".product_img--image-btn.btn-right").on("click", function () {
			if (!($(this).hasClass("disabled"))) {
				if (myCurSlideIndex < SlidesCount) {
					$("#gallery .swiper-slide").eq(myCurSlideIndex + 1).find("a").click();
				}
			}
		})


		$(".product_img--image a.colorbox").swipe({
			swipeLeft: function (event, direction, distance, duration, fingerCount) {
				if (myCurSlideIndex < SlidesCount) {
					$("#gallery .swiper-slide").eq(myCurSlideIndex + 1).find("a").click();
				}
			},
			swipeRight: function (event, direction, distance, duration, fingerCount) {
				if (myCurSlideIndex > 0) {
					$("#gallery .swiper-slide").eq(myCurSlideIndex - 1).find("a").click();
				}
			}

		});


		$('.show_hidden_saleitems').on('click', function () {
			if (sale_btn_spoiler_status === 0) {
				sale_btn_spoiler_text = $(this).text();
				$(this).parent().find('.sale_ul li').each(function () {
					$(this).removeClass('hidden');
				})
				$(this).text("свернуть");
				sale_btn_spoiler_status = 1;
			} else {
				$(this).parent().find('.sale_ul li').each(function () {
					if ($(this).index() !== 0 && $(this).index() !== 1) {
						$(this).addClass('hidden');
					}
				})
				$(this).text(sale_btn_spoiler_text);
				sale_btn_spoiler_status = 0;
			}

		});

		$(".spoiler_title").on("click", function () {
			if ($("body").hasClass("tablet")) {
				$(this).toggleClass("active")
				$(".pi_delivery_block").slideToggle();
				return false;
			} else {
				return true;
			}
		});

		$(".pd_specification_title").on("click", function () {
			if ($("body").hasClass("tablet")) {
				$(this).toggleClass("active")
				$(".pd_spec_w").slideToggle();
				return false;
			} else {
				return true;
			}
		})


		var windowWidth = $(window).width();
		if (windowWidth < 1140) {
			wrapPd(1);
			Start_state = 0;
		} else {
			wrapPd(0);
			Start_state = 1;
		}
		if (windowWidth < 860) {
			$(".pi_delivery_block").slideUp();
		} else {
			$(".pi_delivery_block").slideDown();
			$(".pd_spec_w").slideDown();
		}


		/**/
		/**/
		/**/


		/**/
		/**/
		/**/

	})


	$(window).resize(function () {
		var windowWidth = $(this).width();
		if (Start_state === 1 && windowWidth < 1140) {
			wrapPd(1);
			Start_state = 0;
		} else if (Start_state === 1 && windowWidth > 1139) {

		} else if (Start_state === 0 && windowWidth < 1140) {

		} else if (Start_state === 0 && windowWidth > 1139) {
			wrapPd(0);
		}
		if (windowWidth < 860) {
			$(".pi_delivery_block").slideUp();
		} else {
			$(".pi_delivery_block").slideDown();
			$(".pd_spec_w").slideDown();
		}
	});
</script>
<script type="text/javascript"><!--
	$('#button-cart').on('click', function() {
		$.ajax({
			url: 'index.php?route=checkout/cart/add',
			type: 'post',
			data: $('.product_info input[type=\'text\'], .product_info input[type=\'hidden\'], .product_info input[type=\'radio\']:checked, #option-block input[type=\'radio\']:checked, .product_info input[type=\'checkbox\']:checked, .product_info select, .product_info textarea'),
			dataType: 'json',
			success: function(json) {
				$('.success, .warning, .attention, information, .error').remove();

				if (json['error']) {
					if (json['error']['option']) {
						for (i in json['error']['option']) {
							$('#option-' + i).after('<span class="error">' + json['error']['option'][i] + '</span>');
						}
					}
				}

				if (json['success']) {
					$('#notification').html('<div class="success" style="display: none;">' + json['success'] + '<img src="catalog/view/theme/ava/image/close.png" alt="" class="close" /></div>');

					$('.success').fadeIn('slow');

					if ($('#cart > .cart').hasClass('empty')){
						$('#cart > .cart').removeClass('empty');
						$('#cart > .cart').prepend('<span id="cart-total"><a>'+json['total']+'</a></span>');
					} else {
						$('#cart-total').html(json['total']);
					}
					if (json['percent']) {
						$('#cart .heading a').addClass("dblstroke").html('<i class="totalprice">' + json['total_text']+'</i>'+'<br><s>' + json['total_old_text'] + '</s> <i class="percent">'+json['percent']+'%');
					}
					else
						$('#cart .heading a').html(json['total_text']);

					if($( window ).width() > 500) {
						$('html, body').animate({ scrollTop: 0 }, 'slow');
					}

					//addYandexEcommerce(json);
					gtag('event', 'add_to_cart', {
						"ecomm_totalvalue": json['metrika_product_price'],
						"ecomm_prodid": json['metrika_product_id'],
						"ecomm_pagetype": "product",
						"items": [
							{
								"id": json['metrika_product_id'],
								"name": json['metrika_product_name'],
								"list_name": "product",
								"brand": json['metrika_product_manufacturer'],
								"category": json['metrika_product_category'],
								"quantity": json['metrika_product_quantity'],
								"price": json['metrika_product_price'],
								"google_business_vertical": "retail"
							}
						]

					});

					var image = $('#image').offset();
					var cart = $('#cart');
					var cart_offset = cart.offset();
					$('body').append('<img src="' + $('#image').attr('src') + '" id="temp" style="position: absolute; z-index:9999; top: ' + image.top + 'px; left: ' + image.left + 'px;" />');
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
	});

	$(".newcartbtn_w .plusone").bind('click', function(){
		$('#button-cart').click();
	});
	$(".newcartbtn_w2 .plusone").bind('click', function(){
		$('#button-cart').click();
	});


	//--></script>
<?php echo $footer; ?>