import React from "react";
import Nav from "../../components/Nav/Nav";
import SideNav from "../../components/SideNav/SideNav";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
const dayjs = require("dayjs");

const Permissions = () => {

  const [permissions, setPermissions] = useState([]);
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
  }, []);

 

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
                    <div className="alert alert-info">Permissions</div>
                    <table className="table">
                      <tr>
                        <th> Name</th>
                        <th>Allowed</th>
                       
                      </tr>

                      {permissions?.map((permission, i) => (
                        
                        <>
                          <tr>
                            <td>{permission.name}</td>
                            <td>{permission.allowed}</td>
                          
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
