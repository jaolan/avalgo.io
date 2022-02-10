import React from "react"
import { Button } from "react-bootstrap"
import { useMoralis } from "react-moralis"

// Connect Wallet FC
//  web3 wallet connector supporting metamask, brave and a few others
//
// Style w/ react-bootstrap
// Moralis to connect user w/ web3
const ConnectWallet = () => {
	const { Moralis, authenticate, isAuthenticated, logout, user, chainId} = useMoralis()
  const onCorrectChain: boolean = chainId == '0xa869'

  // Formats address to:
  //  0x(first 4 chars)...(last 4 chars)
  const formattedAddress = (addr: String) =>{
    const len: number = addr.length
    const formattedStr: string = addr.substring(0,6) 
                                  + '...' 
                                  + addr.substring(len - 5,len - 1)
    return formattedStr
  }

  // Switch networks using Moralis
  const switchNetworks = async () => {
    await Moralis.Web3.switchNetwork('0xa869')
  }

  /*
    States:
      1) User auth'd, exists, correct network
      2) User auth'd, exists, incorrect network
      3) User not auth'd/not exists, correct network
      4) User not auth'd/not exists, incorrect network
  */
  
  // 1) User auth'd, exists, correct network
  if( isAuthenticated 
        && user
        && onCorrectChain ) {
    return ( 
      <Button variant="danger" onClick={logout}>
        { formattedAddress(user.get('ethAddress')) }
      </Button>
    ) 
  } 
  // 2) User not auth'd, exists, incorrect network
  else if (isAuthenticated 
    && user
    && !onCorrectChain) {
    return (
      <Button variant="danger" onClick={ async () => {
          await switchNetworks()
        }}
      >
        Switch Network
      </Button>
    )
  }
  /*
    3) User not auth'd/not exists, correct network
    or
    4) User not auth'd/not exists, correct network
  */
  else {
    return ( 
      <Button variant="danger" onClick={ () => {
      // use walletconnect on mobile displays
      const onMobile = window.screen.width <= 768
      onMobile 
        ? authenticate({signingMessage : 'Authenticate to play Avalgo', provider: 'walletconnect'})
        : authenticate({signingMessage : 'Authenticate to play Avalgo',});
      
      }}
      >
        Connect Wallet
      </Button>
    )
  } 
}

export default ConnectWallet