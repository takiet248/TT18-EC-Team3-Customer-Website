import React, { useState } from "react";
import { Avatar, Button, Calendar, Label } from "../../components/common";
import "./TutorProfile.scss";
import { IoLocationOutline, IoBriefcaseSharp } from "react-icons/io5";
import {
  AiFillStar,
  AiOutlineCalendar,
  AiOutlineHeart,
  AiOutlineWarning,
} from "react-icons/ai";
import { FaGraduationCap, FaChalkboardTeacher } from "react-icons/fa";

import { translateDay } from "../../helpers";

export const TutorProfile = () => {
  const [date, setDate] = useState(new Date());
  const [day, setDay] = useState(translateDay(new Date()));

  const getDate = (date: Date) => {
    setDate(date);
    setDay(translateDay(date));
  };

  //handle move to next month on calendar
  const onChangePreAndNext = (month: any, year: any) => {};

  return (
    <div className="container">
      <div className="tutor">
        <div className="tutor__header">
          <div className="tutor__info">
            <Avatar
              image="http://www.inthemoodformovies.com/wp-content/uploads/2015/04/ff20131122a3a.jpg"
              height={80}
              width={80}
            />
            <div className="tutor__first">
              <div className="tutor__name">
                <p>Anh Kiet Tran</p>
                <span>4.5 </span>
                <AiFillStar size={20} color="#EEA320" />
              </div>
              <span className="tutor__location">
                <IoLocationOutline size={20} />
                <a href={`http://maps.google.com/?q=`} target="_blank">
                  Da Lat, Lam Dong
                </a>
              </span>
            </div>
          </div>
          <Button width={180}>BOOK</Button>
        </div>
        <iframe
          width="100%"
          height="500"
          src="https://www.youtube.com/embed/3YLg9VuCTlU"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <p style={{ fontWeight: "bold", fontSize: 24, marginBottom: 8 }}>
          Anh Kiet Tran
        </p>
        <p>
          The first thing anyone will tell you about Isao Takahata’s The Tale of
          the Princess Kaguya is how sublimely beautiful it is. Alas, the
          particular Japanese flavor of Princess Kaguya’s artistry tends to
          table deeper discussion about its meaning. Digging through old reviews
          of the film in the English press, you’ll encounter the obligatory
          sentence or two acknowledging the film’s unique aesthetic sensibility.
          Princess Kaguya, we’re told, is “a watercolor sketchbook come to
          life;” it’s “exquisitely drawn with both watercolor delicacy and a
          brisk sense of line;” it “boasts a sketchier, more impressionistic
          palette” than other Studio Ghibli films; the “endless visual beauty
          that seems to partake in a kind of pictorial minimalism,” renders it
          “a true work of art.” What all this lavish praise doesn’t explain is
          why, precisely, the hand-drawn aesthetic matters for the particular
          story being told.
        </p>
        <div className="tutor__selection">
          <div className="tutor__selection-item">
            <AiOutlineCalendar size={20} />
            <p>Schedule</p>
          </div>
          <div className="tutor__selection-item">
            <AiOutlineHeart size={20} />
            <p>Like</p>
          </div>
          <div className="tutor__selection-item">
            <AiOutlineWarning size={20} />
            <p>Report</p>
          </div>
        </div>
        <Label icon={<FaGraduationCap size={22} />} title={"Education"} />
        <p className="tutor__description">
          NSC Business Matric
          <br />
          National Senior Certificate
        </p>
        <Label
          icon={<IoBriefcaseSharp size={20} />}
          title={"Work Experience"}
        />
        <p className="tutor__description">
          IQBar Online ESL Teacher 2018 to current <br />
          Prepare lessons and activities tailored to students needs Assist
          students with Exam
          <br />
          Preparation Use of online platform Focus on areas of improvement for
          each individual Teaching students from basic to advanced levels
        </p>
        <Label
          icon={<FaChalkboardTeacher size={20} />}
          title={"Teaching level"}
        />
        <div className="tutor__teaching-level">
          <div className="tutor__level-item">High School</div>
          <div className="tutor__level-item">Primary School</div>
          <div className="tutor__level-item">Secondary School</div>
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
