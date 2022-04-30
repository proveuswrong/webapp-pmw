import {Outlet} from "react-router-dom";

export default function Home() {
  return (
    <section>
      <h1>Home</h1>

      <Outlet/>
    </section>
  );
}
