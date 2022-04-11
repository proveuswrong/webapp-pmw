import { useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function ButtonConnect({ className }) {
  const [account, setAccount] = useState();
  const [network, setNetwork] = useState();
  const [isButtonEnabled, setButtonEnabled] = useState(true);

  if (!account)
    ethereum.request({ method: "eth_accounts" }).then((accounts) => {
      if (accounts.length > 0) setAccount(accounts[0]);
    });

  return (
    <button id="buttonConnect" className={className} onClick={connect} disabled={!isButtonEnabled}>
      {isButtonEnabled ? (account ? account : "Connect") : "Asking for permission..."}
    </button>
  );

  function connect() {
    console.debug("Asking users permission to connect.");
    setButtonEnabled(false);
    ethereum
      .request({ method: "eth_requestAccounts" })
      .catch((error) => {
        if (error.code === 4001) {
          // EIP-1193 userRejectedRequest error
          console.log("User rejected connecting to Ethereum.");
        } else {
          console.error(error);
        }
      })
      .finally(() => {
        setButtonEnabled(true);
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
