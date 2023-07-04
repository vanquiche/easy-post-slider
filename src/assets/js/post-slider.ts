import getHexToRgb from './getHexToRgb';

export default class PostSlider {
	slideWrapper: Element;
	slider: HTMLUListElement | null;
	scrollbarProgress: HTMLDivElement | null;
	scrollbarDots: HTMLDivElement | null;
	navigationButtons: NodeListOf< HTMLButtonElement > | null;
	constructor( slideWrapper: Element ) {
		this.slideWrapper = slideWrapper;
		this.slider = slideWrapper.querySelector( '.post-slider' );
		this.scrollbarProgress = slideWrapper.querySelector(
			'.scrollbar-progress__inner'
		);
		this.scrollbarDots = slideWrapper.querySelector( '.scrollbar-dots' );
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
		this.slideWrapper.addEventListener( 'mouseenter', () => {
			this.hideNavigationButton( true );
		} );

		this.slideWrapper.addEventListener( 'mouseleave', () => {
			this.hideNavigationButton( false );
		} );
	}
	navigationButtonEvent() {
		if ( this.navigationButtons ) {
			this.navigationButtons.forEach( ( button ) => {
				button.addEventListener( 'click', () => {
					this.handleNavigationButtonClick( button );
				} );
			} );
		}
	}

	hideNavigationButton( action: boolean ) {
		if ( this.navigationButtons ) {
			this.navigationButtons.forEach( ( button ) => {
				if ( action ) {
					button.classList.remove( 'hide' );
				} else {
					button.classList.add( 'hide' );
					button.blur();
				}
			} );
		}
	}

	handleNavigationButtonClick( button: Element ) {
		const action = button.getAttribute( 'data-post-slider-action' );
		if ( this.slider ) {
			const scrollIncrement =
				this.slider.scrollWidth / this.slider.children.length;
			const currentScrollPosition = this.slider.scrollLeft;
			if ( action === 'next' ) {
				const scrollLeftMax =
					this.slider.scrollWidth - this.slider.clientWidth;
				if ( this.slider.scrollLeft >= scrollLeftMax ) return;
				this.slider.scrollTo(
					currentScrollPosition + scrollIncrement,
					0
				);
			} else {
				if ( this.slider.scrollLeft <= 0 ) return;
				this.slider.scrollTo(
					currentScrollPosition - scrollIncrement,
					0
				);
			}
		}
	}

	setSliderHeight() {
		// set height of slider to match height of largest slide
		if ( this.slider ) {
			const slides = Array.from(
				this.slider.querySelectorAll( '.slide-content' )
			).map( ( s ) => s.clientHeight );
			const largetSlideHeight = Math.max( ...slides );
			this.slider.style.height = 100 + largetSlideHeight + 'px';
		}
	}

	setIntersectionObservers() {
		if ( this.slider ) {
			const slides = this.slider.querySelectorAll( '.slide-content' );
			const options = {
				root: this.slideWrapper,
				threshold: 0.25,
			};

			const callback = ( entries: IntersectionObserverEntry[] ) => {
				entries.forEach( ( entry ) => {
					// console.log("intersecting");
					const link = entry.target.querySelector( 'a' );
					const liveRegion = this.slideWrapper.querySelector(
						'[data-post-slider="live-region"]'
					);
					const slideNumber = entry.target.getAttribute(
						'data-post-slider-number'
					);
					if ( entry.isIntersecting ) {
						// move scrollbar length to appropriate location
						// check whether to disable navigation button or not
						if ( slideNumber ) {
							this.setScrollbarPosition(
								parseInt( slideNumber )
							);
							this.disableNavigationButton(
								parseInt( slideNumber )
							);
						}
						// enable focus on 'read more' link on current slide
						link?.setAttribute( 'tabindex', '0' );
						// update accessible live region to announce current slide
						if ( liveRegion && this.slider )
							liveRegion.textContent = `Slide ${ entry.target.getAttribute(
								'data-post-slider-number'
							) } of ${ this.slider.children.length }`;
					} else {
						// disable focus on 'read more' link on slides out of view
						link?.setAttribute( 'tabindex', '-1' );
					}
				} );
			};

			const observer = new IntersectionObserver( callback, options );

			slides.forEach( ( slide ) => observer.observe( slide ) );
		}
	}

	setScrollbarPosition( slideNumber: number ) {
		// set postion for progress scrollbar
		if ( slideNumber && this.slider && this.scrollbarProgress ) {
			const scrollbarInnerWidth = Math.round(
				( slideNumber / this.slider.children.length ) * 100
			);
			this.scrollbarProgress.style.width = scrollbarInnerWidth + '%';
		}

		// set position for dot scrollbar
		if ( slideNumber && this.slider && this.scrollbarDots ) {
			const attributeBgColor = this.scrollbarDots.getAttribute(
				'data-scrollbar-style-bg-color'
			);
			const dots = this.scrollbarDots.querySelectorAll(
				'.scrollbar-dots__dot'
			) as NodeListOf< HTMLSpanElement >;
			dots.forEach( ( dot ) => {
				const dotPosition = dot.getAttribute( 'data-scrollbar-dot' );
				if ( dotPosition && parseInt( dotPosition ) === slideNumber ) {
					dot.style.backgroundColor =
						( attributeBgColor &&
							getHexToRgb( attributeBgColor, 1 ) ) ||
						'';
				} else {
					dot.style.backgroundColor = '';
				}
			} );
		}
	}

	disableNavigationButton( currentSlide: number ) {
		if ( this.slider ) {
			const previousButton = this.slideWrapper.querySelector(
				'[data-post-slider-action="previous"]'
			) as HTMLButtonElement;
			const nextButton = this.slideWrapper.querySelector(
				'[data-post-slider-action="next"]'
			) as HTMLButtonElement;

			function setDisableState(
				button: HTMLButtonElement,
				state: boolean
			) {
				button.disabled = state;
				button.ariaDisabled = '' + state;
			}
			// is at the last slide
			if ( currentSlide === this.slider.children.length ) {
				setDisableState( nextButton, true );
				setDisableState( previousButton, false );
				// is at the beginning slide
			} else if ( currentSlide === 1 ) {
				setDisableState( previousButton, true );
				setDisableState( nextButton, false );
			} else {
				setDisableState( nextButton, false );
				setDisableState( previousButton, false );
			}
		}
	}

	blurryLoadImagesInit() {
		const images = this.slideWrapper.querySelectorAll(
			'.slide-content__image-full'
		) as NodeListOf< HTMLImageElement >;
		images.forEach( ( image ) => {
			// when images have loaded then fade in image
			if ( image.complete ) {
				image.style.opacity = '1';
			} else {
				image.addEventListener( 'load', function () {
					image.style.opacity = '1';
				} );
			}
		} );
	}
}
