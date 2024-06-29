import {ChangeEvent, useEffect, useState } from "react";
import axiosApi from "../../axios-api";
import { NavLink, useNavigate, useParams } from "react-router-dom";


const EditQuote=()=>{
    const [author, setAuthor] = useState('');
    const [quote, setQuote] = useState('');
    const [categoty, setCategoty] = useState('Saying');
    const navigate = useNavigate();

    const quoteValue=(event: ChangeEvent<HTMLTextAreaElement>)=>{
        setQuote(event.target.value);
    }

    const authorValue=(event: ChangeEvent<HTMLInputElement>)=>{
        setAuthor(event.target.value);
    }
    const categotyValue=(event: ChangeEvent<HTMLSelectElement>)=>{
        setCategoty(event.target.value);
    }

    const params = useParams();
    let id = '';

    if(params.id !== undefined){
        id = params.id.replace(':', '') ;
    }

    const [loading, setLoading] = useState(false);

    let preloader = null;

  if (loading === true) {
    preloader = (
      <>
          <div id="preloader">
            <div className="loader"></div>
          </div>
      </>
    );
  }

    const getQuotes = async () => {
        setLoading(true);
        
        try {
            const response = await axiosApi.get('/quotes/'+ id +'.json');
            setAuthor(response.data.author);
            setQuote(response.data.quote);
            setCategoty(response.data.category);
            
        } finally {
            setLoading(false);
        }
    };
    useEffect(()=>{
        getQuotes(); 
    },[params.id]);


    const addChange=async(event: React.FormEvent)=>{
        event.preventDefault();

        if (author.trim() === '' || quote.trim() === '' || author.trim() === null || quote.trim() === null) {
            alert('Заполните поля ниже!')
        }
        else{
            setLoading(true);

            const newQuote = {
                author: author,
                quote: quote,
                category: categoty,
            }
            try {
                await axiosApi.put('/quotes/'+ id +'.json', newQuote);
            } finally {
                setLoading(false);
                navigate('/')
            }
        }
    }
    
    return(
        <>
        {preloader}
            <div className="" style={{marginBottom: '100px', maxWidth: '800px', width: '100%'}}>
                <form onSubmit={addChange}>
                    <div className="mb-3">
                        <label className="form-label">Author</label>
                        <input type="text" defaultValue={author} onChange={authorValue} className="form-control" id="exampleFormControlInput1"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Category</label>
                        <select id="disabledSelect" value={categoty} onChange={categotyValue} className="form-select">
                            <option>Saying</option>
                            <option>Humour</option>
                            <option>Motivational</option>
                            <option>Famous people</option>
                            <option>Star Wars</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Quote</label>
                        <textarea className="form-control" value={quote} onChange={quoteValue} id="exampleFormControlTextarea1"></textarea>
                    </div>
                    <button className="btn btn-dark" type="submit">Add</button>
                    <NavLink className="btn btn-dark ms-2" to={"/"} >exit</NavLink>
                </form>
            </div>
        </>
    )

}

export default EditQuote;