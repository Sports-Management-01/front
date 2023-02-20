import React from "react";
import Nav from "../../components/Nav/Nav";
import SideNav from "../../components/SideNav/SideNav";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link,NavLink } from "react-router-dom";


const Roles = () => {

  const [roles, setRoles] = useState([]);
  const token = useContext(AuthContext);
  const [counter, setCounter] = useState(0);


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
  }, [counter]);
  const deleteRole = async (id) => {
    const res = await fetch(`http://localhost:3000/roles/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
    });
    const json = await res.json();

    if (json.success) {
      window.alert(json.messages);
      setCounter(counter+1);
     
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
                    <div
                      className="alert alert-info"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      Roles
                      <NavLink
                        to={"/addrole"}
                        className="btn"
                        style={{ backgroundColor: "rgb(236 192 14 / 76%)" }}
                      >
                        Add Role
                      </NavLink>
                    </div>
                    <table className="table">
                      <tr>
                        <th> Name</th>
                        <th>Require</th>
                        <th>Options</th>
                      </tr>

                      {roles?.map((role, i) => (
                        
                        <>
                          <tr>
                            <td>{role.name}</td>
                            <td>{role.required ? "Yes": "No"}</td>
                            <td>
                              <Link
                                to={`/updaterole/${role.id}`}
                                className="btn-primary btn m-1"
                              >
                                Edit
                              </Link>
                              <input
                                className="btn-danger btn"
                                type="button"
                                value="Delete"
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      "Are you sure you want to delete this role?"
                                    )
                                  ) {
                                    deleteRole(role.id);
                                    console.log(
                                      "Role has been deleted successfully..."
                                    );
                                  } else {
                                    console.log("Role did not deleted!");
                                  }
                                }}
                              />
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
