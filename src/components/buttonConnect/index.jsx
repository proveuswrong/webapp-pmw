import React, { useState } from "react";
import { EthereumContext, chains } from "../../data/ethereumProvider";

export default function ButtonConnect({ className }) {
  const [awaitingUserPermission, setAwaitingUserPermission] = useState(true);

  return (
    <EthereumContext.Consumer>
      {(value) => (
        <div className={className}>
          <button
            id="buttonConnect"
            onClick={() => {
              value.accounts.length < 1 ? connect() : console.log("There is a connected account already.");
            }}
          >
            {value.accounts[0] || "Click to Connect Your Account"}
          </button>
        </div>
      )}
      {/* prints: Reed */}
    </EthereumContext.Consumer>
  );

  function connect() {
    console.debug("Asking users permission to connect.");
    setAwaitingUserPermission(true);
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
        setAwaitingUserPermission(false);
      });
  }
}
