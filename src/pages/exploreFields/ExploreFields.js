import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import alibeypadell from "../../assets/img/alibeypadel.jpg";
import { timesOptions } from "../../utils/utils";
import Field from "./Field";

const ExploreFields = () => {
	const [fields, setFields] = useState([]);
	const [categories, setCategories] = useState([])
	const [filter, setFilter] = useState([])
	const [states, setStates] = useState([])

	const allFields = async () => {
		const res = await fetch(`http://localhost:3000/fields`, {
			method: "GET",
		});
		const json = await res.json();
		if (json.success) {
			console.log(`fielddddd`);
			setFields(json.data);
		} else {
			window.alert("There is no Field!");
			console.log(json.data);
		}
	};

	useEffect(() => {
		allFields();
	}, []);
	const allCategories = async () => {
		const res = await fetch(`http://localhost:3000/categories`, {
			method: "GET",
		});
		const json = await res.json()
		if (json.success) {
			console.log(json.success)
			setCategories(json.data)
		} else {
			window.alert("There is no Categories!");
			console.log(json.data);
		}
	};
	const allStates = async () => {
		const res = await fetch(`http://localhost:3000/states`, {
			method: "GET",
		});
		const json = await res.json()
		if (json.success) {
			console.log(json.success)
			setStates(json.data)
		} else {
			window.alert("There is no State!");
			console.log(json.data);
		}
	};

	useEffect(() => {
		allCategories();
		allStates()
	}, [])
	const handleOnChange = (e) => {
		const updatedData = { ...filter }
		if (e.target.nodeName === "SELECT") {
			updatedData[e.target.name] = e.target.options[e.target.selectedIndex].value;
		} else {
			updatedData[e.target.name] = e.target.value;
		}
		console.log(updatedData)
		setFilter(updatedData)

	};
	const filterFields = async (e) => {
		e.preventDefault()
		var Url = "http://localhost:3000/fields?"
		if (filter.stateId) {
			Url += `state=${filter.stateId}&`
		}
		if (filter.categoryId) {
			Url += `category=${filter.categoryId}&`
		}
		if (filter.date) {
			Url += `date=${filter.date}&`
		}
		if (filter.from) {
			Url += `time=${filter.from}`
		}


		const res = await fetch(Url, {
			method: "GET",
		});
		const json = await res.json()
		if (json.success) {
			console.log(json.success)
			setFields(json.data)
		} else {
			window.alert("There is no Result!");
			console.log(json.data);
		}

	}
	return (
		<>
			<Header />
			{/*   <!-- Breadcrumb Begin --> */}
			<div
				className="breadcrumb-option set-bg"
				style={{
					backgroundImage: `url(${alibeypadell})`,
					backgroundRepeat: "no-repeat",
				}}
			>
				<div className="container">
					<div className="row">
						<div className="col-lg-12 text-center">
							<div className="breadcrumb__text">
								<h1>Our Courts</h1>
								<div className="breadcrumb__links">
									<Link to={"/"}>Home </Link>
									<span>Courts</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/*  <!-- Breadcrumb End --> */}
			{/* Search */}
			<div className="container">
				<div className="row">
					<div className="col">
						<h1 className="mt-5 mb-4">
							Find the proper field
						</h1>
						<p>Feel free to use the filter below to find the field you need, choose field type, category and check in time.</p>
					</div>
				</div>
				<div className="row">
					<div className="col p-0">
						<form onSubmit={filterFields} className="filter__form w-100">
							<div className="container-fluid">
								<div className="row">
									<div className="col col-md-3">
										<div className="filter__form__item">
											<p>State</p>
											<select
												name="stateId"
												onChange={handleOnChange}
												id="inputState"
												className="form-control"
											>
												<option selected value="">Choose...</option>

												{
													states?.length > 0 && states?.map((state, i) =>
														<>
															<option key={i} value={state.id} >{state.name}</option>
														</>

													)}

											</select>
										</div>
									</div>
									<div className="col col-md-3">
										<div className=" filter__form__item">
											<p>Check In</p>
											<div className="form-row">
												<input
													name="date"
													type="date"
													className="form-control"
													onChange={handleOnChange}
													min={new Date().toISOString().split("T")[0]}
												/>
											</div>
										</div>
									</div>
									<div className="col col-md-2">
										<div className="filter__form__item">
											<p>Category</p>
											<select
												name="categoryId"
												onChange={handleOnChange}
												id="inputState"
												className="form-control"
											>
												<option selected value="">Choose...</option>

												{
													categories?.length > 0 && categories?.map((category, i) =>
														<>
															<option key={i} value={category.id} >{category.name}</option>
														</>

													)}

											</select>
										</div>
									</div>
									<div className="col col-md-3">
										<div className="filter__form__item">
											<p>Time</p>
											<select id="inputState" className="form-control" onChange={handleOnChange} name='from'>
												<option selected>Choose...</option>
												{categories?.length > 0 && timesOptions?.map((item, i) => (
													<>
														<option value={item}>{item}</option>
													</>
												))}
											</select>
										</div>
									</div>
									<div className="col col-md-1 d-flex align-items-end">
										<button className="btn btn-primary" type="submit">Search</button>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
				<div className="row my-5 pt-5">
					{(fields.length > 0) && fields?.map((field, i) => {
						return (
							<div key={i} className="col col-sm-6 col-md-4">
								<Field field={field} delay={Math.round((Math.random() * 10000) + 2000)} />
							</div>
						)
					})}
				</div>
			</div>
			<Footer />
		</>
	);
};

export default ExploreFields;
