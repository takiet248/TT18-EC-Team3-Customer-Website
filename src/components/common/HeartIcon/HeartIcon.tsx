import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import "./HeartIcon.scss";

export const HeartIcon: React.FC<IHeartIcon> = ({
  noLike,
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
      {noLike === 1 ? (
        <AiFillHeart size={22} color="#fb3f4a" />
      ) : (
        <AiOutlineHeart size={22} color="#228891" />
      )}
    </div>
  );
};
