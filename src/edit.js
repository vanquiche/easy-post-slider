/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import getContrastColor from './assets/js/getContrastColor';
import getHexToRgb from './assets/js/getHexToRgb';

import {
	RangeControl,
	ColorPalette,
	TextControl,
	SelectControl,
	CheckboxControl,
	__experimentalUnitControl as UnitControl,
	__experimentalAlignmentMatrixControl as AlignmentMatrixControl,
} from '@wordpress/components';
/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */

const colors = [
	{ name: 'red', color: '#dd1c1a' },
	{ name: 'black', color: '#343a40' },
	{ name: 'white', color: '#f6fff8' },
];

const bgColors = [
	{ name: 'charcoal', color: '#465362' },
	{ name: 'eggshell', color: '#e7ecef' },
];

const units = [
	{ value: 'px', label: 'px', default: 0 },
	{ value: '%', label: '%', default: 10 },
	{ value: 'vw', label: 'vw', default: 0 },
	{ value: 'vh', label: 'vh', default: 0 },
	{ value: 'rem', label: 'rem', default: 0 },
	{ value: 'em', label: 'em', default: 0 },
];

export default function Edit( { attributes, setAttributes } ) {
	const categories = useSelect(
		( select ) =>
			select( 'core' ).getEntityRecords( 'taxonomy', 'category' ),
		[]
	);

	return (
		<>
			<InspectorControls>
				<div className="editor-post-slider-controls">
					<fieldset>
						<h2>
							{ __( 'Content', 'parfait-designs-post-slider' ) }
						</h2>
						<CheckboxControl
							label={ __(
								'Show Title',
								'parfait-designs-post-slider'
							) }
							checked={ attributes.content.showTitle }
							onChange={ ( value ) =>
								setAttributes( {
									content: {
										...attributes.content,
										showTitle: value,
									},
								} )
							}
							help={ __(
								'Toggle post title visibility',
								'parfait-designs-post-slider'
							) }
						/>
						<CheckboxControl
							label={ __(
								'Show Excerpt',
								'parfait-designs-post-slider'
							) }
							checked={ attributes.content.showExcerpt }
							onChange={ ( value ) =>
								setAttributes( {
									content: {
										...attributes.content,
										showExcerpt: value,
									},
								} )
							}
							help={ __(
								'Toggle post excerpt visibility',
								'parfait-designs-post-slider'
							) }
						/>
						<CheckboxControl
							label="Show Link"
							checked={ attributes.content.showLink }
							onChange={ ( value ) =>
								setAttributes( {
									content: {
										...attributes.content,
										showLink: value,
									},
								} )
							}
							help={ __(
								'Toggle post link visibility',
								'parfait-designs-post-slider'
							) }
						/>
						<CheckboxControl
							label={ __(
								'Content Background',
								'parfait-designs-post-slider'
							) }
							checked={ attributes.content.background }
							onChange={ ( value ) =>
								setAttributes( {
									content: {
										...attributes.content,
										background: value,
									},
								} )
							}
							help={ __(
								'Disabling this feature may affect the contrast and readability',
								'parfait-designs-post-slider'
							) }
						/>
						<CheckboxControl
							label={ __(
								'Transparent background',
								'parfait-designs-post-slider'
							) }
							checked={ attributes.content.transparentBg }
							onChange={ ( value ) =>
								setAttributes( {
									content: {
										...attributes.content,
										transparentBg: value,
									},
								} )
							}
						/>
						<label htmlFor="content-background-color-control">
							{ __(
								'Content Background Color',
								'parfait-designs-post-slider'
							) }
						</label>
						<ColorPalette
							style={ { margin: '12px 0' } }
							id="content-background-color-control"
							clearable={ false }
							colors={ bgColors }
							value={ attributes.content.bgColor }
							onChange={ ( value ) =>
								setAttributes( {
									content: {
										...attributes.content,
										bgColor: value,
										fontColor: getContrastColor( value ),
									},
								} )
							}
						/>

						<AlignmentMatrixControl
							value={ attributes.content.alignment.replace(
								'-',
								' '
							) }
							onChange={ ( value ) =>
								setAttributes( {
									content: {
										...attributes.content,
										alignment: value.replace( ' ', '-' ),
									},
								} )
							}
						/>
						<UnitControl
							className="editor-post-slider-units-control"
							value={ attributes.content.minHeight }
							onChange={ ( value ) =>
								setAttributes( {
									content: {
										...attributes.content,
										minHeight: value,
									},
								} )
							}
							units={ units }
						/>
					</fieldset>
					<fieldset>
						<h2>
							{ __( 'Styles', 'parfait-designs-post-slider' ) }
						</h2>
						<label htmlFor="button-color-control">
							{ __(
								'Button Color',
								'parfait-designs-post-slider'
							) }
						</label>
						<ColorPalette
							style={ { margin: '12px 0' } }
							id="button-color-control"
							clearable={ false }
							colors={ colors }
							value={ attributes.buttons.bgColor }
							onChange={ ( value ) =>
								setAttributes( {
									buttons: {
										...attributes.buttons,
										bgColor: value,
										fontColor: getContrastColor( value ),
									},
								} )
							}
						/>
						<label htmlFor="scrollbar-color-control">
							{ __(
								'Scrollbar Color',
								'parfait-designs-post-slider'
							) }
						</label>
						<ColorPalette
							style={ { margin: '12px 0' } }
							id="button-scrollbar-control"
							clearable={ false }
							colors={ colors }
							value={ attributes.scrollbar.color }
							onChange={ ( value ) =>
								setAttributes( {
									scrollbar: {
										...attributes.scrollbar,
										color: value,
									},
								} )
							}
						/>
						<CheckboxControl
							label={ __(
								'show scrollbar',
								'parfait-designs-post-slider'
							) }
							checked={ attributes.scrollbar.showScrollbar }
							onChange={ ( value ) =>
								setAttributes( {
									scrollbar: {
										...attributes.scrollbar,
										showScrollbar: value,
									},
								} )
							}
							help={ __(
								'Toggle scrollbar visibility',
								'parfait-designs-post-slider'
							) }
						/>
						<RangeControl
							label={ __(
								'cover image overlay',
								'parfait-designs-post-slider'
							) }
							value={ attributes.coverImage.opacity }
							onChange={ ( value ) =>
								setAttributes( {
									coverImage: {
										...attributes.coverImage,
										opacity: parseInt( value ),
									},
								} )
							}
							min={ 0 }
							max={ 10 }
							step={ 1 }
						/>
						<label htmlFor="overlay-color-control">
							{ __(
								'Overlay Color',
								'parfait-designs-post-slider'
							) }
						</label>
						<ColorPalette
							style={ { margin: '12px 0' } }
							id="overlay-color-control"
							clearable={ false }
							colors={ bgColors }
							value={ attributes.coverImage.overlayColor }
							onChange={ ( value ) =>
								setAttributes( {
									coverImage: {
										...attributes.coverImage,
										overlayColor: value,
										fontColor: getContrastColor( value ),
									},
								} )
							}
						/>
					</fieldset>
					<fieldset>
						<h2>
							{ __( 'Query', 'parfait-designs-post-slider' ) }
						</h2>
						<RangeControl
							label={ __(
								'number of posts',
								'parfait-designs-post-slider'
							) }
							value={ attributes.query.posts_per_page }
							onChange={ ( value ) =>
								setAttributes( {
									query: {
										...attributes.query,
										posts_per_page: parseInt( value ),
									},
								} )
							}
							min={ 1 }
							max={ 6 }
							step={ 1 }
						/>
						{ categories && (
							<SelectControl
								label={ __(
									'filter by category',
									'parfait-designs-post-slider'
								) }
								value={ attributes.query.cat }
								options={ categories.map(
									( { name, id } ) => ( {
										label: name,
										value: id,
									} )
								) }
								onChange={ ( value ) =>
									setAttributes( {
										query: {
											...attributes.query,
											cat: parseInt( value ),
										},
									} )
								}
							/>
						) }
						<TextControl
							label={ __(
								'filter by tag(s)',
								'parfait-designs-post-slider'
							) }
							value={ attributes.query.tag_slug__in.join() }
							onChange={ ( value ) =>
								setAttributes( {
									query: {
										...attributes.query,
										tag_slug__in: value.split( ',' ),
									},
								} )
							}
							help={ __(
								'Separate tags with comas',
								'parfait-designs-post-slider'
							) }
						/>
					</fieldset>
				</div>
			</InspectorControls>
			<div
				{ ...useBlockProps( {
					className: `editor-post-slider align-content--${ attributes.content.alignment }`,
					style: {
						height: attributes.content.minHeight
							? attributes.content.minHeight
							: '',
					},
				} ) }
			>
				<div
					className={ `slide__content ${
						attributes.content.background
							? 'blur-bg drop-shadow'
							: ''
					}` }
					style={ {
						backgroundColor: attributes.content.background
							? getHexToRgb(
									attributes.content.bgColor,
									attributes.content.transparentBg ? 0.5 : 1
							  )
							: null,
						color: attributes.content.background
							? attributes.content.fontColor
							: 'inherit',
					} }
				>
					{ attributes.content.showTitle && (
						<h2 className="slide__title">
							{ __(
								'Post Title',
								'parfait-designs-post-slider'
							) }
						</h2>
					) }
					{ attributes.content.showExcerpt && (
						<p className="slide__excerpt">
							{ __(
								'This is an example of the post excerpt. So she was considering in her own mind (as well as she could, for the hot day made her feel very sleepy and stupid) whether the pleasure of making a daisy-chain would be worth the trouble of getting up and picking the daisies, when suddenly a White Rabbit with pink eyes ran close by her.',
								'parfait-designs-post-slider'
							) }
						</p>
					) }
					{ attributes.content.showLink && (
						<div
							className={ `slide__link-container align-content--${ attributes.content.alignment }` }
						>
							<a className="slide__link">
								<span
									className="slide__link-label"
									style={ {
										color: attributes.buttons.fontColor,
									} }
								>
									{ __(
										'Read More',
										'parfait-designs-post-slider'
									) }
								</span>
								<span
									id="button-overlay"
									className="slide__link-overlay blur-bg"
									style={ {
										backgroundColor:
											attributes.buttons.bgColor,
										opacity:
											attributes.buttons.opacity + '%',
									} }
									aria-hidden
								></span>
							</a>
						</div>
					) }
				</div>
				{ attributes.scrollbar.showScrollbar && (
					<div
						id="slide-scrollbar"
						className="slide__scrollbar"
						aria-hidden
					>
						<div
							className="slide__scrollbar-inner"
							style={ {
								backgroundColor: attributes.scrollbar.color,
								width: '75%',
							} }
						></div>
						<div
							className="slide__scrollbar-inner"
							style={ {
								backgroundColor: attributes.scrollbar.color,
								width: '100%',
								opacity: 0.5,
							} }
						></div>
					</div>
				) }
				<button
					id="slide-left"
					className="slide__navigation-button left"
					aria-label="previous slide"
				>
					<i
						className="caret-left"
						style={ {
							backgroundColor: attributes.buttons.fontColor,
						} }
						aria-hidden
					></i>
					<span
						className="button-overlay blur-bg"
						style={ {
							backgroundColor: attributes.buttons.bgColor,
						} }
					></span>
				</button>
				<button
					id="slide-right"
					className="slide__navigation-button right"
					aria-label="next slide"
				>
					<i
						className="caret-right"
						style={ {
							backgroundColor: attributes.buttons.fontColor,
						} }
						aria-hidden
					></i>
					<span
						className="button-overlay blur-bg"
						style={ {
							backgroundColor: attributes.buttons.bgColor,
							opacity: attributes.buttons.opacity + '%',
						} }
					></span>
				</button>
				<div
					className="editor-slide__cover-image__overlay"
					style={ {
						backgroundColor: getHexToRgb(
							attributes.coverImage.overlayColor,
							attributes.coverImage.opacity * 0.1
						),
					} }
					aria-hidden="true"
				></div>
				<div
					id="post-slider-cover-image"
					className="editor-slide__cover-image"
					aria-hidden="true"
				></div>
			</div>
		</>
	);
}
