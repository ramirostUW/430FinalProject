import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useFetch } from "./hooks/useFetch";
import { useFetchSQL } from "./hooks/useFetchSQL";
import './app.css';


const App = () => {
  /*const [speciesData, speciesLoading] = useFetch(
    "https://raw.githubusercontent.com/ramirostUW/430FinalProject/main/kaggleDataset/species.csv"
  );*/
  //const [speciesSqlData, speciesSqlLoading] = useFetchSQL(
  const [speciesData, speciesLoading] = useFetchSQL(
    "Select Top 50 * from Species"
  );

  const [parksData, parksLoading] = useFetch(
    "https://raw.githubusercontent.com/ramirostUW/430FinalProject/main/kaggleDataset/parks.csv"
  );
  console.log("From CSV", speciesData);
  //console.log("From SQL", speciesSqlData);

  function clickfunction(){
    console.log("A checkbox was clicked!")
  }
  function getParkCode(parkName) {
     for (var i = 0; i < parksData.length; i++){
        if (parksData[i]["Park Name"] == parkName) {
          var url = "https://www.nps.gov/" + parksData[i]["Park Code"] + "/index.htm";
          console.log("hi")
          return (
            <a href={url} className="btn" id="link">Link to Park</a>
          )
       }
    }
  }
  
  const datasample = speciesData//.slice(10000, 10020);
  return (
    <div>
      <div className="card" id="titlecard" style={{ width: "70%" }}>
        <h1>Info 430 Final Project</h1>
        <p>By: Michael, Olivia, Pranav, and Ramiro</p>
      </div>

      <form>
        <input type="checkbox" id="check1" name="check1" value="Check1" onClick={clickfunction}/>
        <label for="vehicle1">Checklist 1</label><br />
        <input type="checkbox" id="check2" name="check2" value="Check2" onClick={clickfunction}/>
        <label for="vehicle2">Checklist 2</label><br />
        <input type="checkbox" id="check3" name="check3" value="Check3" onClick={clickfunction}/>
        <label for="vehicle3">Checklist 3</label><br /><br />
        <input type="submit" value="Submit" />
      </form>
      <div id="col">
        <div id="row">
          {datasample.map((sample, index) => {
            return <div className="card" style={{ width: "20%" }}>
              <div className="card-body" >
                <h5 className="card-title">{sample["Common_Names"]}</h5>
                <p className="card-text">
                   <b>Scientific Name:</b> {sample["Scientific_Name"]}
                   <br></br>
                   <b>Where:</b> {sample["Park_Name"]}
                   <br></br>
                   <b>Abundance:</b> {sample["Abundance"]}
                   <br></br>
                </p>
                {getParkCode(sample["Park_Name"])}
                
              </div>
            </div>
          })}

        </div>
      </div>
    </div>
  );
};

export default App;