import { Moralis } from 'moralis';
import { ABI, AvalgoContractAddress } from '../contracts/abi/Avalgo'

class NFTBalance {
  // we need the claim amount and ABI
  constructor() {

  }

  // get NFT balance of current user
  getBalance = async () => {
    let res
    try {
      const options = {
        contractAddress: AvalgoContractAddress,
        functionName: "balanceOf",
        abi: ABI,
        params: {
          owner: "0x0"
        }
      }
      // The below moralis func will NOT run in typescript as of 1/1/2022, use ignore
      // @ts-ignore
      await Moralis.Web3.enableWeb3().then( async function (user) {
        // Get user's current addr
        let mUser = Moralis.User.current()
        const addr = mUser?.get('ethAddress')
        options.params.owner = addr
        res = await Moralis.Web3.executeFunction(options)
      })
    } catch (e) {
      console.log('There was an error claiming the reward, please try again later')
      console.log(e);
    }
    return res
  }

}

export default new NFTBalance()