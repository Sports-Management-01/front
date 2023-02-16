import Nav from "../../components/Nav/Nav";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, NavLink, useParams } from "react-router-dom";

import SideNav from "../../components/SideNav/SideNav";


const UpdatePermission = ()=>{
    const token = useContext(AuthContext);
    const { id } = useParams();
    const [permission, setPermission] = useState({})
    const [roles, setRoles] = useState([])
    const [updatePermission, setUpdatePermission] = useState({
        permission:"",
        roleId:"",
        allowed:""
      });
      const getRoles = async () => {
        const res = await fetch(`http://localhost:3000/roles`, {
            method: "GET",
            body: null,
            headers: {
              "content-type": "application/json",
              "Authorization": `Bearer ${token.token}`,
            },
          });
          const json = await res.json();
          if (json.success) {
            console.log(json.data);
            setRoles(json.data);
          } else {
            window.alert("There is no role!");
            console.log(json.data);
          }
        };
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
      } else {
        window.alert("There is no Permission!");
        console.log(json.data);
      }
    };
    useEffect(() => {
        getPermission()
        getRoles();
    }, []);
    const editPermission =  async (e) => {
      console.log(updatePermission)
      const res = await fetch(`http://localhost:3000/permissions/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': "Application/json",
            'Authorization': `Bearer ${token.token}`,
        },
        body: JSON.stringify({
          ...permission
        }),
    });
    const json = await res.json();
    
    if (json.success){
        console.log(json)
        window.alert(json.messages)
        setUpdatePermission(json.data)
        
    }
    else{
        window.alert(json.messages)
    }
    
    }

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
                          <select selected
                           name="roleId"
                           onChange={handleOnChange} 
                           id="inputState"
                           className="form-control"
                         >
                         
                        {
                            roles.map((role,i)=> permission.roleId == role.id ? (
                              <option key={i} value={role.id} selected>{role.name}</option>):
                              (<option key={i} value={role.id} >{role.name}</option>
                          ))}
                         
                          </select>
                          
                          </td>
                          <td> 
                            <select id="inputState" className="form-control" name="allowed"
                          onChange={handleOnChange} >
                            <option selected={permission.allowed == "1" && <>selected</>} value='1'>Yes</option>
                            <option selected={permission.allowed == "0" && <>selected</>}  value='0'>No</option>
                           
                          </select>
                          </td>
                        </tr>
                        <button  type="submit" value="Update" className="btn btn-primary" 
                        onClick={()=>editPermission(permission.id)}
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