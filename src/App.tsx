import {NavLink, Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Add from "./container/addQuote/Add";
import SetQuote from "./container/set-quote/SetQuote";
import SetAllQuote from "./container/set-quote/SetAllQuote";
// import EditQuote from "./components/quote/EditQuote";

const App= ()=> {
  
  return (
    <>
        <nav className="navbar navbar-expand-lg text-light bg-dark">
          <div className="container">
            <NavLink className="nav-link fs-2" to='/'>Quotes Central</NavLink>
            
            <div className="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <NavLink className="nav-link  text-light" to='/'>Quotes</NavLink>
                <NavLink className="nav-link  text-light border-2 border-light border-start" to='/add-Quote'>Submit new quote</NavLink>
              </div>
            </div>
          </div>
        </nav>
        <div className="d-flex container gap-5 justify-content-center flex-wrap mt-5">
          <div className="list-group" style={{width: '300px'}}>
            <NavLink to="/" className="list-group-item list-group-item-dark  list-group-item-action">
              All
            </NavLink>
            <NavLink to="/:Motivational/category" className="list-group-item list-group-item-dark list-group-item-action">
              Motivational
            </NavLink>
            <NavLink to="/:Saying/category" className="list-group-item list-group-item-dark list-group-item-action">
              Saying
            </NavLink>
            <NavLink to="/:Humour/category" className="list-group-item list-group-item-dark list-group-item-action">
              Humour
            </NavLink>
            <NavLink to="/:Famous people/category" className="list-group-item list-group-item-dark list-group-item-action">
              Famous people
            </NavLink>
            <NavLink to="/:Star Wars/category" className="list-group-item list-group-item-dark list-group-item-action">
              Star Wars
            </NavLink>
          </div>

          <Routes>
            <Route path='/'>
              <Route path="/" element={(
                <>
                  <SetAllQuote></SetAllQuote>
                </>
              )}/>
              <Route path="/:id/category" >
                <Route path="/:id/category" element={(
                    <>
                      <SetQuote></SetQuote>
                    </>
                  )}/>
                   <Route path="/:id/category/edit" element={(
                      <>
                        {/* <EditQuote/> */}
                      </>
                    )}/>
              </Route>
            </Route>
            <Route path="/add-Quote" element={(
              <>
                <Add></Add>
              </>
            )}/>
          </Routes>
        </div>
    </>
  )
}

export default App
