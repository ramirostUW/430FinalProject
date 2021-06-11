import React, { useState} from "react";
import { Route, Link, Switch, Redirect, NavLink } from 'react-router-dom';
import { useParams } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useFetch } from "./hooks/useFetch";
import { useFetchSQL } from "./hooks/useFetchSQL";
import './app.css';

const Checkboxes = (props) => {

    let queryUpdater = props.queryChange;
    let originalQuery = props.originalQuery;

    const [speciesCategories, speciesCategoriesLoading] = useFetchSQL(
        `Select 
            Category, count(*) as amnt
        from 
            Species
        Group By
            Category
        ORDER BY
            amnt DESC;`
    );

    const [checkboxOptions, updateCheckboxOptions] = useState({ });

    function addQueryWhereClause(checkboxOptions){
        let whereClause = " Where 1=1";
        Object.keys(checkboxOptions).forEach(function(category){
            if(checkboxOptions[category] === false)
            {
                whereClause = whereClause + " AND category != \'" + category +"\'";
            }
        })
        return whereClause;
    }
 
    function clickfunction(event) {
        let checkboxValue = event.target.value;
        let newCheckboxOptions = {... checkboxOptions};
        if(newCheckboxOptions[checkboxValue] === undefined)
        {
            newCheckboxOptions[checkboxValue] = false;
        }
        else
        {
            newCheckboxOptions[checkboxValue] = !newCheckboxOptions[checkboxValue];
        }
        let whereClause = addQueryWhereClause(newCheckboxOptions);
        updateCheckboxOptions(newCheckboxOptions);
        queryUpdater(originalQuery + whereClause);
    }
    return (
        <form>
            {speciesCategories.map(function (categoryLine) {
                return (
                    <div style={{padding: "10px", display : 'inline-block'}} >
                        <input type="checkbox" id={categoryLine.Category} key={categoryLine.Category} defaultChecked="true" color="white"
                            name={categoryLine.Category} value={categoryLine.Category} onClick={clickfunction} />
                        <label for={categoryLine.Category} style={{color: "#e0e0e0"}}>
                            {categoryLine.Category + " (" + categoryLine.amnt + " species)"}
                        </label><br />
                    </div>
                )
            })}
        </form>
    )
}

export default Checkboxes;