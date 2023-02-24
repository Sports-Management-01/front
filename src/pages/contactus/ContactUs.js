import React, { useState } from "react";
import SideNav from "../../components/SideNav/SideNav";
import Nav from "../../components/Nav/Nav";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const FORM_ENDPOINT = "https://public.herotofu.com/v1/14c7c330-b38d-11ed-9d71-876aa2478536"; // TODO - fill on the later step

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = () => {
    setTimeout(() => {
      setSubmitted(true);
    }, 100);
  };

  if (submitted) {
    return (
      <>
      <Header/>
      <div className="container">
                <div className="d-flex justify-content-center h-100 p-3">
                    <div className="card">
                        <div className="card-header">

        <div className="text-2xl">Thank you!</div>
        <div className="text-md">We'll be in touch soon.</div>
        </div>
        </div>
        </div>
        </div>
        <Footer/>
      </>
    );
  }

  return (
    <>
            <Header />
            
            <div className="container">
                <div className="d-flex justify-content-center h-100 p-3">
                    <div className="card">
                        <div className="card-header">
                            <h3>Contact Us</h3>

                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}
                            action={FORM_ENDPOINT}
                            method="POST"
                            target="_blank"
                            >

                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"></span>
                                    </div>
                                    <input type="text" name="name" className="form-control" placeholder="username"/>

                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"></span>
                                    </div>
                                    <input type="email" name="email" className="form-control" placeholder="Email"/>
                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"></span>
                                    </div>
                                    <input type="text" name="message" className="form-control" placeholder="Message" />
                                </div>
                                <div className="form-group">
                                    <input type="submit" value="Send" className="btn float-right login_btn" />
                                </div>
                            </form>
                        </div>
                      
                    </div>
                </div>
            </div>
            <Footer />
        </>
   
    
  );
};

export default ContactForm;