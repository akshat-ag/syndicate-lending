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
   width: '100%',
   marginTop: theme.spacing.unit * 0.7,
   overflowX: 'auto',
 }, table: {
   minWidth: 100,
 }, tablehead: {
  height: theme.spacing.unit * 5
},
tablecell: {
  padding: '1px 15px 1px 15px',
  fontWeight: 500,
  fontSize: theme.spacing.unit * 1.7
},
tableNormalcell: {
  padding: '1px 15px 1px 15px',
},
 paddingNone: {
   padding: '1px 56px 1px 24px',
 },
 btn: {
  fontSize: 13,
  padding: 0,
  color: '#007BFF'
}
});
function BorrowerAcceptedLoans(props) {
  const {classes} = props;
  return (
    <div >
    
      <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow className={classes.tablehead}>
            <TableCell className={classes.tablecell}>Requisition Id</TableCell>
            <TableCell className={classes.tablecell}>Borrower </TableCell>
            <TableCell className={classes.tablecell}>Requisition Amount</TableCell>
            <TableCell className={classes.tablecell}>Deadline</TableCell>
            <TableCell className={classes.tablecell}>Interest Rate</TableCell>
            <TableCell className={classes.tablecell}>Status</TableCell>
            <TableCell className={classes.tablecell}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(props.loanList.length > 0) ? Object.keys(props.loanList).map(row => {
            return (
              <TableRow className={classes.tablehead} key={props.loanList[row].RequisitionNo}>
                <TableCell className={classes.tableNormalcell} component="th" scope="row">
                  {props.loanList[row].RequisitionNo}
                </TableCell>
                <TableCell className={classes.tableNormalcell} >{props.loanList[row].FirstName + " " + props.loanList[row].LastName}</TableCell>
                
                <TableCell className={classes.tableNormalcell} >{"$ " + props.loanList[row].RequisitionAmount}</TableCell>
                <TableCell className={classes.tableNormalcell} >{props.loanList[row].EndDate}</TableCell>

                <TableCell className={classes.tableNormalcell} >{props.loanList[row].ApprovedRoI + "%"}</TableCell>
                <TableCell className={classes.tableNormalcell} >
                <Tooltip title="Click here to View History">
                <Button
                    className={classes.btn}
                    onClick={() => {props.handleViewHistory(props.loanList[row].RequisitionNo);}}
                >
                {props.loanList[row].status}
                </Button>
                  
                  </Tooltip>
                 </TableCell>
                <TableCell className={classes.tableNormalcell} >{props.loanList[row].ActionNeeded ? <Button id="memoBtn" onClick={() => {props.handleAction(props.loanList[row].RequisitionNo, props.loanList[row].status);}}>{props.loanList[row].status}</Button> : null }</TableCell>
               
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