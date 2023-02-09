import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Loading } from "@nextui-org/react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

let fetchedData: string[] = [];
let fetchedData1: string[] = [];
const labels = [
  "t1",
  "t2",
  "t3",
  "t4",
  "t5",
  "t6",
  "t7",
  "t8",
  "t9",
  "t10",
  "t11",
  "t12",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Variation in high prices",
      data: fetchedData,
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Variation in low prices",
      data: fetchedData1,
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const HistoricalPriceOfToken = () => {
  const [loading, setLoading] = useState(true);
  const [datanotFoundByFetch, setDatanotFoundByFetch] = useState("");

  const { token } = useSelector((state: RootState) => state.userDetails);

  useEffect(() => {
    setLoading(true);
    const fetchHistoricalPrice = () => {
      axios
        .get(
          `https://min-api.cryptocompare.com/data/v2/histohour?fsym=${token}&tsym=USD&limit=50&toTs=-1&api_key=${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
        )
        .then(function (response) {
          if (response.data.Response === "Error") {
            setDatanotFoundByFetch("Data not found");
            setLoading(false);
            return;
          }
          // handle success
          for (let i = 0; i < response.data.Data.Data.length; i++) {
            fetchedData.push(response.data.Data.Data[i].high);
            fetchedData1.push(response.data.Data.Data[i].low);
          }
          console.log("data of high prices : ", fetchedData);
          console.log("data of low prices : ", fetchedData1);
          setLoading(false);
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
      <div className=" bg-gradient-to-r from-purple-600 to-pink-600 h-screen">
        <div className="flex justify-center items-center h-screen">
          <Loading color="primary" size="lg">
            <div className="text-black text-xl">Loading...</div>
          </Loading>
        </div>
      </div>
    );
  } else if (datanotFoundByFetch !== "") {
    return (
      <div className=" bg-gradient-to-r from-purple-600 to-pink-600 h-screen">
        <div className="flex justify-center items-center h-screen">
          <div className="text-black text-xl">Sorry 😭 </div>
          <div className="text-black text-xl">Data not found...</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-200 to-pink-200">
        <div style={{ height: 850, width: 1000 }}>
          <h1 className="text-center font-bold py-10">
            Price Changing Chart of {token}
          </h1>
          <Line options={options} data={data} />
        </div>
      </div>
    );
  }
};

export default HistoricalPriceOfToken;
