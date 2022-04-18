import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./routes/home";
import Create from "./routes/create";
import Claims from "./routes/claims";
import Claim from "./components/claim";
import EthereumProviderErrors from "./components/ethereumProviderErrors";

import EthereumProvider, { EthereumContext, chains } from "./data/ethereumProvider.jsx";

const app = document.getElementById("app");

ReactDOM.render(
  <BrowserRouter>
    <EthereumProvider>
      <EthereumContext.Consumer>
        {(value) => (
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Home />} />
              <Route path="create" element={chains[value.chainId] ? <Create /> : <EthereumProviderErrors />} />
              <Route path="claims" element={chains[value.chainId] ? <Claims /> : <EthereumProviderErrors />} />
              <Route path="claims/:id" element={chains[value.chainId] ? <Claim /> : <EthereumProviderErrors />} />
              <Route path="*" element={<p>There's nothing here!</p>} />
            </Route>
          </Routes>
        )}
      </EthereumContext.Consumer>
    </EthereumProvider>
  </BrowserRouter>,
  app
);
