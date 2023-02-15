import React from "react";
import Nav from "../../components/Nav/Nav";
import SideNav from "../../components/SideNav/SideNav";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
const dayjs = require("dayjs");

const Equipment = () => {

  const [equipment, setEquipment] = useState([]);
  const token = useContext(AuthContext);


  const allEquipment = async () => {
    const res = await fetch(`http://localhost:3000/equipment/`, {
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
      setEquipment(json.data);
    } else {
      window.alert("There is no Category!");
      console.log(json.data);
    }
  };
  useEffect(() => {
   allEquipment();
  }, []);


 /*  const handleOnChange = (e) => {
    userData[e.target.name] = e.target.value;
    const updatedData = {...userData}
    updatedData[e.target.name] = e.target.value;
    setUserData(updatedData)
    setUser(updatedData)
  }; */
 

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
                    <div className="alert alert-info">Equipments</div>
                    <table className="table">
                      <tr>
                        <th> Name</th>
                        <th>Status</th>
                       <th>icon</th>
                      </tr>

                      {equipment?.map((c, i) => (
                        
                        <>
                          <tr>
                            <td>{c.name}</td>
                            <td>{c.isActive}</td>
                            <td>
                          
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

export default Equipment;
