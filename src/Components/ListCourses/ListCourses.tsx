import React from "react";
import { useAppSelector } from "../../Hooks/store";
import Error from "../Error/Error";
import ItemCourse from "../ItemCourse/ItemCourse";
import Loader from "../Loader/Loader";
import "./index.scss";

export default function ListCourses() {
  const { loading, error } = useAppSelector((state) => state.store);


  

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <Error />;
  }

  return (
    <section className="list">
      <div className="container">
        <ItemCourse />
      </div>
    </section>
  );
}
