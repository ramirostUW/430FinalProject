import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  return (
    <div>
      <h1>Info 430 Final Project</h1>
      <h2>By: Michael, Olivia, Pranav. and Ramiro</h2>
      <div id="col">
        <div id ="row">
        <div className="card" style={{width: "20%"}}>
            <div className="card-body" >
              <h5 className="card-title">Card title</h5>
             <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;