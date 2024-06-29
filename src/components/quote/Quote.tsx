import { NavLink, useNavigate } from "react-router-dom";
import { Quotes } from "../../types";
import { useState } from "react";
import axiosApi from "../../axios-api";

const Quote:React.FC<Quotes> = ({id, author, category, quote})=>{

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    let preloader = null;

  if (loading === true) {
    preloader = (
      <>
          <div id="preloader">
            <div className="loader"></div>
          </div>
      </>
    )
  }

    const deleteQuote =async () => {
        setLoading(true);
        
        try {
            await axiosApi.delete('/quotes/'+ id +'.json');
            
        } finally {
            setLoading(false);
            navigate('/');
        }
    };

    return(
        <>
        {preloader}
            <div className="list-group-item bg-dark justify-content-between text-light d-flex my-1">
                <div className="">
                    <h4>author:{author}</h4>
                    <span>Category: {category}</span>
                    <p>{quote}</p>
                </div>
                <div className="">
                    <button className="d-block my-2 btn btn-danger" onClick={deleteQuote}>Delete</button>
                    <NavLink className="d-block my-2 btn btn-primary" to={"/:" + id + "/category/edit"}>Edit</NavLink>
                </div>
            </div>
        </>
    )
}

export default Quote