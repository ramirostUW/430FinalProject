import React, { useState} from "react";
import { Route, Link, Switch, Redirect, NavLink } from 'react-router-dom';
import { useParams } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useFetch } from "./hooks/useFetch";
import { useFetchSQL } from "./hooks/useFetchSQL";
import load from 'url:./imgs/load.gif';
import './app.css';

const Checkboxes = (props) => {

    let checkboxOptions = props.checkboxOptions;
    let updateCheckboxOptions = props.updateCheckboxOptions;
    let refreshWhereClause = props.refreshWhereClause;

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

    let maxCategoryStringLength = 0;
    speciesCategories.forEach(function(categoryLine){
        if (categoryLine.Category.length > maxCategoryStringLength)
            maxCategoryStringLength = categoryLine.Category.length;
    });

    //const [checkboxOptions, updateCheckboxOptions] = useState({ });
 
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
        refreshWhereClause(newCheckboxOptions, undefined);
        updateCheckboxOptions(newCheckboxOptions);
    }
    return (
        <div>
        {speciesCategoriesLoading &&  <img src={load} style={{margin:"15px"}}
        alt="Loading checkboxes" width="75" height="75" />}
        {!speciesCategoriesLoading && <form>
            {speciesCategories.map(function (categoryLine) {
                let leftrightpadding = (maxCategoryStringLength - categoryLine.Category.length + 5) + "px";
                /*
                , 
                    paddingLeft=(leftrightpadding + "px"), paddingRight=(leftrightpadding + "px")
                */
               /*
                , 
                    paddingLeft:leftrightpadding, paddingRight:leftrightpadding
                */
               /*
               style={{padding: "10px",  display : 'inline-block', 
                    paddingLeft:leftrightpadding, paddingRight:leftrightpadding}}
               */
              /*
                <div style={{padding: "10px",  display : 'inline-block', 
                    paddingLeft:leftrightpadding, paddingRight:leftrightpadding}} >
              */
                return (
                    
                    <div style={{padding: "10px",  display : 'inline-block', 
                    paddingLeft:leftrightpadding, paddingRight:leftrightpadding}} >
                        <input type="checkbox" id={categoryLine.Category} style={{verticalAlign:"left"}}
                            key={categoryLine.Category} defaultChecked="true" color="white"
                            name={categoryLine.Category} value={categoryLine.Category} onClick={clickfunction} />
                        <label for={categoryLine.Category} style={{color: "#e0e0e0", verticalAlign:"left"}}>
                            {categoryLine.Category + " (" + categoryLine.amnt + " species)"}
                        </label><br />  
                    </div>
                )
            })}
        </form>}
        </div>
    )
}

export default Checkboxes;