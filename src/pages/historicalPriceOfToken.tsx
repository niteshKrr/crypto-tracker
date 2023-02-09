import React from 'react'
import { useEffect, useState } from 'react'
import axios from "axios";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Loading } from '@nextui-org/react';


const HistoricalPriceOfToken = () => {
  const [loading, setLoading] = useState(false);
  const [fetchedPrice, setFetchedPrice] = useState([]);

  const { address, chains, token } = useSelector(
    (state: RootState) => state.userDetails
  );


  const fetchHistoricalPrice = () =>{
    axios
    .get(
      `https://min-api.cryptocompare.com/data/v2/histohour?fsym=${token}&tsym=USD&limit=2000&toTs=-1&api_key=${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
    )
    .then(function (response) {
      // handle success
      console.log(response);
    //   setFetchedPrice(response);
      setLoading(false);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  }


    useEffect(() => {
        setLoading(true);
        fetchHistoricalPrice();
        setLoading(false);
        
      }, [])

  return (
    <div>
      {loading ? <div className="flex justify-center items-center h-screen">
			<Loading color="primary" size='lg'>
				<div className="text-black text-xl">Loading...</div>
			</Loading>
		</div> : <div>mil gaya </div> }
    </div>
  )
}

export default HistoricalPriceOfToken
