import { Moralis } from 'moralis';

class Payout {
  // we need the claim amount and ABI
  constructor() {

  }


  // abi for Xfer.sol
  //  test contract w/ no limits on withdraws:
  //  0x5628353EFB7C03db5665237E63a27fa0A90cdcef
  ABI = [
    {
      "inputs": [],
      "stateMutability": "payable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
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
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "lockTime",
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
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
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
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
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
  // contract addy: 0x5628353EFB7C03db5665237E63a27fa0A90cdcef
  // 
  //  note: caller can set amount to claim. 
  //  note: Xfer contract will NOT let you withdraw more than 0.5 AVAX at a time.
  claimReward = async (claimAmount: number) => {
    console.log(claimAmount)
    try {
      const options = {
        // chain: "0xa869",
        contractAddress: "0x5628353EFB7C03db5665237E63a27fa0A90cdcef",
        functionName: "withdrawMoney",
        abi: this.ABI,
        params: {
          amount: 100 //.04 => 40
        }
      };
      // The below moralis func will NOT run in typescript as of 1/1/2022, use ignore
      // @ts-ignore
      // const res = await Moralis.Web3API.native.runContractFunction(options);
      await Moralis.Web3.enableWeb3().then( async function (user) {
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