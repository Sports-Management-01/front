import React from "react";
import Nav from "../../components/Nav/Nav";
import SideNav from "../../components/SideNav/SideNav";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { NavLink, Link } from "react-router-dom";

const dayjs = require("dayjs");

const Permissions = () => {

  const [permissions, setPermissions] = useState([]);
const [counter, setCounter] = useState(0);

  const token = useContext(AuthContext);
  const allPermissions = async () => {
    const res = await fetch(`http://localhost:3000/permissions/`, {
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
      setPermissions(json.data);
    } else {
      window.alert("There is no Permission!");
      console.log(json.data);
    }
  };
  useEffect(() => {
   allPermissions();
  }, [counter]);
  const deletePermission= async(id) =>{
    const res = await fetch(`http://localhost:3000/permissions/${id}`,
    {
      method: "DELETE",
      headers:{
        "Content-Type":"application/json",
         'Authorization': `Bearer ${token.token}`,
      }
    });
    const json = await res.json();

    if(json.success){
      window.alert(json.messages)
      setPermissions([...permissions])
      setCounter(counter+1)

     
   
    }
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
                    <div className="alert alert-info" style={{display: "flex", justifyContent:"space-between", alignItems:"center"}}>Permissions 
                    <NavLink  to={"/addpermission"} className="btn" style={{backgroundColor: "rgb(236 192 14 / 76%)"}}>Add Permission</NavLink> 
                    </div>
                    <table className="table">
                      <tr>
                        <th>Permission</th>
                        <th>Role</th>
                        <th>Allowed</th>
                        <th>Options</th>

                       
                      </tr>

                      {
                      permissions?.map((permission, i) => (
                        
                        <>
                          <tr>
                            <td>{permission.permission}</td>
                            <td>{permission.Role.name}</td>
                            <td>{permission.allowed ? "Yes": "No"}</td>
                            <td>
                          <Link to={`/updatepermission/${permission.id}`} className="btn-primary btn m-1" >
                          Edit
                          </Link>
                          <input className="btn-danger btn" type="button" value="Delete"
                           onClick={
                            ()=>{if (window.confirm('Are you sure you want to delete this permission?')){deletePermission(permission.id)
                                console.log('Permission has been deleted successfully...');
                              } else {
                                console.log('Permission did not deleted!');
                              }
                            }
                            }  />
                          </td>
                          
                          </tr>
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

export default Permissions;
