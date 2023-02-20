import React from "react";
import Nav from "../../components/Nav/Nav";
import SideNav from "../../components/SideNav/SideNav";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const AddRole = ()=>{
    const token = useContext(AuthContext);
    const [role, setRole] = useState({});



    const createRole = async () => {
        const res = await fetch(`http://localhost:3000/roles/`, {
          method: "POST",
          body: JSON.stringify(role),
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token.token}`,
          },
        });
        const json = await res.json();
        if (json.success) {
          console.log(json.data);
          setRole(json.data);
          window.alert("Role has been added!");
        } else {
          window.alert("Role has not been added!");
          console.log(json.data);
        }
      };
    
  
      const handleOnChange = (e) => {
        const updatedData = {...role}
        if (e.target.nodeName === "SELECT") {
          updatedData[e.target.name] = e.target.options[e.target.selectedIndex].value;
        } else {
          updatedData[e.target.name] = e.target.value;
        }
        console.log(updatedData)
        setRole(updatedData)
      };
    return(
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
                    <div className="alert alert-info" style={{display: "flex", justifyContent:"space-between", alignItems:"center"}}>Edit Role 
                    </div>
                    <table className="table">
                      <tr>
                        <th>Role</th>
                        <th>Required</th>
                      </tr>
                     
                          <tr>
                          <td><input
                           onChange={handleOnChange}
                            name="name"
                            type="text"
                            className="form-control"
                            id="inputName4"
                            placeholder="Name"
                          />
                          </td>
                          <td> 
                            <select id="inputState" className="form-control" name="required"
                          onChange={handleOnChange} >
                            <option  selected  value='1'>Yes</option>
                            <option  value='0'>No</option>
                           
                          </select>
                          </td>
                        </tr>
                        <button  type="submit" value="Update" className="btn btn-primary" onClick={()=>createRole()}>Create</button>
                      
                      
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
export default AddRole