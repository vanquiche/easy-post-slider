<?php

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
?>
<section <?php echo get_block_wrapper_attributes(array('class' => 'easy-post-slider-wrapper')); ?> aria-label='featured post slider'>
	<?php
	// include only once to prevent fatal error when multiple sliders are added
	include_once 'assets/php/hex_to_rgb.php';

	$args = array(
		'post_type' => 'post',
		'orderby' => 'date',
		'order' => 'DESC',
		'post_status' => 'publish',
		'posts_per_page' => $attributes['query']['posts_per_page']
	);

	// add tax query to argument if user has filter by tags and/or category
	if ($attributes['query']['tag_slug__in'] || $attributes['query']['cat']) {
		$args['tax_query'] = array(
			'relation' => 'OR',
			array(
				'taxonomy' => 'post_tag',
				'field' => 'name',
				'terms' => $attributes['query']['tag_slug__in'],
			),
			array(
				'taxonomy' => 'category',
				'field' => 'name',
				'terms' => $attributes['query']['cat'],
			)
		);
	}

	$query = new WP_Query($args);

	if ($query->have_posts()) : ?>
		<?php if ($query->post_count > 1) : ?>
			<div class='easy-ps-navigation-button-wrapper easy-ps-top-50 easy-ps-left easy-ps-m-horizontal--16'>
				<button class='easy-ps-navigation-button easy-ps-absolute-left easy-ps-hide' data-post-slider='navigation-button' data-post-slider-action='previous' aria-label='navigate previous slide'>
					<i class='easy-ps-caret easy-ps-caret-left' style='background-color: <?php esc_attr_e($attributes["buttons"]["fontColor"]); ?>;' aria-hidden='true'></i>
					<span class='easy-ps-overlay' style='background-color: <?php esc_attr_e($attributes["buttons"]["bgColor"]) ?>;' aria-hidden='true'></span>
				</button>
			</div>
			<div class='easy-ps-navigation-button-wrapper easy-ps-top-50 easy-ps-right easy-ps-m-horizontal--16'>
				<button class='easy-ps-navigation-button easy-ps-absolute-right easy-ps-hide' data-post-slider='navigation-button' data-post-slider-action='next' aria-label='navigate next slide'>
					<i class='easy-ps-caret easy-ps-caret-right' style='background-color: <?php esc_attr_e($attributes["buttons"]["fontColor"]); ?>;' aria-hidden='true'></i>
					<span class='easy-ps-overlay' style='background-color: <?php esc_attr_e($attributes["buttons"]["bgColor"]); ?>;' aria-hidden='true'></span>
				</button>
			</div>
		<?php endif ?>
		<!-- accessible live region to indicate slide number -->
		<div data-post-slider='live-region' class='easy-ps-visuallyhidden' aria-live="polite" aria-atomic="true"></div>
		<!-- scrollbar -->
		<?php if ($attributes['scrollbar']['showScrollbar'] && $query->post_count > 1) : ?>
			<?php if ($attributes['scrollbar']['type'] ==  'progress') : ?>
				<div data-post-slider='scrollbar' class='easy-ps-scrollbar-progress' aria-hidden='true'>
					<div data-post-slider='scrollbar-inner' class='easy-ps-scrollbar-progress__inner' style='background-color: <?php esc_attr_e($attributes["scrollbar"]["color"]) ?>;'></div>
					<div data-post-slider='scrollbar-overlay' class='easy-ps-scrollbar-progress__overlay' style='background-color: <?php esc_attr_e($attributes["scrollbar"]["color"]) ?>;'></div>
				</div>
			<?php else : ?>
				<div data-post-slider='scrollbar' class='easy-ps-scrollbar-dots' data-scrollbar-style-bg-color='<?php esc_attr_e($attributes["scrollbar"]["color"]) ?>' aria-hidden='true'>
					<?php for ($i = 0; $i < $query->post_count; $i++) : ?>
						<span class='easy-ps-scrollbar-dots__dot' data-scrollbar-dot='<?php echo $i + 1 ?>' style='border-color: <?php esc_attr_e($attributes["scrollbar"]["color"]) ?>;'></span>
					<?php endfor ?>
				</div>
			<?php endif  ?>
		<?php endif ?>
		<!-- slider -->
		<ul class='easy-ps-post-slider' style='min-height: <?php esc_attr_e($attributes["content"]["minHeight"]) ?>' aria-label='featured posts'>
			<?php
			while ($query->have_posts()) :
				$query->the_post();
			?>
				<!-- slide -->
				<li class='easy-ps-slide easy-ps-cover-image <?php echo 'easy-ps-align-content--' . esc_attr($attributes["content"]["alignment"]) ?>' style='left: <?php echo (($query->current_post) * 100) . "%" ?>;'>
					<!-- content -->
					<article class='easy-ps-slide-content <?php if ($attributes["content"]["background"]) : ?>easy-ps-drop-shadow easy-ps-blur-bg<?php endif ?>' style='<?php if ($attributes["content"]["background"]) : ?>background-color: <?php esc_attr_e(hex_to_rgb($attributes["content"]["bgColor"], $attributes["content"]["transparentBg"] ? 0.5 : 1)); ?>; color: <?php esc_attr_e($attributes["content"]["fontColor"]) ?>;<?php endif ?>' data-post-slider-number='<?php esc_attr_e(($query->current_post + 1)) ?>'>
						<?php if ($attributes['content']['showTitle']) : ?>
							<h2 class='easy-ps-slide-content__title'>
								<?php the_title() ?>
							</h2>
						<?php endif ?>
						<?php if ($attributes['content']['showExcerpt']) : ?>
							<p class='easy-ps-slide-content__excerpt'>
								<?php echo wp_strip_all_tags(get_the_excerpt(), true) ?>
							</p>
						<?php endif ?>
						<?php if ($attributes['content']['showLink']) : ?>
							<div class='easy-ps-slide-content__read-more'>
								<a class='easy-ps-slide-content__read-more-link' href='<?php esc_url(the_permalink()) ?>' tabindex='0'>
									<span class='easy-ps-slide-content__read-more-label' style='color: <?php echo $attributes["buttons"]["fontColor"] ?>'>
										<?php esc_html_e('Read Now', 'easy-post-slider') ?>
									</span>
									<span class='easy-ps-overlay' style='background-color: <?php esc_attr_e($attributes["buttons"]["bgColor"]) ?>;' aria-hidden='true'></span>
								</a>
							</div>
						<?php endif ?>
					</article>
					<!-- cover image overlay -->
					<div class='easy-ps-slide-content__image-overlay easy-ps-opacity--<?php echo esc_attr($attributes["coverImage"]["opacity"]) * 10 ?>' style='background-color: <?php echo $attributes["coverImage"]["overlayColor"] ?>' aria-hidden='true'></div>
					<!-- lores placeholder image -->
					<?php esc_html_e(the_post_thumbnail('blurry-thumbnail', array('class' => 'easy-ps-slide-content__image-thumbnail', 'alt' => ''))) ?>
					<!-- hires cover image -->
					<?php esc_html_e(the_post_thumbnail('full', array('class' => 'easy-ps-slide-content__image-full', 'alt' => ''))) ?>
				</li>
			<?php endwhile ?>
		</ul>
	<?php
	endif;
	// reset global $post value
	wp_reset_postdata();
	?>
</section>