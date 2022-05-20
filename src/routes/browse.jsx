import {useSearchParams, Link} from "react-router-dom";
import listClaims from "../components/listClaims";
import ListClaims from "../components/listClaims";
import {useContext} from "react";
import {EthereumContext} from "../data/ethereumProvider";

export default function Browse() {

  const ethereumContext = useContext(EthereumContext);

  return (
    <section>
      <h1>Browse</h1>
      <small>Component rendered at block no: {ethereumContext.blockNumber}</small>
      <ListClaims/>

    </section>
  );
}

