import React from "react";
import Nav from "../../components/Nav/Nav";
import SideNav from "../../components/SideNav/SideNav";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
const Equipment = () =>{
    const [equipment, setEquipment] = useState([]);
  const {token} = useContext(AuthContext);
  const allEquipment = async () => {
    const res = await fetch(`http://localhost:3000/equipments`, {
      method: "GET",
      body: null,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await res.json();
    if (json.success) {
      console.log(json.data);
      setEquipment(json.data);
    } else {
      window.alert("There is no Equipment!");
      console.log(json.data);
    }
  };
  useEffect(() => {
    allEquipment();
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

                      {equipment?.map((role, i) => (
                        
                        <>
                          <tr>
                            <td>{equipment.name}</td>
                            <td>{equipment.require}</td>
                            
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
    )
}
export default Equipment