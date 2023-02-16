import img1 from "../../assets/img/soccer.jpeg";
import SimpleImageSlider from "react-simple-image-slider";

const HomeField = ({data}) => {
  const images = [
    { url: img1 },
    { url: img1},
    { url: img1 },
    { url: img1 },
  ];
  console.log(data.image)
  const arr = []
Object.keys(data.image).forEach(key => arr.push({ value: data.image}))
console.log(arr)
  return (
    <>
      <div className="col-lg-3 col-md-6 col-sm-6 p-0">
        <div
          className="home__room__item set-bg"
          style={{
            backgroundImage:`url(${arr})`,backgroundRepeat:"no-repeat"
          }}
        >
           <SimpleImageSlider
    width={540}
    height={400}
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
