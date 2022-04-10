import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getClaim } from "../data";

export default function Claim() {
  let params = useParams();
  let navigate = useNavigate();
  let location = useLocation();
  let claim = getClaim(params.id);

  console.debug(params.id);

  return (
    <>
      <div>
        <h3>{claim.title}</h3>
        <p>Category: {claim.category}</p>
        <p>arbitrator</p>
        <p>{claim.description}</p>
        <p>Bounty amount: {claim.amount}</p>
        <p>Trust score: {claim.accumulatedScore}</p>

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
