import './SignUp.css';
import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import Header from '../../components/Header/Header';
import toptepe from '../../assets/img/toptepe.png';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

const SignUp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        roleId:"",
        approvedAt:"",
        phone:"",
        password: "",
        passwordConfirmation: ""
    });
    const createUser = async (data) => {
        setIsLoading(true)
        const res = await fetch(`http://localhost:3000/users/register`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        });
        const json = await res.json();
        setIsLoading(false)
        if (json.success) {
            window.alert(json.messages)
            navigate("/signin")
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
            <div className="container">
                <div className="d-flex justify-content-center h-100 p-3">
                    <div className="card">
                        <div className="card-header">
                            <h3>Sign Up</h3>

                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><PersonIcon /></span>
                                    </div>
                                    <input type="text" name="name" className="form-control" placeholder="Username" onChange={handleOnChange} />
                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><PersonIcon /></span>
                                    </div>
                                    <input type="email" name="email" className="form-control" placeholder="Email" onChange={handleOnChange} />
                                </div>
                                <div className=" mb-3 input-group form-group">
                                    <label htmlFor="accountType" className="form-label mb-3 m-2">User</label>
                                    <input type="radio"  name='roleId' value="3"  onChange={handleOnChange} />
                                    <label htmlFor="accountType" className="form-label mb-3 m-2">Company</label>
                                    <input type="radio" name='roleId' value="2"  onChange={handleOnChange} />
                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><LockIcon /></span>
                                    </div>
                                    <input type="phone" name="phone" className="form-control" placeholder="Phone" onChange={handleOnChange} />
                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><LockIcon /></span>
                                    </div>
                                    <input type="password" name="password" className="form-control" placeholder="Password" onChange={handleOnChange} />
                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><LockIcon /></span>
                                    </div>
                                    <input type="password" name="passwordConfirmation" className="form-control" placeholder="PasswordConfirmation" onChange={handleOnChange} />
                                </div>
                                <div className="input-group form-group">
                                <div className="form-group">
                                    <input type="submit" value="SignUp" className="btn float-right login_btn" />
                                </div>
                                       {/*  <button type="submit" className="btn btn-primary1 w-50" disabled={isLoading}>
                                            {isLoading ? "Please Wait" : "Register"}
                                        </button> */}
                                                                  
                                 </div>
                            </form>
                        </div>
                        <div className="card-footer">
                            <div className="d-flex justify-content-center links">
                                If you have an account?<a href="/signin">Sign In</a>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>



            {/* ENDDDDDDDDDDDDDD */}
         {/*  <div classNameName="container my-4">
                <div classNameName='row'>
                    <div className="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                        <div className="Register_register__csfwh my-5 p-5 " >
                            <div className='Register_logo__-jKtP mb-4'>
                                <img className='logo-img' src={toptepe} alt="react-logo"/>

                            </div>

                            <h1 className="Register_title__QRiY2 mb-4">Create Account</h1>
                            <form onSubmit={handleSubmit} >


                                <div className="form-field mb-3">
                                    <label htmlFor="namePlace" className="mb-2">Name</label>
                                    <input type="text" className="form-control" name='name' onChange={handleOnChange} />
                                </div>
                                <div className="form-field mb-3">
                                    <label htmlFor="email" className="form-label">Email Address</label>
                                    <input type="email" className="form-control" name='email' onChange={handleOnChange} />
                                </div>
                                <div className=" mb-3">
                                    <label htmlFor="accountType" className="form-label mb-3 m-2">User</label>
                                    <input type="radio"  name='roleId' value="3"  onChange={handleOnChange} />
                                    <label htmlFor="accountType" className="form-label mb-3 m-2">Company</label>
                                    <input type="radio" name='roleId' value="2"  onChange={handleOnChange} />
                                </div>
                                <div className="form-field mb-3">
                                    <label htmlFor="phone" className="form-label">Phone</label>
                                    <input type="phone" className="form-control" name='phone' onChange={handleOnChange} />
                                </div>
                                <div className="form-field mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" name='password' onChange={handleOnChange} />
                                </div>
                                <div className="form-field mb-3">
                                    <label htmlFor="passwordConfirm" className="form-label">password Confirmation</label>
                                    <input type="Password" className="form-control" name='passwordConfirmation' onChange={handleOnChange}></input>
                                </div>
                                <div className='end row mt-5 align-items-center'>
                                    <div className='col-5'>
                                        <Link className="loginLink w-100" to={"/signin"}>Login</Link>
                                    </div>
                                    <div className='col-7'>
                                        <button type="submit" className="btn btn-primary1 w-50" disabled={isLoading}>
                                            {isLoading ? "Please Wait" : "Register"}
                                        </button>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>  */}


        </>

    )
}

export default SignUp;