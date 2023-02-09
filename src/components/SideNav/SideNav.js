import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Link, NavLink } from "react-router-dom";
import Header from "../Header/Header"
import Hero from "../Hero/Hero";

import Profile from "../../pages/profile/Profile";

const SideNav = ()=> {
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
          <MenuItem   icon={<PeopleOutlinedIcon />}>Team</MenuItem>
          <MenuItem icon={<ContactsOutlinedIcon />}>Contacts</MenuItem>
          <MenuItem   icon={<ReceiptOutlinedIcon />}><NavLink to={'/profile'} >Profile</NavLink> </MenuItem>
          <MenuItem icon={<HelpOutlineOutlinedIcon />}>FAQ</MenuItem>
          <MenuItem icon={<CalendarTodayOutlinedIcon />}>Calendar</MenuItem>
        </Menu>
      </Sidebar>
     {/*  <main> */}
       {/*  {toggled? (<Profile/>):(<h1>Nooooooooooo</h1>)}
        <h1 style={{ color: "black", marginLeft: "5rem" }}>
         user Dashboard
        </h1>
      </main> */}
    </div>
    </>
  );
}

export default SideNav;