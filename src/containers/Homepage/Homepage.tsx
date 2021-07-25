import React, { useEffect } from "react";
import { Banner, TutorsList, Introduction } from "../../components";
import axios from "axios";

export const Homepage: React.FC = () => {
  // useEffect(() => {
  //   axios
  //     .get("  https://amitu-backend.herokuapp.com/api/tutor/get-all")
  //     .then(function (response) {
  //       console.log(response);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     })
  //     .then(function () {
  //       // always executed
  //     });
  // }, []);
  return (
    <div style={{ width: "100%" }}>
      <Banner />
      <TutorsList />
      <Introduction />
    </div>
  );
};
