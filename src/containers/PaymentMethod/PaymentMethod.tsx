import React from "react";
import "./PaymentMethod.scss";
import { Button, Input } from "../../components/common";
import { PaymentSummary } from "../../components";
import { PayPalButton } from "react-paypal-button-v2";

export const PaymentMethod = () => {
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
  const successPaymentHandler = () => {
    console.log("hihi");
  };
  return (
    <div className="paymentMethod-container">
      <div className="paymentMethod__method">
        <span>Payment Information </span>
        {/* <img src="./images/paypal.svg" alt="paypal" />
        <img src="./images/momo.svg" alt="momo" />
        <img src="./images/visa.svg" alt="visa" /> */}
      </div>
      {/* <div className="paymentMethod__cardNumber">
        <Input placeholder="Card number"></Input>
      </div> */}
      <div className="paymentMethod__promoCode">
        <label htmlFor="">Promo code</label>
        <Input></Input>
        <Button>Apply</Button>
      </div>
      <div className="paymentMethod__summary">
        <PaymentSummary />
      </div>
      <div className="purchase-button">
        {/* <Button>purchase</Button> */}
        <PayPalButton
          amount={30}
          onSuccess={successPaymentHandler}
        ></PayPalButton>
      </div>
    </div>
  );
};
