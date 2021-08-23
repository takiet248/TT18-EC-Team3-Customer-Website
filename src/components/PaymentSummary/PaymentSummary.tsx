import React from "react";
import "./PaymentSummary.scss";

export const PaymentSummary = () => {
  return (
    <div className="payment-summary">
      <h1>Summary</h1>
      <div className="payment-summary__calculation">
        {/* <div className="calculation-priceSession">
          <span>Price/session</span>
          <span className="bold">$69</span>
        </div>
        <div className="calculation-totalSessions">
          <span>Total sessions</span>
          <span className="bold">3</span>
        </div> */}
        <div className="calculation-promo">
          <span>Promo</span>
          <span className="bold">$0</span>
        </div>
        <div className="calculation-fullPrice">
          <span>Full price</span>
          <span className="bold">$30</span>
        </div>
        <div className="calculation-deposit">
          <span className="bold">Total</span>
          <span className="bold">$30</span>
        </div>
      </div>
    </div>
  );
};
