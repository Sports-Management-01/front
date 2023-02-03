import hero from '../../assets/img/hero.jpg'

const Hero = () => {
return(
    <>
        <section className="hero spad set-bg" style={{ backgroundImage:`url(${hero})`,backgroundRepeat:"no-repeat" }}>
    
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="hero__text">
                        <h5>WELCOME HIROTO</h5>
                        <h2>Experience the greatest for you holidays.</h2>
                    </div>
                    <form action="#" className="filter__form">
                        <div className="filter__form__item filter__form__item--search">
                            <p>Location</p>
                            <div className="filter__form__input">
                                <input type="text" placeholder="Search Location"/>
                                <span className="icon_search"></span>
                            </div>
                        </div>
                        <div className="filter__form__item">
                            <p>Check In</p>
                            <div className="filter__form__datepicker">
                                <span className="icon_calendar"></span>
                                <input type="text" className="datepicker_pop check__in"/>
                                <i className="arrow_carrot-down"></i>
                            </div>
                        </div>
                        <div className="filter__form__item">
                            <p>Check Out</p>
                            <div className="filter__form__datepicker">
                                <span className="icon_calendar"></span>
                                <input type="text" className="datepicker_pop check__out"/>
                                <i className="arrow_carrot-down"></i>
                            </div>
                        </div>
                        <div className="filter__form__item filter__form__item--select">
                            <p>Person</p>
                            <div className="filter__form__select">
                                <span className="icon_group"></span>
                                <select>
                                    <option value="">2 Adult, 1 Children</option>
                                    <option value="">2 Adult</option>
                                    <option value="">1 Adult</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit">BOOK NOW</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
   
    </>
)
}

export default Hero