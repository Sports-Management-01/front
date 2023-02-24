// import '../../pages/signup/SignUp.css';
import { useState, useContext } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loading } from "../../components/loading/Loading";
import { AuthContext } from '../../contexts/AuthContext';
import Header from '../../components/Header/Header';
import logo2 from '../../assets/logo/logo2.PNG'
import Footer from "../../components/Footer/Footer";
import './SignIn.css';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

const SignIn = () => {

    const authCtx = useContext(AuthContext)
    const [queryString] = useSearchParams()
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: "",
        password: "",

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
        if (json.success) {
            authCtx.signin(json.data, json.token)
            window.alert(json.messages)
            const backTo = queryString.get('back')
            if (backTo) {
                navigate(backTo)
            } else {
                navigate("/")
            }

        }
        else {
            window.alert(json.messages)
        }
    };
    const handleOnChange = (e) => {
        userData[e.target.name] = e.target.value;
        const updatedData = { ...userData }
        updatedData[e.target.name] = e.target.value;
        setUserData(updatedData)
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        await createUser(userData);
    };
    return (

        <>
            <Header />
            {/*   <div classNameName="container ">
        <div classNameName="row login-box">

            <div classNameName="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 " id='SignUp'>
                <form onSubmit={handleSubmit}>
                    <div classNameName="logoandtitle mb-4 mt-3 " >
                        <div classNameName='logo logo-img'>
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
    </div>  */}

            <div className="container">
                <div className="d-flex justify-content-center h-100 p-3">
                    <div className="card">
                        <div className="card-header">
                            <h3>Sign In</h3>

                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><PersonIcon /></span>
                                    </div>
                                    <input type="email" name="email" className="form-control" placeholder="username" onChange={handleOnChange} />

                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><LockIcon /></span>
                                    </div>
                                    <input type="password" name="password" className="form-control" placeholder="password" onChange={handleOnChange} />
                                </div>
                                <div className="row align-items-center remember">
                                    <input type="checkbox" />Remember Me
                                </div>
                                <div className="form-group">
                                    <input type="submit" value="Login" className="btn float-right login_btn" />
                                </div>
                            </form>
                        </div>
                        <div className="card-footer">
                            <div className="d-flex justify-content-center links">
                                Don't have an account?<a href="/signup">Sign Up</a>
                            </div>
                            <div className="d-flex justify-content-center">
                                <a href="/forgotpassword">Forgot your password?</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
};

export default SignIn;