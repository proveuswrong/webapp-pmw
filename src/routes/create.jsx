import { EthereumContext } from "../App";

export default function Create(props) {
  // This component should consume global Ethereum context.

  return (
    <EthereumContext.Consumer>
      {(value) => (
        <h2>
          Create
          <br />
          {value.accounts[0]}
          <br /> {value.chainId}
        </h2>
      )}
    </EthereumContext.Consumer>
  );
}
