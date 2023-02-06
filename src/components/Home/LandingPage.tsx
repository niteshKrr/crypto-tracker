import React, { useState } from 'react';
import {
	Modal,
	Input,
	Row,
	Checkbox,
	Button,
	Text,
	Divider,
} from '@nextui-org/react';
import Image from 'next/image';
import EnterAddressNo from './EnterAddressNo';
import EnterAllAddresses from './EnterAllAddresses';
import SelectChains from './SelectChains';
import { useDispatch } from 'react-redux';
import {
	setStoreAddress,
	setStoreChains,
} from '@/redux/slices/UserDetailsSlice';

enum allVisibleModalOptions {
	EnterAddressNo = 'EnterAddressNo',
	EnterAllAddresses = 'EnterAllAddresses',
	SelectChains = 'SelectChains',
}

const LandingPage = () => {
	const dispatch = useDispatch();

	const [visible, setVisible] = useState(false);
	const [currentlyVisibleModal, setCurrentlyVisibleModal] =
		useState<allVisibleModalOptions>(allVisibleModalOptions.EnterAddressNo);

	// useStates for the components
	const [addressCount, setAddressCount] = useState(1);
	const [addresses, setAddresses] = useState<string[]>([]);
	const [myChains, setMyChains] = useState<string[]>(['0']);

	const handler = () => setVisible(true);
	const closeHandler = () => {
		setAddressCount(1);
		setAddresses([]);
		setCurrentlyVisibleModal(allVisibleModalOptions.EnterAddressNo);
		setVisible(false);
		console.log('closed');
	};

	const nextHandler = () => {
		if (currentlyVisibleModal === allVisibleModalOptions.EnterAddressNo) {
			const initialAddresses = Array(addressCount).fill('');
			setAddresses(initialAddresses);
			setCurrentlyVisibleModal(allVisibleModalOptions.EnterAllAddresses);
		} else if (
			currentlyVisibleModal === allVisibleModalOptions.EnterAllAddresses
		) {
			let myAddresses: string[] = [];
			addresses.map((s) => myAddresses.push(s.trim()));

			setAddresses(myAddresses);
			let okay = true;
			myAddresses.forEach((address) => {
				if (address === '') {
					okay = false;
				}
			});

			if (okay) {
				setCurrentlyVisibleModal(allVisibleModalOptions.SelectChains);
			}
		} else {
			dispatch(setStoreAddress(addresses));
			dispatch(setStoreChains(myChains));
		}
	};

	const btnClicked = () => {
		setVisible(true);
	};

	return (
		<div className="flex h-screen items-center justify-end">
			<div className="pr-32 italic text-white text-5xl font-serif">
				<div className="text-center">
					An intitutive dashboard
					<div /> for
					<div /> all your cryptos
					<div className="mt-5 flex justify-center">
						<Button shadow color="gradient" size={'lg'} onPress={btnClicked}>
							<div className="text-xl font-bold">Get started</div>
						</Button>
					</div>
				</div>
			</div>
			<Modal
				closeButton
				blur
				preventClose
				aria-labelledby="modal-title"
				open={visible}
				onClose={closeHandler}
				width="600px"
			>
				<Modal.Header>
					<div className="text-3xl font-bold font-mono">Crypto tracker🪙</div>
				</Modal.Header>
				<Divider />
				<Modal.Body>
					<div>
						{currentlyVisibleModal ===
							allVisibleModalOptions.EnterAddressNo && (
							<EnterAddressNo
								addressCount={addressCount}
								setAddressCount={setAddressCount}
							/>
						)}
						{currentlyVisibleModal ===
							allVisibleModalOptions.EnterAllAddresses && (
							<EnterAllAddresses
								addresses={addresses}
								setAddresses={setAddresses}
							/>
						)}
						{currentlyVisibleModal === allVisibleModalOptions.SelectChains && (
							<SelectChains myChains={myChains} setMyChains={setMyChains} />
						)}
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button auto flat color="error" onPress={closeHandler}>
						<div className="text-lg">Close</div>
					</Button>
					<Button auto onPress={nextHandler}>
						<div className="text-lg">Next</div>
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default LandingPage;
