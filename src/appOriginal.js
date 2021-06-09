import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useFetch } from "./hooks/useFetch";
import './app.css';


const App = () => {
  const [speciesData, speciesLoading] = useFetch(
    "https://raw.githubusercontent.com/ramirostUW/430FinalProject/main/kaggleDataset/species.csv"
  );
  const [parksData, parksLoading] = useFetch(
    "https://raw.githubusercontent.com/ramirostUW/430FinalProject/main/kaggleDataset/parks.csv"
  );
  const datasample = speciesData.slice(0, 20);
  return (
    <div>
      <div className="card" id="titlecard" style={{ width: "70%" }}>
        <h1>Info 430 Final Project</h1>
        <p>By: Michael, Olivia, Pranav, and Ramiro</p>
      </div>

     
      <div id="col">
        <div id="row">
          {datasample.map((sample, index) => {
            return <div className="card" style={{ width: "20%" }}>
              <div className="card-body" >
                <h5 className="card-title">{sample["Common Names"]}</h5>
                <p className="card-text">
                   <b>Scientific Name:</b> {sample["Scientific Name"]}
                   <br></br>
                   <b>Where:</b> {sample["Park Name"]}
                   <br></br>
                   <b>Abundance:</b> {sample["Abundance"]}
                   <br></br>
                </p>
                <a href="#" className="btn" >button</a>
              </div>
            </div>
          })}

        </div>
      </div>
    </div>
  );
};

export default App;