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
import { translateDay } from "../../helpers";
import { useParams } from "react-router";
import { ScrollHorizontal } from "../../components/common/ScrollHorizontal/ScrollHorizontal";
import { useAppDispatch } from "../../redux/store";
import { batch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import {
  doFakeLikeUnlikeListCourse,
  doFakeLikeUnlikeListTutor,
  doFakeLikeUnlikeTutor,
  doFakeRateTutor,
  doGetOneTutor,
  doGetTutorCourse,
  doLikeCourse,
  doLikeTutor,
  doRateTutor,
  doUnlikeCourse,
  doUnlikeTutor,
} from "../../redux";
import { CourseItem, ModalVoting } from "../../components";
import { useHistory } from "react-router-dom";
import { EUser } from "../../constants";

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
  const [shown, setShown] = useState(false);
  const [rating, setRating] = useState(0);

  //init
  useEffect(() => {
    dispatch(doGetOneTutor({ uid: uid }));
    dispatch(doGetTutorCourse({ uid: uid }));
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
  const handleLike = (_id: string) => {
    const nowTime = Date.now();
    setPreTime(nowTime);
    if (nowTime - preTime < 250) {
      return;
    }
    batch(() => {
      dispatch(doLikeTutor({ user: userid, tid: _id }));
      dispatch(doFakeLikeUnlikeTutor({ noLike: 1 }));
      dispatch(doFakeLikeUnlikeListTutor({ _id: _id, noLike: 1 }));
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
      dispatch(doUnlikeTutor({ user: userid, tid: _id }));
      dispatch(doFakeLikeUnlikeTutor({ noLike: 0 }));
      dispatch(doFakeLikeUnlikeListTutor({ _id: _id, noLike: 0 }));
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
      dispatch(doFakeLikeUnlikeListCourse({ _id: _id, noLike: 1 }));
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
      dispatch(doFakeLikeUnlikeListCourse({ _id: _id, noLike: 0 }));
    });
  };

  //handle rate
  const handleRate = () => {
    dispatch(doRateTutor({ tid: uid, rate: rating }));
    dispatch(doFakeRateTutor({ rating: rating }));
    setShown(false);
  };

  return (
    <div className="tutor-container">
      <div className="tutor">
        {/* header */}
        <div className="tutor__header">
          <div className="tutor__info">
            <Avatar image={oneTutor.avatar} height={80} width={80} />
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
              noLike={oneTutor.noLike}
              onClick={() => {
                if (oneTutor.noLike === 0) return handleLike(uid);
                else return handleUnlike(uid);
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
                    noLike={item.noLike}
                    handleLikeUnlike={() => {
                      if (item.noLike === 0) return handleLikeCourse(item._id);
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
