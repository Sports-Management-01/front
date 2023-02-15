import React from "react";
import Nav from "../../components/Nav/Nav";
import SideNav from "../../components/SideNav/SideNav";
import { Link, NavLink, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const AddEquipment = ()=>{
    const token = useContext(AuthContext);
    const [equipment , setEquipment] = useState({})

    const createEquipment = async () => {
        const res = await fetch(`http://localhost:3000/equipments/`, {
          method: "POST",
          body: JSON.stringify({equipment}

         ),
          headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${token.token}`,
          },
        });
        const json = await res.json();
        if (json.success) {
          console.log(json.data);
          setEquipment(json.data);
        } else {
          window.alert("Equipment has not been added!");
          console.log(json.data);
        }
      };
  


      const handleOnChange = (e) => {
        equipment[e.target.name] = e.target.value;
        const updatedData = {...equipment}
        updatedData[e.target.name] = e.target.value;
        setEquipment(updatedData)
      };

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
                    <div className="alert alert-info" style={{display: "flex", justifyContent:"space-between", alignItems:"center"}}>Edit Equipment 
                    </div>
                    <table className="table">
                      <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Multiple</th>
                      </tr>
                     
                          <tr>
                          <td><input
                           onChange={handleOnChange}
                            name="name"
                            type="text"
                            className="form-control"
                            id="inputName4"
                            placeholder="Name"
                          /></td>
                          <td>
                            <input
                           onChange={handleOnChange}
                            name="price"
                            type="text"
                            className="form-control"
                            id="inputName4"
                            placeholder="Price"
                          /></td>
                          <td> 
                            <select id="inputState" className="form-control" name="multiple"
                          onChange={handleOnChange} >
                            <option  selected  value='1'>Yes</option>
                            <option  value='0'>No</option>
                           
                          </select>
                          </td>
                        </tr>
                        <button  type="submit" value="Update" className="btn btn-primary" onClick={()=>createEquipment()}>Create</button>
                      
                      
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
export default AddEquipment