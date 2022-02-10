import { Moralis } from 'moralis';
import { ABI, XferContractAddress } from '../contracts/abi/Xfer'

class Payout {
  // we need the claim amount and ABI
  constructor() {

  }

  // call our contract and claim reward.
  // 
  //  note: caller can set amount to claim. 
  //  note: Xfer contract will NOT let you withdraw more than 0.5 AVAX at a time.
  claimReward = async (claimAmount: number) => {
    try {
      const options = {
        contractAddress: XferContractAddress,
        functionName: "withdrawMoney",
        abi: ABI,
        params: {
          amount: 100
        }
      }

      await Moralis.Web3.enableWeb3().then( async function (user) {
        // The below moralis func will NOT run in typescript as of 1/1/2022, use ignore
        // @ts-ignore
        await Moralis.Web3.executeFunction(options)
      })
        
    } catch (e) {
      console.log('There was an error claiming the reward, please try again later')
      console.log(e);
    }
  }

}

export default new Payout()