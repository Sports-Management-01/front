import './SignUp.css';
import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import Header from '../../components/Header/Header';

const SignUp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
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
            <div className="container my-4">
                <div className='row'>
                    <div className="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                        <div className="Register_register__csfwh my-5 p-5 " >
                            <div className='Register_logo__-jKtP mb-4'>
                                <img className='logo-img' src="logo.svg" alt="react-logo" width={100} />

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
                                <div className="form-field mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" name='password' onChange={handleOnChange} />
                                </div>
                                <div className="form-field mb-3">
                                    <label htmlFor="passwordConfirm" className="form-label">password Confirmation</label>
                                    <input type="Password" className="form-control" name='password_confirmation' onChange={handleOnChange}></input>
                                </div>
                                <div className='row mt-5 align-items-center'>
                                    <div className='col-5'>
                                        <Link className="loginLink w-100" to={"/signin"}>Login</Link>
                                    </div>
                                    <div className='col-7'>
                                        <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
                                            {isLoading ? "Please Wait" : "Register"}
                                        </button>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default SignUp;