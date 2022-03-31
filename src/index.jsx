import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Create from "./routes/create";
import Claims from "./routes/claims";
import Claim from "./components/claim";

const app = document.getElementById("app");
ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="create" element={<Create />} />
        <Route path="claims" element={<Claims />} />
        <Route path="claims/:id" element={<Claim />} />
        <Route path="*" element={<p>There's nothing here!</p>} />
      </Route>
    </Routes>
  </BrowserRouter>,
  app
);
