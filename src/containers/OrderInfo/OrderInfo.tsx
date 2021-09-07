import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { CourseItem, PaymentSummary, Tutor } from "../../components";
import { Button } from "../../components/common";
import { doGetOneCourse, doGetOneTutor } from "../../redux";
import { RootState } from "../../redux/rootReducer";
import { useAppDispatch } from "../../redux/store";
import "./OrderInfo.scss";

export const OrderInfo = () => {
  const dispatch = useAppDispatch();

  const history = useHistory();
  const { state } = useLocation<any>();
  const oneTutor = useSelector((state: RootState) => state.tutorSlice.tutor);
  const oneCourse = useSelector(
    (state: RootState) => state.courseSlice.oneCourse
  );
  useEffect(() => {
    dispatch(doGetOneTutor({ uid: state?.tutorid }));
    dispatch(doGetOneCourse({ uid: state?.courseid }));
    // eslint-disable-next-line
  }, []);
  return (
    <div className="order-info">
      <div className="order-info__summary">
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
        <div className="order-info__details">
          <p
            style={{
              fontSize: 18,
              color: "green",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            Your payment was successful
          </p>
        </div>
        <PaymentSummary
          promo={state?.promo}
          total={state?.amount}
          fullprice={state?.price}
        />
        <div className="order-info__button">
          <Button onClick={() => history.push("/")} width={200}>
            Back to Homepage
          </Button>
        </div>
      </div>
    </div>
  );
};
