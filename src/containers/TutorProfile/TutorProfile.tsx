import React, { useEffect, useState } from "react";
import { Avatar, Calendar, HeartIcon, Label } from "../../components/common";
import "./TutorProfile.scss";
import { IoLocationOutline, IoBriefcaseSharp } from "react-icons/io5";
import {
  AiFillSafetyCertificate,
  AiFillStar,
  AiOutlineCalendar,
  AiOutlineStar,
} from "react-icons/ai";
import {
  FaGraduationCap,
  FaChalkboardTeacher,
  FaUserTie,
} from "react-icons/fa";
import { MdRecordVoiceOver } from "react-icons/md";
import { isAuth, translateDay } from "../../helpers";
import { useParams } from "react-router";
import { ScrollHorizontal } from "../../components/common/ScrollHorizontal/ScrollHorizontal";
import { useAppDispatch } from "../../redux/store";
import { batch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import {
  doFakeLikeCourse,
  doFakeLikeTutor,
  doFakeRateTutor,
  doFakeUnlikeCourse,
  doFakeUnlikeTutor,
  doGetOneTutor,
  doGetRecommendedTutor,
  doGetTutorCourse,
  doGetUserInfo,
  doLikeCourse,
  doLikeTutor,
  doRateTutor,
  doUnlikeCourse,
  doUnlikeTutor,
} from "../../redux";
import { CourseItem, ModalVoting, Tutor } from "../../components";
import { useHistory } from "react-router-dom";
import { EUser } from "../../constants";
import { unwrapResult } from "@reduxjs/toolkit";

export const TutorProfile = () => {
  const dispatch = useAppDispatch();
  const [date, setDate] = useState(new Date());
  const [, setDay] = useState(translateDay(new Date()));
  const { uid } = useParams<{ uid: string }>();
  const userid = localStorage.getItem(EUser.userid);
  const history = useHistory();
  const oneTutor = useSelector((state: RootState) => state.tutorSlice.tutor);
  const [preTime, setPreTime] = useState(0);
  const tutorCourse = useSelector(
    (state: RootState) => state.courseSlice.tutorCourse
  );
  const recommendedTutor = useSelector(
    (state: RootState) => state.tutorSlice.recommendedTutor
  );
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [shown, setShown] = useState(false);
  const [rating, setRating] = useState(0);

  //init
  useEffect(() => {
    dispatch(doGetOneTutor({ uid: uid }));
    dispatch(doGetTutorCourse({ uid: uid }));
    dispatch(doGetUserInfo());
    dispatch(doGetRecommendedTutor({}));
    window.scrollTo({ top: 0, left: 0 });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //get rating
  useEffect(() => {
    setRating(oneTutor.rating!);
  }, [oneTutor]);

  //get Date
  const getDate = (date: Date) => {
    setDate(date);
    setDay(translateDay(date));
  };

  //handle move to next month on calendar
  const onChangePreAndNext = (month: any, year: any) => {};

  //handleLike
  const handleLikeTutor = (_id: string) => {
    const nowTime = Date.now();
    setPreTime(nowTime);
    if (nowTime - preTime < 250) {
      return;
    }
    batch(() => {
      dispatch(doLikeTutor({ user: userid, tid: _id }));
      dispatch(doFakeLikeTutor({ _id: _id }));
    });
  };

  //handle unLike
  const handleUnlikeTutor = (_id: string) => {
    const nowTime = Date.now();
    setPreTime(nowTime);
    if (nowTime - preTime < 250) {
      return;
    }
    batch(() => {
      dispatch(doUnlikeTutor({ user: userid, tid: _id }));
      dispatch(doFakeUnlikeTutor({ _id: _id }));
    });
  };

  //handleLike course
  const handleLikeCourse = (_id?: string) => {
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
  //handleLike course
  const handleUnlikeCourse = (_id?: string) => {
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

  //handle rate
  const handleRate = () => {
    dispatch(doRateTutor({ tid: uid, rate: rating }))
      .then(unwrapResult)
      .then((res: any) => {
        if (res) dispatch(doFakeRateTutor({ rating: res.rating }));
      });
    setShown(false);
  };

  // is liked tutor
  const isFromListLikedTutor = (_id?: string) => {
    if (userInfo.like_tutor?.some((e) => e.tid === _id)) {
      return true;
    } else return false;
  };

  // is liked Course
  const isFromListLikedCourse = (_id?: string) => {
    if (userInfo.like_course?.some((e) => e.cid === _id)) {
      return true;
    } else return false;
  };
  return (
    <div className="tutor-container">
      <div className="tutor">
        {/* header */}
        <div className="tutor__header">
          <div className="tutor__info">
            <Avatar
              image={
                oneTutor.avatar ||
                "https://p.bigstockphoto.com/vVu7XprxSayr867oA3KQ_bigstock-Colorful-fruit-pattern-of-fres-282127069.jpg"
              }
              height={80}
              width={80}
            />
            <div className="tutor__first">
              <div className="tutor__name">
                <p>{oneTutor.name}</p>
                <span>{oneTutor.rating} </span>
                <AiFillStar size={20} color="#EEA320" />
              </div>
              <span className="tutor__location">
                <IoLocationOutline size={20} />
                <a
                  href={`http://maps.google.com/?q=${oneTutor.address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {oneTutor.address}
                </a>
              </span>
            </div>
          </div>
        </div>
        {/* quote */}
        <p style={{ whiteSpace: "pre-wrap" }}>{oneTutor.quote}</p>
        {/* selection bar */}
        <div className="tutor__selection">
          <div className="tutor__selection-item">
            <AiOutlineCalendar size={20} />
            <p>Schedule</p>
          </div>
          <div className="tutor__selection-item">
            <HeartIcon
              noLike={isFromListLikedTutor(oneTutor._id) ? 1 : 0}
              onClick={() => {
                if (isFromListLikedTutor(oneTutor._id) === false)
                  return handleLikeTutor(oneTutor._id!);
                else return handleUnlikeTutor(oneTutor._id!);
              }}
            />
            <p>Like</p>
          </div>
          <div className="tutor__selection-item" onClick={() => setShown(true)}>
            <AiOutlineStar size={20} />
            <p>Vote</p>
          </div>
        </div>
        {/* personality */}
        <Label icon={<FaUserTie size={22} />} title={"Personality"} />
        <div className="tutor__description">{oneTutor.personality}</div>
        {/* education */}
        <Label icon={<FaGraduationCap size={22} />} title={"Education"} />
        <div className="tutor__description">
          {oneTutor?.education?.map((item: any, index: number) => {
            return <div key={index}>{item.item}</div>;
          })}
        </div>
        {/* accent */}
        <Label icon={<MdRecordVoiceOver size={22} />} title={"Accent"} />
        <p className="tutor__description">{oneTutor.accent}</p>
        {/* experience */}
        <Label
          icon={<IoBriefcaseSharp size={20} />}
          title={"Work Experience"}
        />
        <p className="tutor__description">{oneTutor.exp}</p>
        {/* major */}
        <Label icon={<FaChalkboardTeacher size={20} />} title={"Major"} />
        <div className="tutor__teaching-level">
          {oneTutor.major?.map((item: any, index: number) => {
            return (
              <div className="tutor__level-item" key={index}>
                {item.item}
              </div>
            );
          })}
        </div>
        {/* degree */}
        <Label icon={<AiFillSafetyCertificate size={20} />} title={"Degree"} />
        <div className="tutor__teaching-level">
          {oneTutor.degree?.map((item: any, index: number) => {
            return (
              <div className="tutor__level-item" key={index}>
                {item.item}
              </div>
            );
          })}
        </div>
        {/* tutor list */}
        <div className="tutor__courses-list">
          <p style={{ fontWeight: "bold", fontSize: 18, marginBottom: 8 }}>
            {oneTutor.name} teaches these courses
          </p>
          <ScrollHorizontal
            paddingLeft={8}
            marginBottom={16}
            marginTop={16}
            paddingBottom={8}
          >
            {tutorCourse &&
              tutorCourse.map((item: any, index: number) => {
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
                      history.push({
                        pathname: `/course/${item._id}`,
                        state: { tutorid: uid },
                      });
                    }}
                  />
                );
              })}
          </ScrollHorizontal>
        </div>

        {isAuth() === false ? (
          <>
            <div className="home__recommendation">
              <Label
                title="These tutor may suit you"
                marginTop={16}
              />
              <ScrollHorizontal
                marginBottom={16}
                marginTop={16}
                paddingBottom={8}
              >
                {recommendedTutor.map((item: any, index: number) => {
                  return (
                    <Tutor
                      key={index}
                      name={item.name}
                      address={item.address}
                      rating={item.rating}
                      avatar={item.avatar}
                      major={item.major}
                      education={item.education}
                      noLike={isFromListLikedTutor(item._id) ? 1 : 0}
                      handleLikeUnlike={() => {
                        if (isFromListLikedTutor(item._id) === false)
                          return handleLikeTutor(item._id);
                        else return handleUnlikeTutor(item._id);
                      }}
                      handleGotoDetail={() => {
                        window.open(`/tutor/${item._id}`);
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

        {/* calendar */}
        <div className="tutor__calendar">
          <Calendar
            onSelect={(v) => getDate(v)}
            value={date}
            onChangePreAndNext={onChangePreAndNext}
          />
        </div>
      </div>
    </div>
  );
};
