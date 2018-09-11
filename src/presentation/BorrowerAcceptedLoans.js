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
import Button from '@material-ui/core/Button';
const styles = theme => ({
  root: {
   width: '90%',
   marginTop: theme.spacing.unit * 3,
   overflowX: 'auto',
 }, table: {
   minWidth: 100,
 }, tablehead: {
  height: theme.spacing.unit * 5
},
tablecell: {
  padding: '1px 56px 1px 24px',
  fontWeight: 500,
  fontSize: theme.spacing.unit * 1.7
},
 paddingNone: {
   padding: '1px 56px 1px 24px',
 }
});
function BorrowerAcceptedLoans(props) {
  const {classes} = props;
  return (
    <div className="root1">
      <h3> {props.heading}</h3>
      <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow className={classes.tablehead}>
            <TableCell className={classes.tablecell}>Loan Id</TableCell>
            <TableCell className={classes.tablecell}>Borrower First Name</TableCell>
            <TableCell className={classes.tablecell}>Borrower Second Name</TableCell>
            <TableCell className={classes.tablecell}>Loan Amount</TableCell>
            <TableCell className={classes.tablecell}>Deadline</TableCell>
            <TableCell className={classes.tablecell}>Interest Rate</TableCell>
            <TableCell ></TableCell>
            <TableCell ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(props.loanList.length > 0) ? Object.keys(props.loanList).map(row => {
            return (
              <TableRow key={props.loanList[row].RequisitionNo}>
                <TableCell component="th" scope="row">
                  {props.loanList[row].RequisitionNo}
                </TableCell>
                <TableCell numeric>{props.loanList[row].FirstName}</TableCell>
                <TableCell numeric>{props.loanList[row].LastName}</TableCell>
                <TableCell numeric>{props.loanList[row].RequisitionAmount}</TableCell>
                <TableCell numeric>{props.loanList[row].EndDate}</TableCell>

                <TableCell numeric>{props.loanList[row].Rate}</TableCell>
                <TableCell numeric><Button onClick={() => {props.showLoan(props.loanList[row].RequisitionNo);}}>Loan Details</Button></TableCell>
                <TableCell numeric><Button>Generate Information Memo</Button></TableCell>
              </TableRow>
            );
          }): <TableRow>
          <TableCell ></TableCell>
          
          <TableCell ></TableCell>
          <TableCell > <h4 id="noloan"> No Loans to Display </h4></TableCell>
          </TableRow>}
        </TableBody>
      </Table>
    </Paper>
    </div>)
}

export default withStyles(styles)(BorrowerAcceptedLoans);