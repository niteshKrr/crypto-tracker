import LandingPage from '@/components/Home/LandingPage';
import MainCryptoTracker from '@/components/Tracker/MainCryptoTracker';
import { RootState } from '@/redux/store';
// read data from the redux store
import { useSelector } from 'react-redux';

const Index = () => {
	const { address } = useSelector((state: RootState) => state.userDetails);

	if (address.length !== 0) {
		return (
			<div className="bgImg">
				<div className="flex h-screen items-center justify-end">
					<MainCryptoTracker />
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
