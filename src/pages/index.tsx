import LandingPage from '@/components/Home/LandingPage';
import MainCryptoTracker from '@/components/Tracker/MainCryptoTracker';
import { RootState } from '@/redux/store';
import { useState } from 'react';
// read data from the redux store
import { useSelector } from 'react-redux';
import MyDashboard from '../components/Tracker/MyDashboard';

const Index = () => {
	const { address } = useSelector((state: RootState) => state.userDetails);
	const [isDataFetchingDone, setIsDataFetchingDone] = useState(false)
	const [allData, setAllData] = useState<any>([]);


	if (address.length !== 0) {

		if(isDataFetchingDone){
			return <MyDashboard allData={allData}/>
		}
		return (
			<div className="bgImg">
				<div className="flex h-screen items-center justify-end">
					<MainCryptoTracker setIsDataFetchingDone={setIsDataFetchingDone} allData={allData} setAllData={setAllData} />
				</div>
			</div>
		);
	}
	return (
		<div className="bgImg">
			<LandingPage />
		</div>
	);
};

export default Index;
