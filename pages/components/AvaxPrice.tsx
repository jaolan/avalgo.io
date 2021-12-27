import React from "react";
import { useMoralisWeb3Api, useMoralisWeb3ApiCall, useWeb3ExecuteFunction } from "react-moralis";
import MoralisType, { Moralis } from 'moralis';

function AvaxPrice () {

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
      //0xa86a
      // 0xa869
      const options = {
        chain: "0xa869",
        address: "0x8705A5883B520a672fB89865ed8Afa66828f3987",
        function_name: "getLatestPrice",
        abi: ABI
      };
      // @ts-ignore
      // const burnt = useWeb3ExecuteFunction({ options })
      const burnt = await Moralis.Web3API.native.runContractFunction(options);
      console.log(burnt);
    } catch (e) {
      console.log(e);
    }
  }
  
  
  return (
    <div>
      {<button onClick={handlePrice}>get price</button>}
    </div>
  );
}

export default AvaxPrice;