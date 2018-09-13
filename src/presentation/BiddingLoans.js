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
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
const styles = theme => ({
  root: {
   width: '90%',
   marginTop: theme.spacing.unit * 1.2,
   overflowX: 'auto',
 }, table: {
   minWidth: 100,
 },tablehead: {
  height: theme.spacing.unit * 5
},tablecell: {
    padding: '1px 28px 1px 19px',
    fontWeight: 500,
    fontSize: theme.spacing.unit * 1.7
},
tableNormalcell: {
  padding: '1px 28px 1px 19px',
},
 paddingNone: {
   padding: '1px 56px 1px 24px',
 }
});
function BiddingLoans(props) {
  const {classes} = props;
  let rate;
  const sendBid = function (loanId) {
    const postObj = [loanId , rate];
    console.log("postobj",postObj);
    props.onAccept(postObj);
};
  return (
    <div >
      
      <Paper className={classes.root}>
     
      <Table className={classes.table}>
        <TableHead>
          <TableRow className={classes.tablehead}>
            <TableCell className={classes.tablecell}>Requisition Id</TableCell>
            <TableCell className={classes.tablecell}>Borrower</TableCell>
            <TableCell className={classes.tablecell}>Requisition Amount</TableCell>
            <TableCell className={classes.tablecell}>Deadline</TableCell>
            <TableCell className={classes.tablecell}>Interest Rate</TableCell>
            <TableCell className={classes.tablecell}></TableCell>
            <TableCell className={classes.tablecell}></TableCell>
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
                
                <TableCell className={classes.tableNormalcell} >{props.loanList[row].RequisitionAmount}</TableCell>
                <TableCell className={classes.tableNormalcell} >{props.loanList[row].EndDate}</TableCell>

                <TableCell className={classes.tableNormalcell}>
                <TextField
                required
                id="simple-start-adornment"
                value={rate}
                onChange={(e) => props.changeRate(e,props.loanList[row].RequisitionNo)}
                InputProps={{
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
              />
                </TableCell>
                <TableCell className={classes.tableNormalcell}><Button id="acceptBtn" type="submit" onClick={() => {props.onAccept(props.loanList[row].RequisitionNo);}}>Accept</Button></TableCell>
                <TableCell className={classes.tableNormalcell}><Button variant="contained" color="secondary" onClick={() => {props.onDecline(props.loanList[row].RequisitionNo);}}>Decline</Button></TableCell>
              </TableRow>
            );
          }) : <TableRow>
          <TableCell ></TableCell>
          
          <TableCell ></TableCell>
          <TableCell > <h4 id="noloan"> No Bidding Loans to Display </h4></TableCell>
          </TableRow>}
        </TableBody>
      </Table>
     
    </Paper>
    </div>)
}

export default withStyles(styles)(BiddingLoans);