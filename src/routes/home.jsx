import {Outlet} from "react-router-dom";

export default function Home() {
  return (
    <section>
      <h1>H1</h1>
      <h2>H2</h2>
      <h3>H3</h3>
      <h4>H4</h4>
      <p>Paragraph</p>
      <small>Small text</small>
      <Outlet/>
    </section>
  );
}
