import React from "react";
import Nav from "../../components/Nav/Nav";
import SideNav from "../../components/SideNav/SideNav";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Map from "./Map";
import { useState, useRef, useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { timesOptions } from "../../utils/utils";
import { useParams } from "react-router-dom";

const UpdateCourt = () => {
  const [longitude, setLongitude] = useState(28.5);
  const [latitude, setLatitude] = useState(40.5);
  const { user, token } = useContext(AuthContext);
  const [image, setImage] = useState();
  const [categories, setCategories] = useState([])
  const [states, setStates] = useState([])
  const {id} = useParams()
  const [ field , setField ] = useState({}) 
  const [fieldData, setFieldData] = useState({
    name: "",
    category: 0,
    images: [],
    adress: "",
    state: 0,
    length: "",
    width: "",
    hourPrice: "",
    isActive: 1,
    from: "",
    to: "",
  });

  const getCourt = async ()=>{
const res = await fetch(`http://localhost:3000/fields/${id}`,{
method: "GET",

});
const json = await res.json()
  if(json.success) {
    setField(json.data)

  }
  }

  const updateCourt = async (e) => {
    e.preventDefault();
    const form = e.target;
    const newCourt = new FormData(form);
    const response = await fetch(`http://localhost:3000/fields/${id}`, {
      method: "put",
      body: newCourt,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: `application/json`,
      },
    });
    const json = await response.json();
    console.log(field)
   if(json.success){
    setField(json.data)
    console.log(field)
   }
  };


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
    getCourt()
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

  function handleChange(e) {
    setImage(URL.createObjectURL(e.target.files[0]));
    fieldData.image = image;
    console.log(user.image);
    console.log(e.target.files[0]);
  }
  const handleOnChange = (e) => {
    fieldData[e.target.name] = e.target.value;
    fieldData[latitude] = latitude;
    fieldData[longitude] = longitude;
    const updatedData = { ...fieldData };
    updatedData[e.target.name] = e.target.value;
    setFieldData(updatedData);
  };

  console.log(field)
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
                    <div className="alert alert-info">Add Court</div>
                    <form onSubmit={updateCourt}>
                      <div className="form-row">
                        <div className="form-group col-md-3">
                          <label for="inputEmail4">Name</label>
                          <input
                          defaultValue={field?.name}
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
                            categories.map((cat,i)=>(
                              <>
                              <option value={cat.id}>{cat.name} </option>
                              </>
                            ))
                          }
                         
                          </select>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-3">
                          <label for="inputEmail4" >Address</label>
                          <input
                            defaultValue={field?.adress}
                            name="adress"
                            onChange={handleOnChange} 
                            type="text"
                            className="form-control"
                            id="inputName4"
                            placeholder="Name"
                          />
                        </div>
                        <div className="form-group col-md-3">
                          <label for="inputState">State</label>
                          <select selected={field.stateId} id="inputState" className="form-control" onChange={handleOnChange} name='stateId' >
                            {
                              states.map((state,i)=>(
                            <option  value={state.id} selected>{state.name}</option>


                              ))
                            }
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
                            defaultValue={field?.hourPrice}
                            name="hourPrice"
                            onChange={handleOnChange} 
                            type="text"
                            className="form-control"
                            id="inputName4"
                          />
                        </div>
                        <div className="form-group col-md-3">
                          <label for="inputState">Status</label>
                          <select id="inputState" className="form-control" onChange={handleOnChange} >
                            <option  selected name='isActive' value='1'>Active{/* {fieldData.isActive == 1?fieldData.isActive=1:fieldData.isActive=0} */}</option>
                            <option name='isActive' value='0'>Not Active </option>
                          </select>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-3">
                          <label for="inputState">From</label>
                          <select selected={field.from} id="inputState" className="form-control" onChange={handleOnChange} name='from'>
                            <option >Choose...</option>
                            {timesOptions.map((item, i) => (
                              <>
                                <option key={i} value={item}>{item}</option>
                              </>
                            ))}
                          </select>
                        </div>
                        <div className="form-group col-md-3">
                          <label for="inputState">To</label>
                          <select  id="inputState" className="form-control" onChange={handleOnChange} name='to'>
                            <option defaultValue={field.to} selected>Choose...</option>
                            {timesOptions.map((item, i) => (
                              <>
                                <option key={i} value={item}>{item}</option>
                              </>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="form-group">
                        <label for="exampleFormControlFile1">
                          Upload Court Images
                        </label>
                        <img
                          id="blah"
                          alt="your image"
                          width="100"
                          height="100"
                        />
                        {
                          field?.image?.map((singleImage , i)=>(
                            <input 
                            key={i}  
                            filename={singleImage.url}
                            src={singleImage.ur}
                            type="file"
                            name="image"
                            onchange={handleChange}
                          />
                          ))
                        }
                      
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
                           onChange= {handleOnChange}
                          />
                        </Wrapper>
                      </div>
                      <button  type="submit" className="btn btn-primary">
                        update
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
