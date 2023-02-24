import { Link } from 'react-router-dom';
import toptepe from "../../assets/img/toptepe.png";
import './Footer.css'

const Footer = () => {

	return (
		<footer className="pb-4 pt-5">
			<div className="container">
				<div className="row">

					<div className="col col-sm-2 col-lg-4">
						<img src={toptepe} width='100px' />
						<p className='mt-3'>
							Toptepe is a leading company in the market. Started in 2023 and we are happily provide our services in 7 countries around the world.
						</p>
					</div>
					<div className="col col-sm-2 col-lg-2 offset-lg-1">
						<h4 className='text-white'>About us</h4>
						<ul className='mt-3'>
							<li>
								<Link to='/'>About</Link>
							</li>
							<li>
								<Link to='/'>Contact</Link>
							</li>
							<li>
								<Link to='/'>Services</Link>
							</li>
							<li>
								<Link to='/'>Terms of use</Link>
							</li>
							<li>
								<Link to='/'>Privacy Policy</Link>
							</li>
						</ul>
					</div>
					<div className="col col-sm-2 col-lg-2">
						<h4 className='text-white'>Account</h4>
						<ul className='mt-3'>
							<li>
								<Link to='/'>User</Link>
							</li>
							<li>

								<Link to='/'>Company</Link>
							</li>
						</ul>
					</div>
					<div className="col col-sm-2 col-lg-3">
						<h4 className='text-white'>Services</h4>
						<ul className='mt-3'>
							<li>
								<Link to='/'>Reservations Management</Link>
							</li>
							<li>

								<Link to='/'>Fields Management</Link>
							</li>
							<li>

								<Link to='/'>Legal advisor</Link>
							</li>
							<li>

								<Link to='/'>Equipments Provider</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	)


}

export default Footer;