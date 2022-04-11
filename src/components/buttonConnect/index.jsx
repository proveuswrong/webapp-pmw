import React, { useState } from "react";

export default function ButtonConnect({ className }) {
  const [isButtonEnabled, setButtonEnabled] = useState(true);

  // This component should consume global Ethereum context.

  return (
    <>
      <button id="buttonConnect" className={className} onClick={connect} disabled={!isButtonEnabled}>
        {isButtonEnabled ? "Connect" : "Asking for permission..."}
      </button>
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
