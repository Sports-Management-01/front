import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useEffect, useRef, useState } from "react";
import HomeField from "../HomeField/HomeField";
import { Link } from "react-router-dom";
import {  useNavigate } from "react-router-dom";

const HomeFields = () => {
    const  navigate = useNavigate();
    const [fields, setFields] = useState([])
    const allFields = async () => {
        const res = await fetch(`http://localhost:3000/fields`, {
            method: 'GET',
        });
        const json = await res.json();
        if (json.success) {
            console.log(`fielddddd`)
            setFields(json.data)
        }
        else {
            window.alert("There is no Field!")
            console.log(json.data)
        }
    }
    
    useEffect(() => {
        allFields();
    }, []);

    return (
        <>

            <section className="home-room spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title">
                                <h5>OUR Courts</h5>
                                <h2>Explore Our Courts</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        {
                            fields.slice(0, 4)?.map((field, i) => (<HomeField key={i} data={field} />))
                        }
                    </div>
                </div>
                <div className="container">
                    <div className="home__explore">
                        <div className="row">
                            <div className="col-lg-9 col-md-8">
                                <h3>Planning your next match? Save up to 25% on your challange</h3>
                            </div>
                            <div className="col-lg-3 col-md-4 text-center">
                            <Link className="primary-btn " to={"/exploreFields"}>Explore More</Link>    
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )

}

export default HomeFields; 