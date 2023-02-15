import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, NavLink, useParams  } from "react-router-dom";
import Header from "../Header/Header"
import Hero from "../Hero/Hero";
import Profile from "../../pages/profile/Profile";
import { AuthContext } from "../../contexts/AuthContext";
import  { useState, useContext, useEffect } from "react";

const SideNav = ()=> {
  const { id } = useParams();
  const {user, setUser} = useContext(AuthContext);
  const token = useContext(AuthContext);
  const {  collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } = useProSidebar();
  const toggle = () => {
    toggleSidebar();
    if (toggled) {
      console.log(true);
      collapseSidebar();
    } else {
      console.log(false);
      collapseSidebar();
    }
}
  return (
    <>
  
    <div id="user" style={({ height: "100vh" }, { display: "flex"/* , flexDirection: "row-reverse"  */})}>
      <Sidebar backgroundColor="#1a1a1a" rtl={false} style={{ height: "100vh" }} transitionDuration={300}>
        <Menu style={{color:"#E9AD28"}}>
          <MenuItem
            icon={<MenuOutlinedIcon />}
            onClick={() => {
              collapseSidebar();
            }}
            style={{ textAlign: "center" }}>
            {" "}
            <h2 color="#E9AD28"></h2>
          </MenuItem>
          {
            user.roleId == 1 ?  (
              <>
         <MenuItem    icon={<HomeOutlinedIcon />}><NavLink to={'/'} >Home</NavLink> </MenuItem>
          <MenuItem   icon={<ReceiptOutlinedIcon />}><NavLink to={`/profile/${id}`} >Profile</NavLink> </MenuItem>
          <MenuItem   icon={<PeopleOutlinedIcon />}><NavLink to={'/users'} >Users</NavLink></MenuItem> 
          <MenuItem   icon={<PeopleOutlinedIcon />}><NavLink to={'/categories'} >Categories</NavLink></MenuItem> 
          <MenuItem   icon={<PeopleOutlinedIcon />}><NavLink to={'/courts'} >Courts</NavLink></MenuItem> 
          <MenuItem   icon={<PeopleOutlinedIcon />}><NavLink to={'/equipment'} >Equipment</NavLink></MenuItem> 
          <MenuItem   icon={<PeopleOutlinedIcon />}>Booking</MenuItem> 
          <MenuItem   icon={<PeopleOutlinedIcon />}><NavLink to={'/roles'} >Roles</NavLink></MenuItem> 
          <MenuItem   icon={<PeopleOutlinedIcon />}><NavLink to={'/permissions'} >Permissions</NavLink></MenuItem> 
          <MenuItem icon={<LogoutIcon/>}><NavLink to={"/signout"}>LogOut</NavLink></MenuItem>
              </>
            ):(user.roleId == 3 ?(<>
          <MenuItem   icon={<HomeOutlinedIcon />}><NavLink to={'/'} >Home</NavLink> </MenuItem>
          <MenuItem   icon={<ReceiptOutlinedIcon />}><NavLink to={`/profile/${id}`} >Profile</NavLink> </MenuItem>
          <MenuItem   icon={<PeopleOutlinedIcon />}><NavLink to={`/myBooking`} >My Booking</NavLink></MenuItem> 
          <MenuItem   icon={<LogoutIcon/>}><NavLink to={"/signout"}>LogOut</NavLink></MenuItem>
            </>):(
              <>
          <MenuItem   icon={<HomeOutlinedIcon />}><NavLink to={'/'} >Home</NavLink> </MenuItem>
          <MenuItem    icon={<ReceiptOutlinedIcon />}><NavLink to={`/profile/${id}`} >Profile</NavLink> </MenuItem>
          <MenuItem    icon={<PeopleOutlinedIcon />}><NavLink to={`/company/fields`} >My Courts</NavLink></MenuItem> 
          <MenuItem    icon={<PeopleOutlinedIcon />}><NavLink to={`/company/reservations`} >Reservations</NavLink></MenuItem> 
          <MenuItem    icon={<LogoutIcon/>}><NavLink to={"/signout"}>LogOut</NavLink></MenuItem>      
              </>
            )
             
            )
          }
        
          
        </Menu>
      </Sidebar>
   
    </div>
    </>
  );
}

export default SideNav;