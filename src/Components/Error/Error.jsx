import React from "react";
import { useAppSelector } from "../../Hooks/store";
import {FaSadTear} from "react-icons/fa";

import "./index.scss";
export default function Error() {
  const {error} = useAppSelector(state => state.store)

  return (
    <section className="error">
      <div className="container">
        <div className="error__inner">
          <FaSadTear className="error__img"/>
          <p className="error__text">Oops...{error ? error :  "Something went wrong"}</p>
        </div>
      </div>
    </section>
  );
}
