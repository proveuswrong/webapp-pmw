import React, { Component } from "react";
import detectEthereumProvider from "@metamask/detect-provider";

export default class EthereumProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      chainId: "",
      isConnected: false,
      isProviderDetected: false,
    };
    this.handleChainChanged = this.handleChainChanged.bind(this);
    this.handleAccountsChanged = this.handleAccountsChanged.bind(this);
    this.handleConnected = this.handleConnected.bind(this);
    this.handleDisconnected = this.handleDisconnected.bind(this);

    this.setState = this.setState.bind(this);
  }

  componentDidMount() {
    detectEthereumProvider().then((provider) => {
      if (provider) this.initializeProvider();
    });
  }

  initializeProvider() {
    this.setState({ isProviderDetected: true });
    ethereum.request({ method: "eth_chainId" }).then(this.handleChainChanged);
    ethereum.request({ method: "eth_accounts" }).then(this.handleAccountsChanged);

    ethereum.on("accountsChanged", this.handleAccountsChanged);
    ethereum.on("chainChanged", this.handleChainChanged);
    ethereum.on("connect", this.handleConnected);
    ethereum.on("disconnect", this.handleDisconnected);
  }

  handleAccountsChanged(accounts) {
    if (accounts.length == 0) {
      console.log("Wallet locked.");
    } else {
      console.log("Accounts changed.");
    }
    this.setState({ accounts: accounts });
  }

  handleChainChanged(chainId) {
    console.log("Chain changed.");
    this.setState({ chainId: chainId });
  }

  handleConnected() {
    console.log("Connected to Ethereum.");
    this.setState({ isConnected: true });
  }

  handleDisconnected() {
    console.log("Disconnect to Ethereum.");
    this.setState({ isConnected: false });
  }

  render() {
    console.log(this.state);
    const { accounts, chainId, isConnected } = this.state;
    return <EthereumContext.Provider value={this.state}> {this.props.children}</EthereumContext.Provider>;
  }
}

export const EthereumContext = React.createContext();

export const chains = { "0x1": { name: "Ethereum Mainnet" }, "0x4": { name: "Ethereum Testnet Rinkeby" } };
