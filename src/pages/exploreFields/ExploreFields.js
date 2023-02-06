import HomeField from "../../components/HomeField/HomeField";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import breadcrumb from "../../assets/img/breadcrumb-bg.jpg";
import SimpleImageSlider from "react-simple-image-slider";
import img1 from "../../assets/img/soccer.jpeg";
import img2 from "../../assets/img/soccer.jpeg";
import img3 from "../../assets/img/soccer.jpeg";
import img4 from "../../assets/img/soccer.jpeg";

const ExploreFields = () => {
  const navigate = useNavigate();
  const [fields, setFields] = useState([]);
  const allFields = async () => {
    const res = await fetch(`http://localhost:3000/fields`, {
      method: "GET",
    });
    const json = await res.json();
    if (json.success) {
      console.log(`fielddddd`);
      setFields(json.data);
    } else {
      window.alert("There is no Field!");
      console.log(json.data);
    }
  };

  useEffect(() => {
    allFields();
  }, []);

  return (
    <>
      <Header />
      {/*   <!-- Breadcrumb Begin --> */}
      <div
        className="breadcrumb-option set-bg"
        style={{
          backgroundImage: `url(${breadcrumb})`,
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="breadcrumb__text">
                <h1>Our Courts</h1>
                <div className="breadcrumb__links">
                  <Link to={"/"}>Home </Link>
                  <span>Courts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*  <!-- Breadcrumb End --> */}

      {/*  <!-- Rooms Section Begin --> */}
      <section className="rooms spad">
        <div className="container">
          <div className="row">
            {fields.map((field, i) => (
              <>
                <div className="col-lg-6 p-0 order-lg-1 order-md-1 col-md-6 ">
                  <div className="room__text">
                    <h3>{field.name}</h3>
                    <h2>
                      <sup>$</sup>
                      {field.hourPrice}
                      <span>/hour</span>
                    </h2>

                    <ul>
                      <li>
                        <span>Length:</span>
                        {field.length}
                      </li>
                      <li>
                        <span>Width:</span>
                        {field.width}
                      </li>
                      <li>
                        <span>Open At:</span>
                        {field.from}
                      </li>
                      <li>
                        <span>Close At:</span>
                        {field.to}
                      </li>
                      <li>
                        <span>Address:</span>
                        {field.adress}
                      </li>
                    </ul>
                    <Link to={`/fieldDetails/${field.id}`}>View Details </Link>

                    <SimpleImageSlider
                      width={540}
                      height={400}
                      images={field.image}
                      showBullets={true}
                      showNavs={true}
                    />
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ExploreFields;
