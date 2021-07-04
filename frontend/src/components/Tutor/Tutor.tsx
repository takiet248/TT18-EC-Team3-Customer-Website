import React from "react";
import "./Tutor.scss";

type Props = {
  tutor: ITutor;
};

export const Tutor: React.FC<Props> = ({ tutor }) => {
  const { name, image, location, teachingSubject, teachingLevel, rating } =
    tutor;
  return (
    <div className="tutor-container">
      <div className="tutor-image">
        <img src={image} alt="tutor image" />
      </div>
      <div className="tutor-information">
        <div className="information-left">
          <h3 className="information-left__name">{name}</h3>
          <div className="information-left__location">
            <div className="icon">
              <img src="./images/location_on.png" alt="location icon" />
            </div>
            <p>{location}</p>
          </div>
          <div className="information-left__teachingSubjects">
            <div className="icon">
              <img
                src="./images/collections_bookmark.png"
                alt="subjects icon"
              />
            </div>
            <p>
              <b>{teachingSubject.join()}</b>
            </p>
          </div>
          <div className="information-left__teachingLevel">
            <div className="icon">
              <img src="./images/school.png" alt="level icon" />
            </div>
            <p>
              <b>{teachingLevel.join()}</b>
            </p>
          </div>
        </div>
        <div className="rating">
          <span>{rating}</span>
          <img src="./images/rating.png" alt="rating" />
        </div>
      </div>
    </div>
  );
};
