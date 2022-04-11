import Layout from "./layout";
import { Outlet } from "react-router-dom";
import React, { Component } from "react";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      chainId: "",
    };
    this.handleChainChanged = this.handleChainChanged.bind(this);
    this.handleAccountsChanged = this.handleAccountsChanged.bind(this);
    this.setState = this.setState.bind(this);
  }

  componentDidMount() {
    ethereum.request({ method: "eth_chainId" }).then(this.handleChainChanged);
    ethereum.request({ method: "eth_accounts" }).then(this.handleAccountsChanged);

    ethereum.on("accountsChanged", this.handleAccountsChanged);
    ethereum.on("chainChanged", this.handleChainChanged);
    ethereum.on("connect", this.handleConnected);
  }

  handleAccountsChanged(accounts) {
    console.log("Accounts changed.");
    this.setState({ accounts: accounts });
  }

  handleChainChanged(chainId) {
    console.log("Chain changed.");
    this.setState({ chainId: chainId });
  }

  handleConnected() {
    console.log("Connected to Ethereum.");
  }

  render() {
    const { accounts, chainId } = this.state;
    return (
      <>
        <Layout>
          <Outlet context={[this.state, this.setState]} />
        </Layout>
      </>
    );
  }
}
