/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";
import { useSelect } from "@wordpress/data";
import getContrastColor from "./assets/js/getContrastColor";
import getHexToRgb from "./assets/js/getHexToRgb";

import {
	RangeControl,
	ColorPalette,
	TextControl,
	SelectControl,
	CheckboxControl,
	__experimentalUnitControl as UnitControl,
	__experimentalAlignmentMatrixControl as AlignmentMatrixControl,
} from "@wordpress/components";
/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */

const colors = [
	{ name: "red", color: "#dd1c1a" },
	{ name: "black", color: "#343a40" },
	{ name: "white", color: "#f6fff8" },
];

const bgColors = [
	{ name: "charcoal", color: "#465362" },
	{ name: "eggshell", color: "#e7ecef" },
];

const units = [
	{ value: "px", label: "px", default: 0 },
	{ value: "%", label: "%", default: 10 },
	{ value: "vw", label: "vw", default: 0 },
	{ value: "vh", label: "vh", default: 0 },
	{ value: "rem", label: "rem", default: 0 },
	{ value: "em", label: "em", default: 0 },
];

export default function Edit({ attributes, setAttributes }) {
	const categories = useSelect(
		(select) => select("core").getEntityRecords("taxonomy", "category"),
		[]
	);

	return (
		<>
			<InspectorControls>
				<div className="editor-post-slider-controls">
					<fieldset>
						<h2>Content</h2>
						<CheckboxControl
							label="Show Title"
							checked={attributes.content.showTitle}
							onChange={(value) =>
								setAttributes({
									content: { ...attributes.content, showTitle: value },
								})
							}
							help="Toggle post title visibility"
						/>
						<CheckboxControl
							label="Show Excerpt"
							checked={attributes.content.showExcerpt}
							onChange={(value) =>
								setAttributes({
									content: { ...attributes.content, showExcerpt: value },
								})
							}
							help="Toggle post excerpt visibility"
						/>
						<CheckboxControl
							label="Show Link"
							checked={attributes.content.showLink}
							onChange={(value) =>
								setAttributes({
									content: { ...attributes.content, showLink: value },
								})
							}
							help="Toggle post link visibility"
						/>
						<CheckboxControl
							label="Content Background"
							checked={attributes.content.background}
							onChange={(value) =>
								setAttributes({
									content: { ...attributes.content, background: value },
								})
							}
							help="Disabling this feature may affect the contrast and readability"
						/>
						<CheckboxControl
							label="Transparent background"
							checked={attributes.content.transparentBg}
							onChange={(value) =>
								setAttributes({
									content: { ...attributes.content, transparentBg: value },
								})
							}
						/>
						<label for="content-background-color-control">
							Content Backdrop Color
						</label>
						<ColorPalette
							style={{ marginTop: "12px" }}
							id="content-background-color-control"
							colors={bgColors}
							value={attributes.content.bgColor}
							onChange={(value) =>
								setAttributes({
									content: {
										...attributes.content,
										bgColor: value,
										fontColor: getContrastColor(value),
									},
								})
							}
						/>

						<AlignmentMatrixControl
							value={attributes.content.alignment.replace("-", " ")}
							onChange={(value) =>
								setAttributes({
									content: {
										...attributes.content,
										alignment: value.replace(" ", "-"),
									},
								})
							}
						/>
						<UnitControl
							className="editor-post-slider-units-control"
							value={attributes.content.minHeight}
							onChange={(value) =>
								setAttributes({
									content: { ...attributes.content, minHeight: value },
								})
							}
							units={units}
						/>
					</fieldset>
					<fieldset>
						<h2>Styles</h2>
						<label for="button-color-control">Button Color</label>
						<ColorPalette
							style={{ marginTop: "12px" }}
							id="button-color-control"
							colors={colors}
							value={attributes.buttons.bgColor}
							onChange={(value) =>
								setAttributes({
									buttons: {
										...attributes.buttons,
										bgColor: value,
										fontColor: getContrastColor(value),
									},
								})
							}
						/>
						{/* <RangeControl
							label="button opacity"
							value={attributes.buttons.opacity}
							onChange={(value) =>
								setAttributes({
									buttons: { ...attributes.buttons, opacity: parseInt(value) },
								})
							}
							min={0}
							max={100}
							step={10}
						/> */}
						<label for="scrollbar-color-control">Scrollbar Color</label>
						<ColorPalette
							style={{ marginTop: "12px" }}
							id="button-scrollbar-control"
							colors={colors}
							value={attributes.scrollbar.color}
							onChange={(value) =>
								setAttributes({
									scrollbar: { ...attributes.scrollbar, color: value },
								})
							}
						/>
						<CheckboxControl
							label="show scrollbar"
							checked={attributes.scrollbar.showScrollbar}
							onChange={(value) =>
								setAttributes({
									scrollbar: { ...attributes.scrollbar, showScrollbar: value },
								})
							}
							help="Toggle scrollbar visibility"
						/>
						<RangeControl
							label="cover image overlay"
							value={attributes.coverImage.opacity}
							onChange={(value) =>
								setAttributes({
									coverImage: {
										...attributes.coverImage,
										opacity: parseInt(value),
									},
								})
							}
							min={0}
							max={10}
							step={1}
						/>
						<label for="overlay-color-control">Overlay Color</label>
						<ColorPalette
							style={{ marginTop: "12px" }}
							id="overlay-color-control"
							colors={bgColors}
							value={attributes.coverImage.overlayColor}
							onChange={(value) =>
								setAttributes({
									coverImage: {
										...attributes.coverImage,
										overlayColor: value,
										fontColor: getContrastColor(value),
									},
								})
							}
						/>
					</fieldset>
					<fieldset>
						<h2>Query</h2>
						<RangeControl
							label="number of posts"
							value={attributes.query.posts_per_page}
							onChange={(value) =>
								setAttributes({
									query: {
										...attributes.query,
										posts_per_page: parseInt(value),
									},
								})
							}
							min={1}
							max={6}
							step={1}
						/>
						{categories && (
							<SelectControl
								label="filter by category"
								value={attributes.query.cat}
								options={categories.map(({ name, id }) => ({
									label: name,
									value: id,
								}))}
								onChange={(value) =>
									setAttributes({
										query: { ...attributes.query, cat: parseInt(value) },
									})
								}
							/>
						)}
						<TextControl
							label="filter by tag(s)"
							value={attributes.query.tag_slug__in.join()}
							onChange={(value) =>
								setAttributes({
									query: {
										...attributes.query,
										tag_slug__in: value.split(","),
									},
								})
							}
							help="Separate tags with comas"
						/>
					</fieldset>
				</div>
			</InspectorControls>
			<div
				{...useBlockProps({
					className: `editor-post-slider align-content--${attributes.content.alignment}`,
					style: {
						height: attributes.content.minHeight
							? attributes.content.minHeight
							: "",
					},
				})}
			>
				<div
					className={`slide__content ${
						attributes.content.background ? "blur-bg drop-shadow" : ""
					}`}
					style={{
						backgroundColor: attributes.content.background
							? getHexToRgb(
									attributes.content.bgColor,
									attributes.content.transparentBg ? 0.5 : 1
							  )
							: null,
						color: attributes.content.background
							? attributes.content.fontColor
							: "inherit",
					}}
				>
					{attributes.content.showTitle && (
						<h2 className="slide__title">Post Title</h2>
					)}
					{attributes.content.showExcerpt && (
						<p className="slide__excerpt">
							This is an example of the post excerpt. So she was considering in
							her own mind (as well as she could, for the hot day made her feel
							very sleepy and stupid) whether the pleasure of making a
							daisy-chain would be worth the trouble of getting up and picking
							the daisies, when suddenly a White Rabbit with pink eyes ran close
							by her.
						</p>
					)}
					{attributes.content.showLink && (
						<div
							className={`slide__link-container align-content--${attributes.content.alignment}`}
						>
							<a className="slide__link">
								<span
									className="slide__link-label"
									style={{ color: attributes.buttons.fontColor }}
								>
									Read More
								</span>
								<span
									id="button-overlay"
									className="slide__link-overlay blur-bg"
									style={{
										backgroundColor: attributes.buttons.bgColor,
										opacity: attributes.buttons.opacity + "%",
									}}
									aria-hidden
								></span>
							</a>
						</div>
					)}
				</div>
				{attributes.scrollbar.showScrollbar && (
					<div id="slide-scrollbar" className="slide__scrollbar" aria-hidden>
						<div
							className="slide__scrollbar-inner"
							style={{
								backgroundColor: attributes.scrollbar.color,
								width: "75%",
							}}
						></div>
						<div
							className="slide__scrollbar-inner"
							style={{
								backgroundColor: attributes.scrollbar.color,
								width: "100%",
								opacity: 0.5,
							}}
						></div>
					</div>
				)}
				<button
					id="slide-left"
					className="slide__navigation-button left"
					aria-label="previous slide"
				>
					<i
						className="caret-left"
						style={{ backgroundColor: attributes.buttons.fontColor }}
						aria-hidden
					></i>
					<span
						className="button-overlay blur-bg"
						style={{
							backgroundColor: attributes.buttons.bgColor,
						}}
					></span>
				</button>
				<button
					id="slide-right"
					className="slide__navigation-button right"
					aria-label="next slide"
				>
					<i
						className="caret-right"
						style={{ backgroundColor: attributes.buttons.fontColor }}
						aria-hidden
					></i>
					<span
						className="button-overlay blur-bg"
						style={{
							backgroundColor: attributes.buttons.bgColor,
							opacity: attributes.buttons.opacity + "%",
						}}
					></span>
				</button>
				<div
					className="editor-slide__cover-image__overlay"
					style={{
						backgroundColor: getHexToRgb(
							attributes.coverImage.overlayColor,
							attributes.coverImage.opacity * 0.1
						),
					}}
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
