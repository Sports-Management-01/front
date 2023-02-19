import React from "react";
import Nav from "../../components/Nav/Nav";
import { NavLink, useParams } from "react-router-dom";
import SideNav from "../../components/SideNav/SideNav";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
const States = ()=>{
  const [states, setStates] = useState([]);
  const [counter, setCounter] = useState(0);
  const token = useContext(AuthContext);
  const { id } = useParams();


    const allStates = async () => {
        const res = await fetch(`http://localhost:3000/states/`, {
          method: "GET",
          body: null,
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token.token}`,
          },
        });
        const json = await res.json();
        if (json.success) {
          console.log(json.data);
          setStates(json.data);
        } else {
          window.alert("There is no States!");
          console.log(json.data);
        }
      };
      useEffect(() => {
        allStates();
        // getCountry()
      }, [counter]);
    return(
        <>
        

        
        </>
    )
}
export default States 