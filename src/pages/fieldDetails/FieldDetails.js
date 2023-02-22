import SimpleImageSlider from "react-simple-image-slider";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";

const FieldDetails = () => {
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
      {field.image.length > 0 && (
        <>
          <SimpleImageSlider
            width={1500}
            height={600}
            images={field?.image}
            showBullets={true}
            showNavs={true}
          />
        </>
      )}

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
                    We’re halfway through the summer, but while plenty of people
                    are kicking back and enjoying their vacations, the social
                    media development teams likely aren’t doing the same. In the
                    past two weeks alone, we’ve seen four big new updates that
                    can directly impact the social marketing campaigns of
                    hotels, resorts, and other businesses in the hospitality
                    industry. Let’s take a close look at each one.
                  </p>
                  <p>
                    The new desktop version of the site is significantly
                    improved, which will make it easier for hotels and resorts
                    to navigate the platform.
                  </p>
                  <p>
                    There is one big change though that we want to note, and
                    that’s the more live video and local moments (the latter of
                    which are based on your location). These will be prioritized
                    in users’ feeds, so take advantage of this and create this
                    content to improve your reach and connect with more members
                    of your target audience.
                  </p>
                  <p>
                    We’ve gotten yet another new feature for Instagram Stories,
                    and this time it’s the Chat sticker, which allows you to
                    invite Story followers to join in on a new group chat.
                    Instagram is currently advertising this as a way to
                    jumpstart big group conversations or make plans.
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
