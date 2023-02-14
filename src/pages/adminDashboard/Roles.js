import React from "react";
import Nav from "../../components/Nav/Nav";
import SideNav from "../../components/SideNav/SideNav";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
const dayjs = require("dayjs");

const Roles = () => {

  const [roles, setRoles] = useState([]);
  const token = useContext(AuthContext);
  const allRoles = async () => {
    const res = await fetch(`http://localhost:3000/roles/`, {
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
      setRoles(json.data);
    } else {
      window.alert("There is no Role!");
      console.log(json.data);
    }
  };
  useEffect(() => {
   allRoles();
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
                    <div className="alert alert-info">Users</div>
                    <table className="table">
                      <tr>
                        <th> Name</th>
                        <th>Require</th>
                        <th>Status</th>
                      </tr>

                      {roles?.map((role, i) => (
                        
                        <>
                          <tr>
                            <td>{role.name}</td>
                            <td>{role.require}</td>
                            <td>
                              {dayjs(role.deletedAt).format(
                                "ddd,MMM D, YYYY h:mm A"
                              )}
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

export default Roles;
