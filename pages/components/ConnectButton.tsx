import { useMoralis, useMoralisWeb3Api, useMoralisWeb3ApiCall, useNativeBalance } from "react-moralis";

export default function ConnectButton() {

  const chain = "eth"
	const { authenticate, isAuthenticated, logout, user } = useMoralis()
  const Web3Api = useMoralisWeb3Api()

  // Format address to:
  //  0x(first 4 chars)...(last 4 chars)
  function formattedAddress(addr: String){
    const len: number = addr.length
    const formattedStr: string = addr.substring(0,6) + '...' + addr.substring(len - 5,len - 1)
    return formattedStr
  }

  // Web3Api methods to get native token bal
  function getBalance() {
    const getNativeBalanceQuery = useMoralisWeb3ApiCall(Web3Api.account.getNativeBalance, {
      chain: chain,
      address: user?.get('ethAddress'),
    })

    const balances = useMoralisWeb3ApiCall(Web3Api.account.getTokenBalances, {
      chain: chain,
      address: user?.get('ethAddress'),
    })
    
    console.log('query ', getNativeBalanceQuery)
    console.log('tokens ', balances)
  }

  // get the native chain balance
 function NativeBalance() {
  const balance = useNativeBalance({ chain : chain });
  console.log(balance)
  // return <div>{balance.data}</div>;
 }

  NativeBalance()

	return(
		<div>
      {isAuthenticated && user ? (
        <>
          <button onClick={logout}>{user.get('ethAddress').substring(0,6) + '...' + user.get('ethAddress').substring(user.get('ethAddress').length-5,user.get('ethAddress').length-1)}</button>
          {/* Show user AVAX data */}
            {/* <h1>Welcome, {user.get('username')}!</h1> */}
            {/* <h1>Welcome, {user.get('ethAddress')}!</h1> */}
        </>
      ) : (
        <button
          onClick={() => {
            authenticate({signingMessage : 'My Avax dApp auth'});
          }}
        >
          Connect Wallet
        </button>
      )}
    </div>
	)
}