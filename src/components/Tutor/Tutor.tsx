import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { FaGraduationCap } from "react-icons/fa";
import { GiBookCover } from "react-icons/gi";
import { ImLocation2 } from "react-icons/im";
import { useHistory } from "react-router";
import { Label } from "../common";
import "./Tutor.scss";

type Props = {
  tutor: ITutor;
};

export const Tutor: React.FC<Props> = ({ tutor }) => {
  const { name, image, location, teachingSubject, teachingLevel, rating } =
    tutor;
  const history = useHistory();
  const [test, setTest] = useState("");
  useEffect(() => {
    setTest(teachingSubject.join());
  }, []);
  return (
    <div
      className="tutor-item"
      onClick={() => {
        history.push({
          pathname: "./tutor-profile",
          state: {
            image: image,
            name: name,
            location: location,
            teachingSubject: teachingSubject,
            teachingLevel: teachingLevel,
            rating: rating,
            workExperience: tutor.workExperience,
            education: tutor.education,
            quote: tutor.quote,
            courses: tutor.courses,
          },
        });
      }}
    >
      <div className="tutor-item__image">
        <img src={image} />
      </div>
      <div className="tutor-item__info">
        <div className="tutor-item__header">
          <p className="tutor-item__name">{name}</p>
          <div className="tutor-item__rating">
            <span>{rating} </span>
            <AiFillStar size={20} color="#EEA320" />
          </div>
        </div>

        <Label
          icon={<ImLocation2 size={16} />}
          title={<p className="tutor-item__title">{location} </p>}
        />
        <Label
          icon={<GiBookCover size={16} />}
          title={
            <span className="tutor-item__title">
              {teachingSubject.map((item: any, index: number) => {
                return <span key={index}> {item} .</span>;
              })}
            </span>
          }
        />

        <Label
          icon={<FaGraduationCap size={16} />}
          title={
            <span className="tutor-item__title">
              {teachingLevel.map((item: any, index: number) => {
                return <span key={index}> {item} .</span>;
              })}
            </span>
          }
        />
      </div>
    </div>
  );
};
