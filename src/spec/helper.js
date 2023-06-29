import { getAllBlocks, selectBlockByClientId } from "@wordpress/e2e-test-utils";

export async function selectBlockByName(name) {
	const allBlocks = await getAllBlocks();
	const { clientId } = await allBlocks.find((block) => block.name === name);
	await selectBlockByClientId(clientId);
}

export async function openInspectorControlPanel() {
	// wait for the element to be ready
	await page.waitForXPath(
		`//div[contains(@class,"edit-post-header__settings")]//div[contains(@class, "interface-pinned-items")]//button[contains(@class, "components-button")]`
	);

	// get button element to open panel
	const [inspectorControlToggle] = await page.$x(
		'//div[contains(@class,"edit-post-header__settings")]//div[contains(@class, "interface-pinned-items")]//button[contains(@class, "components-button")]'
	);

	// open panel to allow control selection
	if (inspectorControlToggle) {
		await inspectorControlToggle.click();
	}
}

export async function selectCheckboxByLabel(labelText) {
	const [label] = await page.$x(
		`//div[contains(@class, "editor-post-slider-controls")]//label[contains(text(), "${labelText}" )]`
	);

	const inputId = await page.evaluate((el) => el.getAttribute("for"), label);

	const checkbox = await page.$(`#${inputId}`);

	if (checkbox) {
		await checkbox.click();
	}
}
