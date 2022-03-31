import { getInvoices, getClaims } from "../data";
import { Outlet, NavLink, useSearchParams } from "react-router-dom";
import QueryNavLink from "../components/queryNavLink";

export default function Claims() {
  let claims = getClaims();

  let [searchParams, setSearchParams] = useSearchParams();

  return (
    <section style={{ display: "flex" }}>
      <h2> Claims</h2>
      <nav
        style={{
          borderRight: "solid 1px",
          padding: "1rem",
        }}
      >
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
