import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import TableFooter from '@material-ui/core/TableFooter';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
const styles = theme => ({
  root: {
   width: '100%',
   marginTop: theme.spacing.unit * 0.7,
   overflowX: 'auto',
 }, table: {
   minWidth: 100,
 },
 tablehead: {
   height: theme.spacing.unit * 5
 },
 tablecell: {
  padding: '1px 15px 1px 15px',
},
tablerow: {
  height: theme.spacing.unit * 3.9
},
tableToolbar: {
  height: theme.spacing.unit * 3.5,
  minHeight: theme.spacing.unit * 3.5,
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
// {emptyRows > 0 && (
//   <TableRow style={{ height: 48 * emptyRows }}>
//     <TableCell colSpan={6} />
//   </TableRow>
// )}
function ApprovedLoans(props) {
  const {classes} = props;
  const emptyRows = props.rowsPerPage - Math.min(props.rowsPerPage, props.totalLoans - props.page * props.rowsPerPage);
  return (
    <div >
     
      
      
      <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow className={classes.tablehead}>
            <TableCell className={classes.tablecell}>Requsition Id</TableCell>
            <TableCell className={classes.tablecell}>Borrower </TableCell>
            <TableCell className={classes.tablecell}>Requsition Amount</TableCell>
            <TableCell className={classes.tablecell}>Deadline</TableCell>
            <TableCell className={classes.tablecell}>Interest Rate</TableCell>
            <TableCell className={classes.tablecell}>Status</TableCell>
            <TableCell className={classes.tablecell}>Action</TableCell>
            <TableCell className={classes.tablecell}>View History</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(props.loanList.length) ? Object.keys(props.loanList).map(row => {
            return (
              <TableRow className={classes.tablerow} key={props.loanList[row].RequisitionNo}>
                <TableCell className={classes.tableNormalcell} component="th" scope="row">
                  {props.loanList[row].RequisitionNo}
                </TableCell>
                <TableCell className={classes.tableNormalcell} >{props.loanList[row].FirstName + " " + props.loanList[row].LastName}</TableCell>
                <TableCell className={classes.tableNormalcell} >{"$ " + props.loanList[row].RequisitionAmount}</TableCell>
                <TableCell className={classes.tableNormalcell} >{props.loanList[row].EndDate}</TableCell>
                <TableCell className={classes.tableNormalcell} >{props.loanList[row].ApprovedRoI + "%"}</TableCell>
                <TableCell className={classes.tableNormalcell} >
                {props.loanList[row].status}
                
                  </TableCell>
                <TableCell className={classes.tableNormalcell} >{props.loanList[row].ActionNeeded ? <Button id="memoBtn" onClick={() => {props.handleAction(props.loanList[row].RequisitionNo, props.loanList[row].status);}}>{props.loanList[row].status}</Button> : "No Action Needed" }</TableCell>
                <TableCell className={classes.tableNormalcell} >
                <Tooltip title="Click here to View History">
                <Button
                    className={classes.btn}
                    onClick={() => {props.handleViewHistory(props.loanList[row].RequisitionNo);}}
                >
                View
                </Button>
                </Tooltip>
                
                  </TableCell>
                
              </TableRow>
            );
          }) : <TableRow>
          <TableCell ></TableCell>
          
          <TableCell ></TableCell>
          <TableCell > <h4 id="noloan"> No Approved Requistions Available  </h4></TableCell>
          <TableCell ></TableCell>
          <TableCell ></TableCell>
          <TableCell ></TableCell>
          <TableCell ></TableCell>
          </TableRow>}
          
        </TableBody>
        
      </Table>
    </Paper> 
    </div>)
}

export default withStyles(styles)(ApprovedLoans);
{/* <TableFooter>
              <TableRow className={classes.tablerow}>
                <TablePagination
                  classes={{toolbar: classes.tableToolbar}}
                  colSpan={3}
                  count={props.totalLoans}
                  rowsPerPage={props.rowsPerPage}
                  page={props.page}
                  onChangePage={props.handleChangePage}
                  onChangeRowsPerPage={props.handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter> */}