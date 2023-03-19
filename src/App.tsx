import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route ,useNavigate} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./Hooks/store";
import { getToken, fetchCourses, fetchCourse } from "./store/createSlice";
import Home from "./Pages/Home/Home";
import Course from "./Pages/Course/Course";
import { setPictureInPicture } from "./store/createSlice";
import { FaCompressArrowsAlt } from "react-icons/fa";
import "./Style/index.scss";
import HlsPlayer from "./Components/ItemVideo/ItemVideo";

function App() {
  const dispatch = useAppDispatch();
  const {
    token,
    courseData,
    coursesData,
    selectedId,
    isPictureInPicture,
    currentVideo,
  } = useAppSelector((store) => store.store);

  useEffect(() => {
    dispatch(getToken());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCourses({ token }));
    if (selectedId) {
      dispatch(fetchCourse({ token, selectedId }));
    }
  }, [token,selectedId]);

 


  const handlerClose = () => {
    dispatch(setPictureInPicture(false));
  };
  console.log({ coursesData, courseData, token, selectedId });
  return (
    <div className="App">
      {isPictureInPicture && (
        <div className="picture__video">
          <FaCompressArrowsAlt onClick={handlerClose} className="close" />
          <HlsPlayer videoUrl={currentVideo} />
        </div>
      )}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/course/:id" element={<Course />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
