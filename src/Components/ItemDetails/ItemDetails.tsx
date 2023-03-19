import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Hooks/store";
import { useParams } from "react-router-dom";

import {
  selectId,
  setCurrentVideo,
  setPictureInPicture,
} from "../../store/createSlice";
import HlsPlayer from "../ItemVideo/ItemVideo";
import { FaLock, FaPlay ,FaCheck,FaStop} from "react-icons/fa";
import "./index.scss";
import Error from "../Error/Error";

export default function ItemDetails() {
  const [urlVideo, setUrlVideo] = useState({
    video: "",
    img: "",
  });
  const { ended, courseData, isPictureInPicture } = useAppSelector(
    (state) => state.store
  );
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(selectId(id));
  }, [id]);

  const handlerVideo = (url: string) => {
    dispatch(setCurrentVideo(url));
    dispatch(setPictureInPicture(true));
  };

  const handlerSetUrl = (lesson: any) => {
    lesson.status === "unlocked" && 
    dispatch(setCurrentVideo(lesson.link));
      setUrlVideo({
        video: lesson.link,
        img: lesson.previewImageLink + `orde-${lesson.order}.webp`,
      });
  };
  const firtVideo =() => {
    let video = courseData?.lessons?.find((lesson:any) => lesson.status === "unlocked").link
    return video;
  }
  const link = "https://wisey.app/videos/the-power-of-self-discipline-how-to-stay-on-track/lesson-1/AppleHLS1/lesson-1.m3u8ended"
  return (
    <div className="details">
      <div className="wrapper">
        {courseData?.id && courseData.lessons[0].link ? (
          <div className="details__inner">
            <h1 className="details__title">{courseData.title}</h1>
            <div className="details__video">
              {isPictureInPicture ? (
                <HlsPlayer videoUrl={""} />
              ) : (
                <HlsPlayer
                  videoUrl={
                    urlVideo.video ? urlVideo.video : firtVideo()
                  }
                  poster={
                    urlVideo.img
                      ? urlVideo.img
                      : courseData.lessons[0].previewImageLink + "lesson-1.webp"
                  }
                />
              )}
            </div>
            <p className="details__instruction">
              You can contol the video speed by using keys from 1 to 5
            </p>
            <button
              className="details__inpicture"
              onClick={() =>
                handlerVideo(urlVideo.video ?? courseData.lessons[0].link)
              }
            >
              Turn on "picture in picture"
            </button>
            <div className="details__information">
              <h3 className="details__label">Lessons</h3>
              <ul>
                {courseData.lessons.map((lesson: any) => {
                  return (
                    <li
                      key={lesson.title}
                      onClick={() => handlerSetUrl(lesson)}
                      className={
                        lesson.status === "unlocked"
                          ? "details__lesson open"
                          : "details__lesson"
                      }
                    >{ localStorage.getItem(lesson.link+"ended")  &&
                      <FaCheck className="icon__complited"/>
                    }
                      {lesson.title}
                      {lesson.status === "locked" ? (
                        <FaLock className="icon" />
                      ) : (
                         lesson.link === urlVideo.video ? <FaStop className="icon"/>    : <FaPlay  className="icon"/>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ) : (
          <Error />
        )}
      </div>
    </div>
  );
}
