console.log("hello post slider");

document.addEventListener("DOMContentLoaded", () => {
	const $postSliderContainer = document.querySelector(
		".wp-block-parfait-designs-post-slider"
	);

	function setSliderHeight() {
		// set height of slider to match height of largest slide
		if ($postSliderContainer) {
			const slider = $postSliderContainer.querySelector("ul");
			if (slider) {
				const slides = Array.from(
					slider.querySelectorAll(".slide-content")
				).map((s) => s.clientHeight);
				const largetSlideHeight = Math.max(...slides);
				slider.style.height = largetSlideHeight + "px";
			}
		}
	}

	function setIntersectionObservers() {
		if ($postSliderContainer) {
			const slider = $postSliderContainer.querySelector("ul");
			if (slider) {
				const slides = slider.querySelectorAll(".slide-content");
				const options = {
					root: $postSliderContainer,
					threshold: 0.25,
				};

				const callback = (entries: IntersectionObserverEntry[]) => {
					entries.forEach((entry) => {
						// console.log("intersecting");
						const link = entry.target.querySelector("a");
						const liveRegion = $postSliderContainer.querySelector(
							'[data-post-slider="live-region"]'
						);
						if (entry.isIntersecting) {
							console.log("intersecting");
							link?.setAttribute("tabindex", "0");
							// entry.target.focus();
							if (liveRegion)
								liveRegion.textContent = `Slide ${entry.target.getAttribute(
									"data-post-slider-number"
								)} of ${slider.children.length}`;
						} else {
							link?.setAttribute("tabindex", "-1");
						}
					});
				};

				const observer = new IntersectionObserver(callback, options);

				slides.forEach((slide) => observer.observe(slide));
			}
		}
	}

	function setNavigationButtonInteraction() {
		if ($postSliderContainer) {
			const navigationButtons = $postSliderContainer.querySelectorAll(
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

	console.log($postSliderContainer);
	setSliderHeight();
	setNavigationButtonInteraction();
	setIntersectionObservers();
});
