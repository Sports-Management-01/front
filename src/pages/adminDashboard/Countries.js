import React from "react";
import Nav from "../../components/Nav/Nav";
import {Link , NavLink, useParams } from "react-router-dom";
import SideNav from "../../components/SideNav/SideNav";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useRef } from "react";
const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [counter, setCounter] = useState(0);
  const nameRef= useRef()
  const token = useContext(AuthContext);
  const { id } = useParams();

  const [updateCountry, setUpdateCountry] = useState({
    name:""
  });


  const allCountries = async () => {
    const res = await fetch(`http://localhost:3000/countries/`, {
      method: "GET",
      body: null,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
    });
    const json = await res.json();
    if (json.success) {
      setCountries(json.data);
      setUpdateCountry(json.data);
    } else {
      window.alert("There is no Countries!");
      console.log(json.data);
    }
  };
  //   const getCountry = async () => {
  //     const res = await fetch(`http://localhost:3000/countries/${id}`, {
  //       method: "GET",
  //       body: null,
  //       headers: {
  //         "content-type": "application/json",
  //         Authorization: `Bearer ${token.token}`,
  //       },
  //     });
  //     const json = await res.json();
  //     if (json.success) {
  //       console.log(json.data);
  //       setCountries(json.data);
  //       setUpdateCountry(json.data);

  //     } else {
  //       window.alert("There is no Equipment!");
  //       console.log(json.data);
  //     }
  //   };
  useEffect(() => {
    allCountries();
    // getCountry()
  }, [counter]);

  const deleteCountry = async (id) => {
    const res = await fetch(`http://localhost:3000/countries/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
    });
    const json = await res.json();

    if (json.success) {
      const oldData = [...countries]
      const newData = oldData.filter((item)=> item.id === id)
      setCountries(newData)
      window.alert(json.messages);
      setCounter(counter + 1);
    }
  };
  const editCountry = async (id) => {
    const response = await fetch(`http://localhost:3000/countries/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
      body: JSON.stringify({
        name: nameRef.current.value,
      }),
    });
    const json = await response.json();
    console.log(json)
    if (json.success) {
      alert(json.messages);
      setUpdateCountry(json.data);
    } else {
      alert(json.messages);
    }
  };
  // const handleOnChange = (e) => {
  //   updateCountry[e.target.name] = e.target.value;
  //   // const updatedData = { ...updateCountry };
  //   // updatedData[e.target.name] = e.target.value;
  //   // setUpdateCountry(updatedData);
  // };
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
                      Countries
                      <NavLink
                        to={"/addcountry"}
                        className="btn"
                        style={{ backgroundColor: "rgb(236 192 14 / 76%)" }}
                      >
                        Add Country
                      </NavLink>
                    </div>
                    <table className="table">
                      <tr>
                        <th>Countries</th>
                        <th>Options</th>
                      </tr>

                      {countries?.map((country, i) => (
                        <>
                          <tr>
                            <td>
                              <input
                                defaultValue={country.name}
                                ref={nameRef}
                                name="name"
                                type="text"
                                className="form-control"
                                id="inputName4"
                                placeholder="Country"
                              />
                            </td>
                            <td>
                            <Link to={`/updatecountry/${country.id}`} className="btn-primary btn m-1" >
                          Edit
                          </Link>
                              <input
                                className="btn-danger btn"
                                type="button"
                                value="Delete"
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      "Are you sure you want to delete this country?"
                                    )
                                  ) {
                                    deleteCountry(country.id);
                                    console.log(
                                      "Country has been deleted successfully..."
                                    );
                                  } else {
                                    console.log("Country did not deleted!");
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

export default Countries;
