import {useEffect, useState } from "react";
import axiosApi from "../../axios-api";
import { Quotes } from "../../types";
import Quote from "../../components/quote/Quote";
import { useParams } from "react-router-dom";


const Home=()=>{
    const [loading, setLoading] = useState(false);
    const [quotes, setQuotes] = useState<Quotes[]>([]);

    const params = useParams();
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
            const response = await axiosApi.get('/quotes.json');
            const quotesCopy = [];
            for (let key in response.data) {
                const oneQuote = {id: key, author: response.data[key].author,quote: response.data[key].quote,category: response.data[key].category,};
                quotesCopy.push(oneQuote);
            }
            setQuotes(quotesCopy);
            
        } finally {
            setLoading(false);
        }
    };
    useEffect(()=>{
        getQuotes(); 
    },[params]);
    
    let callQuotes = (
        <>
            <h3 className="text-center">Цитат нет!</h3>
        </>
    )

    if (quotes.length > 0) {
        callQuotes = (
            <>
                <div className="list-group">
                    {quotes.map((post)=>{
                        return(
                            <Quote key={post.id} id={post.id} author={post.author} quote={post.quote} category={post.category}/>
                        )
                    })} 
                </div>
            </>
        );
    }
    return(
        <>
        {preloader}
            <div className="" style={{marginBottom: '100px', maxWidth: '800px', width: '100%'}}>
                <h2>All</h2>
                {callQuotes}
            </div>
        </>
    )
}

export default Home;