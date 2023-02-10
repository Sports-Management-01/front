import logo from "../../assets/img/logo.png";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import PersonIcon from '@mui/icons-material/Person';


const Header = () => {
  const [categories, setCategories] = useState([]);
  const { token } = useContext(AuthContext);
  const {user, setUser} = useContext(AuthContext);
  const getCategory = async () => {
    const res = await fetch(`http://localhost:3000/categories`, {
      method: "GET",
    }
    );
    const json = await res.json();
    console.log(json);
    if (json.success) {
      console.log(json.success)
      setCategories(json.data)
    } else {
      window.alert("There is no category!");
    }
  };
  useEffect(() => {
    getCategory();
}, []);
  
  return (
    <header className="header">
      <div className="header__top">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <ul className="header__top__widget">
                <li>
                  <span className="icon_pin_alt"></span>{" "}
                  Büyükşehir,Beylikdüzü/İstanbul
                </li>
                <li>
                  <span className="icon_phone"></span> (+90) 538-411-99-85
                </li>
              </ul>
            </div>
            {/* Check if there is token or NOT to display login register logout */}
           
            {
             (!token ?
               (<>
                <div className="col-lg-5">
              <div className="header__top__right">
                <div className="header__top__auth">
                  <ul>
                 <li>
                      <Link to={"/signin"}>Login</Link>
                    </li>
                    <li>
                      {" "}
                      <Link to={"/signup"}>Register</Link>
                    </li>
                   </ul>
                   </div>
                   </div>
                   </div>
               </>)
             :(
              <>
                <div className="col-lg-5">
              <div className="header__top__right">
                <div className="header__top__auth">
                  <ul>
                    <li>
                      {(user.roleId==1) ?(<><Link to={`/adminDashboard/${user.id}`}><PersonIcon/></Link></>)
                      :(<><Link to={`/profile/${user.id}`}><PersonIcon/></Link>
                      </>)}
                    
                    </li>
                    <li>
                      {" "}
                      <Link to={"/signout"}>LogOut</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
              </>
             ))
            }
          
          </div>
        </div>
      </div>
      <div className="header__nav__option">
        <div className="container">
          <div className="row">
            <div className="col-lg-2">
              <div className="header__logo">
                <a href="./index.html">
                  <img src={logo} alt="" />
                </a>
              </div>
            </div>
            <div className="col-lg-10">
              <div className="header__nav">
                <nav className="header__menu">
                  <ul className="menu__class">
                    <li className="active">
                      <a href="/">Home</a>
                    </li>
                    <li>
                      <a href="/exploreFields">Courts</a>
                    </li>
                    <li>
                      <a href="./about.html">About Us</a>
                    </li>
                    <li>
                      <a href="#">Category</a>
                      <ul className="dropdown">
                        {
                          categories.map((category, i)=> (
                            <li>{category.name}</li>
                          )
                            )
                        }
                          
                         
                      </ul>
                    </li>
                    <li>
                      <a href="./blog.html">News</a>
                    </li>
                    <li>
                      <a href="./contact.html">Contact</a>
                    </li>
                  </ul>
                </nav>
                <div className="header__nav__widget">
                  <a href="/exploreFields">
                    Book Now <span className="arrow_right"></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="canvas__open">
            <span className="fa fa-bars"></span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
