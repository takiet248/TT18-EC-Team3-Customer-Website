import React, { useEffect, useState } from "react";
import "./PaymentMethod.scss";
import { Button, Input } from "../../components/common";
import { PayPalButton } from "react-paypal-button-v2";
import { useHistory, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import { doGetOneCourse, doGetOneTutor, doPaySuccess } from "../../redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { doApplyVoucher } from "../../redux/asyncAction/voucher";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { CourseItem, Tutor } from "../../components";

type FormValues = {
  code: string;
};
export const PaymentMethod = () => {
  const { state } = useLocation<any>();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState(0);
  const [promo, setPromo] = useState(0);
  const oneTutor = useSelector((state: RootState) => state.tutorSlice.tutor);
  const oneCourse = useSelector(
    (state: RootState) => state.courseSlice.oneCourse
  );
  const PAYPAL_CLIENT_ID = process.env.REACT_APP_PAYPAL_CLIENT_ID;
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit = (data: any) => {
    dispatch(doApplyVoucher(data))
      .then(unwrapResult)
      .then((res: any) => {
        console.log(res);
        if (res) {
          if (res.message.type === true) {
            setAmount(state?.price - res.message.discount);
            setPromo(res.message.discount);
            setMessage(
              `You got ${res.message.discount}$ discount from the code ${res.message.code}`
            );
          } else if (res.message.type === false) {
            setAmount(
              state?.price - state?.price * res.message.discount * 0.01
            );
            setPromo(state?.price * res.message.discount * 0.01);
            setMessage(
              `You got ${res.message.discount}% discount from the code ${res.message.code}`
            );
          }
        } else {
        }
      });
  };

  useEffect(() => {
    setAmount(state?.price);
  }, [state]);

  useEffect(() => {
    dispatch(doGetOneTutor({ uid: state?.tutorid }));
    dispatch(doGetOneCourse({ uid: state?.courseid }));
    // eslint-disable-next-line
  }, []);

  const successPaymentHandler = (data: any) => {
    dispatch(
      doPaySuccess({
        uid: state?.tutorid,
        cid: state?.courseid,
        total: state?.price,
        email: data.purchase_units[0].payments.captures[0].id,
      })
    )
      .then(unwrapResult)
      .then((res: any) => {
        if (res) {
          history.replace({
            pathname: "/order-info",
            state: {
              price: state?.price,
              promo: promo,
              amount: amount,
              tutorid: state?.tutorid,
              courseid: state?.courseid,
            },
          });
        }
      });
  };

  return (
    <div className="paymentMethod-container">
      <div className="paymentMethod__method">
        <span>Payment Information </span>
      </div>
      <div className="paymentMethod-container__item">
        {state?.tutorid && (
          <Tutor
            name={oneTutor.name}
            address={oneTutor.address!}
            rating={oneTutor.rating}
            avatar={oneTutor.avatar}
            major={oneTutor.major}
            education={oneTutor.education}
            handleLikeUnlike={() => console.log()}
            handleGotoDetail={() => {
              window.open(`/tutor/${oneTutor._id}`);
            }}
          />
        )}
        <CourseItem
          name={oneCourse.name}
          avatar={oneCourse.avatar}
          durations={oneCourse.duration}
          rating={oneCourse.rating}
          subject={oneCourse.subject}
          level={oneCourse.level}
          price={oneCourse.price}
          handleLikeUnlike={() => console.log()}
          onClick={() => {
            window.open(`/course/${oneCourse._id}`);
          }}
        />
      </div>

      <form
        className="paymentMethod__promoCode"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input {...register("code", {})} />
        <Button type="submit">APPLY</Button>
      </form>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <p>{message}</p>
      </div>
      <div className="paymentMethod__summary">
        <div className="payment-summary">
          <h1>Summary</h1>
          <div className="payment-summary__calculation">
            <div className="calculation-priceSession">
              <span>Course Price</span>
              <span className="bold">${state?.price}</span>
            </div>

            <div className="calculation-promo">
              <span>Promo</span>
              <span className="bold">- ${promo}</span>
            </div>

            <div className="calculation-deposit">
              <span className="bold">Full price</span>
              <span className="bold">${amount}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="purchase-button">
        <PayPalButton
          options={{
            clientId: PAYPAL_CLIENT_ID,
            currency: "USD",
          }}
          amount={amount}
          onSuccess={successPaymentHandler}
        />
      </div>
    </div>
  );
};
