import React, { useEffect, useState } from "react";
import "./CourseProfile.scss";

import { useAppDispatch } from "../../redux/store";
import { CourseItem, ModalVoting } from "../../components";
import { Avatar, HeartIcon, Label } from "../../components/common";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { batch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { doGetOneCourse } from "../../redux/asyncAction/course";
import {
  doFakeLikeCourse,
  doFakeRateCourse,
  doFakeUnlikeCourse,
  doGetOneTutor,
  doGetRecommendedCourse,
  doGetUserInfo,
  doLikeCourse,
  doRateCourse,
  doUnlikeCourse,
} from "../../redux";
import { IoSchoolOutline } from "react-icons/io5";
import { GiSandsOfTime } from "react-icons/gi";
import {
  AiOutlineBook,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { EUser } from "../../constants";
import { unwrapResult } from "@reduxjs/toolkit";
import { ScrollHorizontal } from "../../components/common/ScrollHorizontal/ScrollHorizontal";
import { isAuth } from "../../helpers";

export const CourseProfile = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { courseid } = useParams<{ courseid: string }>();
  const { state } = useLocation<any>();
  const userid = localStorage.getItem(EUser.userid);
  const oneTutor = useSelector((state: RootState) => state.tutorSlice.tutor);
  const oneCourse = useSelector(
    (state: RootState) => state.courseSlice.oneCourse
  );
  const recommendedCourse = useSelector(
    (state: RootState) => state.courseSlice.recommendedCourse
  );
  const [preTime, setPreTime] = useState(0);
  const [shown, setShown] = useState(false);
  const [rating, setRating] = useState(0);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  //init
  useEffect(() => {
    dispatch(doGetOneCourse({ uid: courseid }));
    dispatch(doGetOneTutor({ uid: state?.tutorid }));
    dispatch(doGetUserInfo());
    dispatch(doGetRecommendedCourse({}));
    window.scrollTo({ top: 0, left: 0 });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //handleLike
  const handleLikeCourse = (_id: string) => {
    const nowTime = Date.now();
    setPreTime(nowTime);
    if (nowTime - preTime < 250) {
      return;
    }
    batch(() => {
      dispatch(doLikeCourse({ user: userid, cid: _id }));
      dispatch(doFakeLikeCourse({ _id: _id }));
    });
  };

  // is liked Course
  const isFromListLikedCourse = (_id?: string) => {
    if (userInfo.like_course?.some((e) => e.cid === _id)) {
      return true;
    } else return false;
  };

  //handle unLike
  const handleUnlikeCourse = (_id: string) => {
    const nowTime = Date.now();
    setPreTime(nowTime);
    if (nowTime - preTime < 250) {
      return;
    }
    batch(() => {
      dispatch(doUnlikeCourse({ user: userid, cid: _id }));
      dispatch(doFakeUnlikeCourse({ _id: _id }));
    });
  };
  //get rating
  useEffect(() => {
    setRating(oneCourse.rating!);
  }, [oneCourse]);

  //handle rate
  const handleRate = () => {
    dispatch(doRateCourse({ cid: courseid, rate: rating }))
      .then(unwrapResult)
      .then((res: any) => {
        if (res) dispatch(doFakeRateCourse({ rating: res.rating }));
      });

    setShown(false);
  };

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
              handleLikeUnlike={() => console.log()}
            />
          </div>
          <div className="course__right">
            <p style={{ marginBottom: 16 }}></p>
            {state?.tutorid && (
              <p style={{ fontSize: 24, fontWeight: "bold", marginBottom: 8 }}>
                Tutor
              </p>
            )}

            {state?.tutorid && (
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
            )}

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
                <span style={{ fontSize: 18 }}>
                  Subject:{" "}
                  {oneCourse.subject?.map((item: any, index: number) => {
                    return (
                      <span className="course__subject" key={index}>
                        {item.item} .{" "}
                      </span>
                    );
                  })}
                </span>
              }
              marginBottom={16}
              marginTop={16}
            />
          </div>
        </div>
        {/* select */}
        <div className="tutor__selection">
          <div
            className="tutor__selection-item"
            onClick={() =>
              history.push({
                pathname: "/payment-method",
                state: {
                  tutorid: state?.tutorid,
                  courseid: oneCourse._id,
                  price: oneCourse.price,
                },
              })
            }
          >
            <AiOutlineShoppingCart size={20} />
            <p>BOOK</p>
          </div>
          <div className="tutor__selection-item">
            <HeartIcon
              noLike={isFromListLikedCourse(oneCourse._id) ? 1 : 0}
              onClick={() => {
                if (isFromListLikedCourse(oneCourse._id) === false)
                  return handleLikeCourse(oneCourse._id!);
                else return handleUnlikeCourse(oneCourse._id!);
              }}
            />
            <p>Like</p>
          </div>
          <div className="tutor__selection-item" onClick={() => setShown(true)}>
            <AiOutlineStar size={20} />
            <p>Vote</p>
          </div>
        </div>
        {/* syllabus */}
        {oneCourse.syllabus === [] && (
          <div className="course__syllabus">
            <Label title="Syllabus" marginBottom={16} />
            {oneCourse.syllabus?.map((item: any, index: any) => {
              return (
                <div className="course__syllabus-item" key={index}>
                  {index + 1}
                  <p>{item.item}</p>
                </div>
              );
            })}
          </div>
        )}

        {isAuth() === false ? (
          <>
            <div className="home__recommendation">
              <Label title="These courses may suit you" marginTop={16} />
              <ScrollHorizontal
                paddingLeft={8}
                marginBottom={16}
                marginTop={16}
                paddingBottom={8}
              >
                {recommendedCourse.map((item: any, index: number) => {
                  return (
                    <CourseItem
                      key={index}
                      name={item.name}
                      avatar={item.avatar}
                      durations={item.duration}
                      rating={item.rating}
                      subject={item.subject}
                      level={item.level}
                      price={item.price}
                      noLike={isFromListLikedCourse(item._id) ? 1 : 0}
                      handleLikeUnlike={() => {
                        if (isFromListLikedCourse(item._id) === false)
                          return handleLikeCourse(item._id);
                        else return handleUnlikeCourse(item._id);
                      }}
                      onClick={() => {
                        window.open(`/course/${item._id}`);
                      }}
                    />
                  );
                })}
              </ScrollHorizontal>
            </div>
          </>
        ) : (
          <></>
        )}

        <ModalVoting
          isShow={shown}
          onClick={handleRate}
          name={oneTutor.name}
          rating={rating}
          setRating={(rate: number) => {
            setRating(rate);
          }}
        />
      </div>
    </div>
  );
};
