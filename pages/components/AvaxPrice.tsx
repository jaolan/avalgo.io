import React from "react";
import { useMoralisWeb3Api, useMoralisWeb3ApiCall } from "react-moralis";
import MoralisType, { Moralis } from 'moralis';

function AvaxPrice () {

  // set states for UI
  // const [code, setCode] = useState<string>(userCode + testCode)

  // Set smartcontract ABI - This will allow us to call chainlink price getter
  const ABI = [
    {
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "description",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint80",
          "name": "_roundId",
          "type": "uint80"
        }
      ],
      "name": "getRoundData",
      "outputs": [
        {
          "internalType": "uint80",
          "name": "roundId",
          "type": "uint80"
        },
        {
          "internalType": "int256",
          "name": "answer",
          "type": "int256"
        },
        {
          "internalType": "uint256",
          "name": "startedAt",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "updatedAt",
          "type": "uint256"
        },
        {
          "internalType": "uint80",
          "name": "answeredInRound",
          "type": "uint80"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "latestRoundData",
      "outputs": [
        {
          "internalType": "uint80",
          "name": "roundId",
          "type": "uint80"
        },
        {
          "internalType": "int256",
          "name": "answer",
          "type": "int256"
        },
        {
          "internalType": "uint256",
          "name": "startedAt",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "updatedAt",
          "type": "uint256"
        },
        {
          "internalType": "uint80",
          "name": "answeredInRound",
          "type": "uint80"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "version",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
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
        address: "0xDB26ae98Ca0bEb71296A1f4062078E472998e252",
        function_name: "getLatestPrice",
        abi: ABI
      };
      // @ts-ignore
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