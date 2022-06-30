import React from "react";
import {EthereumContext, chains} from "../../data/ethereumProvider";

export default function ButtonSelectNetwork({className}) {

  return (
    <EthereumContext.Consumer>
      {(value) => (
        <div className={className}>
          <button id="buttonSelectNetwork" disabled={false}>
                     <span key={value.chainId} className='blink'>
            {chains[value.chainId]?.name || "Unsupported Network"}
                       </span>
          </button>
        </div>
      )}
    
    </EthereumContext.Consumer>
  );
}
