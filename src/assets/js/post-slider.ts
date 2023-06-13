export default class PostSlider {
	slideWrapper: Element;
	slider: HTMLUListElement | null;
	constructor(slideWrapper: Element) {
		this.slideWrapper = slideWrapper;
		this.slider = slideWrapper.querySelector(".post-slider");
	}

	initSlider() {
		this.navigationButtonEvent();
		this.setSliderHeight();
		this.setIntersectionObservers();
	}

	// event listeners
	navigationButtonEvent() {
		const buttons = this.slideWrapper.querySelectorAll(
			'[data-post-slider="navigation-button"]'
		);
		buttons.forEach((button) => {
			button.addEventListener("click", () => {
				this.handleNavigationButtonClick(button);
			});
		});
	}

	handleNavigationButtonClick(button: Element) {
		const action = button.getAttribute("data-post-slider-action");
		if (this.slider) {
			const scrollIncrement =
				this.slider.scrollWidth / this.slider.children.length;
			const currentScrollPosition = this.slider.scrollLeft;
			if (action === "next") {
				const scrollLeftMax = this.slider.scrollWidth - this.slider.clientWidth;
				if (this.slider.scrollLeft >= scrollLeftMax) return;
				this.slider.scrollTo(currentScrollPosition + scrollIncrement, 0);
			} else {
				if (this.slider.scrollLeft <= 0) return;
				this.slider.scrollTo(currentScrollPosition - scrollIncrement, 0);
			}
		}
	}

	setSliderHeight() {
		// set height of slider to match height of largest slide
		if (this.slider) {
			const slides = Array.from(
				this.slider.querySelectorAll(".slide-content")
			).map((s) => s.clientHeight);
			const largetSlideHeight = Math.max(...slides);
			this.slider.style.height = largetSlideHeight + "px";
		}
	}

	setIntersectionObservers() {
		if (this.slider) {
			const slides = this.slider.querySelectorAll(".slide-content");
			const options = {
				root: this.slideWrapper,
				threshold: 0.25,
			};

			const callback = (entries: IntersectionObserverEntry[]) => {
				entries.forEach((entry) => {
					// console.log("intersecting");
					const link = entry.target.querySelector("a");
					const liveRegion = this.slideWrapper.querySelector(
						'[data-post-slider="live-region"]'
					);
					if (entry.isIntersecting) {
						console.log("intersecting");
						link?.setAttribute("tabindex", "0");
						if (liveRegion && this.slider)
							liveRegion.textContent = `Slide ${entry.target.getAttribute(
								"data-post-slider-number"
							)} of ${this.slider.children.length}`;
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
