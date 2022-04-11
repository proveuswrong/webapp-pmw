import { useOutletContext } from "react-router-dom";

export default function Create(props) {
  const [{ accounts, chainId }, setter] = useOutletContext();
  // This component should consume global Ethereum context.

  return (
    <h2>
      Create <br /> {accounts[0]}
      <br /> {chainId}
    </h2>
  );
}
