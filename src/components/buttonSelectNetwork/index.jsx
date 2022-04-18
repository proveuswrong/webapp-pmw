import React, { useState } from "react";
import { EthereumContext, chains } from "../../data/ethereumProvider";

export default function ButtonSelectNetwork({ className }) {
  const [awaitingUserPermission, setAwaitingUserPermission] = useState(true);

  return (
    <EthereumContext.Consumer>
      {(value) => (
        <div className={className}>
          <button id="buttonSelectNetwork" disabled={false}>
            {chains[value.chainId]?.name || "Unsupported Network"}
          </button>
        </div>
      )}
      {/* prints: Reed */}
    </EthereumContext.Consumer>
  );
}
