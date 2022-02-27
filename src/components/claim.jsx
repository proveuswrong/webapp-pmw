import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getInvoice, deleteInvoice } from "../data";

export default function Claim() {
  let params = useParams();
  let navigate = useNavigate();
  let location = useLocation();
  let invoice = getInvoice(parseInt(params.invoiceId, 10));

  return (
    <>
      <div>
        <h2>Total Due: {invoice.amount}</h2>
        <p>
          {invoice.name}: {invoice.number}
        </p>
        <p>Due Date: {invoice.due}</p>
        <p>
          <button
            onClick={() => {
              deleteInvoice(invoice.number);
              navigate("/claims" + location.search);
            }}
          >
            Delete
          </button>
        </p>
      </div>
    </>
  );
}
