import React from "react";
import Nav from "../../components/Nav/Nav";
import SideNav from "../../components/SideNav/SideNav";
import { Link, NavLink, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
const Equipment = () =>{
    const [equipment, setEquipment] = useState([]);
    const [counter, setCounter] = useState(0);
  const {token} = useContext(AuthContext);
  //Delete
const deleteEquipment= async(id) =>{
  const res = await fetch(`http://localhost:3000/equipments/${id}`,
  {
    method: "DELETE",
    headers:{
      "Content-Type":"application/json",
       'Authorization': `Bearer ${token}`,
    }
  });
  const json = await res.json();

  if(json.success){
    window.alert(json.messages)
    setEquipment([...equipment])
    setCounter(counter+1)
  }
};
//END 
  const allEquipment = async () => {
    const res = await fetch(`http://localhost:3000/equipments`, {
      method: "GET",
      body: null,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await res.json();
    if (json.success) {
      console.log(json.data);
      setEquipment(json.data);
    } else {
      window.alert("There is no Equipment!");
      console.log(json.data);
    }
  };
  useEffect(() => {
    allEquipment();
  }, [counter]);

    
    return (
      <>
        <Nav/>
      <div className='user-hero' style={{display:"flex"}}>
      <SideNav/>
      <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="profile-data">
                <div className="table">
                  <div className="col-12 p-3 mb-4 bottom-border">
                    {/* blue area info */}
                    <div className="alert alert-info" style={{display: "flex", justifyContent:"space-between", alignItems:"center"}}>Equipment 
                    <NavLink  to={"/addequipment"} className="btn" style={{backgroundColor: "rgb(236 192 14 / 76%)"}}>Add Equipment</NavLink> 
                    </div>
                    <table className="table">
                      <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Multiple</th>
                        <th>Options</th>

                      </tr>
                      {
                        equipment?.map((eq, i)=>(
                          <tr>
                          <td>{eq.name}</td>
                          <td>{eq.price}$</td>
                          <td>{eq.multiple  ? "Yes": "No"}</td>
                          
                          <td>
                            <>
                          <Link to={`/equipment/update/${eq.id}`} className="btn-primary btn m-1" >
                          Edit
                          </Link>
                          <input className="btn-danger btn" type="button" value="Delete" 
                           onClick={
                            ()=>{ 
                              if (window.confirm('Are you sure you want to delete this equipment?')) {
                                deleteEquipment(eq.id)
                                console.log('Equipment has been deleted successfully...');
                              } else {
                                console.log('equipment did not deleted!');
                              }
                            }
                            } 
                          />
                          </>
                          </td>
                          <td>{/* {dayjs(reservation.from).format('ddd,MMM D, YYYY h:mm A')} */}</td>
                          <td>{/* {dayjs(reservation.to).format('ddd,MMM D, YYYY h:mm A')} */}</td>
                          {/* <td> */}
                            {/* <span className="badge badge-danger"> canceled</span> */}
                         {/* <span className="badge badge-warning">Passed</span> <><span className="badge badge-primary">Acitve</span></>   */}
                          {/* </td> */}
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
    )
}
export default Equipment