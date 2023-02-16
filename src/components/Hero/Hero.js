import imagethree from '../../assets/sport images/imagethree.jpg'

const Hero = () => {
return(
    <>
        <section className="hero spad set-bg" style={{ backgroundImage:`url(${imagethree})`,backgroundRepeat:"no-repeat" }}>
    
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="hero__text">
                        <h5>WELCOME TOP TEPE</h5>
                        <h2>Experience The Greatest for your Games</h2>
                    </div>
                 
                </div>
            </div>
        </div>
    </section>
   
    </>
)
}

export default Hero