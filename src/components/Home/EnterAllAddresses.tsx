import { Button, Input } from '@nextui-org/react';
import React, { useState } from 'react';

type EnterAllAddressesProps = {
	addresses: string[];
	setAddresses: React.Dispatch<React.SetStateAction<string[]>>;
};

const EnterAllAddresses = ({ addresses, setAddresses }:EnterAllAddressesProps) => {

	return (
		<div>
			<div>
				{[...Array(addresses.length)].map((i, idx) => (
					<div key={idx} className="my-2">
						<Input
							clearable
							bordered
							aria-labelledby="enter address"
							placeholder={`Enter address ${idx + 1}`}
							value={addresses[idx]}
							onChange={(e) => {
								setAddresses([
									...addresses.slice(0, idx),
									e.target.value,
									...addresses.slice(idx + 1),
								]);
							}}
							width="100%"
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default EnterAllAddresses;
