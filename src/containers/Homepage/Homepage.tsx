import React from "react";
import { Banner, TutorsList, Introduction } from "../../components";

export const Homepage: React.FC = () => {
  return (
    <div style={{width: '100%'}}>
      <Banner />
      <TutorsList />
      <Introduction />
    </div>
  );
};
