import React, { useState } from "react";
import { useAppSelector } from "../../Hooks/store";
import { useNavigate } from "react-router-dom";
import {FaGenderless} from "react-icons/fa";
import HlsPlayer from "../ItemVideo/ItemVideo";
import Rating from "../Rating/Rating";
import { currentItemsFunc,pageNumbersFunc } from "../../Helpers/pagination";
import "./index.scss";

export default function ItemCourse() {
  const { coursesData } = useAppSelector((state) => state.store);
  const navigate = useNavigate();
  const showImage =true;

  const [hoverIndex, setHoverIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const currentItems = currentItemsFunc(currentPage, coursesData);
  const pageNumbers = pageNumbersFunc(currentPage, coursesData);

  const handlerOver = (index: any) => {
    setHoverIndex(index);
  };
  const handlerOut = () => {
    setHoverIndex(null);
  };
  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const handlerNav = (id: any) => {
    navigate(`/course/${id}`);
  };
  return (
    <>
      <div className="list__inner">
        {currentItems &&
          currentItems.map((course: any, id: number) => {
            return (
              <div
                onClick={() => handlerNav(course.id)}
                className="list__item"
                key={course.id}
              >
                <div className="list__img">
                  {
                    <div
                      className="list__media"
                      onMouseOver={() => handlerOver(id)}
                      onMouseOut={handlerOut}
                    >
                      {hoverIndex === id && showImage === true ?  (
                        <div className="list__video" onMouseOut={handlerOut}>
                          <HlsPlayer
                            videoUrl={course.meta.courseVideoPreview.link} 
                            muted={true}
                          />
                        </div>
                      ) :  (
                        <img
                          onMouseOver={handlerOver}
                          onMouseOut={handlerOut}
                          src={course.previewImageLink + "/cover.webp"}
                          alt={course.previewImageLink}
                        />
                      )
                    }
                    </div>
                  }
                </div>
                <div className="list__text">
                  <h2 className="list__title">{course.title}</h2>
                  <div className="list__skills">
                    <span><strong>Skills:</strong></span>
                    <ul>
                      {course.meta.skills.map((skill: any) => {
                        return <li key={skill}><FaGenderless className="round__icon"/>{skill}</li>;
                      })}
                    </ul>
                  </div>
                  <span className="list__count">
                    Count of lessons:<strong>{course.lessonsCount}</strong>
                  </span>
                  <div className="list__rate"><div>Ratiing:</div><Rating rate={course.rating} /></div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="list__numbers">
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageClick(pageNumber)}
            disabled={pageNumber === currentPage}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </>
  );
}
