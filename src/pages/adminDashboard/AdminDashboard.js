import SideNav from '../../components/SideNav/SideNav';
import Nav from '../../components/Nav/Nav';
import { Link } from "react-router-dom";
import {useState} from 'react';



const AdminDashboard = () =>{
    const [scrollTop, setScrollTop] = useState(0);

    const handleScroll = event => {
      setScrollTop(event.currentTarget.scrollTop);
    };
    return(
        <>
        <div className="sb-nav-fixed"  style={{ display: 'flex'}}>
        
  
    
      <SideNav/>
        </div>

        </>
    )
}

export default AdminDashboard;