import React, {useState} from "react";
import {EthereumContext} from "../../data/ethereumProvider";
import CustomButton from "/src/components/ui/button";

export default function ButtonConnect() {
  const [awaitingUserPermission, setAwaitingUserPermission] = useState(false);

  return (
    <EthereumContext.Consumer>
      {(value) => (
        <CustomButton
          modifiers='small secondary'
          id="buttonConnect"
          disabled={awaitingUserPermission}
          onClick={() => {
            value.accounts.length < 1 ? connect() : console.log("There is a connected account already.");
          }}
        >
            <span key={value.accounts[0]} className='blink'>
            {value.accounts[0] || (awaitingUserPermission ? 'Awaiting User Permission' : "Connect Account")}
              </span>
        </CustomButton>
      )}
    </EthereumContext.Consumer>
  );

  function connect() {
    console.debug("Asking users permission to connect.");
    setAwaitingUserPermission(true);
    ethereum
      .request({method: "eth_requestAccounts"})
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
