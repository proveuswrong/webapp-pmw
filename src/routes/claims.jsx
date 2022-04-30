import {useSearchParams, Link} from "react-router-dom";
import QueryNavLink from "../components/queryNavLink";
import {EthereumContext, getAllClaims, ipfsGateway} from "../data/ethereumProvider";
import React, {useState, useEffect, useContext} from "react";


export default function Claims() {
  const [claims, setClaims] = useState();
  const [claimContents, setClaimContents] = useState()
  const ethereumContext = useContext(EthereumContext);

  const [fetchingClaims, setFetchingClaims] = useState(true)
  const [loadingFetchingContents, setFetchingClaimsContents] = useState(true)


  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    let didCancel = false;

    async function fetchFromGraph() {
      if (!didCancel) {
        let data = await getAllClaims(ethereumContext?.chainId);
        setClaims(data)
        setFetchingClaims(false)
      }
    }

    fetchFromGraph()

    return () => {
      didCancel = true
    }

  }, [])


  useEffect(() => {
    let didCancel = false;
    if (!didCancel && claims) {
      claims.filter(c => c != null).map((claim) => fetch(ipfsGateway + claim?.claimID).then(response => {
        if (!response.ok) {
          throw new Error('Network response was not OK');
        }
        response.json().then(data => {
          setClaimContents((prevState) => ({
            ...prevState,
            [claim.claimID]: {title: data.title, description: data.description}
          }))

          setFetchingClaimsContents(false)
        });
      }, console.error))
    }
    return () => {
      didCancel = true
    }

  }, [claims])


  return (
    <section>
      <h1>Browse</h1>

      <ul>
        {claims && Object.entries(claims.filter(c => c != null)).map(([key, value]) => <li key={key}><Link
          to={`${ethereumContext.chainId}/${value?.contractAddress}/${value?.id}`}>{claimContents?.[value?.claimID]?.title || (!loadingFetchingContents && `Unable to fetch claim data from ${value?.claimID}`)}</Link>
        </li>)}
      </ul>
      {!claims && fetchingClaims && 'Fetching claims'}
      {claims && claims.filter(c => c != null).length == 0 && 'No claims.'}
      {claims && loadingFetchingContents && 'Fetching claim details.'}
    </section>
  );
}

