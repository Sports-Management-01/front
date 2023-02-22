import React, { useState } from "react";
import SideNav from "../../../components/SideNav/SideNav";
import Nav from "../../../components/Nav/Nav";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { useContext, useEffect } from "react";
const dayjs = require('dayjs')

const MyBooking = () => {
  const {token} = useContext(AuthContext);
  const { id } = useParams();
  const { user, setUser } = useContext(AuthContext);
  const [bookingDetails, setBookingDetails] = useState([]);
  const [field, setField] = useState({});
  const [counter, setCounter] = useState(0);
  

  const getMyBooking = async () => {
    const res = await fetch(`http://localhost:3000/reservations/userreservation`, {
      method: "GET",
      body: null,
      headers: {
        "content-type" : "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    console.log(user.id)
    const json = await res.json();
    console.log(json)
    if(json.success){
      setBookingDetails(json.data);
      console.log(json.data);
    }
    
  };
  useEffect(() => {
    getMyBooking();
  }, [counter]);

  console.log(bookingDetails)
const destroy = async (reserveId)=>{
  const resp = await fetch(`http://localhost:3000/reservations/${reserveId}`,
  {
    method: "delete",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
const json = await resp.json();
console.log(json)
if(json.success){
 console.log(json.success) 
 window.alert(json.messages)
 setCounter(counter+1)
}
else{
  console.log(json.success) 
 window.alert(json.messages)
}
}


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
                    <div className="alert alert-info">My Booking</div>
                    <table className="table">
                      <tr>
                        <th>Category</th>
                        <th>Field</th>
                        <th>Equipment</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Cost</th>
                        <th>Status</th>
                        <th>Options</th>


                      </tr>
                      {
                        bookingDetails?.map((reservation, i)=>(
                          <tr>
                      
                          <td>{reservation?.Field?.Category?.name}</td>
                          
                          <td>{reservation?.Field?.name}</td>
                          <td>
                          {
                           reservation?.ReservationEquipments?.map((eq, i)=>(
                            <>
                            {eq.Equipment.name} 
                            
                              {eq.Equipment.multiple && 
                              <> 
                              ({eq.count}) </>}
                              
                            {i < reservation?.ReservationEquipments?.length -1 && (
                              <>
                              ,
                              </>
                            )}
                            
                           
                            </>
                           )) 
                          }
                          </td>
                            
                          
                         
                          <td>{dayjs(reservation.from).format('ddd,MMM D, YYYY h:mm A')}</td>
                          <td>{dayjs(reservation.to).format('ddd,MMM D, YYYY h:mm A')}</td>
                          <td>{reservation.total}$</td>
                          
                          <td>
                            {reservation.deletedAt ? <> <span className="badge badge-danger"> canceled</span></>
                          : dayjs(reservation.to).isBefore(dayjs(new Date())) ? <><span className="badge badge-warning">Passed</span></> : <><span className="badge badge-primary">Acitve</span></>  
                          }
                          </td>
                          <td><>
                          <input className="btn-danger btn" type="button" value="Cancel" onClick={()=>  (destroy(reservation.id))} />
                          </></td>


                        </tr>
                        ))
                      }
                     
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

export default MyBooking;
