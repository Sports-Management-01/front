import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import SimpleImageSlider from "react-simple-image-slider";
import { type } from "@testing-library/user-event/dist/type";
import { findItemByObjectID } from "../../utils/utils";
import { AuthContext } from "../../contexts/AuthContext";

const Booking = () => {
  const { token } = useContext(AuthContext);
  const { id } = useParams();
  const [cost, setCost] = useState({
    times: 0,
    eq: 0,
  });
  const [field, setField] = useState({});
  const [data, setData] = useState({});
  const [reservation, setReservation] = useState({
    date: "",
    times: [],
    equipment: [],
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
  const booking = async (e) => {
    e.preventDefault();
    const reserveNow = await fetch(`http://localhost:3000/reservations`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fieldId: field.id,
        times: reservation.times,
        date: reservation.date,
        equipment: reservation.equipment,
      }),
    });
    const bookingData = await reserveNow.json();
    if (bookingData.success) {
      alert(bookingData.messages); 
    }
    else{
      alert(bookingData.messages); 
    }
  };

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
    setCost({
      eq: cost.eq,
      times: finalTimes.length * field.hourPrice,
    });
    setReservation((pr) => {
      return {
        ...pr,
        times: finalTimes,
      };
    });
  };

  const updateReservationEquipment = (e, eqId, name, price) => {
    let eqCost = cost.eq;
    const equipments = [...reservation.equipment];
    const index = findItemByObjectID(reservation.equipment, eqId);
    if (index > -1) {
      eqCost -= equipments[index].count * price;
      equipments[index].count = +e.target.value;
      eqCost += equipments[index].count * price;
    } else {
      equipments.push({
        id: eqId,
        count: e.target.value,
        name,
        price,
      });
      eqCost += +e.target.value * price;
    }

    if (e.target.value == 0) {
      equipments.splice(index, 1);
    }
    setCost({
      times: cost.times,
      eq: eqCost,
    });
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
                <h5 className="mt-4">Category: {field?.Category?.name}</h5>
              </div>
            </div>
            <form onSubmit={booking}>
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
                      <table className="table">
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
                      {reservation.times.length > 0 ? (
                        <>
                          <p className="mb-3 mt-4">Select Equipment</p>
                          <table className="table">
                            <thead>
                              <tr>
                                <th scope="col">Equipment</th>
                                <th scope="col">Price / Unit</th>
                                <th scope="col">Count</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data?.equipment?.map((eq, i) => {
                                console.log(data.equipment);
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
                                            reservation?.equipment?.[
                                              findItemByObjectID(
                                                reservation.equipment,
                                                eq.id
                                              )
                                            ]?.count
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
                      ) : (
                        <>
                          <div className="alert alert-warning my-4">
                            Please select time above
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
                <div className="col-12 col-md-3 offset-md-1 pt-5 pt-md-0">
                  <h4>Total Cost</h4>
                  {reservation.times?.length > 0 ? (
                    <>
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
                    </>
                  ) : (
                    <>
                      <div className="alert alert-warning my-4">
                        Please choose a date & time
                      </div>
                    </>
                  )}
                  {reservation.equipment?.length > 0 &&
                    reservation.times.length > 0 && (
                      <>
                        <p className="mb-1 mt-4">
                          <label htmlFor="required-date">Equipment Cost:</label>
                        </p>
                        <table className="table">
                          <tr>
                            <th>Item</th>
                            <th>Price</th>
                          </tr>
                          {reservation?.equipment?.map((eq, i) => {
                            if (eq.count == 0) {
                              return <></>;
                            }
                            return (
                              <tr key={i}>
                                <td>{eq.name}</td>
                                <td>{eq.count * eq.price}</td>
                              </tr>
                            );
                          })}
                        </table>
                      </>
                    )}

                  {reservation.times.length > 0 && (
                    <div className="alert alert-info my-4 d-flex justify-content-between">
                      <span>Total:</span>{" "}
                      <span
                        style={{
                          borderBottom: "3px #0c5460 double",
                        }}
                      >
                        ${cost.times + cost.eq} USD
                      </span>
                    </div>
                  )}

                  <button type="submit" className="btn btn-dark">
                    Reserve Now
                  </button>
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
