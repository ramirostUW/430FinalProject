import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Checkboxes from './Checkboxes';
import SearchBar from './SearchBar';
import Cards from './Cards';
import { useFetchSQL } from "./hooks/useFetchSQL";
import './app.css';


const App = () => {
  //const initialSpeciesquery = "Select Top 50 * from Species";
  const initialSpeciesquery = `
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
  `;

  const [checkboxOptions, updateCheckboxOptions] = useState({ });
  const [searchResults, setSearchResults] = useState(undefined);
  const [cardsPerPage, setCardsPerPage] = useState(50);
  const [firstCardIndex, setfirstCardIndex] = useState(1);

  const [speciesData, speciesLoading, changeSpeciesDataQuery] = useFetchSQL(initialSpeciesquery);
  const [parksData, parksLoading] = useFetchSQL(
    "Select * from Parks"
  );

  function refreshWhereClause(checkboxConditions, searchBarTerms, newfirstCardIndex, newcardsPerPage, blankSearchBar)
  {
    if(searchBarTerms === undefined)
    {
      searchBarTerms = searchResults;
    }
    if(checkboxConditions === undefined)
    {
      checkboxConditions = checkboxOptions;
    }    
    let whereClause = " Where 1=1";
    if(searchBarTerms != undefined && !blankSearchBar)
    {
      whereClause = " WHERE (CHARINDEX(LOWER(\'"+searchBarTerms+"\'),LOWER(Park_Name)) > 0)";
    }
    Object.keys(checkboxConditions).forEach(function(category){
        if(checkboxConditions[category] === false)
        {
            whereClause = whereClause + " AND category != \'" + category +"\'";
        }
    })
    //let newQuery = query + whereClause;
    if(newfirstCardIndex === undefined)
    {
      newfirstCardIndex = firstCardIndex;
    }
    if(newcardsPerPage === undefined)
    {
      newcardsPerPage = cardsPerPage;
    }
    let lowerBound = newfirstCardIndex;
    let upperBound = newfirstCardIndex + newcardsPerPage - 1;
    let newQuery = `
    WITH myTable as(
      Select
          *, 
          ROW_NUMBER() OVER(
              Order by Species_ID ASC
          ) as rownum 
      from 
          Species
      ` + whereClause + `
    )
    Select 
      * 
    from 
      myTable 
    WHERE
      rownum between `+lowerBound+` and `+upperBound+`
    `;
    changeSpeciesDataQuery(newQuery);
  }

  
  const datasample = speciesData//.slice(10000, 10020);
  return (
    <div>
      <div className="card" id="titlecard" style={{ width: "70%", margin: "auto", marginBottom: "20px"}}>
        <h1>Info 430 Final Project</h1>
        <p>By: Michael, Olivia, Pranav, and Ramiro</p>
      </div>
      <SearchBar searchResults={searchResults} setSearchResults={setSearchResults} refreshWhereClause={refreshWhereClause}/>
      <Checkboxes checkboxOptions={checkboxOptions} updateCheckboxOptions={updateCheckboxOptions} 
      refreshWhereClause={refreshWhereClause}/>
      <Cards cardsPerPage={cardsPerPage} setCardsPerPage={setCardsPerPage}
      firstCardIndex={firstCardIndex} setfirstCardIndex={setfirstCardIndex}
      datasample={datasample} parksData={parksData} refreshWhereClause={refreshWhereClause} loading={speciesLoading}/>
    </div>
  );
};

export default App;