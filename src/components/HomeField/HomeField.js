import img1 from "../../assets/img/home-room/img1.jpg";
import { useContext, useEffect, useRef, useState } from "react";

const HomeField = async ({ data }) => {
  const response = await fetch(`http://localhost:3000/fields/${data.id}}`, {
    method: "GET",
  });
  const json = await response.json();
  console.log(json.data);
  if (json.success) {
    console.log(json.data);
  }

  return (
    <>
      <div className="col-lg-3 col-md-6 col-sm-6 p-0">
        <div
          class="home__room__item set-bg"
          style={{
            backgroundImage: `url(${img1})`,
            backgroundRepeat: "no-repeat",
          }}
        >
          <div class="home__room__title">
            <h4>{data.name}</h4>
            <h2>
              <sup>$</sup>55<span>/day</span>
            </h2>
          </div>
          <a href="#">Booking Now</a>
        </div>
      </div>
    </>
  );
};

export default HomeField;
