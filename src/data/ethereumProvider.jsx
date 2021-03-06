import React, { Component } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { ipfsGateway } from "../utils/addToIPFS";
import { ethers } from "ethers";
import ABI from "./abi.js";

export default class EthereumProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      chainId: "",
      isConnected: false,
      isProviderDetected: false,
      isDeployedOnThisChain: false,
      metaEvidenceContents: [],
      blockNumber: 0,
      ethersProvider: null,
    };

    this.handleChainChanged = this.handleChainChanged.bind(this);
    this.handleAccountsChanged = this.handleAccountsChanged.bind(this);
    this.handleConnected = this.handleConnected.bind(this);
    this.handleDisconnected = this.handleDisconnected.bind(this);
    this.fetchMetaEvidenceContents = this.fetchMetaEvidenceContents.bind(this);
    this.handleMessage = this.handleMessage.bind(this);

    this.setState = this.setState.bind(this);
  }

  componentDidMount() {
    detectEthereumProvider().then((provider) => {
      console.log(provider);
      if (provider) this.initializeProvider();
    });
  }

  initializeProvider() {
    this.setState({ isProviderDetected: true });
    ethereum.request({ method: "eth_chainId" }).then(this.handleChainChanged);
    // ethereum.request({method: "eth_accounts"}).then(this.handleAccountsChanged);
    ethereum.request({ method: "eth_subscribe", params: ["newHeads"] });
    ethereum.request({ method: "eth_blockNumber" }).then((result) => this.setState({ blockNumber: result }));

    ethereum.on("accountsChanged", this.handleAccountsChanged);
    ethereum.on("chainChanged", this.handleChainChanged);
    ethereum.on("connect", this.handleConnected);
    ethereum.on("disconnect", this.handleDisconnected);
    ethereum.on("message", this.handleMessage);

    // Ethers below - As I introduced Ethers now, this file needs a refactoring

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.send("eth_accounts", []).then(this.handleAccountsChanged);
    this.setState({ ethersProvider: provider });
  }

  sendTransaction({ method, to, value }) {
    const tx = this.state.provider.getSigner().sendTransaction({
      to,
      value,
    });
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
    const { ethersProvider } = this.state;

    this.setState({
      chainId: chainId,
      isDeployedOnThisChain: !(contractInstances[chainId] == null),
      contractInstance: contractInstances[chainId]
        ? new ethers.Contract(Object.keys(contractInstances[chainId])[0], ABI, ethersProvider.getSigner())
        : null,
    });
    this.fetchMetaEvidenceContents(chainId);
  }

  handleConnected() {
    console.log("Connected to Ethereum.");
    this.setState({ isConnected: true });
  }

  handleDisconnected() {
    console.log("Disconnect to Ethereum.");
    this.setState({ isConnected: false });
  }

  handleMessage(message) {
    console.log(`Block number: ${message.data.result.number}`);
    this.setState({ blockNumber: message.data.result.number });
  }

  async fetchMetaEvidenceContents(chainId) {
    console.log("Fetching all meta-evidences...");
    const rawMetaEvidenceList = (await getAllMetaEvidences(chainId)).map((item) => item.uri);
    const result = await Promise.allSettled(
      rawMetaEvidenceList.map((metaEvidenceURI) => fetch(ipfsGateway + metaEvidenceURI).then((r) => r.json()))
    );
    this.setState({ metaEvidenceContents: result.map((item) => item.value) });
  }

  render = () => <EthereumContext.Provider value={this.state}> {this.props.children}</EthereumContext.Provider>;
}
export const EthereumContext = React.createContext();

export const chains = { "0x1": { name: "Ethereum Mainnet" }, "0x4": { name: "Ethereum Testnet Rinkeby" } };
export const contractInstances = {
  "0x4": {
    "0x1a97Ffaa4c1a2416bA28D3e91AF3F5Ae5ccB8406": {
      subgraphEndpoint: "https://api.studio.thegraph.com/query/16016/pmw/0.3.0",
    },
  },
};

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
  })
    .then((r) => r.json())
    .then((json) => json.data);

export const getClaimByID = (chainID, contractAddress, id) => {
  return queryTemplate(
    contractInstances[chainID][contractAddress].subgraphEndpoint,
    `{
  claims(where: {id: "${id}"}) {
    id
    claimID
    owner
    category
    bounty
    status
    lastBalanceUpdate
    disputeID
    withdrawalPermittedAt
    lastCalculatedScore
    arbitrator
    arbitratorExtraData
  }
    claimStorages(where: {claimEntityID: "${id}"}) {
    id
    claimEntityID
  }
  }`
  )
    .then((data) => {
      console.log(data);
      if (data && data?.claims[0]) {
        data.claims[0].storageAddress = data?.claimStorages[0]?.id;
      }
      return data.claims[0];
    })
    .catch((err) => console.error);
};

export const getAllClaims = (chainID) => {
  return Promise.allSettled(
    Object.entries(contractInstances[chainID] || {}).map(([key, value]) => {
      return queryTemplate(
        value.subgraphEndpoint,
        `{
  claims(orderBy: id, orderDirection: asc) {
    id
    claimID
    owner
    bounty
    status
    lastBalanceUpdate
    disputeID
    withdrawalPermittedAt
    lastCalculatedScore
    arbitrator
    arbitratorExtraData
  }}`
      ).then((data) => {
        if (data && data.claims && data.claims.length > 0) {
          data.claims.map((claim) => {
            return (claim.contractAddress = key);
          });
          return data.claims;
        }
      });
    })
  )
    .then((r) => r[0]?.value)
    .catch(console.error);
};

export const getAllMetaEvidences = (chainID) => {
  return Promise.allSettled(
    Object.entries(contractInstances[chainID] || {}).map(([key, value]) => {
      return queryTemplate(
        value.subgraphEndpoint,
        `{
  metaEvidenceEntities(orderBy: id, orderDirection:asc){
    id
    uri
  }
}`
      ).then((data) => data.metaEvidenceEntities);
    })
  )
    .then((r) => r[0]?.value)
    .catch(console.error);
};
