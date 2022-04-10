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
  0: { name: "Bug Bounty", arbitrator: arbitrators[4], jurySize: 3 },
};

let claims = [
  {
    id: "0",
    category: categories[0],
    title: "Prove Me Wrong Smart Contracts Are Secure",
    description:
      "Prove Me Wrong smart contracts are secure. There is no vulnerability. Bounty amount and accumulated trust score is randomized.",
    state: "Live",
    amount: Math.random() * 3,
    currency: "ETH",
    accumulatedScore: Math.pow(10, Math.floor(Math.random() * 5)) * 1000,
    lastBountyUpdate: Math.floor(Date.now() / 1000),
    history: [],
  },

  {
    id: "1",
    category: categories[0],
    title: "Kleros Smart Contracts Are Secure",
    description:
      "Kleros smart contracts are secure. There is no vulnerability.",
    state: "Live",
    amount: 3,
    currency: "ETH",
    // accumulatedScore: Math.floor(Math.random() * 1000000000000),
    accumulatedScore: Math.pow(10, Math.floor(Math.random() * 5)) * 1000,
    lastBountyUpdate: Math.floor(Date.now() / 1000),
    history: [],
  },
];

export function getClaims() {
  return claims;
}

export function getClaim(id) {
  return claims.find((claim) => claim.id === id);
}

export function getTrustScore(id) {
  const claim = claims.find((claim) => claim.id === id);

  const score = (
    claim.accumulatedScore +
    (Math.floor(Date.now() / 1000) - claim.lastBountyUpdate) * claim.amount
  ).toFixed(0);

  return score;
}
