import Layout from "./layout";
import { Outlet } from "react-router-dom";
import React, { Component } from "react";
import EthereumProvider from "./data/ethereumProvider.jsx";

export default class App extends React.Component {
  render() {
    return (
      <Layout>
        <Outlet />
      </Layout>
    );
  }
}
