import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

const SearchBar = (props) => {

    //let searchTerm = props.searchTerm;
    //let setSearchTerm = props.setSearchTerm;
    const [searchTerm, setSearchTerm] = React.useState("");

    //const [searchResults, setSearchResults] = React.useState([]);
    let searchResults = props.searchResults;
    let setSearchResults = props.setSearchResults;
    let refreshWhereClause = props.refreshWhereClause;

    const handleChange = event => { 
        let input = event.target.value;
        setSearchTerm(input);
    };

    const handleButton = () => { 
        if(searchTerm === "")
        {
            setSearchResults(undefined);
            refreshWhereClause(undefined, undefined, undefined, undefined, true);
        }
        else
        {
            refreshWhereClause(undefined, searchTerm);
            setSearchResults(searchTerm);
           
        }
        
    };

    let searchMade = searchResults != undefined;
    return (
        <div>
        <form action="/" method="get" >
            <label>
                <span className="visually-hidden">Search parks</span>
            </label>
            <input
                type="text"
                id="header-search"
                placeholder="Search parks"
                name="s"
                onChange={handleChange}
            />
            <button type="button" onClick={handleButton}>Search</button>
        </form>
        {searchMade && <p style={{color: "#e0e0e0"}}>Showing search results for: "{searchResults}"</p>}
        </div>
    );
}
export default SearchBar;