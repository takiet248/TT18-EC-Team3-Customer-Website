import React from "react";
import "./PaymentInfo.scss";
import { Button, Input } from "../../components/common";

export const PaymentInfo = () => {
  return (
    <div className="paymentInfo__container">
      <div className="paymentInfo__user">
        <div className="paymentInfo__user-avatar">
          <img src="./images/tutor4.jpg" alt="" />
        </div>
        <div className="paymentInfo__user-name">Anh Kiet Tran</div>
      </div>
      <form className="paymentInfo__form">
        <label htmlFor="">Fullname</label>
        <Input required />
        <label htmlFor="">Address</label>
        <Input required />
        <label htmlFor="">Phone Number</label>
        <Input required />
        <label htmlFor="">Schedule</label>
        <br />
        <select name="" id="">
          <option value="">Thu 2</option>
          <option value="">Thu 2</option>
          <option value="">Thu 2</option>
        </select>{" "}
        <br />
        <label htmlFor="">Number of hours per week</label>
        <br />
        <select name="" id="">
          <option value="">Thu 2</option>
          <option value="">Thu 2</option>
          <option value="">Thu 2</option>
        </select>{" "}
        <br />
        <label htmlFor="">Number of months</label>
        <br />
        <select name="" id="">
          <option value="">Thu 2</option>
          <option value="">Thu 2</option>
          <option value="">Thu 2</option>
        </select>{" "}
        <br />
        <label htmlFor="">Course</label>
        <br />
        <select name="" id="">
          <option value="">Thu 2</option>
          <option value="">Thu 2</option>
          <option value="">Thu 2</option>
        </select>
        <Button width="100%" marginTop={20} type="submit">
          Continue
        </Button>
      </form>
    </div>
  );
};
