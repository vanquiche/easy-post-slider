import {
	getEditedPostContent,
	insertBlock,
	enablePageDialogAccept,
	createNewPost,
} from '@wordpress/e2e-test-utils';

describe( 'Post Slider Block', () => {
	beforeAll( async () => {
		await enablePageDialogAccept();
	} );

	beforeEach( async () => {
		await createNewPost();
	} );

	it( 'Post Slider block should be available', async () => {
		await insertBlock( 'Parfait Designs Post Slider' );
		expect(
			await page.$( '[data-type="parfait-designs/post-slider"]' )
		).not.toBeNull();
		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );
} );
