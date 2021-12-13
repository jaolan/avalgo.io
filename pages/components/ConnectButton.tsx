import { useMoralis } from "react-moralis";
import { Web3Provider } from "react-moralis/lib/hooks/core/useMoralis/_useMoralisWeb3";

export default function ConnectButton() {
	const { authenticate, isAuthenticated, logout } = useMoralis()

	return(
		<div>
      {isAuthenticated ? (
        <>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button
          onClick={() => {
            authenticate({ provider: "metamask" as Web3Provider});
          }}
        >
          Sign in with MetaMask
        </button>
      )}
    </div>
	)
}