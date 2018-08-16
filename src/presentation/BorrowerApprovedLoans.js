import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
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
  return (
    <div className="root1">
      <h3> Approved Loans</h3>
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
              <TableRow key={props.loanList[row].requisitionId}>
                <TableCell component="th" scope="row">
                  {props.loanList[row].requisitionId}
                </TableCell>
                <TableCell numeric>{props.loanList[row].firstName}</TableCell>
                <TableCell numeric>{props.loanList[row].lastName}</TableCell>
                <TableCell numeric>{props.loanList[row].requisitionAmount}</TableCell>
                <TableCell numeric>{props.loanList[row].requisitionFunded}</TableCell>
                <TableCell numeric>{props.loanList[row].deadline}</TableCell>
                <TableCell numeric>{props.loanList[row].rate}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
    </div>)
}

export default withStyles(styles)(ApprovedLoans);