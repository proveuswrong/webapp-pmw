import {useParams, useNavigate, useLocation} from "react-router-dom";
import {getTrustScore} from "../data";
import Interval from "react-interval-rerender";
import {EthereumContext, getClaimByID, ipfsGateway} from "../data/ethereumProvider";
import {useEffect, useState, useContext} from "react";


export default function Claim() {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [claim, setClaim] = useState()
  const [claimContent, setClaimContent] = useState()
  const ethereumContext = useContext(EthereumContext);
  const [fetchingClaim, setFetchingClaim] = useState(true)
  const [fetchingClaimContent, setFetchingClaimContent] = useState(true)


  useEffect(() => {
    let didCancel = false;

    console.log(params)
    if (!didCancel) {
      getClaimByID(params.chain, params.contract, params.id).then(setClaim).then(setFetchingClaim(false))
    }

    return () => {
      didCancel = true
    }

  }, [])

  useEffect(() => {
    let didCancel = false;

    if (!didCancel && claim)
      fetch(ipfsGateway + claim.claimID).then((response => {
        if (!response.ok) {
          throw new Error('Network response was not OK');
        }

        return response.json().then(data => setClaimContent((prevState) => ({
          ...prevState,
          title: data.title, description: data.description
        })))
      })).catch(console.error).then(setFetchingClaimContent(false))

    return () => {
      didCancel = true
    }

  }, [claim])

  let reRenderInMs = 500;

  return (
    <section>
      <div>

        <h3>{!fetchingClaimContent && !claimContent && '⚠️'} {claimContent?.title || (fetchingClaimContent ? 'fetching...' : 'Failed to fetch claim title.')} {!fetchingClaimContent && !claimContent && '⚠️'}  </h3>
        <p>Category: {claim?.category}</p>
        {/*We need to get arbitrator address somehow. Last thing I tried is to add this field to Claim Entity on Subgraph. See 0.0.19*/}
        {/*<p>Arbitrator Short Name: {claim.category.arbitrator.shortName}</p>*/}
        {/*<p>Arbitrator Long Name: {claim.category.arbitrator.fullName}</p>*/}
        {/*<p>Arbitrator Fee: {claim.category.arbitrator.shortName}</p>*/}
        {/*<p>*/}
        {/*  Arbitration Fee: {(claim.category.arbitrator.feePerVote * claim.category.jurySize).toFixed(3)}{" "}*/}
        {/*  {claim.category.arbitrator.currency}*/}
        {/*</p>*/}
        {/*<p>Jury Size: {claim.category.jurySize} votes</p>*/}
        <p> {claimContent?.description || (fetchingClaimContent ? 'fetching...' : 'Failed to fetch claim description.')}</p>
        <p>
          Bounty Amount: {parseInt(claim?.bounty)} wei
        </p>
        {claim &&
          <p>
            {" "}
            Trust Score:{" "}
            <big>
              <b>
                <Interval delay={reRenderInMs}>{() => getTrustScore(claim).slice(0, -3)}</Interval>
              </b>
            </big>
            <Interval delay={reRenderInMs}>{() => getTrustScore(claim).slice(-3)}</Interval>
          </p>
        }
        <p>
          <button
            onClick={() => {
              navigate("/claims" + location.search);
            }}
          >
            Go back
          </button>
        </p>
      </div>
    </section>
  );
}
