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
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { doGetOneTutor, doGetTutorCourse, doGetUserInfo } from "../../redux";
import { CourseItem } from "../../components";
import { useHistory } from "react-router-dom";

export const TutorProfile = () => {
  const dispatch = useAppDispatch();
  const [date, setDate] = useState(new Date());
  const [, setDay] = useState(translateDay(new Date()));
  const { uid } = useParams<{ uid: string }>();
  const history = useHistory();
  const oneTutor = useSelector((state: RootState) => state.tutorSlice.tutor);
  const tutorCourse = useSelector(
    (state: RootState) => state.tutorSlice.tutorCourse
  );

  useEffect(() => {
    dispatch(doGetOneTutor({ uid: uid }));
    dispatch(doGetTutorCourse({ uid: uid }));
    dispatch(doGetUserInfo());
    window.scrollTo({ top: 0, left: 0 });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getDate = (date: Date) => {
    setDate(date);
    setDay(translateDay(date));
  };

  //handle move to next month on calendar
  const onChangePreAndNext = (month: any, year: any) => {};

  return (
    <div className="tutor-container">
      <div className="tutor">
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
          {/* <Button width={180} marginLeft={16}>
            BOOK
          </Button> */}
        </div>
        <p>{oneTutor.quote}</p>
        <div className="tutor__selection">
          <div className="tutor__selection-item">
            <AiOutlineCalendar size={20} />
            <p>Schedule</p>
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
        <Label icon={<FaUserTie size={22} />} title={"Personality"} />
        <div className="tutor__description">{oneTutor.personality}</div>
        <Label icon={<FaGraduationCap size={22} />} title={"Education"} />
        <div className="tutor__description">
          {oneTutor?.education?.map((item: any, index: number) => {
            return <div key={index}>{item.item}</div>;
          })}
        </div>
        <Label icon={<MdRecordVoiceOver size={22} />} title={"Accent"} />
        <p className="tutor__description">{oneTutor.accent}</p>
        <Label
          icon={<IoBriefcaseSharp size={20} />}
          title={"Work Experience"}
        />
        <p className="tutor__description">{oneTutor.exp}</p>
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
                    durations={item.duration}
                    rating={item.rating}
                    subject={item.subject}
                    level={item.level}
                    price={item.price}
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
