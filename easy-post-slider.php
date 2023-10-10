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
function create_block_easy_post_slider()
{
	register_block_type(__DIR__ . '/build');
}
add_action('init', 'create_block_easy_post_slider');

add_image_size('blurry-thumbnail', 10, 10);

// smooth scroll polyfill for mobile devices
function add_smoothscroll_polyfill_script()
{
	wp_register_script('smoothscroll_polyfill', 'https://cdnjs.cloudflare.com/ajax/libs/iamdustan-smoothscroll/0.3.6/smoothscroll.min.js', array(), false, true);
	wp_enqueue_script('smoothscroll_polyfill');
}

add_action('wp_enqueue_scripts', 'add_smoothscroll_polyfill_script');
