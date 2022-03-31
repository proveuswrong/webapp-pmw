import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Expenses from "./routes/expenses";
import Claims from "./routes/claims";
import Claim from "./components/claim";

const app = document.getElementById("app");
ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="expenses" element={<Expenses />} />
        <Route path="claims" element={<Claims />}>
          <Route index element={<p>Select a claim</p>} />
          <Route path=":id" element={<Claim />} />
        </Route>
        <Route path="*" element={<p>There's nothing here!</p>} />
      </Route>
    </Routes>
  </BrowserRouter>,
  app
);
