import React from "react"
import { Button } from "react-bootstrap"
import styles from '/styles/ConnectButton.module.css'
import 'bootstrap/dist/css/bootstrap.css'
import { useMoralis } from "react-moralis"
import { Moralis } from 'moralis';
import ConnectWallet from "./ConnectWallet.component"
import { ABI, AvalgoContractAddress } from '../contracts/abi/Avalgo'

// Connect Wallet FC
//  web3 wallet connector supporting metamask, brave and a few others
//
// Style w/ react-bootstrap
// Moralis to connect user w/ web3
const MintButton = () => {
  const { user, chainId } = useMoralis()
  let userAddress: string
  user ? userAddress = user.get('ethAddress') : userAddress = '0x0'
  const correctChain: boolean = (chainId == '0xa869')

  // call our contract and mint
  const mint = async () => {
    // if no user addr, user is not signed in. UI + state require signin so we're covered
    try {
      const options = {
        contractAddress: AvalgoContractAddress,
        functionName: "safeMint",
        abi: ABI,
        params: {
          to: userAddress
        }
      };
      // The below moralis func will NOT run in typescript as of 1/1/2022, use ignore
      // @ts-ignore
      // const res = await Moralis.Web3API.native.runContractFunction(options);
      await Moralis.Web3.enableWeb3().then( async function (user) {
        // @ts-ignore
        await Moralis.Web3.executeFunction(options)
      })
        
    } catch (e) {
      console.log('There was an error minting, please try again later')
      console.log(e);
    }
  }

  /*
    States:
      1) Correct network, wallet connected
      3) Correct network, no wallet connected
      2) Incorrect network, wallet connected
      4) Incorrect network, no wallet connected
  */
	return (
    correctChain &&  userAddress !== "0x0" 
      ? <Button variant="danger" className={styles.btn} onClick={mint}>
          Mint AvalgoPass (Free)
        </Button>
      : <ConnectWallet/>
	)
}

export default MintButton