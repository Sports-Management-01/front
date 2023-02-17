import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import Footer from "../../components/Footer/Footer";
import Header from '../../components/Header/Header';

const ForgotPassword = () => {
    return (
        <>
         <Header/>
        <div className="container">
        <div className="d-flex justify-content-center h-100 p-3">
            <div className="card">
                <div className="card-header">
                    <h3>Sign In</h3>
                    
                </div>
                <div className="card-body">
                    <form >
                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><PersonIcon/></span>
                            </div>
                            <input type="email" name="email" className="form-control" placeholder="username" />
                            
                        </div>
                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><LockIcon/></span>
                            </div>
                            <input type="password"  name="password" className="form-control" placeholder="password" />
                        </div>
                        <div className="row align-items-center remember">
                            <input type="checkbox"/>Remember Me
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Login" className="btn float-right login_btn"/>
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
    <Footer/>
        </>
       
    );
}

export default ForgotPassword;
