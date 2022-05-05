import React, {Component} from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import {ethers} from "ethers";


export default class EthereumProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      chainId: "",
      isConnected: false,
      isProviderDetected: false,
      metaEvidenceContents: [],
      blockNumber: 0,
    }

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
      if (provider) this.initializeProvider();
    });
  }

  initializeProvider() {
    this.setState({isProviderDetected: true});
    ethereum.request({method: "eth_chainId"}).then(this.handleChainChanged);
    ethereum.request({method: "eth_accounts"}).then(this.handleAccountsChanged);
    ethereum.request({method: "eth_subscribe", params: ["newHeads"]})
    ethereum.request({method: "eth_blockNumber"}).then(result => this.setState({blockNumber: result}))

    ethereum.on("accountsChanged", this.handleAccountsChanged);
    ethereum.on("chainChanged", this.handleChainChanged);
    ethereum.on("connect", this.handleConnected);
    ethereum.on("disconnect", this.handleDisconnected);
    ethereum.on("message", this.handleMessage)

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
    this.fetchMetaEvidenceContents(chainId)

  }

  handleConnected() {
    console.log("Connected to Ethereum.");
    this.setState({isConnected: true});
  }

  handleDisconnected() {
    console.log("Disconnect to Ethereum.");
    this.setState({isConnected: false});
  }

  handleMessage(message) {
    console.log(`Block number: ${message.data.result.number}`)
    this.setState({blockNumber: message.data.result.number})
  }

  async fetchMetaEvidenceContents(chainId) {
    console.log('Fetching all meta-evidences...');
    const rawMetaEvidenceList = (await getAllMetaEvidences(chainId)).map(item => item.uri)
    const result = await Promise.allSettled(rawMetaEvidenceList.map(metaEvidenceURI =>
      fetch(ipfsGateway + metaEvidenceURI).then(r => r.json())
    ))
    this.setState({metaEvidenceContents: result.map(item => item.value)})
  }

  render = () =>
    <EthereumContext.Provider value={this.state}> {this.props.children}</EthereumContext.Provider>;
}
export const EthereumContext = React.createContext();

export const chains = {"0x1": {name: "Ethereum Mainnet"}, "0x4": {name: "Ethereum Testnet Rinkeby"}};
export const contractInstances = {
  '0x4': {
    "0x5678057C9a36697986A1003d49B73EBE6A0E9c03": {
      subgraphEndpoint: 'https://api.studio.thegraph.com/query/16016/pmw/0.0.23',
    }
  }
}


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

    return data.claims[0]
  }).catch(err => console.error)
}


export const getAllClaims = (chainID) => {
  return Promise.allSettled(Object.entries(contractInstances[chainID] || {}).map(([key, value]) => {
    return queryTemplate(value.subgraphEndpoint, `{
  claims(orderBy: id, orderDirection: asc) {
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
        data.claims.map(claim => {
          return claim.contractAddress = key
        })
        return data.claims
      }
    })
  })).then(r =>
    r[0]?.value
  ).catch(console.error)
}

export const getAllMetaEvidences = (chainID) => {
  return Promise.allSettled(Object.entries(contractInstances[chainID] || {}).map(([key, value]) => {
    return queryTemplate(value.subgraphEndpoint, `{
  metaEvidenceEntities(orderBy: id, orderDirection:asc){
    id
    uri
  }
}`).then(data => data.metaEvidenceEntities
    )
  })).then(r => r[0]?.value).catch(console.error)
}

const monkeyPatch = (contractAddress) => {
  // TODO Refactor out duplications
}

export const ipfsGateway = 'https://ipfs.kleros.io'

export const BigNumber = ethers.BigNumber
export const constants = ethers.constants
export const utils = ethers.utils