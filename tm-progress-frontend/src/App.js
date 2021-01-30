import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import MUIDataTable, {ExpandButton} from "mui-datatables";
import { useFetch } from './hooks';

import styled from 'styled-components';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from '@material-ui/core/Button';
import { parseJSON, formatDistance } from 'date-fns'

const columns = [
  "projectId", "name", "status", "priority", "percentMapped","percentValidated",
  {
    name: "lastUpdated",
    label: "Last Updated",
    options: {
      customBodyRender: value => formatDistance(parseJSON(value), new Date()),
    }
  }];


// const options = {
//   filterType: 'checkbox',
// };

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  margin-bottom: 2rem;
  grid-gap: 1rem;
`;

const StatsCard = styled.div`
border: 1px solid rgba(0, 0, 0, 0.12);
padding: 16px;
border-radius: 4px;
`

const UpdatedAtText = styled.div`
margin: 1rem;
font-style: italic;
font-size: smaller;
`

function App() {
  const url = `https://osmirl-progress.s3-eu-west-1.amazonaws.com/tm3-tasks.json`;
  const { status, data, error } = useFetch(url);
  const seen = new Set();

  const filteredArr = data && data.stats ? data.stats.reduce((acc, current) => {
    const x = acc.find(item => item.projectId === current.projectId);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []) : [] ;
  
  const options = {
    print: false,
    filter: true,
    filterType: 'dropdown',
    responsive: 'standard',
    expandableRows: true,
    expandableRowsHeader: false,
    expandableRowsOnClick: true,
    selectableRows: 'none',
    sortOrder: {
      name: 'lastUpdated',
      direction: 'desc'
    },
    rowsPerPage: 100,
    isRowExpandable: (dataIndex, expandedRows) => {
      // if (dataIndex === 3 || dataIndex === 4) return false;
  
      // // Prevent expand/collapse of any row if there are 4 rows expanded already (but allow those already expanded to be collapsed)
      // if (expandedRows.data.length > 4 && expandedRows.data.filter(d => d.dataIndex === dataIndex).length === 0) return false;
      return true;
    },
    rowsExpanded: [],
    renderExpandableRow: (rowData, rowMeta) => {
      // console.log(data.stats[rowMeta.dataIndex])
      const colSpan = rowData.length + 1;
      return (
        <TableRow>
        <TableCell colSpan={colSpan}>
      <Button variant="contained" color="primary" href={`https://tasks.openstreetmap.ie/project/${filteredArr[rowMeta.dataIndex].projectId}`}>
        View project on TM
      </Button>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Action</TableCell>
            <TableCell align="right">User</TableCell>
            <TableCell align="right">When</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredArr[rowMeta.dataIndex].activity.slice(0,3).map((row) => (
            <TableRow key={row.historyId}>
              <TableCell component="th" scope="row">
                <a href={`https://tasks.openstreetmap.ie/project/${filteredArr[rowMeta.dataIndex].projectId}?task=${row.taskId}`} target="_blank">
                {`${row.taskId} `} 
                {row.action === "LOCKED_FOR_VALIDATION" && 'Task locked for validation'}
                {row.action === "STATE_CHANGE" && `Task ${row.actionText.toLowerCase()}`}
                {row.action === "LOCKED_FOR_MAPPING" && `Task locked for mapping`}
                {row.action === "AUTO_UNLOCKED_FOR_MAPPING" && `Task unlocked`}
                </a>
              </TableCell>
              <TableCell align="right"><a href={`https://tasks.openstreetmap.ie/user/${row.actionBy}`}>{row.actionBy}</a></TableCell>
              <TableCell align="right">{formatDistance(parseJSON(row.actionDate), new Date())} ago</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableCell>
          </TableRow>
    );
    },
    onRowExpansionChange: (curExpanded, allExpanded, rowsExpanded) => console.log(curExpanded, allExpanded, rowsExpanded)
  };

  const calculateSum = (arr, property) => {
    return arr.reduce((sum, li) => sum + li[property], 0);
  }

  return (
    <div className="App">
      {data && data.stats && <UpdatedAtText>Data last updated {formatDistance(parseJSON(data.lastUpdated), new Date())}</UpdatedAtText>}

      {data && data.stats && <StatsContainer>
      <StatsCard>
        <h2>Task Count</h2>
        {data && data.stats.length}
      </StatsCard>
      <StatsCard>
        <h2>Mapped Progress</h2>
        {data && calculateSum(data.stats, 'percentMapped')} / {data && (data.stats.length*100)}
      </StatsCard>
      <StatsCard>
        <h2>Validated Progress</h2>
        {data && calculateSum(data.stats, 'percentValidated')} / {data && (data.stats.length*100)}
      </StatsCard>
      </StatsContainer>}
      
      {data && data.stats && <MUIDataTable 
        title={"OSM IRL Task Progress"} 
        data={filteredArr} 
        columns={columns} 
        options={options} 
      />}
    </div>
  );
}

export default App;
