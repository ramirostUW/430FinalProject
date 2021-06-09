import { useFetchJSON } from "./hooks/useFetchJSON";

export default function componentDidMount() {
  let [data, loading] = useFetchJSON("http://165.232.146.236/sqlServerAPI/all_parks?in_state=ME&min_acres=2");
  return data;
}

//try calling componentDidMount() to get some data!