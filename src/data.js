let claims = [
  {
    id: "0",
    category: categories[0],
    title: "Prove Me Wrong Smart Contracts Are Secure",
    description:
      "Prove Me Wrong smart contracts are secure. There is no vulnerability.",
    state: "Live",
    amount: "3",
    accumulatedScore: "123123",
    lastBountyUpdate: Date.now(),
    history: [],
  },

  {
    id: "1",
    category: categories[0],
    title: "Kleros Smart Contracts Are Secure",
    description:
      "Kleros smart contracts are secure. There is no vulnerability.",
    state: "Live",
    amount: "3",
    accumulatedScore: "12312312",
    lastBountyUpdate: Date.now(),
    history: [],
  },
];

let categories = {
  0: { name: "Bug Bounty", arbitrator: arbitrators[4], jurySize: "3" },
};

let arbitrators = {
  0: {
    shortName: "General",
    fullName: "General > Blockchain > Technical",
    feePerVote: "0.025",
    feeCurrency: "ETH",
  },
  1: {
    shortName: "Blockchain",
    fullName: "General > Blockchain",
    feePerVote: "0.025",
    feeCurrency: "ETH",
  },
  2: {
    shortName: "Non-Technical",
    fullName: "General > Blockchain > Non-Technical",
    feePerVote: "0.025",
    feeCurrency: "ETH",
  },
  3: {
    shortName: "Token Listing",
    fullName: "General > Blockchain > Non-Technical > Token Listing",
    feePerVote: "0.07",
    feeCurrency: "ETH",
  },
  4: {
    shortName: "Technical",
    fullName: "General > Blockchain > Technical",
    feePerVote: "0.072",
    feeCurrency: "ETH",
  },
};
export function getClaims() {
  return claims;
}

export function getClaim(id) {
  return claims.find((claim) => claim.id === id);
}
