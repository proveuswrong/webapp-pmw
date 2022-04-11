import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getClaim, getTrustScore } from "../data";
import Interval from "react-interval-rerender";
import { EthereumContext } from "../App";

export default function Claim() {
  let params = useParams();
  let navigate = useNavigate();
  let location = useLocation();
  let claim = getClaim(params.id);

  let reRenderInMs = 500;
  // This component should consume global Ethereum context.

  return (
    <>
      <div>
        <EthereumContext.Consumer>
          {(value) => (
            <h2>
              {value.accounts[0]}
              <br /> {value.chainId}
            </h2>
          )}
        </EthereumContext.Consumer>

        <h3>{claim.title}</h3>
        <p>Category: {claim.category.name}</p>
        <p>Arbitrator Short Name: {claim.category.arbitrator.shortName}</p>
        <p>Arbitrator Long Name: {claim.category.arbitrator.fullName}</p>
        <p>Arbitrator Fee: {claim.category.arbitrator.shortName}</p>
        <p>
          Arbitration Fee: {(claim.category.arbitrator.feePerVote * claim.category.jurySize).toFixed(3)}{" "}
          {claim.category.arbitrator.currency}
        </p>
        <p>Jury Size: {claim.category.jurySize} votes</p>
        <br />
        <p>Description: {claim.description}</p>
        <p>
          Bounty Amount: {claim.amount.toFixed(3)} {claim.currency}
        </p>
        <p>
          {" "}
          Trust Score:{" "}
          <big>
            <b>
              <Interval delay={reRenderInMs}>{() => getTrustScore(params.id).slice(0, -3)}</Interval>
            </b>
          </big>
          <Interval delay={reRenderInMs}>{() => getTrustScore(params.id).slice(-3)}</Interval>
        </p>

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
