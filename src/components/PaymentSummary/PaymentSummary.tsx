import React from "react";
import "./PaymentSummary.scss";

export const PaymentSummary: React.FC<IPaymentSummary> = ({
  promo,
  fullprice,
  total,
}) => {
  return (
    <div style={{display:"flex",justifyContent:"center"}}>
    <div className="payment-summary">
      <h1>Summary</h1>
      <div className="payment-summary__calculation">
        <div className="calculation-promo">
          <span>Promo</span>
          <span className="bold">${promo}</span>
        </div>
        <div className="calculation-fullPrice">
          <span>Full price</span>
          <span className="bold">${fullprice}</span>
        </div>
        <div className="calculation-deposit">
          <span className="bold">Total</span>
          <span className="bold">${total}</span>
        </div>
      </div>
    </div>
    </div>
  );
};
