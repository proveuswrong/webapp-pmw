import React, {Component} from "react";
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
    this.setState({isProviderDetected: true});
    ethereum.request({method: "eth_chainId"}).then(this.handleChainChanged);
    ethereum.request({method: "eth_accounts"}).then(this.handleAccountsChanged);

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
    this.setState({accounts: accounts});
  }

  handleChainChanged(chainId) {
    console.log("Chain changed.");
    this.setState({chainId: chainId});
  }

  handleConnected() {
    console.log("Connected to Ethereum.");
    this.setState({isConnected: true});
  }

  handleDisconnected() {
    console.log("Disconnect to Ethereum.");
    this.setState({isConnected: false});
  }

  render() {
    return <EthereumContext.Provider value={this.state}> {this.props.children}</EthereumContext.Provider>;
  }
}

export const EthereumContext = React.createContext();

export const chains = {"0x1": {name: "Ethereum Mainnet"}, "0x4": {name: "Ethereum Testnet Rinkeby"}};
export const contractInstances = {
  '0x4': {
    "0x5678057C9a36697986A1003d49B73EBE6A0E9c03": {
      subgraphEndpoint: 'https://api.studio.thegraph.com/query/16016/pmw/0.0.22',
    }
  }
}

export const categories = [
  {
    "name": 'Bug Bounty'
  }
]

const queryTemplate = (endpoint, query) =>
  fetch(endpoint, {
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: query,
    }),
    method: "POST",
    mode: "cors",
  }).then(r => r.json()).then(json => json.data)


export const getClaimByID = (chainID, contractAddress, id) => {

  console.log(contractInstances[chainID][contractAddress])
  return queryTemplate(contractInstances[chainID][contractAddress].subgraphEndpoint, `{
  claims(where: {id: "${id}"}) {
    id
    claimID
    category
    bounty
    status
    lastBalanceUpdate
    disputeID
    withdrawalPermittedAt
    lastCalculatedScore
  }}`).then(data => {
    data.claims[0].contractAddress = contractAddress
    data.claims[0].category = categories[data.claims[0].category].name
    return data.claims[0]
  })
}


export const getAllClaims = (chainID) => {
  return Promise.all(Object.entries(contractInstances[chainID]).map(([key, value]) => {
    return queryTemplate(value.subgraphEndpoint, `{
  claims {
    id
    claimID
    bounty
    status
    lastBalanceUpdate
    disputeID
    withdrawalPermittedAt
    lastCalculatedScore
  }}`).then(data => {
      if (data && data.claims && data.claims.length > 0) {
        data.claims[0].contractAddress = key
        data.claims[0].category = categories[data.claims[0].category]?.name
        return data.claims
      }
    })
  })).then(arrayOfArrays => arrayOfArrays.flat())
}

const monkeyPatch = (contractAddress) => {
  // TODO Refactor out duplications
}

export const ipfsGateway = 'https://ipfs.kleros.io'
