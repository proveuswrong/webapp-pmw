import Header from "./components/header";
import Footer from "./components/footer";

export default function Layout({ children, x }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
