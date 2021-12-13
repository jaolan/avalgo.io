import { useMoralis } from "react-moralis";
import { Web3Provider } from "react-moralis/lib/hooks/core/useMoralis/_useMoralisWeb3";

export default function ConnectButton() {
	const { authenticate } = useMoralis()

	return(
		<button
			onClick={() => {
				authenticate({ provider: "metamask" as Web3Provider});
			}}
		>
			Sign in with MetaMask
		</button>
	)
}