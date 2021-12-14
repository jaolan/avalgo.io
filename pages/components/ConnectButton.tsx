import { useMoralis, useMoralisWeb3Api, useMoralisWeb3ApiCall, useNativeBalance } from "react-moralis";

export default function ConnectButton() {

  const chain = "eth"
	const { authenticate, isAuthenticated, logout, user } = useMoralis()
  const Web3Api = useMoralisWeb3Api()

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

//  getBalance()

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
          <button onClick={logout}>Logout</button>
          {/* Show user AVAX data */}
            <h1>Welcome, {user.get('username')}!</h1>
            <h1>Welcome, {user.get('ethAddress')}!</h1>
        </>
      ) : (
        <button
          onClick={() => {
            authenticate({signingMessage : 'My Avax dApp auth'});
          }}
        >
          Sign in with MetaMask
        </button>
      )}
    </div>
	)
}