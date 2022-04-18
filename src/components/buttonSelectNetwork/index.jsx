import React from "react";
import {EthereumContext, chains} from "../../data/ethereumProvider";

export default function ButtonSelectNetwork({className}) {

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
