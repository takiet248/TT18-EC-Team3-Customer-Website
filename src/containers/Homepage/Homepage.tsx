import React, { useEffect } from "react";
import data from "./../../data.json";
import "./Homepage.scss";

import { Banner, Introduction, Tutor } from "../../components";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { useAppDispatch } from "../../redux/store";
import { doGetAllListTutor } from "../../redux";

export const Homepage: React.FC = () => {
  const dispatch = useAppDispatch();
  const listAllTutor = useSelector(
    (state: RootState) => state.tutorSlice.listAllTutor
  );
  useEffect(() => {
    dispatch(doGetAllListTutor());
  }, []);
  console.log(listAllTutor);

  return (
    <div className="home">
      <Banner />
      <div className="home__list-grid">
        {listAllTutor.map((item, index) => (
          <Tutor
            key={index}
            name={item.name}
            address={item.address}
            rating={item.rating}
            avatar={item.avatar}
            major={item.major}
          />
        ))}
      </div>
      <Introduction />
    </div>
  );
};
