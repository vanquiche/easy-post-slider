import {
	getEditedPostContent,
	insertBlock,
	enablePageDialogAccept,
	createNewPost,
} from "@wordpress/e2e-test-utils";

import {
	selectBlockByName,
	openInspectorControlPanel,
	selectCheckboxByLabel,
} from "./helper";

describe("Post Slider Block", () => {
	beforeAll(async () => {
		await enablePageDialogAccept();
	});

	beforeEach(async () => {
		await createNewPost();
	});

	it("Block should be available", async () => {
		await insertBlock("Parfait Designs Post Slider");

		expect(
			await page.$('[data-type="parfait-designs/post-slider"]')
		).not.toBeNull();

		expect(await getEditedPostContent()).toMatchSnapshot();
	});

	it("Title visibility can be toggled", async () => {
		await insertBlock("Parfait Designs Post Slider");

		await selectBlockByName("parfait-designs/post-slider");

		await openInspectorControlPanel();

		await selectCheckboxByLabel("Show Title");

		expect(await getEditedPostContent()).toMatchSnapshot();
	});

	it("Excerpt visibility can be toggled", async () => {
		await insertBlock("Parfait Designs Post Slider");

		await selectBlockByName("parfait-designs/post-slider");

		await openInspectorControlPanel();

		await selectCheckboxByLabel("Show Excerpt");

		expect(await getEditedPostContent()).toMatchSnapshot();
	});
});
