import logo from '../../assets/img/logo.png'
import {Link} from 'react-router-dom'
const Header = () => {
    return (
        <header className="header">
            <div className="header__top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7">
                            <ul className="header__top__widget">
                                <li><span className="icon_pin_alt"></span> Büyükşehir,Beylikdüzü/İstanbul</li>
                                <li><span className="icon_phone"></span> (+90) 538-411-99-85</li>
                            </ul>
                        </div>
                        <div className="col-lg-5">
                            <div className="header__top__right">
                                <div className="header__top__auth">
                                    <ul>
                                        <li><Link to={"/signin"}>Login</Link></li>
                                        <li> <Link to={"/signup"}>Register</Link></li>
                                        <li> <Link to={"/signout"}>LogOut</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header__nav__option">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-2">
                            <div className="header__logo">
                                <a href="./index.html"><img src={logo} alt="" /></a>
                            </div>
                        </div>
                        <div className="col-lg-10">
                            <div className="header__nav">
                                <nav className="header__menu">
                                    <ul className="menu__class">
                                        <li className="active"><a href="/">Home</a></li>
                                        <li><a href="/exploreFields">Courts</a></li>
                                        <li><a href="./about.html">About Us</a></li>
                                        <li><a href="#">Category</a>
                                            <ul className="dropdown">
                                                <li><a href="./about.html">Football</a></li>
                                                <li><a href="./room-details.html">Basketball</a></li>
                                                <li><a href="./blog-details.html">Tenis</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="./blog.html">News</a></li>
                                        <li><a href="./contact.html">Contact</a></li>
                                    </ul>
                                </nav>
                                <div className="header__nav__widget">
                                    <a href="#">Book Now <span className="arrow_right"></span></a>
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
    )
}

export default Header