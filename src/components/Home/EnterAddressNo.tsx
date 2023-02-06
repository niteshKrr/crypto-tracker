import React, { useState } from 'react';
import Image from 'next/image';

type EnterAddressNoProps = {
	addressCount: number;
	setAddressCount: React.Dispatch<React.SetStateAction<number>>;
};

const EnterAddressNo = ({ addressCount, setAddressCount }:EnterAddressNoProps) => {
	const [textVisible, setTextVisible] = useState(false);
	const plusIconClicked = () => {
		if (addressCount < 7) setAddressCount((addr) => addr + 1);
		else {
			setTextVisible(true);
			setTimeout(() => {
				setTextVisible(false);
			}, 2500);
		}
	};

	const minusIconClicked = () => {
		if (addressCount > 1) setAddressCount((addr) => addr - 1);
	};
	return (
		<div>
			<div className="font-bold text-xl text-center">
				How many addresses would you like to track?
			</div>
			<div className="flex justify-around my-3 text-3xl font-bold">
				<button onClick={minusIconClicked}>
					<Image src="/icons/minus.png" width="30" height="30" alt="minus" />
				</button>
				<div>{addressCount}</div>
				<button onClick={plusIconClicked}>
					<Image src="/icons/plus.png" width="30" height="30" alt="plus" />
				</button>
			</div>
			{textVisible && (
				<div className="text-red-500 text-center">
					You can track upto 7 addresses only.
				</div>
			)}
		</div>
	);
};

export default EnterAddressNo;
