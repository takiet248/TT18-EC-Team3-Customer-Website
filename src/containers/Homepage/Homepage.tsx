import React, { useEffect } from "react";
import "./Homepage.scss";
import {
  Banner,
  Introduction,
  Tutor,
  CourseItem,
} from "../../components";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { useAppDispatch } from "../../redux/store";
import {
  doGetAllListTutor,
  doGetRecommendedCourse,
  doGetRecommendedTutor,
} from "../../redux";
import { useHistory } from "react-router";
import { ScrollHorizontal } from "../../components/common/ScrollHorizontal/ScrollHorizontal";
import { Label } from "../../components/common";

export const Homepage: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const listAllTutor = useSelector(
    (state: RootState) => state.tutorSlice.listAllTutor
  );
  const recommendedTutor = useSelector(
    (state: RootState) => state.auth.recommendedTutor
  );
  const recommendedCourse = useSelector(
    (state: RootState) => state.auth.recommendedCourse
  );
  useEffect(() => {
    dispatch(doGetAllListTutor());
    dispatch(doGetRecommendedTutor({}));
    dispatch(doGetRecommendedCourse({}));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="home">
      <Banner />
      {/* <Filter /> */}
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
      <div className="home__recommendation">
        <Label title="These courses are recommended for you" />
        <ScrollHorizontal
          paddingLeft={8}
          marginBottom={16}
          marginTop={16}
          paddingBottom={8}
        >
          {recommendedCourse &&
            recommendedCourse.map((item: any, index: number) => {
              return (
                <CourseItem
                  key={index}
                  name={item.name}
                  avatar={item.avatar}
                  durations={item.duration}
                  rating={item.rating}
                  subject={item.subject}
                  level={item.level}
                  price={item.price}
                  onClick={() => {
                    history.push({
                      pathname: `/course/${item._id}`,
                      // state: { tutorid: uid },
                    });
                  }}
                />
              );
            })}
        </ScrollHorizontal>
      </div>

      <div className="home__recommendation">
        <Label title="These tutor are recommended for you" />
        <ScrollHorizontal
          paddingLeft={8}
          marginBottom={16}
          marginTop={16}
          paddingBottom={8}
        >
          {recommendedTutor &&
            recommendedTutor.map((item: any, index: number) => {
              return (
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
              );
            })}
        </ScrollHorizontal>
      </div>
      <Introduction />
    </div>
  );
};
