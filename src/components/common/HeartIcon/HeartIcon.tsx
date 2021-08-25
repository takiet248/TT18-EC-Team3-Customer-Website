import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import "./HeartIcon.scss";

export const HeartIcon: React.FC<IHeartIcon> = ({
  isLiked,
  position,
  top,
  left,
  right,
  bottom,
  onClick,
  className,
}) => {
  return (
    <div
      className={`header-icon ${className}`}
      style={{ position, top, left, right, bottom }}
      onClick={onClick}
    >
      {isLiked === 0 && <AiOutlineHeart size={22} color="#228891" />}
      {isLiked === 1 && <AiFillHeart size={22} color="#fb3f4a" />}
    </div>
  );
};
