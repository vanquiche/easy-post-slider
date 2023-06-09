<?php

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
?>
<div <?php echo get_block_wrapper_attributes(); ?>>
	<small>post slider</small>
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

	if ($query->have_posts()) {
		while ($query->have_posts()) {
			$query->the_post();
	?>
			<p><?php echo the_title() ?></p>

	<?php
		}
	} else {
		echo '<p>no posts</p>';
	}
	?>
</div>