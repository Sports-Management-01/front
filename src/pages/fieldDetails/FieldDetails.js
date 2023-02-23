import SimpleImageSlider from "react-simple-image-slider";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import "./FieldDetails.css";

const FieldDetails = () => {
  const [emblaRef] = useEmblaCarousel({}, [Autoplay({ delay: 4000 })]);
  const { id } = useParams();
  const [field, setField] = useState({
    image: [],
  });
  const [equipments, setEquipments] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/fields/${id}`)
      .then((response) => {
        return response.json().then((json) => {
          setField(json.data);
        });
      })
      .catch();
  }, [id]);
  const getAllEquipments = async () => {
    const res = await fetch(`http://localhost:3000/equipments`, {
      method: "GET",
    });
    const json = await res.json();
    if (json.success) {
      console.log(json.success);
      setEquipments(json.data);
      console.log(json.data);
    } else {
      window.alert("There is no Field!");
      console.log(json.data);
    }
  };
  useEffect(() => {
    getAllEquipments();
  }, []);

  return (
    <>
      <Header />
      <div className="row d-flex flex-column flex-md-row align-items-center">
        <div className="col p-3 px-5">
          <h2 className="mt-5">{field.name}</h2>
          <div className="row mt-3 w-100 room__details__facilities">
            <div className="col-lg-6">
              <ul>
                <li>
                  <span className="icon_check"></span> Takami Bridal Attire
                </li>
                <li>
                  <span className="icon_check"></span> Esthetic Salon
                </li>
                <li>
                  <span className="icon_check"></span> Multilingual staff
                </li>
                <li>
                  <span className="icon_check"></span> Dry cleaning and laundry
                </li>
                <li>
                  <span className="icon_check"></span> Credit cards accepted
                </li>
              </ul>
            </div>
            <div className="col-lg-6">
              <ul>
                <li>
                  <span className="icon_check"></span> Rent-a-car
                </li>
                <li>
                  <span className="icon_check"></span> Reservation &
                  confirmation
                </li>
                <li>
                  <span className="icon_check"></span> Babysitter upon request
                </li>
                <li>
                  <span className="icon_check"></span> 24-hour currency exchange
                </li>
                <li>
                  <span className="icon_check"></span> 24-hour Manager on Duty
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="embla" ref={emblaRef}>
            <div className="embla__container">
              {field?.image.map((img, j) => {
                return (
                  <div
                    key={j}
                    className="embla__slide embla__slide__padded"
                    style={{
                      backgroundImage: `url(${img.url})`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Field Details Section Begin --> */}
      <section className="room-details spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="room__details__content">
                <div className="room__details__title">
                  <h2>{field.name}</h2>
                  <Link to={`/booking/${field.id}`} className="primary-btn">
                    Book Now
                  </Link>
                </div>
                <div className="room__details__desc">
                  <h2>Description:</h2>
                  <p>
                    {field.name}, is a {field.Category.name} stadium.</p><p>  The stadium in{field.adress}. With a length {field.length}m, and width
                     {field.width}m</p><p>It is the large stadium. The hour price of
                    the field {field.hourPrice}$, where the working hour of the
                    field from {field.from} to {field.to}.</p>
					<p>We hope for you enjoyable match
                  </p>
                </div>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="room__details__facilities">
                      <h2>Others facilities:</h2>
                      <div className="row">
                        <div className="col-lg-6">
                          <ul>
                            <li>
                              <span className="icon_check"></span> Takami Bridal
                              Attire
                            </li>
                            <li>
                              <span className="icon_check"></span> Esthetic
                              Salon
                            </li>
                            <li>
                              <span className="icon_check"></span> Multilingual
                              staff
                            </li>
                            <li>
                              <span className="icon_check"></span> Dry cleaning
                              and laundry
                            </li>
                            <li>
                              <span className="icon_check"></span> Credit cards
                              accepted
                            </li>
                          </ul>
                        </div>
                        <div className="col-lg-6">
                          <ul>
                            <li>
                              <span className="icon_check"></span> Rent-a-car
                            </li>
                            <li>
                              <span className="icon_check"></span> Reservation &
                              confirmation
                            </li>
                            <li>
                              <span className="icon_check"></span> Babysitter
                              upon request
                            </li>
                            <li>
                              <span className="icon_check"></span> 24-hour
                              currency exchange
                            </li>
                            <li>
                              <span className="icon_check"></span> 24-hour
                              Manager on Duty
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="room__details__more__facilities">
                      <h2>Most popular facilities:</h2>
                      {equipments.map((equipment, i) => (
                        <>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="room__details__more__facilities__item">
                                <div className="icon">
                                  <img
                                    src="img/rooms/details/facilities/fac-1.png"
                                    alt=""
                                  />
                                </div>
                                <h6>{equipment.name}</h6>
                              </div>
                            </div>
                          </div>
                        </>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*  <!-- Field Details Section End --> */}
      <Footer />
    </>
  );
};

export default FieldDetails;
