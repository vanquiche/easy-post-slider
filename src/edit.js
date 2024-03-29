/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import getContrastColor from './assets/js/getContrastColor';
import getHexToRgb from './assets/js/getHexToRgb';
import { COLORS, BG_COLORS } from './assets/js/palette';

import {
	RangeControl,
	ColorPalette,
	CheckboxControl,
	__experimentalUnitControl as UnitControl,
	__experimentalAlignmentMatrixControl as AlignmentMatrixControl,
	PanelBody,
	RadioControl,
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
import TaxonomyControl from './assets/components/TaxonomyControl';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
const units = [
	{ value: 'px', label: 'px', default: 0 },
	{ value: '%', label: '%', default: 10 },
	{ value: 'vw', label: 'vw', default: 0 },
	{ value: 'vh', label: 'vh', default: 0 },
	{ value: 'rem', label: 'rem', default: 0 },
	{ value: 'em', label: 'em', default: 0 },
];

const scrollbarTypesOptions = [
	{
		label: __( 'Progress', 'easy-post-slider' ),
		value: 'progress',
	},
	{
		label: __( 'Dots', 'easy-post-slider' ),
		value: 'dots',
	},
];

export default function Edit( { attributes, setAttributes } ) {
	return (
		<>
			<InspectorControls>
				<div className="easy-ps-editor-post-slider-controls">
					{ /* CONTENT */ }
					<PanelBody
						title={ __( 'Content', 'easy-post-slider' ) }
						initialOpen={ true }
					>
						<fieldset>
							<CheckboxControl
								label={ __( 'Show Title', 'easy-post-slider' ) }
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
									'easy-post-slider'
								) }
							/>
							<CheckboxControl
								label={ __(
									'Show Excerpt',
									'easy-post-slider'
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
									'easy-post-slider'
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
									'easy-post-slider'
								) }
							/>
							<CheckboxControl
								label={ __(
									'Content Background',
									'easy-post-slider'
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
									'Disabling this feature may affect the readability of some text.',
									'easy-post-slider'
								) }
							/>
							<CheckboxControl
								label={ __(
									'Transparent background',
									'easy-post-slider'
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
								help={ __(
									'Enabling this feature may affect the readability of some text.',
									'easy-post-slider'
								) }
							/>
							<label htmlFor="content-background-color-control">
								{ __(
									'Content Background Color',
									'easy-post-slider'
								) }
							</label>
							<ColorPalette
								style={ { margin: '12px 0' } }
								id="content-background-color-control"
								clearable={ false }
								colors={ COLORS }
								value={ attributes.content.bgColor }
								onChange={ ( value ) =>
									setAttributes( {
										content: {
											...attributes.content,
											bgColor: value,
											fontColor:
												getContrastColor( value ),
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
											alignment: value.replace(
												' ',
												'-'
											),
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
								label={ __( 'Min Height', 'easy-post-slider' ) }
							/>
						</fieldset>
					</PanelBody>
					{ /* STYLES */ }
					<PanelBody
						title={ __( 'Styles', 'easy-post-slider' ) }
						initialOpen={ false }
					>
						<fieldset>
							<label htmlFor="button-color-control">
								{ __( 'Button Color', 'easy-post-slider' ) }
							</label>
							<ColorPalette
								style={ { margin: '12px 0' } }
								id="button-color-control"
								clearable={ false }
								colors={ COLORS }
								value={ attributes.buttons.bgColor }
								onChange={ ( value ) =>
									setAttributes( {
										buttons: {
											...attributes.buttons,
											bgColor: value,
											fontColor:
												getContrastColor( value ),
										},
									} )
								}
							/>
							<label htmlFor="scrollbar-color-control">
								{ __( 'Scrollbar Color', 'easy-post-slider' ) }
							</label>
							<ColorPalette
								style={ { margin: '12px 0' } }
								id="button-scrollbar-control"
								clearable={ false }
								colors={ COLORS }
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
									'easy-post-slider'
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
							/>
							{ attributes.scrollbar.showScrollbar && (
								<RadioControl
									label={ __(
										'Scrollbar type',
										'easy-post-slider'
									) }
									selected={ attributes.scrollbar.type }
									options={ scrollbarTypesOptions }
									onChange={ ( value ) =>
										setAttributes( {
											scrollbar: {
												...attributes.scrollbar,
												type: value,
											},
										} )
									}
								/>
							) }
							<RangeControl
								label={ __(
									'cover image overlay',
									'easy-post-slider'
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
								{ __( 'Overlay Color', 'easy-post-slider' ) }
							</label>
							<ColorPalette
								style={ { margin: '12px 0' } }
								id="overlay-color-control"
								clearable={ false }
								colors={ BG_COLORS }
								value={ attributes.coverImage.overlayColor }
								onChange={ ( value ) =>
									setAttributes( {
										coverImage: {
											...attributes.coverImage,
											overlayColor: value,
											fontColor:
												getContrastColor( value ),
										},
									} )
								}
							/>
						</fieldset>
					</PanelBody>
					{ /* QUERY */ }
					<PanelBody
						title={ __( 'Query', 'easy-post-slider' ) }
						initialOpen={ false }
					>
						<fieldset>
							<RangeControl
								label={ __(
									'number of posts',
									'easy-post-slider'
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
							<TaxonomyControl
								label={ __(
									'Filter by categories',
									'easy-post-slider'
								) }
								taxonomyType="category"
								value={ attributes.query.cat }
								onChange={ ( tokens ) =>
									setAttributes( {
										query: {
											...attributes.query,
											cat: tokens,
										},
									} )
								}
							/>
							<TaxonomyControl
								label={ __(
									'Filter by tag(s)',
									'easy-post-slider'
								) }
								taxonomyType="post_tag"
								value={ attributes.query.tag_slug__in }
								onChange={ ( tokens ) =>
									setAttributes( {
										query: {
											...attributes.query,
											tag_slug__in: tokens,
										},
									} )
								}
							/>
						</fieldset>
					</PanelBody>
				</div>
			</InspectorControls>
			<div
				{ ...useBlockProps( {
					className: `easy-ps-editor-post-slider easy-ps-align-content--${ attributes.content.alignment }`,
					style: {
						height: attributes.content.minHeight
							? attributes.content.minHeight
							: '',
					},
				} ) }
			>
				<div
					className={ `easy-ps-slide__content ${
						attributes.content.background
							? 'easy-ps-blur-bg drop-shadow'
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
						<h2 className="easy-ps-slide__title">
							{ __( 'Post Title', 'easy-post-slider' ) }
						</h2>
					) }
					{ attributes.content.showExcerpt && (
						<p className="easy-ps-slide__excerpt">
							{ __(
								'This is an example of the post excerpt. So she was considering in her own mind (as well as she could, for the hot day made her feel very sleepy and stupid) whether the pleasure of making a daisy-chain would be worth the trouble of getting up and picking the daisies, when suddenly a White Rabbit with pink eyes ran close by her.',
								'easy-post-slider'
							) }
						</p>
					) }
					{ attributes.content.showLink && (
						<div
							className={ `easy-ps-slide__link-container easy-ps-align-content--${ attributes.content.alignment }` }
						>
							<button className="easy-ps-slide__link">
								<span
									className="easy-ps-slide__link-label"
									style={ {
										color: attributes.buttons.fontColor,
									} }
								>
									{ __( 'Read More', 'easy-post-slider' ) }
								</span>
								<span
									id="button-overlay"
									className="easy-ps-slide__link-overlay easy-ps-blur-bg"
									style={ {
										backgroundColor:
											attributes.buttons.bgColor,
										opacity:
											attributes.buttons.opacity + '%',
									} }
									aria-hidden
								></span>
							</button>
						</div>
					) }
				</div>
				{ /* SCROLLBAR */ }
				{ attributes.scrollbar.showScrollbar && (
					<div
						id="slide-scrollbar"
						className="easy-ps-slide__scrollbar"
						aria-hidden
					>
						{ attributes.scrollbar.type === 'progress' ? (
							<>
								<div
									className="easy-ps-slide__scrollbar-inner"
									style={ {
										backgroundColor:
											attributes.scrollbar.color,
										width: '75%',
									} }
								></div>
								<div
									className="easy-ps-slide__scrollbar-inner"
									style={ {
										backgroundColor:
											attributes.scrollbar.color,
										width: '100%',
										opacity: 0.5,
									} }
								></div>
							</>
						) : (
							<div className="easy-ps-slide__scrollbar-dots">
								<span
									className="easy-ps-scrollbar-dot easy-ps-scrollbar-dot--fill"
									style={ {
										borderColor: attributes.scrollbar.color,
										backgroundColor:
											attributes.scrollbar.color,
									} }
								></span>
								<span
									style={ {
										borderColor: attributes.scrollbar.color,
									} }
									className="easy-ps-scrollbar-dot"
								></span>
								<span
									style={ {
										borderColor: attributes.scrollbar.color,
									} }
									className="easy-ps-scrollbar-dot"
								></span>
							</div>
						) }
					</div>
				) }
				<button
					id="slide-left"
					className="easy-ps-slide__navigation-button easy-ps-left"
					aria-label="previous slide"
				>
					<i
						className="easy-ps-caret-left"
						style={ {
							backgroundColor: attributes.buttons.fontColor,
						} }
						aria-hidden
					></i>
					<span
						className="easy-ps-button-overlay easy-ps-blur-bg"
						style={ {
							backgroundColor: attributes.buttons.bgColor,
						} }
					></span>
				</button>
				<button
					id="slide-right"
					className="easy-ps-slide__navigation-button easy-ps-right"
					aria-label="next slide"
				>
					<i
						className="easy-ps-caret-right"
						style={ {
							backgroundColor: attributes.buttons.fontColor,
						} }
						aria-hidden
					></i>
					<span
						className="easy-ps-button-overlay easy-ps-blur-bg"
						style={ {
							backgroundColor: attributes.buttons.bgColor,
							opacity: attributes.buttons.opacity + '%',
						} }
					></span>
				</button>
				<div
					className="easy-ps-editor-slide__cover-image__overlay"
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
					className="easy-ps-editor-slide__cover-image"
					aria-hidden="true"
				></div>
			</div>
		</>
	);
}
