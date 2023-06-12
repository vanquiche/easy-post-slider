<?php

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
?>
<section <?php echo get_block_wrapper_attributes(); ?>>
	<?php
	$args = array(
		'post_type' => 'post',
		'orderby' => 'date',
		'order' => 'DESC',
		'posts_per_page' => -1,
		'tax_query' => array(
			'relation' => 'OR',
			array(
				'taxonomy' => 'post_tag',
				'field' => 'slug',
				'terms' => $attributes['query']['tag_slug__in'],
			),
			array(
				'taxonomy' => 'category',
				'field' => 'id',
				'terms' => $attributes['query']['cat'],
			)
		)
	);
	$query = new WP_Query($args);

	if ($query->have_posts()) { ?>
		<ul class='post-slider' aria-label='featured posts'>
			<li class='navigation-button absolute-left'>
				<button data-post-slider='navigation-button' aria-label='navigate previous slide'>
					<i class='left-caret' aria-hidden></i>
					<span class='overlay' aria-hidden></span>
				</button>
			</li>
			<li class='navigation-button absolute-right'>
				<button data-post-slider='navigation-button' aria-label='navigate next slide'>
					<i class='right-caret' aria-hidden></i>
					<span class='overlay' aria-hidden></span>
				</button>
			</li>
			<?php
			while ($query->have_posts()) {
				$query->the_post();
			?>
				<li class='slide'>
					<article class='slide-content'>
						<h2 class='slide-content__title'>
							<?php echo the_title() ?>
						</h2>
						<p class='slide-content__excerpt'>
							<?php echo the_excerpt() ?>
						</p>
						<div class='slide-content__read-more'>
							<a class='slide-content__read-more-link' href="<?php echo the_permalink() ?>">
								Read Now
							</a>
							<span class='overlay' aria-hidden></span>
						</div>
					</article>
				</li>
			<?php
			} ?>
		</ul>
	<?php
	}
	?>
</section>