import { getInvoices, getClaims } from "../data";
import { Outlet, NavLink, useSearchParams } from "react-router-dom";
import QueryNavLink from "../components/queryNavLink";
import { EthereumContext } from "../App";

export default function Claims(props) {
  let claims = getClaims();
  let [searchParams, setSearchParams] = useSearchParams();

  // This component should consume global Ethereum context.

  return (
    <section>
      <button onClick={() => setter({ chainId: "1" })}> Set chainId to 1 </button>

      <EthereumContext.Consumer>
        {(value) => (
          <h2>
            Claims <br /> {value.accounts[0]}
            <br /> {value.chainId}
          </h2>
        )}
      </EthereumContext.Consumer>
      <nav>
        <h3 hide="">Navigation</h3>
        <input
          value={searchParams.get("filter") || ""}
          onChange={(event) => {
            let filter = event.target.value;
            if (filter) {
              setSearchParams({ filter });
            } else {
              setSearchParams({});
            }
          }}
        />
        {claims
          .filter((claim) => {
            let filter = searchParams.get("filter");
            if (!filter) return true;
            let name = claim.title.toLowerCase();
            return name.startsWith(filter.toLowerCase());
          })
          .map((claim) => (
            <QueryNavLink
              style={({ isActive }) => {
                return {
                  display: "block",
                  margin: "1rem 0",
                  color: isActive ? "red" : "",
                };
              }}
              to={`/claims/${claim.id}`}
              key={claim.id}
            >
              {claim.title}
            </QueryNavLink>
          ))}
      </nav>
      <Outlet />
    </section>
  );
}
