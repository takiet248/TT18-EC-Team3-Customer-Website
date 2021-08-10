import React from "react";
import { PaymentSummary } from "../../components";
import { Button } from "../../components/common";
import "./OrderInfo.scss";

export const OrderInfo = () => {
  return (
    <div className="order-info">
      <div className="order-info__details">
        <div className="details-tutor">
          <h6>Fullname</h6>
          <p>Phu Thinh Pham Hoai</p>
          <h6>Address</h6>
          <p>227, Nguyen Van Cu, P4, Q5, Ho Chi Minh City</p>
          <h6>Phone number</h6>
          <p>0123456789</p>
        </div>
        <div className="details-student">
          <div className="student-name">
            <img src="./images/tutor3.jpg" alt="student" />
            <span>Anh Kiet Tran</span>
          </div>
          <div className="student-schedule">
            <h6>Schedule</h6>
            <p className="schedule-item">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consectetur
            </p>
            <p className="schedule-item">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consectetur
            </p>
          </div>
          <div className="student-hours">
            <h6>Number of hours per week</h6>
            <span>10</span>
          </div>
          <div className="student-months">
            <h6>Number months</h6>
            <span>10</span>
          </div>
          <div className="student-courses">
            <h6>Course</h6>
            <p className="courses-item">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consectetur
            </p>
            <p className="courses-item">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consectetur
            </p>
          </div>
        </div>
      </div>
      <div className="order-info__summary">
        <PaymentSummary />
        <div className="back-to-home-button">
          <Button>Back to Homepage</Button>
        </div>
      </div>
    </div>
  );
};
