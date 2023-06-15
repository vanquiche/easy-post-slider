import PostSlider from './post-slider';

document.addEventListener( 'DOMContentLoaded', () => {
	const sliders = {};
	const blocks = document.querySelectorAll(
		'.wp-block-parfait-designs-post-slider'
	);

	if ( blocks ) {
		blocks.forEach( ( block, i ) => {
			sliders[ `slide${ i }` ] = new PostSlider( block ).initSlider();
		} );
	}
} );
