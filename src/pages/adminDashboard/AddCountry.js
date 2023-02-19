import React from "react";
import Nav from "../../components/Nav/Nav";
import SideNav from "../../components/SideNav/SideNav";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
const AddCountry = () => {
  const token = useContext(AuthContext);
  const [country, setCountry] = useState({});
  const createCountry = async () => {
    const res = await fetch(`http://localhost:3000/countries/`, {
      method: "POST",
      body: JSON.stringify(country),
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
    });
    const json = await res.json();
    if (json.success) {
      console.log(json.data);
      setCountry(json.data);
      window.alert("Country has been added!");
    } else {
      window.alert("Country has not been added!");
      console.log(json.data);
    }
  };
  const handleOnChange = (e) => {
    country[e.target.name] = e.target.value;
    const updatedData = { ...country };
    updatedData[e.target.name] = e.target.value;
    setCountry(updatedData);
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
                  <div className="col-6 p-3 mb-4 bottom-border">
                    {/* blue area info */}
                    <div
                      className="alert alert-info"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      Add Country
                    </div>
                    <table className="table">
                      <tr>
                        <th>Country</th>
                      </tr>
                      <tr>
                        <td>
                          <input
                            onChange={handleOnChange}
                            name="name"
                            type="text"
                            className="form-control"
                            id="inputName4"
                            placeholder="Name"
                          />
                        </td>
                      </tr>
                      <button
                        type="submit"
                        value="Update"
                        className="btn btn-primary"
                        onClick={() => createCountry()}
                      >
                        Create
                      </button>
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
export default AddCountry;
