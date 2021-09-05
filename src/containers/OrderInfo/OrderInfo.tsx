import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { PaymentSummary } from "../../components";
import { Button } from "../../components/common";
import "./OrderInfo.scss";

export const OrderInfo = () => {
  const history = useHistory();
  const { state } = useLocation<any>();

  return (
    <div className="order-info">
      <div className="order-info__details">
        <p>Your payment was successful</p>
      </div>
      <div className="order-info__summary">
        <PaymentSummary
          promo={0}
          total={state?.price}
          fullprice={state?.price}
        />
        <div className="back-to-home-button">
          <Button onClick={() => history.push("/")}>Back to Homepage</Button>
        </div>
      </div>
    </div>
  );
};
