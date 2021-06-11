// hooks.js
import { json } from "d3-fetch";
import { useState, useEffect } from "react";

const useFetchSQL = (query) => {
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchUrl(url) {
    const response = await json(url);
    setData(response);
    setLoading(false);
  }
  function initializeQuery(query){
    let queryURL = "https://info430sp21group2.tk/sqlServerAPI/sqlQuery?query=" + encodeURIComponent(query);
    useEffect(() => {
      fetchUrl(queryURL);
    }, []);
  }
  initializeQuery(query);

  function getNewQuery(newQuery){
    setData([]);
    setLoading(true);
    let queryURL = "https://info430sp21group2.tk/sqlServerAPI/sqlQuery?query=" + encodeURIComponent(newQuery);
    async function fetchUrl(url) {
      const response = await json(url);
      setData(response);
      setLoading(false);
    }
    fetchUrl(queryURL)
  }
  return [data, loading, getNewQuery];
};export { useFetchSQL };
