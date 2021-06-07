import React from "react";
import { useFetch } from "./hooks/useFetch";
//import {tedious} from "";

const App = () => {
  const [speciesData, speciesLoading] = useFetch(
    "https://raw.githubusercontent.com/ramirostUW/430FinalProject/main/kaggleDataset/species.csv"
  );
  console.log(speciesData);
  const [parksData, parksLoading] = useFetch(
    "https://raw.githubusercontent.com/ramirostUW/430FinalProject/main/kaggleDataset/parks.csv"
  );
  console.log(parksData);
  
  return (
    <div>
      <h1>Info 430 Final Project</h1>
      <h2>By: Michael, Olivia, Pranav. and Ramiro</h2>
    </div>
  );
};

export default App;