import { Outlet, NavLink, useSearchParams } from "react-router-dom";
import { EthereumContext, chains } from "../../data/ethereumProvider";
export default function EthereumProviderErrors(props) {
  return (
    <section>
      <EthereumContext.Consumer>
        {(value) => (
          <h2>
            {value.isProviderDetected ? "This chain id is not supported." : "No Ethereum provider has been detected."}
          </h2>
        )}
      </EthereumContext.Consumer>
      <Outlet />
    </section>
  );
}
