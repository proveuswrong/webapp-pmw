import React, { useState } from "react";
import { EthereumContext } from "../../App";

export default function ButtonConnect({ className }) {
  const [isButtonEnabled, setButtonEnabled] = useState(true);

  // This component should consume global Ethereum context.

  return (
    <>
      <EthereumContext.Consumer>
        {(value) => (
          <button id="buttonConnect" className={className} onClick={connect} disabled={!isButtonEnabled}>
            {value.accounts[0]} @ {value.chainId}
          </button>
        )}
        {/* prints: Reed */}
      </EthereumContext.Consumer>
    </>
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
}
