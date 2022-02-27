import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <h1>Prove Me Wrong</h1>{" "}
      <nav>
        <NavLink
          style={({ isActive }) => {
            return {
              borderBottom: "solid 1px",
              paddingBottom: "1rem",
              color: isActive ? "red" : "",
            };
          }}
          to="/claims"
        >
          Claims
        </NavLink>{" "}
        |{" "}
        <NavLink
          style={({ isActive }) => {
            return {
              borderBottom: "solid 1px",
              paddingBottom: "1rem",
              color: isActive ? "red" : "",
            };
          }}
          to="/expenses"
        >
          Expenses
        </NavLink>
      </nav>
    </header>
  );
}
