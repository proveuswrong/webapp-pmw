import {Outlet} from "react-router-dom";
import {EthereumContext} from "../data/ethereumProvider";

export default function Home() {
  return (
    <section>
      <h1>Home</h1>

      <Outlet/>
    </section>
  );
}
