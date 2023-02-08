import { useEffect, useState, useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext";

const Categories = ()=>{
    const {  token } = useContext(AuthContext);
    const [categories, setCategories] = useState([])
   

    const allCategories = async ()=>{
        const res = await fetch(`http://localhost:3000/categories`,{
            method: "GET",
        });
        const json = await res.json()
        if(json.success){
            console.log(json.success)
            setCategories(json.data)
        }else {
            window.alert("There is no Categories!");
            console.log(json.data);
          }

    };
    useEffect(()=>{
        allCategories();
    }, [])
    
      
    const addCategories = async (e)=>{
        e.preventDefault()
        const newData = new FormData(e.target)
        const res = await fetch(`http://localhost:3000/categories`,{
            method: "POST",
            body: (newData),
        });
        const json = await res.json()
        if(json.success){
            console.log(json.success)
            alert(json.messages)
            setCategories([...categories, json.data])

        }else {
            window.alert("There is no Categories!");
            console.log(json.data);
          }

    };
    return (
<>
<h1> Hi here we will show the categories</h1>
<div className="container">
    <div className="row">
    
        {
            categories.map((item,i)=>(
                <>
                <div className="col-lg-12 p-0 order-lg-1 order-md-1 col-md-6 m-4" 
                style={{display: "flex",
                margin: "10px",
                justifyContent: "center",
                padding: "50"
            }}>
                    <div className="p-10"> <img src={item.icon} alt="photo" /></div>
                    <div className="m-0"><h4>{item.name}</h4></div>
                </div>


                </>
            ))
        }
        <form onSubmit={(e)=>addCategories(e)}
        method="POST"> 
        <input type={'text'}
        name= 'name'
        
        />
       <select name="isActive">
  <option value="1">Yes</option>
  <option value="0">No</option>

  
</select>
        <input type={'file'} 
        name= 'icon'
        
        />
        <input type="number" 
        name="equipments" />
        <button > Create Category </button>
        
        </form>
    
    </div>

</div>
</>
    )
} 
export default Categories