import React, { useState } from 'react';
import { Checkbox } from '@nextui-org/react';

type SelectChainsProps = {
	myChains: string[];
	setMyChains: React.Dispatch<React.SetStateAction<string[]>>;
};

const SelectChains = ({ myChains, setMyChains }: SelectChainsProps) => {
	return (
		<div>
			<Checkbox.Group
				onChange={(value) => {
					value.sort();
					setMyChains(value);
				}}
				color="secondary"
				defaultValue={['0']}
				label="Select chains for which you want to track your addresses"
			>
				<Checkbox value="0">Ethereum Mainnet</Checkbox>
				<Checkbox value="1">Polygon Mainnet</Checkbox>
				<Checkbox value="2">Arbitrum Mainnet</Checkbox>
				<Checkbox value="3">Optimism Mainnet</Checkbox>
			</Checkbox.Group>
		</div>
	);
};

export default SelectChains;
