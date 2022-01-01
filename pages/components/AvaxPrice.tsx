import React, { useEffect, useState } from "react";
import { useMoralisWeb3Api, useMoralisWeb3ApiCall, useWeb3ExecuteFunction } from "react-moralis";
import MoralisType, { Moralis } from 'moralis';

function AvaxPrice () {

  // set state variable for AVAX price
  const [price, setPrice] = useState(0)

  // set states for UI
  // const [code, setCode] = useState<string>(userCode + testCode)

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

  const handlePrice = async () => {
    try {
      const options = {
        chain: "0xa869",
        address: "0x8705A5883B520a672fB89865ed8Afa66828f3987",
        function_name: "getLatestPrice",
        abi: ABI
      };
      // @ts-ignore
      const price = await Moralis.Web3API.native.runContractFunction(options);
      const fmtPrice: number = Number(price) * 10**-8
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
      {<button onClick={handlePrice}>Avax price (click to refresh): {price}</button>}
    </div>
  )
}

export default AvaxPrice;