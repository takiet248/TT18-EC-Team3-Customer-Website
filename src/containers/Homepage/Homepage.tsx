import React, { useEffect, useState } from "react";
import "./Homepage.scss";
import { Banner, Introduction, Tutor } from "../../components";
import { batch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { useAppDispatch } from "../../redux/store";
import {
  doFakeLikeTutor,
  doFakeUnlikeTutor,
  doGetAllListTutor,
  doGetUserInfo,
  doLikeTutor,
  doUnlikeTutor,
} from "../../redux";
import { useHistory } from "react-router";
import { EUser } from "../../constants";

export const Homepage: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const listAllTutor = useSelector(
    (state: RootState) => state.tutorSlice.listAllTutor
  );
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const userid = localStorage.getItem(EUser.userid);
  const [preTime, setPreTime] = useState(0);

  useEffect(() => {
    dispatch(doGetAllListTutor());
    dispatch(doGetUserInfo());
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
      dispatch(doFakeLikeTutor({ _id: _id }));
    });
  };
  //handle unLike tutor
  const handleUnlikeTutor = (_id?: string) => {
    const nowTime = Date.now();
    setPreTime(nowTime);
    if (nowTime - preTime < 250) {
      return;
    }
    batch(() => {
      dispatch(doUnlikeTutor({ user: userid, tid: _id }));
      dispatch(doFakeUnlikeTutor({ _id: _id }));
    });
  };
  // is liked
  const isFromLikeList = (_id?: string) => {
    if (userInfo.like_tutor?.some((e) => e.tid === _id)) {
      return true;
    } else return false;
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
            noLike={isFromLikeList(item._id) ? 1 : 0}
            handleLikeUnlike={() => {
              if (isFromLikeList(item._id) === false)
                return handleLikeTutor(item._id);
              else return handleUnlikeTutor(item._id);
            }}
            handleGotoDetail={() => {
              history.push(`/tutor/${item._id}`);
            }}
          />
        ))}
      </div>
      {/* <div className="home__recommendation">
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
      </div> */}

      {/* <div className="home__recommendation">
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
      </div> */}
      <Introduction />
    </div>
  );
};
