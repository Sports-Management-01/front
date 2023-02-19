import React from "react";
import Nav from "../../components/Nav/Nav";
import SideNav from "../../components/SideNav/SideNav";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import AppModal from "../../components/AppModal/AppModal"

const dayjs = require("dayjs");

const ManageBooking = () => {
  const { token } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const [reservationDetails, setReservationgDetails] = useState([]);
  const [show, setShow] = useState(false);

  const [counter, setCounter] = useState(0);
  const [currentReservationId, setCurrentReservationId] = useState(null)

  const getResevrations = async () => {
    const res = await fetch(`http://localhost:3000/reservations/`, {
      method: "GET",
      body: null,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(user.id);
    const json = await res.json();
    console.log(json);

    if (json.success) {
      setReservationgDetails(json.data);
      console.log(json.data);
    }
    console.log(setReservationgDetails);
  };

  const cancelReservation = async (id, cancelationReason) => {
    const res = await fetch(`http://localhost:3000/reservations/${id}`, {
      method: "DELETE",
      body: JSON.stringify({
        cancelationReason
      }),

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await res.json();
    if (json.success) {
      console.log(json);
      window.alert(json.messages);
      setCounter(counter + 1);
      console.log(counter);
    } else {
      window.alert(json.messages);
    }
  };
  useEffect(() => {
    getResevrations();
  }, [counter]);
  return (
    <>
      <Nav />
      <div className="user-hero" style={{ display: "flex" }}>
        <SideNav />
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="profile-data">
                <div className="table">
                  <div className="col-12 p-3 mb-4 bottom-border">
                    {/* blue area info */}
                    <div className="alert alert-info">Reservations</div>
                    {
                      show && <AppModal show={show} setShow={setShow} id={currentReservationId} cancelFunc={cancelReservation}/>
                    }
                    <table className="table">
                      <tr>
                        <th>User</th>
                        <th>Company</th>
                        <th>Category</th>
                        <th>Field</th>
                        <th>Equipment</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Cost</th>
                        <th>Status</th>
                        <th>Options</th>
                      </tr>
                      
                      {reservationDetails?.map((reservation, i) => (
                        <>
                          <tr>
                            <td style={{ whiteSpace: "pre-wrap" }}>
                              {reservation?.User?.name}
                              {/* {reservation?.id} */}
                            </td>
                            <td>{reservation?.Field?.User?.name}</td>
                            <td>{reservation?.Field?.Category?.name}</td>
                            <td>{reservation?.Field?.name}</td>
                            <td>
                              {reservation?.ReservationEquipments?.map(
                                (equ, i) => (
                                  <>
                                    {equ?.Equipment?.name}
                                    {equ?.Equipment?.multiple && (
                                      <>({equ?.count}) </>
                                    )}
                                    {i <
                                      reservation?.ReservationEquipments
                                        .length -
                                        1 && <>,</>}
                                  </>
                                )
                              )}
                            </td>
                            <td>
                              {dayjs(reservation.from).format(
                                "ddd,MMM D, YYYY h:mm A"
                              )}
                            </td>

                            <td>
                              {dayjs(reservation.to).format(
                                "ddd,MMM D, YYYY h:mm A"
                              )}
                            </td>

                            <td>{reservation.total}$</td>
                            <td>
                              {reservation.deletedAt ? (
                                <>
                                  {" "}
                                  <span className="badge badge-danger">
                                    {" "}
                                    canceled
                                  </span>
                                </>
                              ) : dayjs(reservation.to).isBefore(
                                  dayjs(new Date())
                                ) ? (
                                <>
                                  <span className="badge badge-warning">
                                    Passed
                                  </span>
                                </>
                              ) : (
                                <>
                                  <span className="badge badge-primary">
                                    Acitve
                                  </span>
                                </>
                              )}
                            </td>

                            <td>
                              <button
                                className="btn-danger btn"
                                type="button"
                                value="Cancel"
                                onClick={()=>{
                                  setCurrentReservationId(reservation.id)
                                  setShow(true)
                                }
                                }
                                
                              >
                                Cancel
                              </button>
                              {/*  <!-- Modal --> */}
                              
                              {/* END Model */}
                            </td>
                          </tr>
                        </>
                      ))}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageBooking;
