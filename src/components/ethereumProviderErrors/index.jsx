import { Outlet } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { EthereumContext, contractInstances, chains } from "../../data/ethereumProvider";

export default function EthereumProviderErrors() {
  const ethereumContext = useContext(EthereumContext);

  return (
    <section>
      <h2>
        {!ethereumContext.isDeployedOnThisChain && "This chain id is not supported."}
        {!ethereumContext.isProviderDetected && "No Ethereum provider has been detected."}
      </h2>
      {!ethereumContext.isDeployedOnThisChain && (
        <>
          <p>Try one of these</p>
          <ul>
            {Object.keys(contractInstances).map((networkId) => (
              <li key={networkId}>
                <button
                  onClick={() =>
                    window.ethereum.request({
                      method: "wallet_switchEthereumChain",
                      params: [{ chainId: networkId }],
                    })
                  }
                >
                  {chains[networkId].name}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
      <Outlet />
    </section>
  );
}
