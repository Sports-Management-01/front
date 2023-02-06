import Navbar from "../../components/Navbar/Navbar";
import {useState} from 'react';
import { Link } from 'react-router-dom';


const AdminDashboard = () =>{
    const { collapseSidebar } = useProSidebar();
    const [scrollTop, setScrollTop] = useState(0);

    const handleScroll = event => {
      setScrollTop(event.currentTarget.scrollTop);
    };
    return(
        <>
        <div className="sb-nav-fixed"  style={{ display: 'flex'}}>
        
       {/*  <Sidebar style={{ display: 'flex',
         
          width: '100px',
          height: '500px',
          overflowY: 'scroll',
        }}   onScroll={handleScroll}  >
  <Menu>
    <MenuItem component={<Link to="/" />}> Documentation</MenuItem>
    <MenuItem component={<Link to="/calendar" />}> Calendar</MenuItem>
    <MenuItem component={<Link to="/e-commerce" />}> E-commerce</MenuItem>
    <MenuItem component={<Link to="/" />}> Documentation</MenuItem>
    <MenuItem component={<Link to="/calendar" />}> Calendar</MenuItem>
    <MenuItem component={<Link to="/e-commerce" />}> E-commerce</MenuItem>
    <MenuItem component={<Link to="/" />}> Documentation</MenuItem>
    <MenuItem component={<Link to="/calendar" />}> Calendar</MenuItem>
    <MenuItem component={<Link to="/e-commerce" />}> E-commerce</MenuItem>
    <MenuItem component={<Link to="/" />}> Documentation</MenuItem>
    <MenuItem component={<Link to="/calendar" />}> Calendar</MenuItem>
    <MenuItem component={<Link to="/e-commerce" />}> E-commerce</MenuItem>
    
  </Menu>
</Sidebar>
<main>
        <button onClick={() => collapseSidebar()}>Close</button>
      </main> */}
      <Nav/>
      <Sidenav/>
        </div>

        </>
    )
}

export default AdminDashboard;