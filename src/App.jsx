import Layout from "./layout";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <>
      <Layout>
        <Outlet />
      </Layout>
    </>
  );
}
