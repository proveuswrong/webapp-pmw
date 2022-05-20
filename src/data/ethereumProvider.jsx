import React, {Component} from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import {ethers} from "ethers";


const ABI = [{
  "inputs": [{"internalType": "contract IArbitrator", "name": "_arbitrator", "type": "address"}, {
    "internalType": "bytes",
    "name": "_arbitratorExtraData",
    "type": "bytes"
  }, {"internalType": "string", "name": "_metaevidenceIpfsUri", "type": "string"}, {
    "internalType": "uint256",
    "name": "_claimWithdrawalTimelock",
    "type": "uint256"
  }, {"internalType": "uint256", "name": "_winnerStakeMultiplier", "type": "uint256"}, {
    "internalType": "uint256",
    "name": "_loserStakeMultiplier",
    "type": "uint256"
  }], "stateMutability": "nonpayable", "type": "constructor"
}, {
  "anonymous": false,
  "inputs": [{"indexed": false, "internalType": "uint256", "name": "claimAddress", "type": "uint256"}, {
    "indexed": false,
    "internalType": "uint256",
    "name": "newTotal",
    "type": "uint256"
  }],
  "name": "BalanceUpdate",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{"indexed": true, "internalType": "uint256", "name": "claimAddress", "type": "uint256"}, {
    "indexed": false,
    "internalType": "address",
    "name": "challanger",
    "type": "address"
  }, {"indexed": false, "internalType": "uint256", "name": "disputeID", "type": "uint256"}],
  "name": "Challenge",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{"indexed": false, "internalType": "uint256", "name": "claimAddress", "type": "uint256"}],
  "name": "ClaimWithdrawn",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{"indexed": true, "internalType": "uint256", "name": "claimStorageAddress", "type": "uint256"}, {
    "indexed": true,
    "internalType": "uint256",
    "name": "round",
    "type": "uint256"
  }, {"indexed": false, "internalType": "enum IProveMeWrong.RulingOptions", "name": "ruling", "type": "uint8"}, {
    "indexed": true,
    "internalType": "address",
    "name": "contributor",
    "type": "address"
  }, {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"}],
  "name": "Contribution",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{"indexed": false, "internalType": "uint256", "name": "claimAddress", "type": "uint256"}],
  "name": "Debunked",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{"indexed": true, "internalType": "contract IArbitrator", "name": "_arbitrator", "type": "address"}, {
    "indexed": true,
    "internalType": "uint256",
    "name": "_disputeID",
    "type": "uint256"
  }, {"indexed": false, "internalType": "uint256", "name": "_metaEvidenceID", "type": "uint256"}, {
    "indexed": false,
    "internalType": "uint256",
    "name": "_evidenceGroupID",
    "type": "uint256"
  }],
  "name": "Dispute",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{"indexed": true, "internalType": "contract IArbitrator", "name": "_arbitrator", "type": "address"}, {
    "indexed": true,
    "internalType": "uint256",
    "name": "_evidenceGroupID",
    "type": "uint256"
  }, {"indexed": true, "internalType": "address", "name": "_party", "type": "address"}, {
    "indexed": false,
    "internalType": "string",
    "name": "_evidence",
    "type": "string"
  }],
  "name": "Evidence",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{"indexed": true, "internalType": "uint256", "name": "_metaEvidenceID", "type": "uint256"}, {
    "indexed": false,
    "internalType": "string",
    "name": "_evidence",
    "type": "string"
  }],
  "name": "MetaEvidence",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{"indexed": false, "internalType": "string", "name": "claimID", "type": "string"}, {
    "indexed": false,
    "internalType": "uint8",
    "name": "category",
    "type": "uint8"
  }, {"indexed": false, "internalType": "uint256", "name": "claimAddress", "type": "uint256"}],
  "name": "NewClaim",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{"indexed": true, "internalType": "contract IArbitrator", "name": "_arbitrator", "type": "address"}, {
    "indexed": true,
    "internalType": "uint256",
    "name": "_disputeID",
    "type": "uint256"
  }, {"indexed": false, "internalType": "uint256", "name": "_ruling", "type": "uint256"}],
  "name": "Ruling",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{"indexed": true, "internalType": "uint256", "name": "claimStorageAddress", "type": "uint256"}, {
    "indexed": true,
    "internalType": "uint256",
    "name": "round",
    "type": "uint256"
  }, {"indexed": true, "internalType": "enum IProveMeWrong.RulingOptions", "name": "ruling", "type": "uint8"}],
  "name": "RulingFunded",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{"indexed": false, "internalType": "uint256", "name": "claimAddress", "type": "uint256"}],
  "name": "TimelockStarted",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{"indexed": true, "internalType": "uint256", "name": "claimStorageAddress", "type": "uint256"}, {
    "indexed": true,
    "internalType": "uint256",
    "name": "round",
    "type": "uint256"
  }, {"indexed": false, "internalType": "enum IProveMeWrong.RulingOptions", "name": "ruling", "type": "uint8"}, {
    "indexed": true,
    "internalType": "address",
    "name": "contributor",
    "type": "address"
  }, {"indexed": false, "internalType": "uint256", "name": "reward", "type": "uint256"}],
  "name": "Withdrawal",
  "type": "event"
}, {
  "inputs": [],
  "name": "ARBITRATOR",
  "outputs": [{"internalType": "contract IArbitrator", "name": "", "type": "address"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "CLAIM_WITHDRAWAL_TIMELOCK",
  "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "LOSER_APPEAL_PERIOD_MULTIPLIER",
  "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "LOSER_STAKE_MULTIPLIER",
  "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "MULTIPLIER_DENOMINATOR",
  "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "NUMBER_OF_LEAST_SIGNIFICANT_BITS_TO_IGNORE",
  "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "NUMBER_OF_RULING_OPTIONS",
  "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "PMW_VERSION",
  "outputs": [{"internalType": "string", "name": "", "type": "string"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "WINNER_STAKE_MULTIPLIER",
  "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "admin",
  "outputs": [{"internalType": "address payable", "name": "", "type": "address"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{"internalType": "uint256", "name": "_disputeID", "type": "uint256"}],
  "name": "appealFee",
  "outputs": [{"internalType": "uint256", "name": "arbitrationFee", "type": "uint256"}],
  "stateMutability": "view",
  "type": "function"
}, {"inputs": [], "name": "buyAndBurn", "outputs": [], "stateMutability": "nonpayable", "type": "function"}, {
  "inputs": [],
  "name": "categoryCounter",
  "outputs": [{"internalType": "uint8", "name": "", "type": "uint8"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
  "name": "categoryToArbitratorExtraData",
  "outputs": [{"internalType": "bytes", "name": "", "type": "bytes"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{"internalType": "uint80", "name": "_claimStorageAddress", "type": "uint80"}],
  "name": "challenge",
  "outputs": [],
  "stateMutability": "payable",
  "type": "function"
}, {
  "inputs": [{"internalType": "uint80", "name": "_claimStorageAddress", "type": "uint80"}],
  "name": "challengeFee",
  "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "challengeTaxRate",
  "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{"internalType": "address payable", "name": "_newAdmin", "type": "address"}],
  "name": "changeAdmin",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{"internalType": "uint80", "name": "", "type": "uint80"}],
  "name": "claimStorage",
  "outputs": [{"internalType": "address payable", "name": "owner", "type": "address"}, {
    "internalType": "uint32",
    "name": "withdrawalPermittedAt",
    "type": "uint32"
  }, {"internalType": "uint56", "name": "bountyAmount", "type": "uint56"}, {"internalType": "uint8", "name": "category", "type": "uint8"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{"internalType": "uint80", "name": "_searchPointer", "type": "uint80"}],
  "name": "findVacantStorageSlot",
  "outputs": [{"internalType": "uint256", "name": "vacantSlotIndex", "type": "uint256"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{"internalType": "uint256", "name": "_disputeID", "type": "uint256"}, {
    "internalType": "enum IProveMeWrong.RulingOptions",
    "name": "_supportedRuling",
    "type": "uint8"
  }],
  "name": "fundAppeal",
  "outputs": [{"internalType": "bool", "name": "fullyFunded", "type": "bool"}],
  "stateMutability": "payable",
  "type": "function"
}, {
  "inputs": [{"internalType": "uint256", "name": "_disputeID", "type": "uint256"}, {
    "internalType": "address payable",
    "name": "_contributor",
    "type": "address"
  }, {"internalType": "enum IProveMeWrong.RulingOptions", "name": "_ruling", "type": "uint8"}],
  "name": "getTotalWithdrawableAmount",
  "outputs": [{"internalType": "uint256", "name": "sum", "type": "uint256"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{"internalType": "uint80", "name": "_claimStorageAddress", "type": "uint80"}],
  "name": "increaseBounty",
  "outputs": [],
  "stateMutability": "payable",
  "type": "function"
}, {
  "inputs": [{"internalType": "string", "name": "_claimID", "type": "string"}, {
    "internalType": "uint8",
    "name": "_category",
    "type": "uint8"
  }, {"internalType": "uint80", "name": "_searchPointer", "type": "uint80"}],
  "name": "initializeClaim",
  "outputs": [],
  "stateMutability": "payable",
  "type": "function"
}, {
  "inputs": [{"internalType": "uint80", "name": "_claimStorageAddress", "type": "uint80"}],
  "name": "initiateWithdrawal",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{"internalType": "string", "name": "_metaevidenceIpfsUri", "type": "string"}, {
    "internalType": "bytes",
    "name": "_arbitratorExtraData",
    "type": "bytes"
  }], "name": "newCategory", "outputs": [], "stateMutability": "payable", "type": "function"
}, {
  "inputs": [{"internalType": "uint256", "name": "_disputeID", "type": "uint256"}, {
    "internalType": "uint256",
    "name": "_ruling",
    "type": "uint256"
  }], "name": "rule", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
  "inputs": [{"internalType": "uint256", "name": "_disputeID", "type": "uint256"}, {
    "internalType": "string",
    "name": "_evidenceURI",
    "type": "string"
  }], "name": "submitEvidence", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
  "inputs": [{"internalType": "uint80", "name": "_claimStorageAddress", "type": "uint80"}, {
    "internalType": "address payable",
    "name": "_newOwner",
    "type": "address"
  }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
  "inputs": [],
  "name": "treasuryBalance",
  "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{"internalType": "uint256", "name": "_newChallengeTaxRate", "type": "uint256"}],
  "name": "updateChallengeTaxRate",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{"internalType": "uint80", "name": "_claimStorageAddress", "type": "uint80"}],
  "name": "withdraw",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{"internalType": "uint256", "name": "_disputeID", "type": "uint256"}, {
    "internalType": "address payable",
    "name": "_contributor",
    "type": "address"
  }, {"internalType": "uint256", "name": "_roundNumber", "type": "uint256"}, {
    "internalType": "enum IProveMeWrong.RulingOptions",
    "name": "_ruling",
    "type": "uint8"
  }],
  "name": "withdrawFeesAndRewards",
  "outputs": [{"internalType": "uint256", "name": "amount", "type": "uint256"}],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{"internalType": "uint256", "name": "_disputeID", "type": "uint256"}, {
    "internalType": "address payable",
    "name": "_contributor",
    "type": "address"
  }, {"internalType": "enum IProveMeWrong.RulingOptions", "name": "_ruling", "type": "uint8"}],
  "name": "withdrawFeesAndRewardsForAllRounds",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}];

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
      ethersProvider: null
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
      console.log(provider)
      if (provider) this.initializeProvider();
    });
  }

  initializeProvider() {
    this.setState({isProviderDetected: true});
    ethereum.request({method: "eth_chainId"}).then(this.handleChainChanged);
    // ethereum.request({method: "eth_accounts"}).then(this.handleAccountsChanged);
    ethereum.request({method: "eth_subscribe", params: ["newHeads"]})
    ethereum.request({method: "eth_blockNumber"}).then(result => this.setState({blockNumber: result}))

    ethereum.on("accountsChanged", this.handleAccountsChanged);
    ethereum.on("chainChanged", this.handleChainChanged);
    ethereum.on("connect", this.handleConnected);
    ethereum.on("disconnect", this.handleDisconnected);
    ethereum.on("message", this.handleMessage)

    // Ethers below - As I introduced Ethers now, this file needs a refactoring

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    provider.send("eth_requestAccounts", []).then(this.handleAccountsChanged)
    this.setState({ethersProvider: provider})
  }

  sendTransaction({method, to, value}) {
    const tx = this.state.provider.getSigner().sendTransaction({
      to,
      value
    });
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
    const {ethersProvider} = this.state;

    this.setState({
      chainId: chainId,
      isDeployedOnThisChain: !(contractInstances[chainId] == null),
      contractInstance: (contractInstances[chainId] ? new ethers.Contract(Object.keys(contractInstances[chainId])[0], ABI, ethersProvider.getSigner()) : null)
    });
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


export const ipfsGateway = 'https://ipfs.kleros.io'

export const BigNumber = ethers.BigNumber
export const constants = ethers.constants
export const utils = ethers.utils