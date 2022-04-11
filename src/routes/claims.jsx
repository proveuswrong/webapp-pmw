import { getInvoices, getClaims } from "../data";
import { Outlet, NavLink, useSearchParams } from "react-router-dom";
import QueryNavLink from "../components/queryNavLink";
import { useOutletContext } from "react-router-dom";

export default function Claims(props) {
  let claims = getClaims();
  let [searchParams, setSearchParams] = useSearchParams();

  const [{ accounts, chainId }, setter] = useOutletContext();
  // This component should consume global Ethereum context.

  return (
    <section>
      <button onClick={() => setter({ chainId: "1" })}> Set chainId to 1 </button>
      <h2>
        Claims <br /> {accounts[0]}
        <br /> {chainId}
      </h2>
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
