import React from "react";
import Nav from "../../components/Nav/Nav";
import SideNav from "../../components/SideNav/SideNav";

const AddField = () => {
  return (
    <>
      <Nav />
      <div className="user-hero" style={{ display: "flex" }}>
        <SideNav />
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="profile-data">
                <div className="table">
                  <div className="col-12 p-3 mb-4 bottom-border">
                    {/* blue area info */}
                    <div className="alert alert-info">Add Court</div>
                    <form>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label for="inputEmail4">Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputName4"
                            placeholder="Name"
                          />
                        </div>
                        <div className="form-group col-md-4">
                          <label for="inputState">Category</label>
                          <select id="inputState" className="form-control">
                            <option selected>Choose...</option>
                            <option>Football</option>
                            <option>Basketball</option>
                          </select>
                        </div>
                      </div>
                      <div
                        className="form-row"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div className="form-group col-md-2">
                          <label for="inputZip">State</label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputZip"
                          />
                        </div>
                        <div className="form-group col-md-2">
                          <label for="inputZip">Address</label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputZip"
                          />
                        </div>
                        <div className="form-group col-md-2">
                          <label for="inputZip">Hour Price</label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputZip"
                          />
                        </div>
                      </div>
                      <div
                        className="form-row"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div className="form-group col-md-2">
                          <label for="inputZip">Length(m)</label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputZip"
                          />
                        </div>
                        <div className="form-group col-md-2">
                          <label for="inputZip">Width(m)</label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputZip"
                          />
                        </div>
                        <div className="form-group col-md-2">
                          <label for="inputState">Status</label>
                          <select id="inputState" className="form-control">
                            <option selected>Choose...</option>
                            <option>Active</option>
                            <option>Not Active</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-2">
                          <label for="inputZip">Latitude</label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputZip"
                          />
                        </div>
                        <div className="form-group col-md-2">
                          <label for="inputZip">Longitude</label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputZip"
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-2">
                          <br />
                          <label>Working Hours</label>
                        </div>
                        <div className="form-group col-md-2">
                          <label for="inputState">From</label>
                          <select id="inputState" className="form-control">
                            <option selected>Choose...</option>
                            <option>08:00</option>
                            <option>09:00</option>
                          </select>
                        </div>
                        <div className="form-group col-md-2">
                          <label for="inputState">To</label>
                          <select id="inputState" className="form-control">
                            <option selected>Choose...</option>
                            <option>15:00</option>
                            <option>16:00</option>
                          </select>
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="exampleFormControlFile1">
                          Upload Court Images
                        </label>
                        <input
                          type="file"
                          className="form-control-file"
                          id="exampleFormControlFile1"
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Create
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddField;
