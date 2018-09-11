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
   width: '90%',
   marginTop: theme.spacing.unit * 3,
   overflowX: 'auto',
 }, table: {
   minWidth: 100,
 },
 tablehead: {
   height: theme.spacing.unit * 5
 },
 tablecell: {
  padding: '1px 28px 1px 19px',
},

 paddingNone: {
   padding: '1px 56px 1px 24px',
 }
});
// {emptyRows > 0 && (
//   <TableRow style={{ height: 48 * emptyRows }}>
//     <TableCell colSpan={6} />
//   </TableRow>
// )}
function ApprovedLoans(props) {
  const {classes} = props;
  const emptyRows = props.rowsPerPage - Math.min(props.rowsPerPage, props.totalLoans - props.page * props.rowsPerPage);
  return (
    <div className="root1">
      <h3> Approved Loans</h3>
      
      
      <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow className={classes.tablehead}>
            <TableCell className={classes.tablecell}>Loan Id</TableCell>
            <TableCell className={classes.tablecell}>Borrower First Name</TableCell>
            <TableCell className={classes.tablecell}>Borrower Second Name</TableCell>
            <TableCell className={classes.tablecell}>Loan Sanctioned</TableCell>
            <TableCell className={classes.tablecell}>Loan Funded</TableCell>
            <TableCell className={classes.tablecell}>Deadline</TableCell>
            <TableCell className={classes.tablecell}>Interest Rate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(props.loanList.length) ? Object.keys(props.loanList).map(row => {
            return (
              <TableRow key={props.loanList[row].RequisitionNo}>
                <TableCell component="th" scope="row">
                  {props.loanList[row].RequisitionNo}
                </TableCell>
                <TableCell >{props.loanList[row].FirstName}</TableCell>
                <TableCell >{props.loanList[row].LastName}</TableCell>
                <TableCell >{props.loanList[row].RequisitionAmount}</TableCell>
                <TableCell >{props.loanList[row].RequisitionAmount}</TableCell>
                <TableCell >{props.loanList[row].EndDate}</TableCell>
                <TableCell >{props.loanList[row].Rate}</TableCell>
              </TableRow>
            );
          }) : <TableRow>
          <TableCell ></TableCell>
          
          <TableCell ></TableCell>
          <TableCell > <h4 id="noloan"> No Approved Loans Available  </h4></TableCell>
          </TableRow>}
          
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
    </Paper> 
    </div>)
}

export default withStyles(styles)(ApprovedLoans);