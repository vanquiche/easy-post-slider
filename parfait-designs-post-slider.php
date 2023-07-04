<?php

/**
 * Plugin Name:      	Easy Post Slider
 * Description:       A custom dynamic block to query and display your posts in a slider component.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:           	Steve Vang
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:      	easy-post-slider
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_parfait_designs_post_slider_block_init()
{
	register_block_type(__DIR__ . '/build');
}
add_action('init', 'create_block_parfait_designs_post_slider_block_init');

add_image_size('blurry-thumbnail', 10, 10);

wp_enqueue_script('smooth-scroll-polyfill', 'https://cdnjs.cloudflare.com/ajax/libs/iamdustan-smoothscroll/0.4.0/smoothscroll.min.js');
