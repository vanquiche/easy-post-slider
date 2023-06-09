/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";
import { useSelect } from "@wordpress/data";

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
	{ name: "red", color: "red" },
	{ name: "black", color: "black" },
	{ name: "white", color: "white" },
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
							value={attributes.buttons.color}
							onChange={(value) =>
								setAttributes({
									buttons: { ...attributes.buttons, color: value },
								})
							}
						/>
						<RangeControl
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
						/>
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
							label="cover image opacity"
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
							max={100}
							step={10}
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
							help="Seperate tags by coma"
						/>
					</fieldset>
				</div>
			</InspectorControls>
			<div
				{...useBlockProps({
					className: `post-slider editor-post-slider align-content--${attributes.content.alignment}`,
					style: {
						height: attributes.content.minHeight
							? attributes.content.minHeight
							: "",
					},
				})}
			>
				{attributes.content.showTitle && (
					<h2 className="slide__title">Post Title</h2>
				)}
				{attributes.content.showExcerpt && (
					<p className="slide__excerpt">
						This is the Post Excerpt. Lorem ipsum dolor sit amet, consectetur
						adipiscing elit, sed do eiusmod tempor incididunt ut labore et
						dolore magna aliqua. Urna molestie at elementum eu facilisis sed
						odio morbi. Neque convallis a cras semper auctor neque vitae tempus
						quam. Vitae et leo duis ut diam quam nulla porttitor.
					</p>
				)}
				{attributes.content.showLink && (
					<div className="slide__link-container">
						<a className="slide__link">
							<span className="slide__link-label">Read More</span>
							<span
								id="button-overlay"
								className="slide__link-overlay blur-bg"
								style={{
									backgroundColor: attributes.buttons.color,
									opacity: attributes.buttons.opacity + "%",
								}}
								aria-hidden
							></span>
						</a>
					</div>
				)}
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
					<i className="caret-left" aria-hidden></i>
					<span
						className="button-overlay blur-bg"
						style={{
							backgroundColor: attributes.buttons.color,
							opacity: attributes.buttons.opacity + "%",
						}}
					></span>
				</button>
				<button
					id="slide-right"
					className="slide__navigation-button right"
					aria-label="next slide"
				>
					<i className="caret-right" aria-hidden></i>
					<span
						className="button-overlay blur-bg"
						style={{
							backgroundColor: attributes.buttons.color,
							opacity: attributes.buttons.opacity + "%",
						}}
					></span>
				</button>
			</div>
		</>
	);
}
