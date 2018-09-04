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
   width: '80%',
   marginTop: theme.spacing.unit * 3,
   overflowX: 'auto',
 }, table: {
   minWidth: 100,
 },
 paddingNone: {
   padding: '1px 56px 1px 24px',
 }
});
function ApprovedLoans(props) {
  const {classes} = props;
  const emptyRows = props.rowsPerPage - Math.min(props.rowsPerPage, props.totalLoans - props.page * props.rowsPerPage);
  return (
    <div className="root1">
      <h3> Approved Loans</h3>
      
      {(props.loanList.length) ? 
      <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Loan Id</TableCell>
            <TableCell numeric>Borrower First Name</TableCell>
            <TableCell numeric>Borrower Second Name</TableCell>
            <TableCell numeric>Loan Sanctioned</TableCell>
            <TableCell numeric>Loan Funded</TableCell>
            <TableCell numeric>Deadline</TableCell>
            <TableCell numeric>Interest Rate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(props.loanList).map(row => {
            return (
              <TableRow key={props.loanList[row].RequisitionNo}>
                <TableCell component="th" scope="row">
                  {props.loanList[row].RequisitionNo}
                </TableCell>
                <TableCell numeric>{props.loanList[row].FirstName}</TableCell>
                <TableCell numeric>{props.loanList[row].LastName}</TableCell>
                <TableCell numeric>{props.loanList[row].RequisitionAmount}</TableCell>
                <TableCell numeric>{props.loanList[row].RequisitionAmount}</TableCell>
                <TableCell numeric>{props.loanList[row].EndDate}</TableCell>
                <TableCell numeric>{props.loanList[row].Rate}</TableCell>
              </TableRow>
            );
          })}
          {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
        </TableBody>
        <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={3}
                  count={props.totalLoans}
                  rowsPerPage={props.rowsPerPage}
                  page={props.page}
                  onChangePage={props.handleChangePage}
                  onChangeRowsPerPage={props.handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
      </Table>
    </Paper> : <h4>No Approved Loans Available </h4>}
    </div>)
}

export default withStyles(styles)(ApprovedLoans);