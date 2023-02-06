import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Booking = ()=>{

  const { id } = useParams()
    const [field, setField] = useState({})
    const [equipments, setEquipments] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3000/fields/${id}`)
            .then((response) => {
                return response.json().then((json) => {
                    setField(json.data)
                })
            })
            .catch()
    }, [id])
    const getAllEquipments = async ()=>{
        const res = await fetch(`http://localhost:3000/equipments`,{
            method: 'GET',
        });
        const json = await res.json();
        if(json.success){
            console.log(json.success)
            setEquipments(json.data)
            console.log(json.data)
        }else{
            window.alert("There is no Field!")
            console.log(json.data)
        }
    };
    useEffect(() => {
        getAllEquipments();
    }, []);
        



     return (
        <>
        <Header/>
       <form style={{padding:100}}>
  <div className="form-group row">
    <div className="col-sm-10">
    <label for="court" className="col-sm-2 col-form-label">Court Name</label>
      <input type="text" className="form-control w-50" id="court" placeholder="Court Name"
       name={field.name} />
    </div>
  </div>
  <div className="form-group row">
    <div className="col-sm-10">
    <label for="category" className="col-sm-2 col-form-label">Category</label>
      <input type="text" className="form-control w-50" id="category" placeholder="Category" />
    </div>
  </div>
  <div className="form-group row">
    <div className="col-sm-10">
    <label for="date" className="col-sm-2 col-form-label">Date</label>
      <input type="date" className="form-control w-50" id="date" placeholder="Time" />
    </div>
  </div>
  <fieldset className="form-group">
    <div className="row">
      <legend className="col-form-label col-sm-2 pt-0">Times : </legend>
      <div className="col-sm-10">
        <div className="form-check">
          <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked/>
          <label className="form-check-label" for="gridRadios1">
            First radio
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2"/>
          <label className="form-check-label" for="gridRadios2">
            Second radio
          </label>
        </div>
        <div className="form-check disabled">
          <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="option3" disabled/>
          <label className="form-check-label" for="gridRadios3">
            Third disabled radio
          </label>
        </div>
      </div>
    </div>
  </fieldset>
  <div className="form-group row">
    <div className="col-sm-2">Equipment </div>
    { equipments.map((eq)=>(

<>
<div className="col-sm-10">
 <div className="form-check">
   <input className="form-check-input" type="checkbox" id="gridCheck1"/>
   <label className="form-check-label" for="gridCheck1">
     {eq.name}
   </label>
   <input className="ml-5 w-10" type="number"  />
 </div>
</div>
</>


    ));

    }
   
  </div>
  <div className="form-group row">
    <div className="col-sm-10">
      <button type="submit" className="btn btn-primary">Book Now</button>
    </div>
  </div>
</form>

         <Footer/>        
        </>
     )
}

export default Booking;
