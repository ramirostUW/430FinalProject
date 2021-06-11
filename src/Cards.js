import React from "react";
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
    //<Cards datasample={datasample} parksData={parksData}/>
    //https://www.dropbox.com/s/c19vm7ttdpek8qr/loading-buffering.gif?dl=1
    let datasample = props.datasample;
    let loading = props.loading;
    let parksData = props.parksData;
    let dataChunks = chunk(datasample, 3);


    console.log("dataChunks", dataChunks);
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
            if(sample["Abundance"] === "NULL")
            {
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

    return <Container>
        {loading && <img src={load} style={{ margin: "15px" }}
            alt="Loading checkboxes" width="75" height="75" />}
        {!loading && rows}
    </Container>
    /*
    let originalReturnVal = (
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
    )
    */

}


export default Cards;

