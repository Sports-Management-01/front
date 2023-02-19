import React from "react";
import Nav from "../../components/Nav/Nav";
import SideNav from "../../components/SideNav/SideNav";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const UpdateCountry = ()=>{
    const token = useContext(AuthContext);
    const { id } = useParams();
    const [country , setCountry] = useState({})
    const [updateCountry, setUpdateCountry] = useState({
      name:"",
     
    });

    const getCountry = async () => {
        const res = await fetch(`http://localhost:3000/countries/${id}`, {
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
          setCountry(json.data);
          setUpdateCountry(json.data)
        } else {
          window.alert("There is no Country!");
          console.log(json.data);
        }
      };
      useEffect(() => {
        getCountry();
      }, []);
      const editCountry =  async (e) => {
        const res = await fetch(`http://localhost:3000/countries/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': "Application/json",
              'Authorization': `Bearer ${token.token}`,
          },
          body: JSON.stringify({
            ...updateCountry
          }),
      });
      const json = await res.json();
      
      if (json.success){
          console.log(json)
          window.alert(json.messages)
          setUpdateCountry(json.data)
          
      }
      else{
          window.alert(json.messages)
      }
      
      }
      const handleOnChange = (e) => {
        country[e.target.name] = e.target.value;
        const updatedData = {...updateCountry}
        updatedData[e.target.name] = e.target.value;
        setUpdateCountry(updatedData)
 
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
                        <th>Country</th>
                      </tr>
                          <tr>
                          <td><input
                           defaultValue={country.name}
                           onChange={handleOnChange}
                            name="name"
                            type="text"
                            className="form-control"
                            id="inputName4"
                            placeholder="Name"
                          /></td>
                        </tr>
                        <button  type="submit" value="Update" className="btn btn-primary" onClick={()=>editCountry(country.id)}>Update</button> 
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

export default UpdateCountry