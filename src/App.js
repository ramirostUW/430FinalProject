import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useFetch } from "./hooks/useFetch";


const App = () => {
  const [speciesData, speciesLoading] = useFetch(
    "https://raw.githubusercontent.com/ramirostUW/430FinalProject/main/kaggleDataset/species.csv"
  );
  console.log(speciesData);
  const [parksData, parksLoading] = useFetch(
    "https://raw.githubusercontent.com/ramirostUW/430FinalProject/main/kaggleDataset/parks.csv"
  );
  console.log(speciesData[0]);
  
  return (
    <div>
      
      <h1>Info 430 Final Project</h1>
      <h2>By: Michael, Olivia, Pranav. and Ramiro</h2>
      <div id="col">
        <div id ="row">
        <div className="card" style={{width: "20%"}}>
            <div className="card-body" >
              <h5 className="card-title">{speciesData[0]["Common Names"] }</h5>
             <p className="card-text">
              Scientific Name: {speciesData[0]["Scientific Name"]}
                <br></br>
               Where: {speciesData[0]["Park Name"]}
                <br></br>
               Abundance: {speciesData[0]["Abundance"]}
                <br></br>
             </p>
            <a href="#" className="btn btn-primary" >Go somewhere</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;