

import React from 'react';
import logo from "../../assets/img/logo.png"

const Nav = () => {
    return (
        <nav style={{ backgroundColor: "#1a1a1a" }} className="sb-topnav navbar navbar-expand navbar-dark ">
            <img src={logo} />
            <form style={{ paddingLeft: "235px" }} className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                <button style={{ backgroundColor: "#E9AD28", border: "#E9AD28", color: "black" }} className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        </nav>
    );
};




export default Nav;
