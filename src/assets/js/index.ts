import PostSlider from './post-slider';

document.addEventListener( 'DOMContentLoaded', () => {
	const sliders = {};
	const blocks = document.querySelectorAll(
		'.easy-post-slider-wrapper'
	) as NodeListOf< HTMLElement >;

	if ( blocks ) {
		blocks.forEach( ( block, i ) => {
			sliders[ `slide${ i }` ] = new PostSlider( block ).initSlider();
		} );
	}
} );
