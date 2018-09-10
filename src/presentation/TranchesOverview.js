import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import TableFooter from '@material-ui/core/TableFooter';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
const styles = theme => ({
  root: {
   marginTop: theme.spacing.unit * 3,
   overflowX: 'auto',
 }, table: {
   minWidth: 100,
 },
 paddingNone: {
   padding: '1px 56px 1px 24px',
 }
});
function getParticipants(data) {
  let banks='';
  for(let i=0; i<data.length; i++) {
    banks = banks.concat(data[i].bank);
    if(i !== data.length -1)
    banks = banks.concat(" ,");
  }
  return banks;
};
function TranchesOverview(props) {
  const {classes} = props;
  const emptyRows = props.rowsPerPage - Math.min(props.rowsPerPage, props.totalLoans - props.page * props.rowsPerPage);
  
  return (
    <div >
      <h3> Tranches Overview</h3>
      
      {(props.trancheList.length) ? 
      <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Tranche No.</TableCell>
            <TableCell numeric>Amount</TableCell>
            <TableCell numeric>Start Date</TableCell>
            <TableCell numeric>End Date</TableCell>
            <TableCell numeric>Participants</TableCell>
            <TableCell numeric>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(props.trancheList).map(row => {
            return (
              <TableRow key={props.trancheList[row].StartDate}>
                <TableCell component="th" scope="row">
                  {Number(row) + 1}
                </TableCell>
                <TableCell numeric>{props.trancheList[row].Amount}</TableCell>
                <TableCell numeric>{props.trancheList[row].StartDate}</TableCell>
                <TableCell numeric>{props.trancheList[row].EndDate}</TableCell>
                <TableCell numeric>{getParticipants(props.trancheList[row].Participants)}</TableCell>
                <TableCell numeric><button>View</button></TableCell>
              </TableRow>
            );
          })}
          {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
        </TableBody>
        
      </Table>
    </Paper> : <h4>No Tranche added yet. </h4>}
    </div>)
}

export default withStyles(styles)(TranchesOverview);