import {useParams, useNavigate, useLocation} from "react-router-dom";
import {getRealClaim, getRealClaims, getTrustScore} from "../data";
import Interval from "react-interval-rerender";
import {EthereumContext} from "../data/ethereumProvider";
import {useEffect, useState} from "react";

const ipfsGateway = 'https://ipfs.kleros.io'


export default function Claim() {
  const [claim, setClaim] = useState()
  const [claimContent, setClaimContent] = useState()


  let params = useParams();
  let navigate = useNavigate();
  let location = useLocation();


  useEffect(() => {
    let didCancel = false;

    async function fetchFromGraph() {
      if (!didCancel) {
        let data = await getRealClaim(params.id);
        console.log(data)
        setClaim(data)
      }
    }

    fetchFromGraph()

    return () => {
      didCancel = true
    }

  }, [])

  useEffect(() => {
    let didCancel = false;

    if (!didCancel && claim)
      fetch(ipfsGateway + claim.claimID).then(response => response.json()).then(data => setClaimContent((prevState) => ({
        ...prevState,
        title: data.title, description: data.description
      })))

    return () => {
      didCancel = true
    }

  }, [claim])

  let reRenderInMs = 500;

  return (
    <>
      <div>
        <EthereumContext.Consumer>
          {(value) => (
            <h2>
              {value.accounts[0]}
              <br/> {value.chainId}
            </h2>
          )}
        </EthereumContext.Consumer>
        {claimContent && console.debug(claimContent)}
        <h3>{claimContent?.title}</h3>
        {/*<p>Category: {'todo'}</p>*/}
        {/*<p>Arbitrator Short Name: {claim.category.arbitrator.shortName}</p>*/}
        {/*<p>Arbitrator Long Name: {claim.category.arbitrator.fullName}</p>*/}
        {/*<p>Arbitrator Fee: {claim.category.arbitrator.shortName}</p>*/}
        {/*<p>*/}
        {/*  Arbitration Fee: {(claim.category.arbitrator.feePerVote * claim.category.jurySize).toFixed(3)}{" "}*/}
        {/*  {claim.category.arbitrator.currency}*/}
        {/*</p>*/}
        {/*<p>Jury Size: {claim.category.jurySize} votes</p>*/}
        <p>{claimContent?.description}</p>
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
    </>
  );
}
