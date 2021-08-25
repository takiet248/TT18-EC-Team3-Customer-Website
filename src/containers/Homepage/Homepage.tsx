import React, { useEffect } from "react";
import "./Homepage.scss";
import { Banner, Introduction, Tutor, Filter } from "../../components";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { useAppDispatch } from "../../redux/store";
import { doGetAllListTutor } from "../../redux";
import { useHistory } from "react-router";

export const Homepage: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const listAllTutor = useSelector(
    (state: RootState) => state.tutorSlice.listAllTutor
  );
  useEffect(() => {
    dispatch(doGetAllListTutor());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="home">
      <Banner />
      <Filter />
      <div className="home__list-grid">
        {listAllTutor.map((item, index) => (
          <Tutor
            key={index}
            name={item.name}
            address={item.address}
            rating={item.rating}
            avatar={item.avatar}
            major={item.major}
            education={item.education}
            isLiked={item.noLike}
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
