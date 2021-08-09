import React from "react";
import "./PaymentMethod.scss";
import { Button, Input } from "../../components/common";
import { PaymentSummary } from "../../components";

export const PaymentMethod = () => {
  return (
    <div className="paymentMethod-container">
      <div className="paymentMethod__method">
        <span>Payment Information </span>
        <img src="./images/paypal.svg" alt="paypal" />
        <img src="./images/momo.svg" alt="momo" />
        <img src="./images/visa.svg" alt="visa" />
      </div>
      <div className="paymentMethod__cardNumber">
        <Input placeholder="Card number"></Input>
      </div>
      <div className="paymentMethod__promoCode">
        <label htmlFor="">Promo code</label>
        <Input></Input>
        <Button>Apply</Button>
      </div>
      <div className="paymentMethod__summary">
        <PaymentSummary />
      </div>
    </div>
  );
};
