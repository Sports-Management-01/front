import React from "react";
import Nav from "../../components/Nav/Nav";
import { Link, NavLink, useParams } from "react-router-dom";
import SideNav from "../../components/SideNav/SideNav";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
const States = () => {
  const [states, setStates] = useState([]);
  const [counter, setCounter] = useState(0);
  const token = useContext(AuthContext);
  const allStates = async () => {
    const res = await fetch(`http://localhost:3000/states/`, {
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
      setStates(json.data);
    } else {
      window.alert("There is no States!");
      console.log(json.data);
    }
  };
  useEffect(() => {
    allStates();
  }, [counter]);
  const deleteState = async (id) => {
    const res = await fetch(`http://localhost:3000/States/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await res.json();

    if (json.success) {
      window.alert(json.messages);
      setCounter(counter++);
      setStates([...states]);
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
                      States
                      <NavLink
                        to={"/addstate"}
                        className="btn"
                        style={{ backgroundColor: "rgb(236 192 14 / 76%)" }}
                      >
                        Add State
                      </NavLink>
                    </div>
                    <table className="table">
                      <tr>
                        <th> State</th>
                        <th>Country</th>
                        <th>Options</th>
                      </tr>

                      {states?.map((state, i) => (
                        <>
                          <tr>
                            <td>{state.name}</td>
                            <td>{state.Country.name}</td>
                            <td>
                              <Link
                                to={`/updatestate/${state.id}`}
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
                                      "Are you sure you want to delete this state?"
                                    )
                                  ) {
                                    deleteState(state.id);
                                    console.log(
                                      "State has been deleted successfully..."
                                    );
                                  } else {
                                    console.log("State did not deleted!");
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
export default States;
