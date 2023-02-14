import SideNav from "../../components/SideNav/SideNav";
import Nav from "../../components/Nav/Nav";
import { Link, NavLink, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useEffect,useState  } from "react";
import UpdateCourt from "./UpdateCourt";
const dayjs = require('dayjs')
const Fields = () => {
    const {token} = useContext(AuthContext);
    const { id } = useParams();
    const { user, setUser } = useContext(AuthContext);
    const [fieldDetails, setFieldDetails] = useState([]);
    const [open , setOpen ] = useState(false)
    const getMyFields = async () => {
        const res = await fetch(`http://localhost:3000/fields/company/fields`, {
          method: "GET",
          body: null,
          headers: {
            "content-type" : "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        const json = await res.json();
        console.log(json)
        if(json.success){
         setFieldDetails(json.data);
          console.log(json.data);
        }
      };
      useEffect(() => {
        getMyFields();
      }, []);
      console.log(fieldDetails)
    return (
      <>
        <Nav/>
      <div className='user-hero' style={{display:"flex"}}>
      <SideNav/>
      <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="profile-data">
                <div className="table">
                  <div className="col-12 p-3 mb-4 bottom-border">
                    {/* blue area info */}
                    <div className="alert alert-info" style={{display: "flex", justifyContent:"space-between", alignItems:"center"}}>My Courts 
                    <NavLink  to={"/company/addfield"} className="btn" style={{backgroundColor: "rgb(236 192 14 / 76%)"}}>Add Court</NavLink> 
                    </div>
                    <table className="table">
                      <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price/<small>h</small></th>
                        <th>Working Hours</th>
                        <th>State</th>
                        <th>Status</th>
                        <th>options</th>
                      </tr>
                      {
                        fieldDetails?.map((field, i)=>(
                          <tr>
                          <td>{field.name}</td>
                          <td>{field.Category.name}</td>
                          <td>{field.hourPrice}$</td>
                          <td>{field.from}-{field.to}</td>
                          <td>{field.State.name}</td>
                          <td>{field.isActive ? "Active": "Not Active"}</td>
                          <td>
                            <>
                          <Link to={`/company/fields/${field.id}`} className="btn-primary btn m-1" >
                          Edit
                          </Link>
                          <input className="btn-danger btn" type="button" value="Delete"  />
                          </>
                          </td>
                          <td>{/* {dayjs(reservation.from).format('ddd,MMM D, YYYY h:mm A')} */}</td>
                          <td>{/* {dayjs(reservation.to).format('ddd,MMM D, YYYY h:mm A')} */}</td>
                          {/* <td> */}
                            {/* <span className="badge badge-danger"> canceled</span> */}
                         {/* <span className="badge badge-warning">Passed</span> <><span className="badge badge-primary">Acitve</span></>   */}
                          {/* </td> */}
                        </tr>
                        ))
                      }
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
}
export default Fields;
