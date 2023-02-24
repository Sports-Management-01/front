import SimpleImageSlider from "react-simple-image-slider";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import "./FieldDetails.css";

const FieldDetails = () => {
	const [emblaRef] = useEmblaCarousel({}, [Autoplay({ delay: 4000 })]);
	const { id } = useParams();
	const [field, setField] = useState({
		image: [],
	});
	const [equipments, setEquipments] = useState([]);

	useEffect(() => {
		fetch(`http://localhost:3000/fields/${id}`)
			.then((response) => {
				return response.json().then((json) => {
					setField(json.data);
				});
			})
			.catch();
	}, [id]);
	const getAllEquipments = async () => {
		const res = await fetch(`http://localhost:3000/equipments`, {
			method: "GET",
		});
		const json = await res.json();
		if (json.success) {
			console.log(json.success);
			setEquipments(json.data);
			console.log(json.data);
		} else {
			window.alert("There is no Field!");
			console.log(json.data);
		}
	};
	useEffect(() => {
		getAllEquipments();
	}, []);

	return (
		<>
			<Header />
			<div className="container mt-5">
			<div className="row align-items-center">
				<div className="col">
					<h2 className="mt-5">{field.name}</h2>
					<div className="row mt-3 w-100 room__details__facilities">
						<div className="col">
							<p>
								{field?.name}, is a {field?.Category?.name} stadium.</p><p>  The stadium in{field?.adress}. With a length {field?.length}m, and width
								{field?.width}m</p><p>It is the large stadium. The hour price of
									the field {field?.hourPrice}$, where the working hour of the
								field from {field?.from} to {field?.to}.</p>
							<p>
								<Link to={`/booking/${field.id}`} className="primary-btn py-2 px-3">
									<small>Book Now</small>
								</Link>
							</p>
						</div>
					</div>
				</div>
				<div className="col p-0">
					<div className="embla" ref={emblaRef}>
						<div className="embla__container">
							{field?.image.map((img, j) => {
								return (
									<div
										key={j}
										className="embla__slide embla__slide__padded"
										style={{
											backgroundImage: `url(${img.url})`,
											backgroundSize: "cover",
										}}
									></div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
			</div>

			{/* <!-- Field Details Section Begin --> */}
			<section className="room-details spad container">

					<div className="row">
						<div className="col-lg-12">
							<div className="room__details__content">
								<div className="room__details__title mb-3">
									<h4 className="">Features</h4>
								</div>
								<div className="room__details__facilities">
									<div className="row">
										{
											field?.Category?.equipments?.map((eq, i) => {
												return (
													<div key={i} className="col col-sm-2 col-md-4 col-lg-3">
														<ul>
															<li>
																<span className="icon_check"></span> {eq.name}
															</li>
														</ul>
													</div>
												)
											})
										}
									</div>
								</div>
							</div>
						</div>
					</div>
			</section>
			{/*  <!-- Field Details Section End --> */}
			<Footer />
		</>
	);
};

export default FieldDetails;
