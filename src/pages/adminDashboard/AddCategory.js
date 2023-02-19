import React from "react";
import Nav from "../../components/Nav/Nav";
import SideNav from "../../components/SideNav/SideNav";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const AddCategory = () => {
  const [category, setCategory] = useState([]);
  const token = useContext(AuthContext);
  const [image, setImage] = useState();
  const createCategory = async (e) => {
    e.preventDefault();
    const form = e.target;
    const newCategory = new FormData(form);

    const response = await fetch("http://localhost:3000/categories", {
      method: "post",
      body: newCategory,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: `application/json`,
      },
    });
    const json = await response.json();
    if (json.success) {
      alert(json.messages);
      setCategory(json.data);
    } else {
      alert(json.messages);
    }
  };

  function handleChange(e) {
    setImage(URL.createObjectURL(e.target.files[0]));
    category.icon = image;
    console.log(e.target.files[0]);
  }

  const handleOnChange = (e) => {
    category[e.target.name] = e.target.value;
    const updatedData = { ...category };
    updatedData[e.target.name] = e.target.value;
    setCategory(updatedData);
  };

  return (
    <>
      <Nav />
      <div className="user-hero" style={{ display: "flex" }}>
        <SideNav />
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="profile-data">
                <form onSubmit={createCategory}>
                  <div className="col-12 p-3 mb-4 bottom-border">
                    {/* blue area info */}
                    <div className="alert alert-info">Category</div>
                    {/* start profile fields */}
                    {/* Start avatar */}
                    <div className=" mb-3 person-avatar">
                      <div>
                        <label
                          htmlFor="icon"
                          className="mx-auto my-2 d-block "
                          style={{ width: 150 }}
                        >
                          <img
                            name="icon"
                            value={category?.icon}
                            src={category?.icon}
                            className="d-block mx-auto rounded-circle w-100"
                            width={150}
                            alt="image"
                          />
                        </label>
                        <input
                          name="icon"
                          type="file"
                          id="icon"
                          className="position-absolute"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-3 mt-5">
                        <label htmlFor="name" className="mb-2">
                          <small>
                            Name <span className="text-danger">*</span>
                          </small>
                        </label>
                        <input
                          onChange={handleOnChange}
                          defaultValue={category?.name}
                          name="name"
                          type="text"
                          id="name"
                          className="form-control"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="email" className="mb-2">
                          <small>
                            Status <span className="text-danger">*</span>
                          </small>
                        </label>
                        <select
                          id="inputState"
                          className="form-control"
                          name="isActive"
                          onChange={handleOnChange}
                          value={category.isActive}
                        >
                          <option selected value="1">
                            Available
                          </option>
                          <option value="0">Not Available </option>
                        </select>{" "}
                      </div>

                      <div className="mb-3">
                        <button type="submit" className="btn btn-primary">
                          Add Category
                        </button>
                      </div>
                    </div>

                    {/* End profile fields */}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCategory;
