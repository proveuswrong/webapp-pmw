import {EthereumContext} from "../data/ethereumProvider";

export default function Create() {

  return (
    <EthereumContext.Consumer>
      {(value) => (
        <h2>
          Claims <br/> {value.accounts[0]}
          <br/> {value.chainId}
        </h2>
      )}
    </EthereumContext.Consumer>
  );
}
