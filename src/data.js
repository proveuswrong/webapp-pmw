let invoices = [
  {
    name: "Santa Monica",
    number: 1995,
    amount: "$10,800",
    due: "12/05/1995",
  },
  {
    name: "Stankonia",
    number: 2000,
    amount: "$8,000",
    due: "10/31/2000",
  },
  {
    name: "Ocean Avenue",
    number: 2003,
    amount: "$9,500",
    due: "07/22/2003",
  },
  {
    name: "Tubthumper",
    number: 1997,
    amount: "$14,000",
    due: "09/01/1997",
  },
  {
    name: "Wide Open Spaces",
    number: 1998,
    amount: "$4,600",
    due: "01/27/1998",
  },
];

export function getInvoices() {
  return invoices;
}

export function getInvoice(number) {
  return invoices.find((invoice) => invoice.number === number);
}

export function deleteInvoice(number) {
  invoices = invoices.filter((invoice) => invoice.number !== number);
}

let claims = [
  {
    id: "0",
    category: "Bug Bounty",
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
    category: "Bug Bounty",
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

export function getClaims() {
  return claims;
}

export function getClaim(id) {
  return claims.find((claim) => claim.id === id);
}
