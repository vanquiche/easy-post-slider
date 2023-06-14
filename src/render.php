<?php

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
?>
<section <?php echo get_block_wrapper_attributes(); ?>>
	<!-- <?php echo print_r($attributes) ?> -->
	<?php
	include_once 'assets/php/hex_to_rgb.php';

	$args = array(
		'post_type' => 'post',
		'orderby' => 'date',
		'order' => 'DESC',
		'posts_per_page' => -1,
		// 'tax_query' => array(
		// 	'relation' => 'OR',
		// 	array(
		// 		'taxonomy' => 'post_tag',
		// 		'field' => 'slug',
		// 		'terms' => $attributes['query']['tag_slug__in'],
		// 	),
		// 	array(
		// 		'taxonomy' => 'category',
		// 		'field' => 'id',
		// 		'terms' => $attributes['query']['cat'],
		// 	)
		// )
	);
	$query = new WP_Query($args);

	if ($query->have_posts()) : ?>
		<?php if ($query->post_count > 1) : ?>
			<div class='navigation-button-wrapper top-50 left m-horizontal--16'>
				<button class='navigation-button absolute-left hide' data-post-slider='navigation-button' data-post-slider-action='previous' aria-label='navigate previous slide'>
					<i class='caret caret-left' style='background-color: <?php echo $attributes["buttons"]["fontColor"]; ?>;' aria-hidden='true'></i>
					<span class='overlay' style='background-color: <?php echo $attributes["buttons"]["bgColor"] ?>; opacity: <?php echo $attributes["buttons"]["opacity"] ?>%;' aria-hidden></span>
				</button>
			</div>
			<div class='navigation-button-wrapper top-50 right m-horizontal--16'>
				<button class='navigation-button absolute-right hide' data-post-slider='navigation-button' data-post-slider-action='next' aria-label='navigate next slide'>
					<i class='caret caret-right' style='background-color: <?php echo $attributes["buttons"]["fontColor"]; ?>;' aria-hidden='true'></i>
					<span class='overlay' style='background-color: <?php echo $attributes["buttons"]["bgColor"] ?>;opacity: <?php echo $attributes["buttons"]["opacity"] ?>%;' aria-hidden='true'></span>
				</button>
			</div>
		<?php endif ?>
		<!-- accessible live region to indicate slide number -->
		<div data-post-slider='live-region' class='visuallyhidden' aria-live="polite" aria-atomic="true"></div>
		<!-- scrollbar -->
		<div data-post-slider='scrollbar' class='scrollbar' aria-hidden='true'>
			<div data-post-slider='scrollbar-inner' class='scrollbar__inner' style='background-color: <?php echo $attributes["scrollbar"]["color"] ?>;'></div>
			<div data-post-slider='scrollbar-overlay' class='scrollbar__overlay' style='background-color: <?php echo $attributes["scrollbar"]["color"] ?>;'></div>
		</div>
		<!-- slider component -->
		<ul class='post-slider' style='min-height: <?php echo $attributes["content"]["minHeight"] ?>' aria-label='featured posts'>
			<?php
			while ($query->have_posts()) :
				$query->the_post();
			?>
				<!-- slide -->
				<li class='slide cover-image <?php echo 'align-content--' . $attributes["content"]["alignment"] ?>' style='left: <?php echo (($query->current_post) * 100) . "%" ?>; background-color: <?php echo $attributes["coverImage"]["bgColor"] ?>'>
					<article class='slide-content <?php if ($attributes["content"]["background"]) : ?>drop-shadow blur-bg<?php endif ?>' style='<?php if ($attributes["content"]["background"]) : ?>background-color: <?php echo hex_to_rgb($attributes['content']['bgColor'], 0.5); ?>; color: <?php echo $attributes['content']['fontColor'] ?>;<?php endif ?>' data-post-slider-number='<?php echo ($query->current_post + 1) ?>'>
						<?php if ($attributes['content']['showTitle']) : ?>
							<h2 class='slide-content__title'>
								<?php echo the_title() ?>
							</h2>
						<?php endif ?>
						<?php if ($attributes['content']['showExcerpt']) : ?>
							<p class='slide-content__excerpt'>
								<?php echo wp_strip_all_tags(get_the_excerpt(), true) ?>
							</p>
						<?php endif ?>
						<?php if ($attributes['content']['showLink']) : ?>
							<div class='slide-content__read-more'>
								<a class='slide-content__read-more-link' href="<?php echo the_permalink() ?>" tabindex="0">
									<span class='slide-content__read-more-label' style='color: <?php echo $attributes["buttons"]["fontColor"] ?>'>
										Read Now
									</span>
									<span class='overlay' style='background-color: <?php echo $attributes["buttons"]["bgColor"] ?>; opacity: <?php echo $attributes["buttons"]["opacity"] ?>%;' aria-hidden='true'></span>
								</a>
							</div>
						<?php endif ?>
					</article>
					<?php echo the_post_thumbnail('full', array('class' => "slide-content__image opacity--{$attributes['coverImage']['opacity']}", 'alt' => '')) ?>
				</li>
			<?php
			endwhile ?>
		</ul>
	<?php
	endif;
	wp_reset_postdata();
	?>
</section>