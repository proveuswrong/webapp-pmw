import {Outlet} from "react-router-dom";
import {EthereumContext} from "../data/ethereumProvider";

export default function Home() {
  return (
    <section>
      <EthereumContext.Consumer>
        {(value) => (
          <h2>
            Home <br/> {value.accounts[0]}
            <br/> {value.chainId}
          </h2>
        )}
      </EthereumContext.Consumer>

      <Outlet/>
    </section>
  );
}
