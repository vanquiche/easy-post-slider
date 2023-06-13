import PostSlider from "./post-slider";

document.addEventListener("DOMContentLoaded", () => {
	const sliders = {};
	const sliderBlocks = document.querySelectorAll(
		".wp-block-parfait-designs-post-slider"
	);

	if (sliderBlocks) {
		sliderBlocks.forEach((slide, i) => {
			sliders[`slide${i}`] = new PostSlider(slide);
			sliders[`slide${i}`].initSlider();
		});
	}
});
