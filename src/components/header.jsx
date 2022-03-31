import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <h1>PMW</h1>{" "}
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
          Browse
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
          to="/create"
        >
          Create
        </NavLink>
      </nav>
    </header>
  );
}
