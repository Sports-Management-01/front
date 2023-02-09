

import React from 'react';
import SideNav from '../../components/SideNav/SideNav';
import Nav from '../../components/Nav/Nav';


const Profile = () => {
    return (
       <>
       <Nav/>
      <div className='user-hero' style={{display:"flex"}}>
      <SideNav/>
      <h1>Profileeeeee</h1>
      </div>
      
       </>
    );
}

export default Profile;
