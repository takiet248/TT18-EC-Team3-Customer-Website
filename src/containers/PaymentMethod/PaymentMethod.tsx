import React from "react";
import "./PaymentMethod.scss";
import { Button, Input } from "../../components/common";
import { PayPalButton } from "react-paypal-button-v2";
import { useHistory, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import { doPaySuccess } from "../../redux";
import { unwrapResult } from "@reduxjs/toolkit";

export const PaymentMethod = () => {
  const { state } = useLocation<any>();
  const dispatch = useAppDispatch();
  const history = useHistory();
  // const [sdkReady, setSdkReady] = useState(false);
  // const data = process.env.REACT_APP_PAYPAL_CLIENT_ID;
  // useEffect(() => {
  //   // const addPayPalScript = async () => {
  //   //   const script = document.createElement('script');
  //   //   script.type = 'text/javascript';
  //   //   script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
  //   //   script.async = true;
  //   //   script.onload = () => {
  //   //     setSdkReady(true);
  //   //   };
  //   //   document.body.appendChild(script);
  //   // };
  //   // if (!order) {
  //   //   // dispatch(detailsOrder(orderId));
  //   // } else {
  //   //   if (!order.isPaid) {
  //   //     if (!window.paypal) {
  //   //       addPayPalScript();
  //   //     } else {
  //   //       setSdkReady(true);
  //   //     }
  //   //   }
  //   // }
  // }, [sdkReady]);
  const successPaymentHandler = (data: any) => {
    console.log(data.payer.email_address);
    dispatch(
      doPaySuccess({
        uid: state?.tutorid,
        cid: state?.courseid,
        total: state?.price,
        email: data.payer.email_address,
      })
    )
      .then(unwrapResult)
      .then((res: any) => {
        if (res) {
          history.replace("/");
        }
      });
  };
  return (
    <div className="paymentMethod-container">
      <div className="paymentMethod__method">
        <span>Payment Information </span>
      </div>

      <div className="paymentMethod__promoCode">
        <label htmlFor="">Promo code</label>
        <Input></Input>
        <Button>Apply</Button>
      </div>
      <div className="paymentMethod__summary">
        <div className="payment-summary">
          <h1>Summary</h1>
          <div className="payment-summary__calculation">
            <div className="calculation-priceSession">
              <span>Course Price</span>
              <span className="bold">${state?.price}</span>
            </div>
            {/* <div className="calculation-totalSessions">
              <span>Total sessions</span>
              <span className="bold">3</span>
            </div> */}
            <div className="calculation-promo">
              <span>Promo</span>
              <span className="bold">$0</span>
            </div>
            {/* <div className="calculation-deposit">
              <span>Full price</span>
              <span className="bold">$111</span>
            </div> */}
            <div className="calculation-deposit">
              <span className="bold">Full price</span>
              <span className="bold">${state?.price}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="purchase-button">
        <PayPalButton
          amount={state?.price}
          onSuccess={successPaymentHandler}
        ></PayPalButton>
      </div>
    </div>
  );
};
