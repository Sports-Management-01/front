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
        
  
      <Nav/>
      <Sidenav/>
        </div>

        </>
    )
}

export default AdminDashboard;