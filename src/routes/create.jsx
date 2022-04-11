import { EthereumContext } from "../data/ethereumProvider";

export default function Create(props) {
  // This component should consume global Ethereum context.

  return (
    <EthereumContext.Consumer>
      {(value) => (
        <h2>
          Claims <br /> {value.accounts[0]}
          <br /> {value.chainId}
        </h2>
      )}
    </EthereumContext.Consumer>
  );
}
