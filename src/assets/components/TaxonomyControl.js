import { FormTokenField } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

export default function TaxonomyControl( {
	label,
	taxonomyType,
	value,
	onChange,
	queryArgs = { per_page: -1 },
} ) {
	const taxonomy = useSelect(
		( select ) =>
			select( 'core' ).getEntityRecords( 'taxonomy', taxonomyType, {
				per_page: -1,
				...queryArgs,
			} ),
		[]
	);

	if ( ! taxonomy ) return null;

	return (
		<FormTokenField
			label={ label }
			value={ value }
			onChange={ onChange }
			suggestions={ taxonomy.map( ( tax ) => tax.name ) }
			__experimentalShowHowTo={ false }
		/>
	);
}
