import React, {useState} from "react";
import { Route, Link, Switch, Redirect, NavLink } from 'react-router-dom';
import { useParams } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from "react-bootstrap";
import { chunk } from 'lodash';
import Checkboxes from './Checkboxes';
import { useFetch } from "./hooks/useFetch";
import { useFetchSQL } from "./hooks/useFetchSQL";
import './app.css';
import load from 'url:./imgs/load.gif';


const Cards = (props) => {
    let firstCardIndex = props.firstCardIndex;
    let setfirstCardIndex = props.setfirstCardIndex;
    let cardsPerPage = props.cardsPerPage;
    let setCardsPerPage = props.setCardsPerPage;
    let refreshWhereClause = props.refreshWhereClause;

    let [pageLengthInput, setPageLengthInput] = useState(50);

    let datasample = props.datasample;
    let loading = props.loading;
    let parksData = props.parksData;
    let dataChunks = chunk(datasample, 3);


    /*
    a {
        text-decoration: none;
        display: inline-block;
        padding: 8px 16px;
    }

        a:hover {
        background-color: #ddd;
        color: black;
    }

        .previous {
        background-color: #f1f1f1;
        color: black;
        }

        .next {
        background-color: #04AA6D;
        color: white;
        }

        .round {
        border-radius: 50%;
        }
    */
    function getParkCode(parkName) {
        for (var i = 0; i < parksData.length; i++) {
            if (parksData[i]["Park Name"] == parkName) {
                var url = "https://www.nps.gov/" + parksData[i]["Park Code"] + "/index.htm";
                return (
                    <a href={url} className="btn" id="link">Link to Park</a>
                )
            }
        }
    }

    const rows = dataChunks.map((dataChunk, index) => {
        const dataCols = dataChunk.map((sample, index) => {
            if (sample["Abundance"] === "NULL") {
                sample["Abundance"] = "Unknown";
            }
            return (
                <Col xs="4" key={"card" + index}>
                    <div className="card">
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
                </Col>
            );
        });
        return <Row key={index}>{dataCols}</Row>
    });

    let divStyle = { display: "inline-block", textAlign: "left", marginTop: "10px" }
    if (loading) {
        divStyle = undefined
    }

    function changePageLength(event)
    {
        let newPageLength = parseInt(pageLengthInput);
        if (pageLengthInput!="" && !isNaN(newPageLength))
        {
            setCardsPerPage(newPageLength);
            setfirstCardIndex(1);
            refreshWhereClause(undefined, undefined, undefined, newPageLength);
        }

    }
    function updatePagelengthField(event)
    {
        let formInput = event.target.value;
        setPageLengthInput(formInput);

    }

    function previousButton()
    {
        let min = 1; //number of species in table
        let newFirstIndex= firstCardIndex - cardsPerPage;
        if(newFirstIndex >= min)
        {
            setfirstCardIndex(newFirstIndex);
            refreshWhereClause(undefined, undefined, newFirstIndex);
        }
        
    }
    function nextButton()
    {
        let max = 119248; //number of species in table
        let newFirstIndex= firstCardIndex + cardsPerPage;
        if(newFirstIndex <= max)
        {
            setfirstCardIndex(newFirstIndex);
            refreshWhereClause(undefined, undefined, newFirstIndex);
        }
        
    }
    let lowerBound = firstCardIndex;
    let upperBound = firstCardIndex + cardsPerPage - 1;
    let entriesString = "displaying Entries #" + lowerBound +"-" + upperBound
    return (
        <div style={{ marginTop: "10px" }}>
            <div>
                {!loading && <button onClick={previousButton}>{'\u2B05'} Previous</button>}
                {" "}
                {!loading && <button onClick={nextButton}>Next {'\u27A1'}</button>}
                {!loading && <label style={{ color: "#e0e0e0" }} >{entriesString}</label>}

            </div>
            <br />
            {!loading && <div>
                <button onClick={changePageLength}>Set # of entries per page to: </button>
                 <input size="5" onChange={updatePagelengthField}></input>
            </div>}
            <Container>
                {loading && <img src={load} style={{ margin: "15px" }}
                    alt="Loading checkboxes" width="75" height="75" />}
                {!loading && rows}
            </Container>
        </div>
    )

}


export default Cards;

