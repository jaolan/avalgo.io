/*
  The Avax ChainLink oracle contract ABI.  
 */
export const ABI = [
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

/*
  The Avax price oracle deployed contract addr.
  Currently on fuji testnet
*/
export const AvaxOracleAddress = "0x8705A5883B520a672fB89865ed8Afa66828f3987"

