import {Outlet, useSearchParams, Link} from "react-router-dom";
import QueryNavLink from "../components/queryNavLink";
import {EthereumContext, getAllClaims, ipfsGateway} from "../data/ethereumProvider";
import React, {useState, useEffect} from "react";


export default function Claims() {
  const [claims, setClaims] = useState();
  const [claimContents, setClaimContents] = useState()
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    let didCancel = false;


    async function fetchFromGraph() {
      if (!didCancel) {
        let data = await getAllClaims('https://api.studio.thegraph.com/query/16016/pmw/0.1.16');
        console.log(data)
        setClaims(data)
      }
    }

    fetchFromGraph()

    return () => {
      didCancel = true
    }

  }, [])


  useEffect(() => {
    let didCancel = false;

    if (!didCancel && claims)
      Promise.all(claims.map((claim) => fetch(ipfsGateway + claim.claimID).then(response => response.json()).then(data => setClaimContents((prevState) => ({
        ...prevState,
        [claim.claimID]: {title: data.title, description: data.description}
      })))))

    return () => {
      didCancel = true
    }

  }, [claims])


  return (
    <section>
      <EthereumContext.Consumer>
        {(value) => (
          <h2>
            Claims <br/> {value.accounts[0]}
            <br/> {value.chainId}
          </h2>
        )}
      </EthereumContext.Consumer>
      {claims && Object.entries(claims).map(([key, value]) => <div key={key}><Link
        to={value.id}>{claimContents?.[value.claimID]?.title}</Link></div>)}
      <Outlet/>
    </section>
  );
}

