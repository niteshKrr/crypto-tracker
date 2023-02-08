import React, { useState, useEffect } from "react";
import { Alchemy, Network } from "alchemy-sdk";
import { getAllMyTokens } from "@/utils/GetAllTokens";
import LoadingComponent from "./LoadingComponent";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import MyTable from "./MyTable";
import HeadingAddressComponent from "../simpleComponents/HeadingAddressComponent";
import HeadingChainComponent from "../simpleComponents/HeadingChainComponent";
import SimpleBar from "simplebar-react";

// available mainnet networks are:
const myNetworks = [
  Network.ETH_MAINNET,
  Network.MATIC_MAINNET,
  Network.ARB_MAINNET,
  Network.OPT_MAINNET,
];

type PropType = {
  setIsDataFetchingDone: (val: boolean) => void;
  allData: any;
  setAllData: any;
};

const MainCryptoTracker = ({
  setIsDataFetchingDone,
  allData,
  setAllData,
}: PropType) => {
  // to prevent useEffect from running multiple times
  let preventer = 0;

  const { address, chains } = useSelector(
    (state: RootState) => state.userDetails
  );

  const fetchAllTheData = async () => {
    let allMyData: any = [];
    for (let i = 0; i < chains.length; i++) {
      let dataForCurrChain = [];
      let myCurrChain = myNetworks[Number(chains[i])];
      for (let j = 0; j < address.length; j++) {
        const myTokens = await getAllMyTokens(address[j], myCurrChain);
        dataForCurrChain.push(myTokens);
      }
      allMyData.push(dataForCurrChain);
    }
    setAllData(allMyData);
    setIsDataFetchingDone(true);
  };

  useEffect(() => {
    if (preventer === 0) {
      console.log("i fire once");
      fetchAllTheData();
      preventer = 1;
    }
  }, []);

  return (
    <div>
      <LoadingComponent />
    </div>
  );
};

export default MainCryptoTracker;
