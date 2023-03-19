import React from "react";
import { useAppSelector } from "../../Hooks/store";
import Error from "../Error/Error";
import Loader from "../Loader/Loader";
import ItemDetails from "../ItemDetails/ItemDetails";

export default function DetailsCourse() {
  const { loading, error } = useAppSelector((state) => state.store);

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <Error />;
  }
  
  return (
    <div>
      <div><ItemDetails /></div>
    </div>
  );
}
