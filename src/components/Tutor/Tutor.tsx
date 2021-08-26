import React from "react";
import { AiFillStar } from "react-icons/ai";
import { FaGraduationCap } from "react-icons/fa";
import { GiBookCover } from "react-icons/gi";
import { ImLocation2 } from "react-icons/im";
import { HeartIcon, Label } from "../common";
import "./Tutor.scss";

export const Tutor: React.FC<ITutor> = ({
  _id,
  name,
  avatar,
  address,
  major,
  rating,
  education,
  noLike,
  handleLikeUnlike,
  handleGotoDetail,
}) => {
  console.log(noLike);

  return (
    <div className="tutor-item" onClick={handleGotoDetail}>
      <div className="tutor-item__image">
        <img
          src={
            avatar ||
            "https://p.bigstockphoto.com/vVu7XprxSayr867oA3KQ_bigstock-Colorful-fruit-pattern-of-fres-282127069.jpg"
          }
          alt=""
        />
        <div className="tutor-item__action">
          <HeartIcon
            noLike={noLike}
            onClick={(e) => {
              e.stopPropagation();
              return handleLikeUnlike();
            }}
          />
        </div>
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
          title={<p className="tutor-item__title">{address}</p>}
        />
        <Label
          icon={<GiBookCover size={16} />}
          title={
            <span className="tutor-item__title">
              {major?.map((item: any, index: number) => {
                return <span key={index}> {item.item} .</span>;
              })}
            </span>
          }
        />
        <Label
          icon={<FaGraduationCap size={16} />}
          title={
            <span className="tutor-item__title">
              {education?.map((item: any, index: number) => {
                return <span key={index}> {item.item} .</span>;
              })}
            </span>
          }
        />
      </div>
    </div>
  );
};
