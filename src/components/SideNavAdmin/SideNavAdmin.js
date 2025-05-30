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


const SideNavAdmin = ()=> {
  const { id } = useParams();

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
          <MenuItem   icon={<HomeOutlinedIcon />}><NavLink to={'/'} >Home</NavLink> </MenuItem>
          <MenuItem   icon={<ReceiptOutlinedIcon />}><NavLink to={`/profile/${id}`} >Profile</NavLink> </MenuItem>
          <MenuItem   icon={<PeopleOutlinedIcon />}>Users</MenuItem> 
          <MenuItem   icon={<PeopleOutlinedIcon />}>Categories</MenuItem> 
          <MenuItem   icon={<PeopleOutlinedIcon />}>Courts</MenuItem> 
          <MenuItem   icon={<PeopleOutlinedIcon />}>Equipment</MenuItem> 
          <MenuItem   icon={<PeopleOutlinedIcon />}>Booking</MenuItem> 
          <MenuItem   icon={<PeopleOutlinedIcon />}>Roles</MenuItem> 
          <MenuItem   icon={<PeopleOutlinedIcon />}>Permissions</MenuItem> 
          <MenuItem icon={<LogoutIcon/>}>LogOut</MenuItem>
          
        </Menu>
      </Sidebar>
   
    </div>
    </>
  );
}

export default SideNavAdmin;