import React, { useEffect } from "react";
import "./CourseProfile.scss";

import { useAppDispatch } from "../../redux/store";
import { CourseItem } from "../../components";
import { Avatar, HeartIcon, Label } from "../../components/common";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { doGetOneCourse } from "../../redux/asyncAction/course";
import { doGetOneTutor } from "../../redux";
import { IoSchoolOutline } from "react-icons/io5";
import { GiSandsOfTime } from "react-icons/gi";
import {
  AiOutlineBook,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { RiMoneyDollarBoxLine } from "react-icons/ri";

export const CourseProfile = () => {
  const dispatch = useAppDispatch();
  const { courseid } = useParams<{ courseid: string }>();
  const { state } = useLocation<any>();
  const oneTutor = useSelector((state: RootState) => state.tutorSlice.tutor);
  const oneCourse = useSelector(
    (state: RootState) => state.courseSlice.oneCourse
  );
  useEffect(() => {
    dispatch(doGetOneCourse({ uid: courseid }));
    dispatch(doGetOneTutor({ uid: state?.tutorid }));
    console.log(courseid);

    window.scrollTo({ top: 0, left: 0 });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="course-container">
      <div className="course">
        <div className="course__intro">
          <div className="course__left">
            <CourseItem
              avatar={oneCourse?.avatar}
              name={oneCourse?.name}
              rating={oneCourse?.rating}
              decription={oneCourse?.overview}
            />
          </div>
          <div className="course__right">
            <p style={{ marginBottom: 16 }}></p>
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

            <Label
              icon={<RiMoneyDollarBoxLine size={20} />}
              title={`Price: ${oneCourse.price}`}
              marginBottom={16}
              marginTop={16}
            />
            <Label
              icon={<GiSandsOfTime size={20} />}
              title={`Duration: ${oneCourse.duration}`}
              marginBottom={16}
              marginTop={16}
            />
            <Label
              icon={<IoSchoolOutline size={20} />}
              title={`Level: ${oneCourse.level}`}
              marginBottom={16}
              marginTop={16}
            />
            <Label
              icon={<AiOutlineBook size={20} />}
              title={
                <div>
                  {oneCourse.subject?.map((item: any, index: number) => {
                    return (
                      <span className="course__subject" key={index}>
                        Subject: {item.item} .
                      </span>
                    );
                  })}
                </div>
              }
              marginBottom={16}
              marginTop={16}
            />
          </div>
        </div>
        {/* select */}
        <div className="tutor__selection">
          <div className="tutor__selection-item">
            <AiOutlineShoppingCart size={20} />
            <p>BOOK</p>
          </div>
          <div className="tutor__selection-item">
            <HeartIcon isLiked={oneTutor.noLike} />
            <p>Like</p>
          </div>
          <div className="tutor__selection-item">
            <AiOutlineStar size={20} />
            <p>Vote</p>
          </div>
        </div>
        {/* syllabus */}
        <div>
          {oneCourse.syllabus?.map((item: any, index: any) => {
            return (
              <div className="course__syllabus-item" key={index}>
                <p>{item.item}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
