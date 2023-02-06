import React, { useState, useEffect } from 'react';
import { Alchemy, Network } from 'alchemy-sdk';
import { getAllMyTokens } from '@/utils/GetAllTokens';
import LoadingComponent from './LoadingComponent';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import MyTable from './MyTable';
import HeadingAddressComponent from '../simpleComponents/HeadingAddressComponent';
import HeadingChainComponent from '../simpleComponents/HeadingChainComponent';
import SimpleBar from 'simplebar-react';

// available mainnet networks are:
const myNetworks = [
	Network.ETH_MAINNET,
	Network.MATIC_MAINNET,
	Network.ARB_MAINNET,
	Network.OPT_MAINNET,
];

const MainCryptoTracker = () => {
	// to prevent useEffect from running multiple times
	let preventer = 0;

	const { address, chains } = useSelector(
		(state: RootState) => state.userDetails
	);
	const [loading, setLoading] = useState(true);
	const [allData, setAllData] = useState<any>([]);

	const fetchAllTheData = async () => {
		let allMyData: any = [];
		for (let i = 0; i < chains.length; i++) {
			let dataForCurrChain = [];
			let myCurrChain = myNetworks[Number(chains[i])];
			// console.log('my curr chain is: ', myNetworks[Number(chains[i])]);
			for (let j = 0; j < address.length; j++) {
				const myTokens = await getAllMyTokens(address[j], myCurrChain);
				// console.log('my tokens are: ', myTokens, myCurrChain);
				dataForCurrChain.push(myTokens);
			}
			allMyData.push(dataForCurrChain);
		}
		// console.log('all my fetched data', allMyData);
		setAllData(allMyData);
		setLoading(false);
	};

	useEffect(() => {
		if (preventer === 0) {
			console.log('i fire once');
			setLoading(true);
			fetchAllTheData();
			preventer = 1;
		}
	}, []);

	if (loading) {
		return (
			<div>
				<LoadingComponent />
			</div>
		);
	}
	return (
		<div>
			<SimpleBar
				style={{
					maxHeight: '85vh',
					overflowY: 'scroll',
				}}
			>
				<div className="pr-32">
					{chains.map((chain, idx) => {
						return (
							<div key={idx}>
								<HeadingChainComponent idx={Number(chain)} />
								{address.map((addr, idx) => {
									return (
										<div key={idx}>
											<HeadingAddressComponent address={addr} />
											<MyTable allMyData={allData[Number(chain)][idx]} />
										</div>
									);
								})}
							</div>
						);
					})}
				</div>
			</SimpleBar>
		</div>
	);
};

export default MainCryptoTracker;
