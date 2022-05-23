import {useParams, useNavigate, useLocation} from "react-router-dom";
import Interval from "react-interval-rerender";
import {EthereumContext, getAllClaims, getClaimByID} from "../data/ethereumProvider";
import {ipfsGateway} from "../utils/addToIPFS";
import {useEffect, useState, useContext} from "react";

import {utils, constants, BigNumber} from 'ethers'
import shortid from "shortid";

export default function Claim() {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const ethereumContext = useContext(EthereumContext);
  const [claim, setClaim] = useState()
  const [claimContent, setClaimContent] = useState()
  const [fetchingClaim, setFetchingClaim] = useState(true)
  const [fetchingClaimContent, setFetchingClaimContent] = useState(true)

  console.log(claim)

  useEffect(() => {
    let didCancel = false;

    if (!didCancel) {
      getClaimByID(params.chain, params.contract, params.id).then((data) => {
        setClaim(data)
        setFetchingClaim(false)
      })
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

  function handleInitiateWithdrawal() {
    console.log('withdrawal initiated.')
  }

  let reRenderInMs = 1000;

  return (
    <section>
      <small key={ethereumContext.blockNumber}>Component rendered at block no: <span className='blink'>{ethereumContext.blockNumber}</span></small>

      <div>

        <h3>{!fetchingClaimContent && !claimContent && '⚠️'} {claimContent?.title || (fetchingClaimContent ? 'fetching...' : 'Failed to fetch claim title.')} {!fetchingClaimContent && !claimContent && '⚠️'}  </h3>
        <p>Category: {claim?.category}: {ethereumContext?.metaEvidenceContents[claim?.category]?.category}</p>
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
          Bounty
          Amount: {fetchingClaim ? 'fetching' : `${parseFloat(utils.formatUnits(parseInt(claim?.bounty), 18)).toFixed(3)} ${constants.EtherSymbol}`}
        </p>
        <p>
          Claim Age:
          {fetchingClaim ? 'fetching' :
            <span key={getTimePastSinceLastBountyUpdate(claim, ethereumContext.blockNumber)}
                  className='blink'> {getTimePastSinceLastBountyUpdate(claim, ethereumContext.blockNumber)}</span>} blocks
        </p>
        <p>
          Claim Owner: {fetchingClaim ? 'fetching' : claim.owner}
        </p>
        {claim &&
          <p>
            {" "}
            Trust Score:{" "}
            <big>
              <b>
                {fetchingClaim ? 'Fetching claim' :
                  <Interval
                    delay={reRenderInMs}>{() => getTrustScore(claim, getTimePastSinceLastBountyUpdate(claim, ethereumContext.blockNumber)).slice(0, -3)}</Interval>}
              </b>
            </big>

            <Interval
              delay={reRenderInMs}>{() => getTrustScore(claim, getTimePastSinceLastBountyUpdate(claim, ethereumContext.blockNumber)).slice(-3)}</Interval>

          </p>
        }
        <p>
          <button
            onClick={() => {
              navigate("/browse" + location.search);
            }}
          >
            Go back
          </button>
          {ethereumContext.accounts[0] == claim?.owner &&
            <button
              onClick={handleInitiateWithdrawal}
            >
              Initiate Withdrawal
            </button>
          }
        </p>
      </div>
    </section>
  );
}

export const getTimePastSinceLastBountyUpdate = (claim, currentBlockNumber) =>
  parseInt(currentBlockNumber) - parseInt(claim.lastBalanceUpdate)


export const getTrustScore = (claim, timePastSinceLastBountyUpdate) => {
  const timeDelta = BigNumber.from(timePastSinceLastBountyUpdate)
  const previouslyAccumulatedScore = BigNumber.from(claim.lastCalculatedScore)
  const bounty = BigNumber.from(claim.bounty)
  const rawScore = previouslyAccumulatedScore.add(timeDelta.mul(bounty))
  const normalizedScore = utils.formatEther(rawScore) // Divides by 10^18 to prevent big numbers.
  return parseInt(normalizedScore).toFixed(0)

}



