import React from "react";
import Nav from "../../components/Nav/Nav";
import SideNav from "../../components/SideNav/SideNav";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
const dayjs = require("dayjs");

const Reservations = () => {
  const { token } = useContext(AuthContext);
  const { id } = useParams();
  const { user, setUser } = useContext(AuthContext);
  const [fieldDetails, setReservationgDetails] = useState([]);
  const getResevrations = async () => {
    const res = await fetch(
      `http://localhost:3000/reservations/companyreservation`,
      {
        method: "GET",
        body: null,
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(user.id);
    const json = await res.json();
    console.log(json);

    if (json.success) {
      setReservationgDetails(json.data);
      console.log(json.data);
    }
    console.log(setReservationgDetails);
  };
  useEffect(() => {
    getResevrations();
  }, []);
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
                    <table className="table">
                      <tr>
                        <th>User</th>
                        <th>Category</th>
                        <th>Field</th>
                        <th>Equipment</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Cost</th>
                        <th>Status</th>
                        <th>Options</th>
                      </tr>

                      {fieldDetails.map((field, i) => (
                        <>
                          {field.Reservations.map((re, i) => (
                            <tr>
                              <td>{re.User.name}</td>
                              <td>{field.Category.name}</td>
                              <td>{field.name}</td>
                              <td>
                                {re.ReservationEquipments.map((equ, i) => (
                                  <>
                                    {equ.Equipment.name}
                                    {equ.Equipment.multiple && (
                                      <>({equ.count}) </>
                                    )}
                                    {i <
                                      re.ReservationEquipments.length - 1 && (
                                      <>,</>
                                    )}
                                  </>
                                ))}
                              </td>
                              <td>
                                {dayjs(re.from).format(
                                  "ddd,MMM D, YYYY h:mm A"
                                )}
                              </td>

                              <td>
                                {dayjs(re.to).format("ddd,MMM D, YYYY h:mm A")}
                              </td>

                              <td>{re.total}$</td>
                              <td>
                                {re.deletedAt ? (
                                  <>
                                    {" "}
                                    <span className="badge badge-danger">
                                      {" "}
                                      canceled
                                    </span>
                                  </>
                                ) : dayjs(re.to).isBefore(dayjs(new Date())) ? (
                                  <>
                                    <span className="badge badge-warning">
                                      Passed
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <span class="badge badge-primary">
                                      Acitve
                                    </span>
                                  </>
                                )}
                              </td>

                              {/* <td>{dayjs(reservation.from).format('ddd,MMM D, YYYY h:mm A')}</td>
                          <td>{dayjs(reservation.to).format('ddd,MMM D, YYYY h:mm A')}</td>
                          <td>{reservation.total}$</td>
                          */}
                              <td>
                                <button
                                  className="btn-danger btn"
                                  type="button"
                                  value="Cancel"
                                  data-toggle="modal"
                                  data-target="#exampleModal"
                                >Cancel</button>
                                {/*  <!-- Modal --> */}
                                <div
                                  class="modal fade"
                                  id="exampleModal"
                                  tabindex="-1"
                                  role="dialog"
                                  aria-labelledby="exampleModalLabel"
                                  aria-hidden="true"
                                >
                                  <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                      <div class="modal-header">
                                        <h5
                                          class="modal-title"
                                          id="exampleModalLabel"
                                        >
                                          Modal title
                                        </h5>
                                        <button
                                          type="button"
                                          class="close"
                                          data-dismiss="modal"
                                          aria-label="Close"
                                        >
                                          <span aria-hidden="true">
                                            &times;
                                          </span>
                                        </button>
                                      </div>
                                      <div class="modal-body">...</div>
                                      <div class="modal-footer">
                                        <button
                                          type="button"
                                          class="btn btn-secondary"
                                          data-dismiss="modal"
                                        >
                                          Close
                                        </button>
                                        <button
                                          type="button"
                                          class="btn btn-primary"
                                        >
                                          Save changes
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
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

export default Reservations;
