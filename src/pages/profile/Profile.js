import React from 'react';
import SideNav from '../../components/SideNav/SideNav';
import Nav from '../../components/Nav/Nav';
import  { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const Profile = () => {
    const token = useContext(AuthContext);
    const { id } = useParams();
    const {user, setUser} = useContext(AuthContext);
    const [image, setImage] = useState();
    const [userData, setUserData] = useState({
            name: user.name,
            email: user.email,
            image:image,
            password: "",
            new_password: "",
            new_password_confirmation: "",
        }
    );
    const [userProfile, setUserProfile] = useState({
    name:"",
    email:"",
  });
  function handleChange(e) {
    setImage(URL.createObjectURL(e.target.files[0]));
    user.image = image;
    console.log(user.image)
    console.log(e.target.files[0])
  }

  const handleOnChange = (e) => {
    userData[e.target.name] = e.target.value;
    const updatedData = {...userData}
    updatedData[e.target.name] = e.target.value;
    setUserData(updatedData)
    setUser(updatedData)
  };
  const updateUser = async (e) => {
    const res = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'PUT',
        headers: {
            Accpet: "Application/json",
            Authorization: `Bearer ${token.token}`,
        },
        body: new FormData(e.target),
    });
    const json = await res.json();
   
    if (json.success){
        console.log(json)
        window.alert(json.messages)
       setUser(json.data)
       console.log(user)
        
    }
    else{
        window.alert(json.messages)
    }
    localStorage.setItem("the_user", JSON.stringify(json.data));
  }

  const handleSubmit = async (event) => {
   
    event.preventDefault();
   // console.log(userData.email)
    await updateUser(event);
    console.log(userData)
  };
  
 
  const getProfileData = async() =>  { 
   const res = await fetch(`http://localhost:3000/users/${id}`,{
    method: 'GET',
    body: null,
    headers: {
        "content-type" : "application/json",
        Authorization: `Bearer ${token.token}`
    },
});
const json = await res.json();
if(json.success)
{
    console.log(userData.name)
    console.log(userData.email)
    console.log(image)
    console.log(token)

}
  }
  useEffect(() => {
    getProfileData();
   
  }, []);
 
    return (
       <>
       <Nav/>
      <div className='user-hero' style={{display:"flex"}}>
      <SideNav/>
      <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="profile-data">
                        <form onSubmit={handleSubmit}>
                       <div className="col-12 p-3 mb-4 bottom-border">
                        {/* blue area info */}
                          <div className="alert alert-info">My Information</div>
                          {/* start profile fields */}
                          {/* Start avatar */}
                          <div className=" mb-3 person-avatar">
                            <label htmlFor="image" className="mx-auto my-2 d-block " style={{width:150}}>
                                <img name="image" value={user?.image} src={user?.image} className="d-block mx-auto rounded-circle w-100" width={150} alt="image"/>
                                    
                             </label>
                             <input name="image" type="file" id="image" 
                                className="position-absolute" onChange={handleChange} />
                            
                            <div className="mb-3">
                                <label htmlFor="name" className="mb-2">
                                    <small>Name <span className="text-danger">*</span>
                                    </small>
                                </label>
                                <input onChange={handleOnChange}  defaultValue={userData?.name}  name="name" type="text" id="name" className="form-control"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="mb-2">
                                    <small>Email Address <span className="text-danger">*</span>
                                    </small>
                                </label>
                                <input onChange={handleOnChange}  defaultValue={userData?.email}  name="email" type="email" id="email" className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="mb-2">
                                    <small>Password <span className="text-danger">*</span>
                                    </small>
                                </label>
                                <input onChange={handleOnChange} defaultValue={user.password}  name='password' type="password" id="password" className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="new_password" className="mb-2">
                                    <small>New Password </small>
                                </label>
                                <input onChange={handleOnChange} name="new_password" type="password"  className="form-control"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="new_password" className="mb-2">
                                    <small>New Password Confirmation</small>
                                </label>
                                <input onChange={handleOnChange} name="new_password_confirmation" type="password" id="password_confirmation" className="form-control"/>
                            </div>
                            <div className="mb-3">
                                <button type="submit"  className="btn btn-primary">Update Profile</button>
                            </div>
                          </div>
                          
                          {/* End profile fields */}
                       </div>
                       </form>
                     
                    </div>
                </div>
            </div>
        </div>
      </div>
      
       </>
    );
}

export default Profile;
