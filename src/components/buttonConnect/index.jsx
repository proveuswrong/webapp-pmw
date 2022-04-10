import { useState } from "react";

export default function ButtonConnect({ className }) {
  const [account, setAccount] = useState();
  const [network, setNetwork] = useState();

  ethereum.on("accountsChanged", handleAccountsChanged);
  ethereum.on("chainChanged", handleChainChanged);

  return (
    <button id="buttonConnect" className={className} onClick={connect}>
      {account || "Connect"} {network && "@"} {network}
    </button>
  );

  function connect() {
    ethereum
      .request({ method: "eth_requestAccounts" })
      .then(handleAccountsChanged)
      .catch((error) => {
        if (error.code === 4001) {
          // EIP-1193 userRejectedRequest error
          console.log("Please connect to MetaMask.");
        } else {
          console.error(error);
        }
      });
  }

  function handleChainChanged(_chainId) {
    setNetwork(_chainId);
  }

  function handleAccountsChanged(accounts) {
    setAccount(accounts[0]);
    setNetwork(ethereum.chainId);
  }
}
