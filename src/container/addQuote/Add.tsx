import { ChangeEvent, useState } from "react";
import axiosApi from '../../axios-api';
import { useNavigate } from "react-router-dom";

const Add=()=>{

    const [loading, setLoading] = useState(false);
    const [author, setAuthor] = useState('');
    const [quote, setQuote] = useState('');
    const [categoty, setCategoty] = useState('Saying');

    const navigate = useNavigate();
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

    const quoteValue=(event: ChangeEvent<HTMLTextAreaElement>)=>{
        setQuote(event.target.value);
    };

    const authorValue=(event: ChangeEvent<HTMLInputElement>)=>{
        setAuthor(event.target.value);
    };
    const categotyValue=(event: ChangeEvent<HTMLSelectElement>)=>{
        setCategoty(event.target.value);
    };


    const addPost = async (event: React.FormEvent) => {
        event.preventDefault();
        
        if (author.trim() === '' || quote.trim() === '' || author.trim() === null || quote.trim() === null) {
            alert('Заполните поля ниже!');
        }
        else{
            setLoading(true);

            const newQuote = {
                author: author,
                quote: quote,
                category: categoty,
            }

            try {
                await axiosApi.post('/quotes.json', newQuote);
                
        } finally {
              setLoading(false);
              navigate('/')
        }     
        }
    };

    return(
        <>
        {preloader}
            <div className="" style={{marginBottom: '100px', maxWidth: '800px', width: '100%'}}> 
                <form onSubmit={addPost}>
                    <div className="mb-3">
                        <label className="form-label">Author</label>
                        <input type="text" onChange={authorValue} className="form-control" id="exampleFormControlInput1"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Category</label>
                        <select id="disabledSelect" onChange={categotyValue} className="form-select">
                            <option>Saying</option>
                            <option>Humour</option>
                            <option>Motivational</option>
                            <option>Famous people</option>
                            <option>Star Wars</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Quote</label>
                        <textarea className="form-control" onChange={quoteValue} id="exampleFormControlTextarea1"></textarea>
                    </div>
                    <button className="btn btn-dark" type="submit">Add</button>
                </form>
            </div>
        </>
    )
}

export default Add