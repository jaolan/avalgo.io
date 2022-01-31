import React from "react"
import { Button } from "react-bootstrap"
import { useMoralis, useMoralisWeb3Api, useNativeBalance } from "react-moralis"
import styles from '/styles/ConnectWallet.module.css'
import 'bootstrap/dist/css/bootstrap.css'

// Connect Wallet FC
//  web3 wallet connector supporting metamask, brave and a few others
//
// Style w/ react-bootstrap
// Moralis to connect user w/ web3
const ConnectWallet = () => {
  const chain = "eth"
	const { authenticate, isAuthenticated, logout, user} = useMoralis()
  const Web3Api = useMoralisWeb3Api()

  // Formats address to:
  //  0x(first 4 chars)...(last 4 chars)
  const formattedAddress = (addr: String) =>{
    const len: number = addr.length
    const formattedStr: string = addr.substring(0,6) 
                                  + '...' 
                                  + addr.substring(len - 5,len - 1)
    return formattedStr
  }

  // get the native chain balance
  const NativeBalance = () => {
    const balance = useNativeBalance({ chain : chain });
    // console.log(balance)
  }

	return(
		<div>
      {isAuthenticated && user ? (
        <>
          <Button variant="danger" className={styles.btn} onClick={logout}>{user.get('ethAddress').substring(0,6) 
                                      + '...' 
                                      + user.get('ethAddress').substring(user.get('ethAddress').length-5,user.get('ethAddress').length-1)}
          </Button>
          {/* Show user AVAX data */}
            {/* <h1>Welcome, {user.get('username')}!</h1> */}
            {/* <h1>Welcome, {user.get('ethAddress')}!</h1> */}
        </>
      ) : (
        <Button variant="danger" className={styles.btn}
          onClick={() => {
            // use walletconnect on mobile displays
            const onMobile = window.screen.width <= 768
            onMobile 
              ? authenticate({signingMessage : 'Authenticate to play Avalgo', provider: 'walletconnect'})
              : authenticate({signingMessage : 'Authenticate to play Avalgo',});
            
          }}
        >
          Connect Wallet
        </Button>
      )}
    </div>
	)
}

export default ConnectWallet