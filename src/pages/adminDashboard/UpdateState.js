import React from "react";
import Nav from "../../components/Nav/Nav";
import SideNav from "../../components/SideNav/SideNav";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const UpdateState = ()=>{
    const token = useContext(AuthContext);
    const { id } = useParams();
  const [countries, setCountries] = useState([])

    const [state , setState] = useState({})
    const [editState, setEditState] = useState({
      name:"",
      countryId:"",
    });

    const getState = async () => {
        const res = await fetch(`http://localhost:3000/states/${id}`, {
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
          setState(json.data);
          setEditState(json.data)
        } else {
          window.alert("There is no State!");
          console.log(json.data);
        }
      };
      useEffect(() => {
        getState();
      }, []);
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
    const editstate =  async (e) => {
        const res = await fetch(`http://localhost:3000/states/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': "Application/json",
              'Authorization': `Bearer ${token.token}`,
          },
          body: JSON.stringify({
            ...editState
          }),
      });
      const json = await res.json();
      
      if (json.success){
          console.log(json)
          window.alert(json.messages)
          setEditState(json.data)
          
      }
      else{
          window.alert(json.messages)
      }
      
      }
    const handleOnChange = (e) => {
        // equipment[e.target.name] = e.target.value;
        const updatedData = {...state}
        if (e.target.nodeName === "SELECT") {
          updatedData[e.target.name] = e.target.options[e.target.selectedIndex].value;
        } else {
          updatedData[e.target.name] = e.target.value;
        }
        console.log(updatedData)
        setEditState(updatedData)
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
                    <div className="alert alert-info" style={{display: "flex", justifyContent:"space-between", alignItems:"center"}}>Edit State 
                    </div>
                    <table className="table">
                      <tr>
                        <th>State</th>
                        <th>Country</th>
                      </tr>
                     
                          <tr>
                          <td><input
                           defaultValue={state.name}
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
                          {
                            countries.map((country,i)=> state.countryId == country.id ? (
                              <option key={i} value={country.id} selected>{country.name}</option>):
                              (<option key={i} value={country.id} >{country.name}</option>
                          ))}
                          
                         
                          </select></td>
                        </tr>
                        <button  type="submit" value="Update" className="btn btn-primary" onClick={()=>editstate(state.id)}>Update</button>
                      
                      
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

export default UpdateState