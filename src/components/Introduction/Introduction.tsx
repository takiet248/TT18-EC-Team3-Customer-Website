import React from "react";
import "./Introduction.scss";

export const Introduction = () => {
  return (
    <div className="introduction">
      <div className="introduction-users">
        <img src="./images/user-icon.svg" alt="users icon" className="icon" />
        <div className="introduction-users__info">
          <span>500+</span> users
        </div>
      </div>
      <div className="introduction-slogan">
        <img src="./images/laptop.svg" alt="slogan icon" className="icon" />
        <div className="introduction-slogan__info">
          Easy <span>booking</span>, easy <span>learning</span>
        </div>
      </div>
      <div className="introduction-tutors">
        <img src="./images/tutor.svg" alt="tutors icon" className="icon" />
        <div className="introduction-tutors__info">
          <span>100+</span> tutors
        </div>
      </div>
    </div>
  );
};
