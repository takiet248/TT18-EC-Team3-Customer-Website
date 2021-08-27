import React, { useEffect, useState } from "react";
import "./Homepage.scss";
import { Banner, Introduction, Tutor, CourseItem } from "../../components";
import { batch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { useAppDispatch } from "../../redux/store";
import {
  doFakeLikeUnlikeListCourse,
  doFakeLikeUnlikeListTutor,
  doGetAllListTutor,
  doGetRecommendedCourse,
  doGetRecommendedTutor,
  doLikeCourse,
  doLikeTutor,
  doUnlikeCourse,
  doUnlikeTutor,
} from "../../redux";
import { useHistory } from "react-router";
import { ScrollHorizontal } from "../../components/common/ScrollHorizontal/ScrollHorizontal";
import { Label } from "../../components/common";
import { EUser } from "../../constants";

export const Homepage: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const listAllTutor = useSelector(
    (state: RootState) => state.tutorSlice.listAllTutor
  );
  const recommendedTutor = useSelector(
    (state: RootState) => state.tutorSlice.recommendedTutor
  );
  const recommendedCourse = useSelector(
    (state: RootState) => state.courseSlice.recommendedCourse
  );
  const userid = localStorage.getItem(EUser.userid);
  const [preTime, setPreTime] = useState(0);

  useEffect(() => {
    dispatch(doGetAllListTutor());
    dispatch(doGetRecommendedTutor({}));
    dispatch(doGetRecommendedCourse({}));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //handleLike tutor
  const handleLikeTutor = (_id?: string) => {
    const nowTime = Date.now();
    setPreTime(nowTime);
    if (nowTime - preTime < 250) {
      return;
    }
    batch(() => {
      dispatch(doLikeTutor({ user: userid, tid: _id }));
      dispatch(doFakeLikeUnlikeListTutor({ _id: _id, noLike: 1 }));
    });
  };
  //handleLike tutor
  const handleUnlikeTutor = (_id?: string) => {
    const nowTime = Date.now();
    setPreTime(nowTime);
    if (nowTime - preTime < 250) {
      return;
    }
    batch(() => {
      dispatch(doUnlikeTutor({ user: userid, tid: _id }));
      dispatch(doFakeLikeUnlikeListTutor({ _id: _id, noLike: 0 }));
    });
  };

  //handleLike course
  const handleLikeCourse = (_id?: string) => {
    const nowTime = Date.now();
    setPreTime(nowTime);
    if (nowTime - preTime < 250) {
      return;
    }
    batch(() => {
      dispatch(doLikeCourse({ user: userid, cid: _id }));
      dispatch(doFakeLikeUnlikeListCourse({ _id: _id, noLike: 1 }));
    });
  };
  //handleLike course
  const handleUnlikeCourse = (_id?: string) => {
    const nowTime = Date.now();
    setPreTime(nowTime);
    if (nowTime - preTime < 250) {
      return;
    }
    batch(() => {
      dispatch(doUnlikeCourse({ user: userid, cid: _id }));
      dispatch(doFakeLikeUnlikeListCourse({ _id: _id, noLike: 0 }));
    });
  };

  return (
    <div className="home">
      <Banner />
      {/* <Filter /> */}
      <div className="home__list-grid">
        {listAllTutor.map((item, index) => (
          <Tutor
            key={index}
            _id={item._id}
            name={item.name}
            address={item.address}
            rating={item.rating}
            avatar={item.avatar}
            major={item.major}
            education={item.education}
            noLike={item.noLike}
            handleLikeUnlike={() => {
              if (item.noLike === 0) return handleLikeTutor(item._id);
              else return handleUnlikeTutor(item._id);
            }}
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
                  noLike={item.noLike}
                  handleLikeUnlike={() => {
                    if (item.noLike === 0) return handleLikeCourse(item._id);
                    else return handleUnlikeCourse(item._id);
                  }}
                  onClick={() => {
                    history.push({
                      pathname: `/course/${item._id}`,
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
                  noLike={item.noLike}
                  handleLikeUnlike={() => {
                    if (item.noLike === 0) return handleLikeTutor(item._id);
                    else return handleUnlikeTutor(item._id);
                  }}
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
