import React from "react";
import Nav from "../../components/Nav/Nav";
import SideNav from "../../components/SideNav/SideNav";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const AddState = ()=>{
    const token = useContext(AuthContext);
    const [state, setState] = useState({});
  const [countries, setCountries] = useState([])


    const createState = async () => {
        const res = await fetch(`http://localhost:3000/states/`, {
          method: "POST",
          body: JSON.stringify(state),
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token.token}`,
          },
        });
        const json = await res.json();
        if (json.success) {
          console.log(json.data);
          setState(json.data);
          window.alert("State has been added!");
        } else {
          window.alert("State has not been added!");
          console.log(json.data);
        }
      };
      const allCountries = async ()=>{
        const res = await fetch(`http://localhost:3000/countries`,{
            method: "GET",
        });
        const json = await res.json()
        if(json.success){
            console.log(json.success)
            setCountries(json.data)
        }else {
            window.alert("There is no Country!");
            console.log(json.data);
          }
    
    };
    useEffect(()=>{
        allCountries();
    }, [])
      const handleOnChange = (e) => {
        // equipment[e.target.name] = e.target.value;
        const updatedData = {...state}
        if (e.target.nodeName === "SELECT") {
          updatedData[e.target.name] = e.target.options[e.target.selectedIndex].value;
        } else {
          updatedData[e.target.name] = e.target.value;
        }
        console.log(updatedData)
        setState(updatedData)
      };
    return(
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
                    <div className="alert alert-info" style={{display: "flex", justifyContent:"space-between", alignItems:"center"}}>Edit State 
                    </div>
                    <table className="table">
                      <tr>
                        <th>State</th>
                        <th>Country</th>
                      </tr>
                     
                          <tr>
                          <td><input
                           onChange={handleOnChange}
                            name="name"
                            type="text"
                            className="form-control"
                            id="inputName4"
                            placeholder="Name"
                          /></td>
                                  <td>
                            <select selected
                           name="countryId"
                           onChange={handleOnChange} 
                           id="inputState"
                           className="form-control"
                         >
                            <option selected>Choose...</option>

                          {
                            countries.map((country,i)=> country.countryId == country.id ? (
                              <option key={i} value={country.id} selected>{country.name}</option>):
                              (<option key={i} value={country.id} >{country.name}</option>
                          ))}
                          
                         
                          </select></td>
                          
                        </tr>
                        <button  type="submit" value="Update" className="btn btn-primary" onClick={()=>createState()}>Create</button>
                      
                      
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
export default AddState