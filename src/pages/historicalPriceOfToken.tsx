import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Loading } from "@nextui-org/react";

const HistoricalPriceOfToken = () => {
  const [loading, setLoading] = useState(true);
  const [fetchedPrice, setFetchedPrice] = useState([]);

  const { address, chains, token } = useSelector(
    (state: RootState) => state.userDetails
  );

  useEffect(() => {
    setLoading(true);
    const fetchHistoricalPrice = () => {
      axios
        .get(
          `https://min-api.cryptocompare.com/data/v2/histohour?fsym=${token}&tsym=USD&limit=50&toTs=-1&api_key=${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
        )
        .then(function (response) {
          let fetchedData:string[] =[]
          // handle success
          for (let i = 0; i < response.data.Data.Data.length; i++) {
            fetchedData.push(response.data.Data.Data[i].high)
          }
          console.log("fetched data is: ", fetchedData)
          // setLoading(false);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    };
    fetchHistoricalPrice();
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading color="primary" size="lg">
          <div className="text-black text-xl">Loading...</div>
        </Loading>
      </div>
    );
  }

  return <div>hello worlds</div>;
};

export default HistoricalPriceOfToken;
