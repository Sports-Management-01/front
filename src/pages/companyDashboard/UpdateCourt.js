import React from "react";
import Nav from "../../components/Nav/Nav";
import SideNav from "../../components/SideNav/SideNav";
import Map from "./Map";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { useState, useRef, useContext, useEffect } from "react";
import { json, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { timesOptions } from "../../utils/utils";


const UpdateCourt = () => {
  const { id } = useParams();
const [field, setField] = useState([]);
const token = useContext(AuthContext);
const [longitude, setLongitude] = useState(28.5);
const [latitude, setLatitude] = useState(40.5);
const [image, setImage] = useState([]);
const [categories, setCategories] = useState([])
const [states, setStates] = useState([])

const getField = async() =>{
const res = await fetch(`http://localhost:3000/fields/${id}`, {
  method: "GET",
  body: null,
  headers: {
    "content-type": "application/json",
    'Authorization': `Bearer ${token.token}`,
  }
});
const json = await res.json();
if (json.success) {
  console.log(json.data);
  setField(json.data);
  console.log(field.length)
} else {
  window.alert("There is no Field!");
  console.log(json.data);
}
}
useEffect(() => {
 getField()
}, [])
const allCategories = async ()=>{
  const res = await fetch(`http://localhost:3000/categories`,{
      method: "GET",
  });
  const json = await res.json()
  if(json.success){
      console.log(json.success)
      setCategories(json.data)
  }else {
      window.alert("There is no Categories!");
      console.log(json.data);
    }

};
useEffect(()=>{
  allCategories();
}, [])
const allStates = async ()=>{
  const res = await fetch(`http://localhost:3000/states`,{
      method: "GET",
  });
  const json = await res.json()
  if(json.success){
      console.log(json.success)
      setStates(json.data)
  }else {
      window.alert("There is no state!");
      console.log(json.data);
    }

};
useEffect(()=>{
  allStates();
}, [])
const updateField =  async (e) => {
  e.preventDefault();
  const form = e.target;
    const updateCourt = new FormData(form);
    updateCourt.append('latitude', latitude);
    updateCourt.append('longitude', longitude);
  const res = await fetch(`http://localhost:3000/fields/${id}`, {
    method: 'PUT',
    headers: {
        Accpet: "Application/json",
        Authorization: `Bearer ${token.token}`,
    },
    body: updateCourt,
});
const json = await res.json();

if (json.success){
    console.log(json)
    window.alert(json.messages)
   setField(json.data)
   console.log(field.length)
    
}
else{
    window.alert(json.messages)
}

}

function handleChange(e) {
  setImage(URL.createObjectURL(e.target.files[0]));
  field.image = image;
  console.log(field.image)
  console.log(e.target.files[0])
}

const handleOnChange = (e) => {
  field[e.target.name] = e.target.value;
  const updatedData = {...field}
  updatedData[e.target.name] = e.target.value;
  setField(updatedData)
  setField(updatedData)
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
                    <div className="alert alert-info">Edit Court</div>
                    <form  onSubmit={updateField} >
                      <div className="form-row">
                        <div className="form-group col-md-3">
                          <label for="inputEmail4">Name</label>
                          <input
                           defaultValue={field.name}
                           onChange={handleChange}
                            name="name"
                            type="text"
                            className="form-control"
                            id="inputName4"
                            placeholder="Name"
                          />
                        </div>
                        <div className="form-group col-md-3">
                          <label for="inputState">Category</label>
                          <select selected
                           name="categoryId"
                           onChange={handleOnChange} 
                           id="inputState"
                           className="form-control"
                         >
                         
                        {
                            categories.map((category,i)=> field.categoryId == category.id ? (
                              <option key={i} value={category.id} selected>{category.name}</option>):
                              (<option key={i} value={category.id} >{category.name}</option>
                          ))}
                         
                          </select>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-3">
                          <label for="inputEmail4" >Address</label>
                          <input
                          defaultValue={field.name}
                          onChange={handleOnChange}
                            name="adress" 
                            type="text"
                            className="form-control"
                            id="inputName4"
                            placeholder="Name"
                          />
                        </div>
                        <div className="form-group col-md-3">
                          <label for="inputState">State</label>
                          <select id="inputState" className="form-control"
                           onChange={handleOnChange} name='stateId' >
                            {
                            states.map((s,i)=> field.stateId == s.id ? (
                              <option key={i} value={s.id} selected>{s.name}</option>):
                              (<option key={i} value={s.id} >{s.name}</option>
                          ))}
                          </select>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-3">
                          <label for="inputEmail4">Length</label>
                          <input
                            defaultValue={field?.length}
                            name="length"
                            onChange={handleOnChange} 
                            type="text"
                            className="form-control"
                            id="inputName4"
                            placeholder="Length"
                          />
                        </div>
                        <div className="form-group col-md-3">
                          <label for="inputEmail4">Width</label>
                          <input
                            defaultValue={field?.width}
                            name="width"
                            onChange={handleOnChange} 
                            type="text"
                            className="form-control"
                            id="inputName4"
                            placeholder="Width"
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-3">
                          <label for="inputEmail4">Hour Price</label>
                          <input
                             defaultValue={field.hourPrice}
                            name="hourPrice"
                            onChange={handleOnChange} 
                            type="text"
                            className="form-control"
                            id="inputName4"
                          />
                        </div>
                        <div className="form-group col-md-3">
                          <label for="inputState">Status</label>
                          <select id="inputState" className="form-control" 
                          name="isActive"
                          onChange={handleOnChange} 
                          value={field.isActive}>
                            <option  selected  value='1'>Active</option>
                            <option  value='0'>Not Active </option>
                           
                          </select>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-3">
                          <label for="inputState">From</label>
                          <select id="inputState" className="form-control"
                           onChange={handleOnChange} name='from'>
                            <option selected>Choose...</option>
                            {timesOptions.map((item, i) => field.from == item ? (
                                <option key={i} value={item} selected>{item}</option>):
                                (<option key={i} value={item} >{item}</option>
                            ))}
                          </select>
                        </div>
                        <div className="form-group col-md-3">
                          <label for="inputState">To</label>
                          <select id="inputState" className="form-control" 
                          onChange={handleOnChange} name='to'>
                            <option selected   >Choose...</option>
                            {timesOptions.map((item, i) => field.to == item ? (
                                <option key={i} value={item} selected>{item}</option>):
                                (<option key={i} value={item} >{item}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="form-group">
                        <label for="exampleFormControlFile1">
                          Upload Court Images
                        </label>
                        <img
        value={field?.image} src={field?.image} 
                          id="blah"
                          alt="your image"
                          width={150} 
                          height="100"
                        />
                        <input
                          type="file"
                          name="image"
                        
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <Wrapper
                          apiKey={"AIzaSyCG_3C9QPf5GdMaQ9V5R27n537RjXjv7V4"}
                        >
                          <Map
                            center={{ lat: latitude, lng: longitude }}
                            setLat={setLatitude}
                            setLng={setLongitude}
                            zoom={8}
                         /*   onChange= {handleOnChange} */
                          />
                        </Wrapper>
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Update
                      </button>
                    </form>
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


export default UpdateCourt;
