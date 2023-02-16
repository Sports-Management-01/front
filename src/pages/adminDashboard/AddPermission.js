import React from "react";
import Nav from "../../components/Nav/Nav";
import SideNav from "../../components/SideNav/SideNav";
import { Link, NavLink, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const AddPermission = ()=>{
    const token = useContext(AuthContext);
    const [permission , setPermission] = useState({})

    const createPermission = async () => {
        const res = await fetch(`http://localhost:3000/permissions/`, {
          method: "POST",
          body: JSON.stringify(permission),
          headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${token.token}`,
          },
        });
        const json = await res.json();
        if (json.success) {
          console.log(json.data);
          setPermission(json.data);
          window.alert("Permission has been added!");

        } else {
          window.alert("Permission has not been added!");
          console.log(json.data);
        }
      };


  










    
    
      const handleOnChange = (e) => {
        // equipment[e.target.name] = e.target.value;
        const updatedData = {...permission}
        if (e.target.nodeName === "SELECT") {
          updatedData[e.target.name] = e.target.options[e.target.selectedIndex].value;
        } else {
          updatedData[e.target.name] = e.target.value;
        }
        console.log(updatedData)
        setPermission(updatedData)
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
                    <div className="alert alert-info" style={{display: "flex", justifyContent:"space-between", alignItems:"center"}}>Add Permission 
                    </div>
                    <table className="table">
                      <tr>
                        <th>Permission</th>
                        <th>Role</th>
                        <th>allowed</th>
                      </tr>
                     
                          <tr>
                          <td><input
                           onChange={handleOnChange}
                            name="permission"
                            type="text"
                            className="form-control"
                            id="inputName4"
                            placeholder="Name"
                          /></td>
                          <td>
                            <input
                           onChange={handleOnChange}
                            name="roleId"
                            type="text"
                            className="form-control"
                            id="inputName4"
                            placeholder="roleId"
                          /></td>
                          <td> 
                            <select id="inputState" className="form-control" name="allowed"
                          onChange={handleOnChange} >
                            <option  selected  value='1'>Yes</option>
                            <option  value='0'>No</option>
                           
                          </select>
                          </td>
                        </tr>
                        <button  type="submit" value="Update" className="btn btn-primary" onClick={()=>createPermission()}>Create</button>
                      
                      
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

export default AddPermission