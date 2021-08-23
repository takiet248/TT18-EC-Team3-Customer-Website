import React, { useEffect } from "react";
import "./CourseProfile.scss";

import { useAppDispatch } from "../../redux/store";
import { CourseItem } from "../../components";
import { Avatar, Button } from "../../components/common";
import { FaMoneyBillWave } from "react-icons/fa";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { doGetOneCourse } from "../../redux/asyncAction/course";
import { doGetOneTutor } from "../../redux";

export const CourseProfile = () => {
  const dispatch = useAppDispatch();
  const { courseid, uid } = useParams<{ courseid: string; uid: string }>();
  const history = useHistory();
  const oneTutor = useSelector((state: RootState) => state.tutorSlice.tutor);
  const oneCourse = useSelector(
    (state: RootState) => state.courseSlice.oneCourse
  );
  useEffect(() => {
    dispatch(doGetOneCourse({ uid: courseid }));
    dispatch(doGetOneTutor({ uid: uid }));
    window.scrollTo({ top: 0, left: 0 });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="course-container">
      <div className="course">
        <div className="course__intro">
          <div className="course__left">
            <CourseItem name={oneCourse?.name} rating={oneCourse?.rating} />
          </div>
          <div className="course__right">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 16,
                width: "100%",
              }}
            >
              <Button
                width={180}
                marginLeft={16}
                onClick={() => {
                  history.push("/payment-method");
                }}
              >
                BOOK
              </Button>
            </div>

            <p style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
              Overview
            </p>
            <p style={{ marginBottom: 16 }}>
              It can be intimidating to speak with a foreigner, no matter how
              much grammar and vocabulary you've mastered. If you have basic
              knowledge of English but have not spent much time speaking, this
              course will help you ease into your first English conversations.
            </p>
            <p style={{ fontSize: 24, fontWeight: "bold", marginBottom: 8 }}>
              Tutor
            </p>
            <div className="course__info">
              <Avatar
                image={
                  oneTutor.avatar ||
                  "https://images.unsplash.com/photo-1606498236504-030a628c0047?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZWRpdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
                }
                height={60}
                width={60}
              />
              <div className="course__first">
                <div className="course__name">
                  <p>{oneTutor.name}</p>
                </div>
              </div>
            </div>

            <p
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 8,
                marginTop: 16,
              }}
            >
              Duration
            </p>
            <p style={{ marginBottom: 16, fontSize: 16 }}>
              {oneCourse.duration}
            </p>
            <p
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 8,
                marginTop: 16,
              }}
            >
              Cost
            </p>
            <span style={{ marginBottom: 16, fontSize: 16 }}>
              30 <FaMoneyBillWave />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
