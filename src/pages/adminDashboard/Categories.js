import React from "react";
import Nav from "../../components/Nav/Nav";
import SideNav from "../../components/SideNav/SideNav";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { NavLink, Link } from "react-router-dom";
const dayjs = require("dayjs");

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const token = useContext(AuthContext);
  const [image, setImage] = useState();
const [counter, setCounter] = useState(0);
  const allCategories = async () => {
    const res = await fetch(`http://localhost:3000/categories/`, {
      method: "GET",
      body: null,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
    });
    const json = await res.json();
    if (json.success) {
      console.log(json.data);
      setCategories(json.data);
    } else {
      window.alert("There is no Category!");
      console.log(json.data);
    }
  };
  useEffect(() => {
   allCategories();
  }, [counter]);
  function handleChange(e) {
    setImage(URL.createObjectURL(e.target.files[0]));
    categories.icon = image;
    console.log(e.target.files[0])
  }

  const deleteCategory= async(id) =>{
    const res = await fetch(`http://localhost:3000/categories/${id}`,
    {
      method: "DELETE",
      headers:{
        "Content-Type":"aplication/json",
         'Authorization': `Bearer ${token}`,
      }
    });
    const json = await res.json();

    if(json.success){
      window.alert(json.messages)
      setCounter(counter++)
      setCategories([...categories])
     
   
    }
  };
 

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
                    <div className="alert alert-info" style={{display: "flex", justifyContent:"space-between", alignItems:"center"}}> Categories 
                    <NavLink  to={"/addcategory"} className="btn" style={{backgroundColor: "rgb(236 192 14 / 76%)"}}>Add Category</NavLink> 
                    </div>
                    <table className="table">
                      <tr>
                        <th> Name</th>
                        <th>Status</th>
                       <th>Icon</th>
                       <th>Options</th>
                      </tr>

                      {categories?.map((c, i) => (
                        
                        <>
                          <tr>
                            <td>{c.name}</td>
                            <td>{c.isActive==1?'Available':'Not Available'}</td>
                            <td>
                            <label htmlFor="icon" className="mx-auto my-2 d-block " style={{width:50}}>
                                <img name="icon" value={c?.icon} src={c?.icon} 
                                className="d-block mx-auto rounded-circle w-100" width={150} alt="Category icon"/>   
                             </label>
                            </td>
                            <td>
                          <Link to={`/updatecategory/${c.id}`} className="btn-primary btn m-1" >
                          Edit
                          </Link>
                          <input className="btn-danger btn" type="button" value="Delete"
                           onClick={
                            ()=>{ 
                              if (window.confirm('Are you sure you want to delete this category?')) {
                                deleteCategory(c.id)
                                console.log('Category has been deleted successfully...');
                              } else {
                                console.log('category did not deleted!');
                              }
                            }
                            }  />
                          </td>
                          </tr>
                        </>
                      ))}
                    </table>
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

export default Categories;
