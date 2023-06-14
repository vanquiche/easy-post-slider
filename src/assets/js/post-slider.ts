export default class PostSlider {
	slideWrapper: Element;
	slider: HTMLUListElement | null;
	scrollbarInner: HTMLDivElement | null;
	navigationButtons: NodeListOf<HTMLButtonElement> | null;
	constructor(slideWrapper: Element) {
		this.slideWrapper = slideWrapper;
		this.slider = slideWrapper.querySelector(".post-slider");
		this.scrollbarInner = slideWrapper.querySelector(".scrollbar__inner");
		this.navigationButtons = slideWrapper.querySelectorAll(
			'[data-post-slider="navigation-button"]'
		);
	}

	initSlider() {
		this.navigationButtonEvent();
		this.wrapperHoverEvent();
		this.setSliderHeight();
		this.setIntersectionObservers();
		this.blurryLoadImagesInit();
	}

	// event listeners
	wrapperHoverEvent() {
		this.slideWrapper.addEventListener("mouseenter", () => {
			this.removeHideClass(true);
		});

		this.slideWrapper.addEventListener("mouseleave", () => {
			this.removeHideClass(false);
		});
	}
	navigationButtonEvent() {
		if (this.navigationButtons) {
			this.navigationButtons.forEach((button) => {
				button.addEventListener("click", () => {
					this.handleNavigationButtonClick(button);
				});
			});
		}
	}

	removeHideClass(action: boolean) {
		if (this.navigationButtons) {
			this.navigationButtons.forEach((button) => {
				if (action) {
					button.classList.remove("hide");
				} else {
					button.classList.add("hide");
				}
			});
		}
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
			this.slider.style.height = 100 + largetSlideHeight + "px";
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
					const slideNumber = entry.target.getAttribute(
						"data-post-slider-number"
					);
					if (entry.isIntersecting) {
						// move scrollbar length to appropriate location
						// check whether to disable navigation button or not
						if (slideNumber) {
							this.setScrollbarPosition(parseInt(slideNumber));
							this.disableNavigationButton(parseInt(slideNumber));
						}
						// enable focus on 'read more' link on current slide
						link?.setAttribute("tabindex", "0");
						// update accessible live region to announce current slide
						if (liveRegion && this.slider)
							liveRegion.textContent = `Slide ${entry.target.getAttribute(
								"data-post-slider-number"
							)} of ${this.slider.children.length}`;
					} else {
						// disable focus on 'read more' link on slides out of view
						link?.setAttribute("tabindex", "-1");
					}
				});
			};

			const observer = new IntersectionObserver(callback, options);

			slides.forEach((slide) => observer.observe(slide));
		}
	}

	setScrollbarPosition(slideNumber: number) {
		if (slideNumber && this.slider && this.scrollbarInner) {
			const scrollbarInnerWidth = Math.round(
				(slideNumber / this.slider.children.length) * 100
			);
			this.scrollbarInner.style.width = scrollbarInnerWidth + "%";
		}
	}

	disableNavigationButton(currentSlide: number) {
		if (this.slider) {
			const previousButton = this.slideWrapper.querySelector(
				'[data-post-slider-action="previous"]'
			) as HTMLButtonElement;
			const nextButton = this.slideWrapper.querySelector(
				'[data-post-slider-action="next"]'
			) as HTMLButtonElement;
			// is at the last slide
			if (currentSlide === this.slider.children.length) {
				nextButton.disabled = true;
				nextButton.ariaDisabled = "true";
				// is at the beginning slide
			} else if (currentSlide === 1) {
				previousButton.disabled = true;
				previousButton.ariaDisabled = "true";
			} else {
				nextButton.disabled = false;
				nextButton.ariaDisabled = "false";
				previousButton.disabled = false;
				previousButton.ariaDisabled = "false";
			}
		}
	}

	blurryLoadImagesInit() {
		const images = this.slideWrapper.querySelectorAll(
			".slide-content__image-full"
		) as NodeListOf<HTMLImageElement>;
		images.forEach((image) => {
			// when images have loaded then fade in image
			if (image.complete) {
				image.style.opacity = "1";
			} else {
				image.addEventListener("load", function () {
					image.style.opacity = "1";
				});
			}
		});
	}
}
