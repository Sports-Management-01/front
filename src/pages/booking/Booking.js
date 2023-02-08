import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SimpleImageSlider from "react-simple-image-slider";
import { type } from "@testing-library/user-event/dist/type";
const Booking = () => {
  const { id } = useParams();
  const [field, setField] = useState({});
  const [data, setData] = useState({});
  const [reservation, setReservation] = useState({
    date: "",
    times: [],
    equipment: {},
  });
  useEffect(() => {
    fetch(`http://localhost:3000/fields/${id}`)
      .then((response) => {
        return response.json().then((json) => {
          setField(json.data);
        });
      })
      .catch();
  }, [id]);

  const handleDateChange = async (e) => {
    setReservation((pr) => {
      return { ...pr, date: e.target.value };
    });
    const times = await fetch(
      `http://localhost:3000/fields/${id}/availability`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date: e.target.value }),
      }
    );

    const data = await times.json();
    setData(data.data);
  };

  useEffect(() => {
    console.log(reservation);
  }, [reservation]);

  const updateReservationTimes = (e) => {
    let finalTimes = [...reservation.times];
    if (e.target.checked) {
      finalTimes.push(e.target.value);
    } else {
      finalTimes.splice(finalTimes.indexOf(e.target.value), 1);
    }

    setReservation((pr) => {
      return {
        ...pr,
        times: finalTimes,
      };
    });
  };

  const updateReservationEquipment = (e, eqId, name, price) => {
    const equipments = { ...reservation.equipment };
    if (reservation.equipment[eqId]) {
      equipments[eqId] = { count: +e.target.value };
    } else {
      equipments[eqId] = { count: 1 };
    }
    equipments[eqId].name = name;
    equipments[eqId].price = price;

    if (e.target.value == 0) {
      delete equipments[eqId]
    }

    setReservation((pr) => {
      return {
        ...pr,
        equipment: equipments,
      };
    });
  };

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
                <div className="col-12 col-md-6 offset-md-2">
                  <h4>Reserve Now:</h4>
                  <p className="mb-1 mt-4">
                    <label htmlFor="required-date">Required Date:</label>
                  </p>
                  <div className="form-row">
                    <input
                      type="date"
                      className="form-control"
                      onChange={handleDateChange}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  {reservation.date && (
                    <>
                      <p className="mb-3 mt-4">Select Time(s)</p>
                      <table class="table">
                        <thead>
                          <tr>
                            <th></th>
                            <th scope="col">From</th>
                            <th scope="col">To</th>
                            <th scope="col">Duration</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data?.times?.map((time, i) => {
                            return (
                              <tr>
                                <td>
                                  <input
                                    type={"checkbox"}
                                    disabled={!time.available}
                                    value={time.time}
                                    onClick={updateReservationTimes}
                                  />
                                </td>
                                <td>{time.time}</td>
                                <td>{time.to}</td>
                                <td>60 Minutes</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      <p className="mb-3 mt-4">Select Equipment</p>
                      <table class="table">
                        <thead>
                          <tr>
                            <th scope="col">Equipment</th>
                            <th scope="col">Price / Unit</th>
                            <th scope="col">Count</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data?.equipment?.map((eq, i) => {
                            return (
                              <tr>
                                <td>{eq.name}</td>
                                <td>{eq.price}</td>
                                <td>
                                  <input
                                    type={"number"}
                                    className="form-control"
                                    min={0}
                                    value={
                                      Number(
                                        reservation?.equipment?.[eq.id]?.count
                                      ) || 0
                                    }
                                    onChange={(e) => {
                                      updateReservationEquipment(
                                        e,
                                        eq.id,
                                        eq.name,
                                        eq.price
                                      );
                                    }}
                                  />
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </>
                  )}
                </div>
                <div className="col-12 col-md-3 offset-md-1">
                  <h4>Total Cost</h4>
                  <p className="mb-1 mt-4">
                    <label htmlFor="required-date">Field Cost:</label>
                  </p>
                  <table className="table">
                    <tr>
                      <th>Hours</th>
                      <th>Price</th>
                    </tr>
                    <tr>
                      <td>{reservation.times.length}</td>
                      <td>{reservation.times.length * field.hourPrice}</td>
                    </tr>
                  </table>
                  {
                     (Object.keys(reservation.equipment)?.length > 0) &&  <>
                      <p className="mb-1 mt-4">
                    <label htmlFor="required-date">Equipment Cost:</label>
                  </p>
                  <table className="table">
                    <tr>
                      <th>Item</th>
                      <th>Price</th>
                    </tr>
                    {Object.keys(reservation?.equipment)?.map((eq, i) => {
                      if (reservation.equipment[eq].count == 0) {
                        return <></>;
                      }
                      return (
                        <tr key={i}>
                          <td>{reservation.equipment[eq].name}</td>
                          <td>
                            {reservation.equipment[eq].count *
                              reservation.equipment[eq].price}
                          </td>
                        </tr>
                      );
                    })}
                  </table>
                    </>
                  }
                  <button type="submit" className="btn btn-dark">Reserve Now</button>
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
