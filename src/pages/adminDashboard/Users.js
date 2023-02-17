import React from "react";
import Nav from "../../components/Nav/Nav";
import SideNav from "../../components/SideNav/SideNav";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
const dayjs = require("dayjs");

const Users = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [counter, setCounter] = useState(0);
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
      setUsers(json.data);
    } else {
      window.alert("There is no Role!");
      console.log(json.data);
    }
  };
  useEffect(() => {
    // allRoles();
  }, []);
  const allUsers = async () => {
    const res = await fetch(`http://localhost:3000/users/`, {
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
      setUsers(json.data);
    } else {
      window.alert("There is no User!");
      console.log(json.data);
    }
  };
  useEffect(() => {
    allUsers();
  }, []);
  const approve = async (id) => {
    const res = await fetch(`http://localhost:3000/users/approve/${id}`, {
      method: "PUT",
      body: null,
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${token.token}`,
      },
    });
    const json = await res.json();
    if (json.success) {
      console.log(json.data);
      setUsers([...users]);
      setCounter(counter++);
    } else {
      window.alert("There is no updating!!");
      console.log(json.data);
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
                    <div className="alert alert-info">Users</div>
                    <table className="table">
                      <tr>
                        <th> Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>ApprovedAt</th>
                      </tr>

                      {users?.map((user, i) => (
                        <>
                          <tr>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>

                            <td>{user.Role?.name}</td>
                            {user.Role?.id == 2 ? (
                              <td>
                                Approved
                                {user.approvedAt != null ? (
                                  <input
                                    className="form-check-input ml-2"
                                    type="checkbox"
                                    id="check1"
                                    name="approvedAt"
                                    value="something"
                                    onClick={() => approve(user.id)}
                                    checked
                                  />
                                ) : (
                                  <input
                                    className="form-check-input ml-2"
                                    type="checkbox"
                                    id="check1"
                                    name="approvedAt"
                                    value="something"
                                    onClick={() => {
                                      approve(user.id);
                                      console.log(user);
                                    }}
                                  />
                                )}
                              </td>
                            ) : (
                              <td></td>
                            )}
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

export default Users;
