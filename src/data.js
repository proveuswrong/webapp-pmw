let events = {
  0: {
    name: "newClaim",
  },
  1: {
    name: "raise",
  },
  2: {
    name: "initiateWithdrawal",
  },
  3: {
    name: "challenge",
  },
  4: {
    name: "appeal",
  },
  5: {
    name: "evidence",
  },
  6: {
    name: "withdrawal",
  },
  7: {
    name: "juryDecision",
  },
  8: {
    name: "debunk",
  },
  9: {
    name: "failedToProveWrong",
  },
};

let arbitrators = {
  0: {
    shortName: "General",
    fullName: "General > Blockchain > Technical",
    feePerVote: 0.025,
    currency: "ETH",
  },
  1: {
    shortName: "Blockchain",
    fullName: "General > Blockchain",
    feePerVote: 0.025,
    currency: "ETH",
  },
  2: {
    shortName: "Non-Technical",
    fullName: "General > Blockchain > Non-Technical",
    feePerVote: 0.025,
    currency: "ETH",
  },
  3: {
    shortName: "Token Listing",
    fullName: "General > Blockchain > Non-Technical > Token Listing",
    feePerVote: 0.07,
    currency: "ETH",
  },
  4: {
    shortName: "Technical",
    fullName: "General > Blockchain > Technical",
    feePerVote: 0.072,
    currency: "ETH",
  },
};

let categories = {
  0: {name: "Bug Bounty", arbitrator: arbitrators[4], jurySize: 3},
};

let claims = [
  {
    id: "0",
    category: categories[0],
    content: '/ipfs/QmWRmqin6ZLG7RgzDkXufmaDr9wGDxYUQUaXbaPVKvsQbn/claim.json',
    state: "Live",
    amount: Math.random() * 3,
    currency: "ETH",
    accumulatedScore: Math.pow(10, Math.floor(Math.random() * 5)) * 1000,
    lastBountyUpdate: Math.floor(Date.now() / 1000),
    history: [],
  }
];

export const getRealClaims = () => {
  return fetch("https://api.studio.thegraph.com/query/16016/pmw/0.1.16", {
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
       {
  claims{
    id
    claimID
    bounty
    status
    lastBalanceUpdate
    disputeID
    withdrawalPermittedAt
    lastCalculatedScore
  }
}
    `,
    }),
    method: "POST",
    mode: "cors",
  }).then(r => r.json()).then(json => json.data).then(data => data.claims)
}

export const getRealClaim = (id) => {
  return fetch("https://api.studio.thegraph.com/query/16016/pmw/0.1.16", {
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
       {
  claims(where: {id: "${id}"}) {
    id
    claimID
    bounty
    status
    lastBalanceUpdate
    disputeID
    withdrawalPermittedAt
    lastCalculatedScore
  }
}
    `,
    }),
    method: "POST",
    mode: "cors",
  }).then(r => r.json()).then(json => json.data).then(data => data.claims[0])
}


export function getClaims() {
  return claims;
}

export function getClaim(id) {
  return claims.find((claim) => claim.id === id);
}

export function getTrustScore(claim) {

  return (
    parseInt(claim.lastCalculatedScore) +
    (Math.floor(Date.now() / 1000) - parseInt(claim.lastBalanceUpdate)) * parseInt(claim.bounty)
  ).toFixed(0);


}
