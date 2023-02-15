import React from "react";
import Nav from "../../components/Nav/Nav";
import SideNav from "../../components/SideNav/SideNav";
import { Link, NavLink, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
const UpdateEquipment = ()=>{
    const {token} = useContext(AuthContext);
    const { id } = useParams();
    const [equipment , setEquipment] = useState([])

    const getEquipment = async () => {
        const res = await fetch(`http://localhost:3000/equipments/${id}`, {
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
        getEquipment();
      }, []);

    const updateEquipment =  async (e) => {
        e.preventDefault();
        
        const res = await fetch(`http://localhost:3000/equipments/${id}`, {
          method: 'PUT',
          headers: {
              Accpet: "Application/json",
              Authorization: `Bearer ${token.token}`,
          },
          body: e.target,
      });
      const json = await res.json();
      
      if (json.success){
          console.log(json)
          window.alert(json.messages)
          setEquipment(json.data)
          
      }
      else{
          window.alert(json.messages)
      }
      
      }
      const handleOnChange = (e) => {
        equipment[e.target.name] = e.target.value;
        const updatedData = {...equipment}
        updatedData[e.target.name] = e.target.value;
        setEquipment(updatedData)
      };

    return (
        <>
        <Nav/>
      <div className='user-hero' style={{display:"flex"}}>
      <SideNav/>
      <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="profile-data">
                <div className="table">
                  <div className="col-12 p-3 mb-4 bottom-border">
                    {/* blue area info */}
                    <div className="alert alert-info" style={{display: "flex", justifyContent:"space-between", alignItems:"center"}}>Edit Equipment 
                    </div>
                    <table className="table">
                      <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Multiple</th>
                      </tr>
                     
                          <tr>
                          <td><input
                           defaultValue={equipment.name}
                           onChange={handleOnChange}
                            name="name"
                            type="text"
                            className="form-control"
                            id="inputName4"
                            placeholder="Name"
                          /></td>
                          <td>
                            <input
                           defaultValue={equipment.price}
                           onChange={handleOnChange}
                            name="price"
                            type="text"
                            className="form-control"
                            id="inputName4"
                            placeholder="Price"
                          /></td>
                          <td> 
                            <select id="inputState" className="form-control" name="multiple"
                          onChange={handleOnChange} value={equipment.mulriple}>
                            <option  selected  value='1'>Yes</option>
                            <option  value='0'>No</option>
                           
                          </select>
                          </td>
                        </tr>
                        <button  type="submit" value="Update" className="btn btn-primary" onClick={()=>handleOnChange(equipment.id)}>Update</button>
                      
                      
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
export default UpdateEquipment