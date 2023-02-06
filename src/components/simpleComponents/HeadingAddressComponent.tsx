import React from 'react';

type HeadingComponentPropTypes = {
	address: string;
};
const HeadingAddressComponent = ({ address }: HeadingComponentPropTypes) => {
	return (
		<div>
			<div className="font-bold text-purple-600">Address: {address}</div>
		</div>
	);
};

export default HeadingAddressComponent;
