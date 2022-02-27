import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Expenses from "./routes/expenses";
import Invoices from "./routes/invoices";
import Invoice from "./components/invoice";

import ClaimDetails from "./routes/claimDetails";

const app = document.getElementById("app");
ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="expenses" element={<Expenses />} />
        <Route path="invoices" element={<Invoices />}>
          <Route index element={<p>Select an invoice</p>} />
          <Route path=":invoiceId" element={<Invoice />} />
        </Route>
        <Route path="claim" element={<ClaimDetails />} />
        <Route path="*" element={<p>There's nothing here!</p>} />
      </Route>
    </Routes>
  </BrowserRouter>,
  app
);
