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
      claims.map((claim) => fetch(ipfsGateway + claim.claimID).then(response => {
        if (!response.ok) {
          throw new Error('Network response was not OK');
        }
        return response.json().then(data => setClaimContents((prevState) => ({
          ...prevState,
          [claim.claimID]: {title: data.title, description: data.description}
        })));
      }, console.error))

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
      <ul>
        {claims && Object.entries(claims).map(([key, value]) => <li key={key}><Link
          to={value.id}>{claimContents?.[value.claimID]?.title || `Unable to fetch claim data from ${value.claimID}`}</Link></li>)}
      </ul>
      <Outlet/>
    </section>
  );
}

