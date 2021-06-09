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

{/* <div class="card-deck" id="row">
    <div className="card" style={{ width: "20%" }}>
            
          </div>
            <div className="card" style={{ width: "20%" }}>
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
            <div className="card" style={{ width: "20%" }}>
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
          </div>


 */}


  function createCards() {
    for (let i = 0; i < datasample.length; i+=3) {
      var new_card_deck = document.createElement('div');
      new_card_deck.className = 'card-deck';
      var new_card = document.createElement('div');
      new_card.className = 'card';
      
      } 
  }
  return (
    <div>

      <h1>Info 430 Final Project</h1>
      <h2>By: Michael, Olivia, Pranav. and Ramiro</h2>
      <div id="cards">
          {createCards()}
      </div>
    </div>
  );
};

export default App;