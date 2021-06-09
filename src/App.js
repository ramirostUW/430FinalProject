import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useFetch } from "./hooks/useFetch";


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

      <h1>Info 430 Final Project</h1>
      <h2>By: Michael, Olivia, Pranav. and Ramiro</h2>
      <div id="col">
        <div id="row">
          {datasample.map((sample, index) => {
            return <div className="card" style={{ width: "20%" }}>
              <div className="card-body" >
                <h5 className="card-title">{sample["Common Names"]}</h5>
                <p className="card-text">
                   Scientific Name: {sample["Scientific Name"]}
                   <br></br>
                   Where: {sample["Park Name"]}
                   <br></br>
                   Abundance: {sample["Abundance"]}
                   <br></br>
                </p>
                <a href="#" className="btn btn-primary" >Go somewhere</a>
              </div>
            </div>
          })}

        </div>
      </div>
    </div>
  );
};

export default App;