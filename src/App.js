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
  console.log(parksData);
  console.log(speciesData);
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
  
  const datasample = speciesData.slice(10000, 10020);
  function searchfunction() {
    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);
    console.log("These are the search results" + searchResults);
    const handleChange = event => {
      setSearchTerm(event.target.value);
    };
    React.useEffect(() => {
      const results = datasample.filter(park =>
        park.toLowerCase().includes(searchTerm));
        setSearchResults(results);
      }, [searchTerm]);
    return (
      <div className="App">
        <input type="text" placeholder="Search" value={searchTerm} onChange={handleChange}/>
        <ul>
          {searchResults.map(item => (
            <li>{item}</li>
            ))}
        </ul>
      </div>
    );
  }

  return (
    <div>
      <div className="card" id="titlecard" style={{ width: "70%" }}>
        <h1>Info 430 Final Project</h1>
        <p>By: Michael, Olivia, Pranav, and Ramiro</p>
      </div>
      <SearchBar/>
      
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
                <h5 className="card-title">{sample["Common Names"]}</h5>
                <p className="card-text">
                   <b>Scientific Name:</b> {sample["Scientific Name"]}
                   <br></br>
                   <b>Where:</b> {sample["Park Name"]}
                   <br></br>
                   <b>Abundance:</b> {sample["Abundance"]}
                   <br></br>
                </p>
                {getParkCode(sample["Park Name"])}
                
              </div>
            </div>
          })}

        </div>
      </div>
    </div>
  );
};

const SearchBar = () => (
  <form action="/" method="get">
    <label htmlFor="header-search">
      <span className="visually-hidden">Search parks</span>
    </label>
    <input 
      type="text"
      id="header-search"
      placeholder="Search parks"
      name="s"
      />
      <button type="submit">Search</button>
  </form>
);

export default App;