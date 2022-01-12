import { Moralis } from 'moralis';

class Payout {
  // we need the claim amount and ABI
  constructor() {

  }


  // abi for Xfer.sol
  //  test contract w/ no limits on withdraws:
  //  0xf905533Fe6716e21E23F3DD8B9374e2e09F628E9
  ABI = [
    {
      "inputs": [],
      "stateMutability": "payable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "getBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "recipient",
          "type": "address"
        }
      ],
      "name": "sendEther",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "withdrawMoney",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  ]

  // call our contract and claim reward.
  // contract addy: 0xf905533Fe6716e21E23F3DD8B9374e2e09F628E9
  // 
  //  note: caller can set amount to claim. 
  //  note: Xfer contract will NOT let you withdraw more than 0.5 AVAX at a time.
  claimReward = async (claimAmount: number) => {
    try {
      const options = {
        chain: "0xa869",
        address: "0xf905533Fe6716e21E23F3DD8B9374e2e09F628E9",
        function_name: "withdrawMoney",
        abi: this.ABI,
        params: {
          amount: claimAmount
        }
      };
      // The below moralis func will NOT run in typescript as of 1/1/2022, use ignore
      // @ts-ignore
      // const res = await Moralis.Web3API.native.runContractFunction(options);
     
      Moralis.Web3.authenticate().then( async function (user) {
        // @ts-ignore
        const res = await Moralis.Web3.executeFunction(options)
        console.log(res)
      })
        
    } catch (e) {
      console.log('There was an error claiming the reward, please try again later')
      console.log(e);
    }
  }

}

export default new Payout()