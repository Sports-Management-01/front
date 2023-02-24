import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Field from "../../pages/exploreFields/Field";
import { shuffle } from "../../utils/utils";
import "./HomeFields.css";
import logo from "../../logo.svg";
const HomeFields = () => {
  const navigate = useNavigate();
  const [emblaRef] = useEmblaCarousel();
  const [fields, setFields] = useState([]);
  const [companies, setcompanies] = useState([]);

  const allFields = async () => {
    const res = await fetch(`http://localhost:3000/fields`, {
      method: "GET",
    });
    const json = await res.json();
    if (json.success) {
      console.log(`fielddddd`);
      setFields(json.data);
      // emblaRef.current.reInit();
    } else {
      window.alert("There is no Field!");
      console.log(json.data);
    }
  };

  const allCompanies = async () => {
    const res = await fetch(`http://localhost:3000/users/companies`, {
      method: "GET",
    });
    const json = await res.json();
    if (json.success) {
      console.log(`all companies`);
      setcompanies(json.data);
    } else {
      window.alert("There is no Companies!");
      console.log(json.data);
    }
  };

  useEffect(() => {
    allFields();
    allCompanies();
  }, []);

  return (
    <>
      <section className="home-room spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h5>OUR Courts</h5>
                <h2>Explore Our Courts</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row ">
            {shuffle(fields.splice(0, 6))?.map((field, i) => (
              <div key={i} className="col col-sm-6 col-md-4">
                <Field field={field} delay={Math.round((Math.random() * 10000) + 2000)} />
              </div>
            ))}
          </div>
        </div>
        <div className="container">
          <div className="home__explore">
            <div className="row">
              <div className="col-lg-9 col-md-8">
                <h3>
                  Planning your next match? Save up to 25% on your challange
                </h3>
              </div>
              <div className="col-lg-3 col-md-4 text-center">
                <Link className="primary-btn " to={"/courts"}>
                  Explore More
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="container mt-5">
          <div className="row">
            {[...companies].splice(0, 6).map((company, i) => {
              return (
                <div className="col col-sm-6 col-md-4 col-lg-2 d-flex align-items-center justify-content-center" key={i}>
                  <img
                    src={company?.image ? company?.image : logo}
                    style={{
                      width: "70px",
                    }}
                  />
                  <div>{company?.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeFields;
