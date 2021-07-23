import React from "react";
import "./Banner.scss";
import { Button } from "../common";
import { useHistory } from "react-router";

export const Banner: React.FC = () => {
  const history = useHistory();
  return (
    <div className="banner-container">
      <div className="banner-overlay"></div>
      <div className="banner-content">
        <h1>Solving problems is easier than ever!</h1>
        <p>Learning subjects you need with top tutors on our platform.</p>
        <div className="banner-button">
          <Button width={150} height={45} fontSize={16} onClick={()=>history.push('/sign-up')}>
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};
