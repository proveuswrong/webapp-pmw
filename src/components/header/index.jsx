import { NavLink } from "react-router-dom";
import ButtonConnect from "/src/components/buttonConnect";
import * as styles from "./index.module.scss";

export default function Header() {
  return (
    <header>
      <h1>PMW</h1>{" "}
      <nav>
        <h2 hide="">Navigation</h2>
        <NavLink
          style={({ isActive }) => {
            return {
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
              color: isActive ? "red" : "",
            };
          }}
          to="/create"
        >
          Create
        </NavLink>
      </nav>
      <ButtonConnect className={styles.connect} />
    </header>
  );
}
