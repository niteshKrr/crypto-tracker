import React from 'react';
import { Loading } from '@nextui-org/react';

const LoadingComponent = () => {
	return (
		<div className="flex justify-center pr-80">
			<Loading color="success" size='lg'>
				<div className="text-white text-xl">Loading...</div>
			</Loading>
		</div>
	);
};

export default LoadingComponent;
