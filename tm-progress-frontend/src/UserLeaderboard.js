import React from "react";
import MUIDataTable from "mui-datatables";
import { useFetch } from "./hooks";

const columns = [
  "user",
"numchangesets",
"create",
"modify",
"delete",
];

const options = {
  print: false,
  filter: true,
  filterType: "dropdown",
  responsive: "standard",
  expandableRows: false,
  expandableRowsHeader: false,
  expandableRowsOnClick: false,
  selectableRows: "none",
  rowsPerPage: 50,
  rowsExpanded: [],
};


const UserLeaderboard = props => {
  const { startDate, endDate } = props;
  
  const url = `https://tasks.openstreetmap.ie/tracker_api/users_table?startDate=${startDate||'2020-02-08'}`;
  const { status, data, error } = useFetch(url);
  

  return (<div>
    <h3>User Contributions since {startDate || '2020-02-08'}</h3>
    <p>Data has been sourced from changeset information as published on <a href="https://osmcha.org/" target="_blank" rel="noreferrer">osmcha.org</a> and is updated every 6 hours.</p>
    {data && (
              <MUIDataTable
                data={data}
                columns={columns}
                options={options}
              />
            )}

  </div>)
}

export default UserLeaderboard