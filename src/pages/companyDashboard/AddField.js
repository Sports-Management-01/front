import React from "react";
import Nav from "../../components/Nav/Nav";
import SideNav from "../../components/SideNav/SideNav";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Map from "./Map";
import { useState, useRef, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";




const AddField = () => {
  const [longitude, setLongitude] = useState(28.5)
  const [latitude, setLatitude] = useState(40.5)
  const { user, token } = useContext(AuthContext);
  const [userData, setUserData] = useState(user);
const fieldImage=useRef()


  const createCourt = async(e)=>{
    e.preventDefault();
    const form = e.target;
    const newCourt = new FormData(form);
    const response = await fetch("http://localhost:3000/fields", {
      method: "post",
      body: newCourt,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: `application/json`,
      },
    });
    const json = await response.json();
    if(json.success){
    (alert(json.messages))
    setUserData([...user, ...json.data])

    } else{
      (alert(json.messages))
    }

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
                    <div className="alert alert-info">Add Court</div>
                    <form >
                      <div className="form-row">
                        <div className="form-group col-md-3">
                          <label for="inputEmail4">Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputName4"
                            placeholder="Name"
                          />
                        </div>
                        <div className="form-group col-md-3">
                          <label for="inputState">Category</label>
                          <select id="inputState" className="form-control">
                            <option selected>Choose...</option>
                            <option>Football</option>
                            <option>Basketball</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-3">
                          <label for="inputEmail4">Address</label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputName4"
                            placeholder="Name"
                          />
                        </div>
                        <div className="form-group col-md-3">
                          <label for="inputState">State</label>
                          <select id="inputState" className="form-control">
                            <option selected>Choose...</option>
                            <option>Football</option>
                            <option>Basketball</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-3">
                          <label for="inputEmail4">Length</label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputName4"
                            placeholder="Length"
                          />
                        </div>
                        <div className="form-group col-md-3">
                          <label for="inputEmail4">Width</label>
                          <input
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
                            type="text"
                            className="form-control"
                            id="inputName4"
                          />
                        </div>
                        <div className="form-group col-md-3">
                          <label for="inputState">Status</label>
                          <select id="inputState" className="form-control">
                            <option selected>Active</option>
                            <option>Not Active</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-row">
                        
                        <div className="form-group col-md-3">
                          <label for="inputState">From</label>
                          <select id="inputState" className="form-control">
                            <option selected>Choose...</option>
                            <option>08:00</option>
                            <option>09:00</option>
                          </select>
                        </div>
                        <div className="form-group col-md-3">
                          <label for="inputState">To</label>
                          <select id="inputState" className="form-control">
                            <option selected>Choose...</option>
                            <option>15:00</option>
                            <option>16:00</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-group">
                        <label for="exampleFormControlFile1">
                          Upload Court Images
                        </label>
                        <input
                          type="file"
                          className="form-control-file"
                          id="exampleFormControlFile1"
                        />
                      </div>
                      <div>
                        <Wrapper apiKey={'AIzaSyCG_3C9QPf5GdMaQ9V5R27n537RjXjv7V4'} >
                          <Map center={{ lat: latitude, lng: longitude }} setLat={setLatitude} setLng={setLongitude} zoom={8} />
                        </Wrapper>
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Create
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

export default AddField;
