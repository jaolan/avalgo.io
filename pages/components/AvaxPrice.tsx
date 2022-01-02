import React, { useEffect, useState } from "react";
import { useMoralisWeb3Api, useMoralisWeb3ApiCall, useWeb3ExecuteFunction } from "react-moralis";
import MoralisType, { Moralis } from 'moralis';

const AvaxPrice = () => {
  const [price, setPrice] = useState(0)
  // time interval for refreshing price component
  const [count, setCount] = React.useState(0);

  // set states for UI
  // const [code, setCode] = useState<string>(userCode + testCode)

  // Fetch AVAX price from contract every X seconds
  useEffect(() => {
    // const timer = window.setInterval(() => {
    //   setCount(count => count + 1)
    //   handlePrice()
    // }, 10000);

    // return () => {
    //   window.clearInterval(timer);
    // };
  }, []);

  // Set smartcontract ABI - This will allow us to call chainlink price getter
  const ABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "getLatestPrice",
      "outputs": [
        {
          "internalType": "int256",
          "name": "",
          "type": "int256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

  // interact w/ chainlink contract we deployed to track AVAX price
  //  contract addy: 0x8705A5883B520a672fB89865ed8Afa66828f3987
  const handlePrice = async () => {
    try {
      const options = {
        chain: "0xa869",
        address: "0x8705A5883B520a672fB89865ed8Afa66828f3987",
        function_name: "getLatestPrice",
        abi: ABI
      };
      // The below moralis func will NOT run in typescript as of 1/1/2022, use ignore
      // @ts-ignore
      const price = await Moralis.Web3API.native.runContractFunction(options);
      // writing numbers in javascript is fun
      const fmtPrice: number = parseFloat((Number(price) * 10**-8).toFixed(2))
      console.log(fmtPrice);
      setPrice(fmtPrice)
      return true
    } catch (e) {
      console.log(e);
      setPrice(0)
      return false
    }
  }

  return (
    <div>
      <p>AVAX Price: {price}</p>
    </div>
  )
}

export default AvaxPrice;