import {NavLink} from "react-router-dom";
import ButtonConnect from "/src/components/buttonConnect";
import ButtonSelectNetwork from "/src/components/buttonSelectNetwork";

import * as styles from "./index.module.scss";


export default function Header() {
  return (
    <header>
      <h1>PMW</h1>{" "}
      <nav>
        <h2 hide="">Navigation</h2>
        <NavLink
          style={({isActive}) => ({
            color: isActive ? "red" : ""
          })}
          to="/"
        >
          Home
        </NavLink>{" "}
        <NavLink
          style={({isActive}) => ({
            color: isActive ? "red" : ""
          })}
          to="/browse"
        >
          Browse
        </NavLink>{" "}
        |{" "}
        <NavLink
          style={({isActive}) => ({
            color: isActive ? "red" : ""
          })}
          to="/create"
        >
          Create
        </NavLink>
      </nav>
      <div className={styles.connection}>
        <ButtonConnect/>
        <ButtonSelectNetwork/>
      </div>
    </header>
  );
}
