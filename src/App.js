import React from "react";
import  {Route, Link, Switch, Redirect, NavLink } from 'react-router-dom';
import { useParams } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import Checkboxes from './Checkboxes';
import Cards from './Cards';
import { useFetch } from "./hooks/useFetch";
import { useFetchSQL } from "./hooks/useFetchSQL";
import './app.css';


const App = () => {
  const initialSpeciesquery = "Select Top 50 * from Species";
  /*const initialSpeciesquery = `
    WITH myTable as(
      Select
          *, 
          ROW_NUMBER() OVER(
              Order by Species_ID ASC
          ) as rownum 
      from 
          Species
    )
    Select 
      * 
    from 
      myTable 
    WHERE
      rownum between 1 and 50
  `;*/
  const [speciesData, speciesLoading, changeSpeciesDataQuery] = useFetchSQL(initialSpeciesquery);

  console.log(changeSpeciesDataQuery);
  const [parksData, parksLoading] = useFetchSQL(
    "Select * from Parks"
  );
  console.log(parksData);
  console.log(speciesData);
  
  const datasample = speciesData//.slice(10000, 10020);

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
      <div className="card" id="titlecard" style={{ width: "70%", margin: "auto", marginBottom: "20px"}}>
        <h1>Info 430 Final Project</h1>
        <p>By: Michael, Olivia, Pranav, and Ramiro</p>
      </div>
      <SearchBar/>
      <Checkboxes  queryChange={changeSpeciesDataQuery} originalQuery={initialSpeciesquery}/>
      <Cards datasample={datasample} parksData={parksData} loading={speciesLoading}/>
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