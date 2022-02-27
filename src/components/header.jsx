import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <span>Header</span>{" "}
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/invoices">Invoices</Link> | <Link to="/claim">Claim</Link> |{" "}
        <Link to="/expenses">Expenses</Link>
      </nav>
    </header>
  );
}
