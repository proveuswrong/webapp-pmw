import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <h1>Prove Me Wrong</h1>{" "}
      <nav>
        <h2 hide="">Navigation</h2>
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
