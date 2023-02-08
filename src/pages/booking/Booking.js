import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SimpleImageSlider from "react-simple-image-slider";
import { type } from "@testing-library/user-event/dist/type";

const Booking = () => {
  const { id } = useParams();
  const [field, setField] = useState({});
  const [equipments, setEquipments] = useState([]);
  const [date, setDate] = useState(null)

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
      setEquipments(json.data);
    } else {
      window.alert("There is no Field!");
      console.log(json.data);
    }
  };
  useEffect(() => {
    getAllEquipments();
    console.log(id)
  }, []);

  const handleDateChange = async (e) => {
   console.log(e.target.value)
    const times = await fetch(`http://localhost:3000/fields/${id}/availability`, {
        method: "POST" ,
        body: JSON.stringify({date: e.target.value})
       
    });
    console.log(e.target.value)

    const data = await times.json()
    console.log(data)
    
  }

  return (
    <>
      <Header />
      {field.name && (
        <>
          <SimpleImageSlider
            width={"100%"}
            height={600}
            images={field?.image}
            showBullets={true}
            showNavs={true}
          />
          <div className="container my-5">
            <div className="row">
              <div className="col">
                <h1>{field.name}</h1>
                <h5 className="mt-4">Category: {field.Category.name}</h5>
              </div>
            </div>
            <form>
              <div className="row pt-5">
                <div className="col-12 col-md-6 offset-md-3">
                  <h4>Reserve Now:</h4>
                  <p className="mb-1 mt-3"><label htmlFor="required-date">Required Date:</label></p>
                  <div className="form-row">
                    <input type='date'className="form-control" onChange= {handleDateChange} />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </>
      )}

      <Footer />
    </>
  );
};

export default Booking;
