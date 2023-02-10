import '../../pages/signup/SignUp.css';
import { useState, useContext } from 'react';
import {  useNavigate } from "react-router-dom";
import {Loading} from "../../components/loading/Loading";
import { AuthContext } from '../../contexts/AuthContext';
import Header from '../../components/Header/Header';
import logo2 from '../../assets/logo/logo2.PNG'
import Footer from "../../components/Footer/Footer";

const SignIn =() =>{

    const authCtx = useContext(AuthContext)

    const  navigate = useNavigate();
    const [userData, setUserData] = useState({
        email:"",
        password:"",
       
    });
    const createUser = async (data) => {
        const res = await fetch(`http://localhost:3000/users/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        });
        const json = await res.json();
        if (json.success){
            authCtx.signin(json.data, json.token)
            window.alert(json.messages)
            navigate("/")
        }
        else{
            window.alert(json.messages)
        }
      };
    const handleOnChange = (e) => {
        userData[e.target.name] = e.target.value;
        const updatedData = {...userData}
        updatedData[e.target.name] = e.target.value;
        setUserData(updatedData)
      };
      const handleSubmit = async (event) => {
        event.preventDefault();
        await createUser(userData);
      };
    return(
       /*  {isLoading ? <Loading/> : } */
       <>
<Header/>
        <div className="container ">
        <div className="row login-box">

            <div className="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 " id='SignUp'>
                <form onSubmit={handleSubmit}>
                    <div className="logoandtitle mb-4 mt-3 " >
                        <div className='logo logo-img'>
                            <img src={logo2} />
                        </div>
                        <h2 className=" mb-3 mt-3">Login</h2>
                    </div>     
                    
               
                <div className="mb-3">
                    <label htmlFor="email"  className="form-label">Email Address</label>
                    <input  type="email"  className="form-control" name='email'   onChange={handleOnChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password"  className="form-label">Password</label>
                    <input  type="password" className="form-control"  name='password'   onChange={handleOnChange}/>
                </div>
               
                <div className='optionButtons'>
                    <button onClick={()=>navigate('/signup')}  type="button" className="btn  btn-secondary2" style={{padding:10,}}>Go To Register</button>
                    <button  type="submit" className="btn btn-primary1" >Login</button>
                </div>
                </form>
            </div>
        </div>
    </div>
    <Footer />
    </>
    )
}

export default SignIn;