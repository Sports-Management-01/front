import img1 from "../../assets/img/home-room/img1.jpg";

const HomeField = ({data}) => {
  return (
    <>
      <div className="col-lg-3 col-md-6 col-sm-6 p-0">
        <div
          className="home__room__item set-bg"
          style={{
            backgroundImage: `url(${img1})`,
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="home__room__title">
            <h4>{data.name}</h4>
            <h2>
              <sup>$</sup>{data.hourPrice}<span>/hour</span>
            </h2>
          </div>
          <a href="#">Booking Now</a>
        </div>
      </div>
    </>
  );
};

export default HomeField;
