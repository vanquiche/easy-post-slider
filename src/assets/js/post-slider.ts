console.log("hello post slider");

function setSliderHeight() {
	// set height of slider to match height of largest slide
	const postSliderContainer = document.querySelector(
		".wp-block-parfait-designs-post-slider"
	);
	if (postSliderContainer) {
		const slider = postSliderContainer.querySelector("ul");
		if (slider) {
			const slides = Array.from(slider.querySelectorAll(".slide-content")).map(
				(s) => s.clientHeight
			);
			const largetSlideHeight = Math.max(...slides);
			slider.style.height = largetSlideHeight + "px";
		}
	}
}

function setNavigationButtonInteraction() {
	const postSliderContainer = document.querySelector(
		".wp-block-parfait-designs-post-slider"
	);

	const navigationButtons = postSliderContainer!.querySelectorAll(
		'[data-post-slider="navigation-button"]'
	);

	if (navigationButtons) {
		navigationButtons.forEach((btn) => {
			btn.addEventListener("click", function () {
				handleNavigationButtonClick.call(btn, null);
			});
		});
	}
}

function handleNavigationButtonClick() {
	const slider = this.parentNode.parentNode.querySelector(".post-slider");
	const action = this.getAttribute("data-post-slider-action");
	const scrollIncrement = slider.scrollWidth / slider.children.length;
	const currentScrollPosition = slider.scrollLeft;
	if (action === "next") {
		if (slider.scrollLeft >= slider.scrollLeftMax) return;
		slider.scrollTo(currentScrollPosition + scrollIncrement, 0);
	} else {
		if (slider.scrollLeft <= 0) return;
		slider.scrollTo(currentScrollPosition - scrollIncrement, 0);
	}
}

if (document) {
	document.addEventListener("DOMContentLoaded", () => {
		setSliderHeight();
		setNavigationButtonInteraction();
	});
}
