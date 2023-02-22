

import React from 'react';
import Nav from "../../components/Nav/Nav";
import SideNav from "../../components/SideNav/SideNav";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";


const AddPayment = () => {
const [payment, setPayment] = useState({});
const [reservation, setReservation] = useState({});
const { id } = useParams();
const token = useContext(AuthContext);

const getReservation = async () => {
    const res = await fetch(`http://localhost:3000/reservations/${id}`, {
      method: "GET",
      body: null,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
    });
    const json = await res.json();
    if (json.success) {
      console.log(json.data);
      setReservation(json.data);
    } else {
      window.alert("There is no Reservation!");
      console.log(json.data);
    }
  };
  useEffect(() => {
    getReservation();
   
  }, []);

const createPayment = async (e) => {
    e.preventDefault();
    const form = e.target;
    const newPayment = new FormData(form);
   
    const response = await fetch("http://localhost:3000/payments", {
      method: "post",
      body: newPayment,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: `application/json`,
      },
    });
    const json = await response.json();
    if (json.success) {
      alert(json.messages);
     // setPayment(json.data);
    } else {
      alert(json.messages);
    }
  };
    const handleOnChange = (e) => {
      payment[e.target.name] = e.target.value;
        const updatedData = { ...payment };
        updatedData[e.target.name] = e.target.value;
        console.log(updatedData)
        setPayment(updatedData);
      };
     
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
                      <div className="alert alert-info">Payment</div>
                   
                      <form onSubmit={createPayment}>
                      <div className="form-row">
                        <div className="form-group col-md-3">
                          <label htmlFor="inputEmail4">User Name</label>
                          
                          <h5  onClick={handleOnChange}>{reservation?.User?.name}</h5>
                        </div>
                      </div>  
                      <div className="form-row">
                        <div className="form-group col-md-3">
                          <label htmlFor="inputEmail4">Reservation Id:</label>
                          
                          <h5 name="reservationId" onClick={handleOnChange}>{reservation?.id}</h5>
                        </div>
                      </div> 
                      <div className="form-row">
                        <div className="form-group col-md-3">
                          <label htmlFor="inputEmail4" >Amount</label>
                          <input
                            name="amount"
                            onChange={handleOnChange} 
                            type="text"
                            className="form-control"
                            id="inputName4"
                            placeholder="Name"
                          />
                        </div>
                    </div>
                      <div className="form-row">
                        <div className="form-group col-md-3">
                          <label htmlFor="inputEmail4">Payment Way</label>
                          <input
                            name="paymentWay"
                            onChange={handleOnChange} 
                            type="text"
                            className="form-control"
                            id="inputName4"
                            placeholder="Payment Way"
                          />
                        </div>
                        </div>
                        <div className="form-row">
                        <div className="form-group col-md-3">
                          <label htmlFor="inputEmail4">Payment Information</label>
                          <input
                            name="paymentInfo"
                            onChange={handleOnChange} 
                            type="text"
                            className="form-control"
                            id="inputName4"
                            placeholder="Payment Way"
                          />
                        </div>
                        </div>
                 {/*      <p className="mb-1 mt-4">
                    <label htmlFor="required-date">Required Date:</label>
                  </p>
                  <div className="form-row">
                    <input
                      type="date"
                      className="form-control"
                      onChange={handleOnChange}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div> */}
                      <div className="form-row">
                        <div className="form-group col-md-3">
                          <label for="inputState">From</label>
                         <h5>{reservation.from}</h5>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-3">
                          <label htmlFor="inputState">To</label>
                         <h5 >{reservation.to}</h5>
                        </div>
                      </div>
                    
                     
                      <button type="submit" className="btn btn-primary">
                        Add Payment
                      </button>
                    </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default AddPayment;
