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
  doFakeLikeUnlikeCourse,
  doFakeLikeUnlikeListCourse,
  doFakeRateCourse,
  doGetOneTutor,
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
  const [preTime, setPreTime] = useState(0);
  const [shown, setShown] = useState(false);
  const [rating, setRating] = useState(0);
  useEffect(() => {
    dispatch(doGetOneCourse({ uid: courseid }));
    dispatch(doGetOneTutor({ uid: state?.tutorid }));
    window.scrollTo({ top: 0, left: 0 });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //handleLike
  const handleLike = (_id: string) => {
    const nowTime = Date.now();
    setPreTime(nowTime);
    if (nowTime - preTime < 250) {
      return;
    }
    batch(() => {
      dispatch(doLikeCourse({ user: userid, cid: _id }));
      dispatch(doFakeLikeUnlikeCourse({ noLike: 1 }));
      dispatch(doFakeLikeUnlikeListCourse({ _id: _id, noLike: 1 }));
    });
  };

  //handle unLike
  const handleUnlike = (_id: string) => {
    const nowTime = Date.now();
    setPreTime(nowTime);
    if (nowTime - preTime < 250) {
      return;
    }
    batch(() => {
      dispatch(doUnlikeCourse({ user: userid, cid: _id }));
      dispatch(doFakeLikeUnlikeCourse({ noLike: 0 }));
      dispatch(doFakeLikeUnlikeListCourse({ _id: _id, noLike: 0 }));
    });
  };
  //get rating
  useEffect(() => {
    setRating(oneCourse.rating!);
  }, [oneCourse]);

  //handle rate
  const handleRate = () => {
    dispatch(doRateCourse({ cid: courseid, rate: rating }));
    dispatch(doFakeRateCourse({ rating: rating }));
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
              noLike={oneCourse.noLike}
              onClick={() => {
                if (oneCourse.noLike === 0) return handleLike(courseid);
                else return handleUnlike(courseid);
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
