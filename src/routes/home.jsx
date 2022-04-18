import { Outlet, NavLink, useSearchParams } from "react-router-dom";
import QueryNavLink from "../components/queryNavLink";
import { EthereumContext, chains } from "../data/ethereumProvider";
export default function Home(props) {
  return (
    <section>
      <EthereumContext.Consumer>
        {(value) => (
          <h2>
            Home <br /> {value.accounts[0]}
            <br /> {value.chainId}
          </h2>
        )}
      </EthereumContext.Consumer>

      <Outlet />
    </section>
  );
}
