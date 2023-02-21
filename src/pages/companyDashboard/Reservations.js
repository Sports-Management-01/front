import React from "react";
import Nav from "../../components/Nav/Nav";
import SideNav from "../../components/SideNav/SideNav";
import {Link, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useEffect, useState, useRef } from "react";
import {Modal, Button} from 'react-bootstrap';
import CloseIcon from '@mui/icons-material/Close';
import AppModal from "../../components/AppModal/AppModal";

const dayjs = require("dayjs");

const Reservations = () => {
  const { token } = useContext(AuthContext);
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [fieldDetails, setReservationgDetails] = useState([]);
  const [show, setShow] = useState(false);
  const cancelationReason = useRef();
  const [counter, setCounter] = useState(0);
  const [currentReservationId, setCurrentReservationId] = useState(null)


  const getResevrations = async () => {
    const res = await fetch(
      `http://localhost:3000/reservations/companyreservation`,
      {
        method: "GET",
        body: null,
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }
    );
   // console.log(user.id);
    const json = await res.json();
   // console.log(json);

    if (json.success) {
      setReservationgDetails(json.data);
     // console.log(json.data);
    }
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
                        <th>Category</th>
                        <th>Field</th>
                        <th>Equipment</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Cost</th>
                        <th>Status</th>
                        <th>Options</th>
                      </tr>

                      {fieldDetails?.map((field, i) => (
                        <>
                          {field?.Reservations?.map((re, i) => (
                            <tr>
                              <td>{re?.User?.name}</td>
                              <td>{field?.Category?.name}</td>
                              <td>{field?.name}</td>
                              <td>
                                {re.ReservationEquipments?.map((equ, i) => (
                                  <>
                                    {equ?.Equipment?.name}
                                    {equ?.Equipment?.multiple && (
                                      <>({equ?.count}) </>
                                    )}
                                    {i <
                                      re?.ReservationEquipments.length - 1 && (
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
                            {re.deletedAt ? <> <span className="badge badge-danger"> canceled</span></>
                          : dayjs(re.to).isBefore(dayjs(new Date())) ? <><span className="badge badge-warning">Passed</span></> : <><span class="badge badge-primary">Acitve</span></>  
                          }
                          </td> 

                          <td>
                                <button
                                  className="btn-danger btn btn-sm"
                                  type="button"
                                  value="Cancel"
                                  onClick={()=>{
                                    setCurrentReservationId(re.id)
                                    setShow(true)
                                  }
                                  }
                                >Cancel</button>
                                {/*  <!-- Modal --> */}
                              
                                {/* END Model */}
                              
                              
                                <Link to={`/addpayment/${re.id}`} className="btn-primary btn m-1" >
                          Add Payment
                          </Link>
                                {/*  <!-- Modal --> */}
                              
                                {/* END Model */}
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
