import React, { useEffect } from "react";
import "./Homepage.scss";
import { Banner, Introduction, Tutor } from "../../components";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { useAppDispatch } from "../../redux/store";
import { doGetAllListTutor, doGetOneTutor } from "../../redux";
import { useHistory } from "react-router";

export const Homepage: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const listAllTutor = useSelector(
    (state: RootState) => state.tutorSlice.listAllTutor
  );

  useEffect(() => {
    dispatch(doGetAllListTutor());
    dispatch(doGetOneTutor({ uid: "60fd8d91f02ec300223e45b6" }));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
            handleGotoDetail={() => {
              history.push(`/tutor/${item._id}`);
            }}
          />
        ))}
      </div>
      <Introduction />
    </div>
  );
};
