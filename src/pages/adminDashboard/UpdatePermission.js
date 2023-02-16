import Nav from "../../components/Nav/Nav";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, NavLink, useParams } from "react-router-dom";

import SideNav from "../../components/SideNav/SideNav";


const UpdatePermission = ()=>{
    const token = useContext(AuthContext);
    const { id } = useParams();
    const [permission, setPermission] = useState({})
    const [updatePermission, setUpdatePermission] = useState({
        permission:"",
        roleId:"",
        allowed:""
      });

    const getPermission = async () => {
    const res = await fetch(`http://localhost:3000/permissions/${id}`, {
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
        setPermission(json.data);
        setUpdatePermission(json.data)
      } else {
        window.alert("There is no Permission!");
        console.log(json.data);
      }
    };
    useEffect(() => {
        getPermission();
    }, []);

    const handleOnChange = (e) => {
        permission[e.target.name] = e.target.value;
        const updatedData = {...updatePermission}
        updatedData[e.target.name] = e.target.value;
        setUpdatePermission(updatedData)
 
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
                    <div className="alert alert-info" style={{display: "flex", justifyContent:"space-between", alignItems:"center"}}>Edit Permission 
                    </div>
                    <table className="table">
                      <tr>
                      <th>Permission</th>
                        <th>Role</th>
                        <th>Allowed</th>
                      </tr>
                     
                          <tr>
                          <td><input
                           defaultValue={permission.permission}
                           onChange={handleOnChange}
                            name="permission"
                            type="text"
                            className="form-control"
                            id="inputName4"
                            placeholder="Name"
                          /></td>
                          <td>
                            <input
                           defaultValue={permission.roleId}
                           onChange={handleOnChange}
                            name="roleId"
                            type="text"
                            className="form-control"
                            id="inputName4"
                            placeholder="Price"
                          /></td>
                          <td> 
                            <select id="inputState" className="form-control" name="multiple"
                          onChange={handleOnChange} value={permission.allowed}>
                            <option  selected  value='1'>Yes</option>
                            <option  value='0'>No</option>
                           
                          </select>
                          </td>
                        </tr>
                        <button  type="submit" value="Update" className="btn btn-primary" 
                        // onClick={()=>updateEquipment(equipment.id)}
                        >Update</button>
                      
                      
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

export default UpdatePermission