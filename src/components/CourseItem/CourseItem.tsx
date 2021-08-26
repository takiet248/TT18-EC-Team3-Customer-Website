import React from "react";
import { AiFillStar, AiOutlineBook } from "react-icons/ai";
import { GiSandsOfTime } from "react-icons/gi";
import { IoSchoolOutline } from "react-icons/io5";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { HeartIcon, Label } from "../common";
import "./CourseItem.scss";
export const CourseItem: React.FC<ICourseItem> = ({
  id,
  name,
  durations,
  level,
  subject,
  rating,
  onClick,
  price,
  decription,
  avatar,
  noLike,
  handleLikeUnlike,
}) => {
  return (
    <div className="course-item" key={id} onClick={onClick}>
      <div className="course-item__image">
        <img
          src={
            avatar
              ? avatar
              : "https://hacentre.edu.vn/wp-content/uploads/2020/10/tu-vung-ielts-speaking-chu-de-study-work-19.jpg"
          }
          alt=""
        ></img>
        <div className="course-item__action">
          <HeartIcon
            noLike={noLike}
            onClick={(e) => {
              e.stopPropagation();
              return handleLikeUnlike();
            }}
          />
        </div>
      </div>
      <div className="course-item__info">
        <div className="course-item__header">
          <p className="course-item__name">{name}</p>
          <div className="course-item__rating">
            <span>{rating} </span>
            <AiFillStar size={20} color="#EEA320" />
          </div>
        </div>
        <div className="course-item__label">
          <Label
            icon={<GiSandsOfTime size={18} />}
            title={<p className="course-item__title">Duration: {durations}</p>}
          />
          <Label
            icon={<IoSchoolOutline size={16} />}
            title={<p className="course-item__title">Level: {level}</p>}
          />
          <Label
            icon={<AiOutlineBook size={16} />}
            title={
              <span className="course-item__title">
                {subject?.map((item: any, index: number) => {
                  return <span key={index}> Subject: {item.item} .</span>;
                })}
              </span>
            }
          />
          <Label
            icon={<RiMoneyDollarBoxLine size={16} />}
            title={<p className="course-item__title">Price: {price}</p>}
          />
        </div>
        {decription && <p className="course-item__description">{decription}</p>}
      </div>
    </div>
  );
};
