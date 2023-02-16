import img1 from "../../assets/img/soccer.jpeg";
import SimpleImageSlider from "react-simple-image-slider";
import { padding } from "@mui/system";

const HomeField = ({data}) => {
  const images = [
    { url: img1 },
    { url: img1},
    { url: img1 },
    { url: img1 },
  ];
  console.log(data.image)
  

  return (
    <>
      <div className="col-lg-3 col-md-6 col-sm-6 p-0">
        <div
          className="home__room__item set-bg"
          style={{
            backgroundImage:`url(${data.image})`,backgroundRepeat:"no-repeat"
          }}
        >
          
              <SimpleImageSlider
              width={280}
              height={500}
              images={data.image}
              showBullets={true}
              showNavs={true}
            />
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
