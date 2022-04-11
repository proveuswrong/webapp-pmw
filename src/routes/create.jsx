import { useOutletContext } from "react-router-dom";

export default function Create(props) {
  const [{ accounts, chainId }, setter] = useOutletContext();

  return (
    <h2>
      Create <br /> {accounts[0]}
      <br /> {chainId}
    </h2>
  );
}
