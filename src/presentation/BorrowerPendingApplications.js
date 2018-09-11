import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {NavLink} from 'react-router-dom';
const styles = theme => ({
   root: {
    width: '36%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  }, table: {
    minWidth: 100,
  },
  paddingNone: {
    padding: '1px 56px 1px 24px',
  }
});

function PendingApplications(props) {
 
  const { classes } = props;
  //console.log(props.loanList + "aaaa");
  console.log(classes);
    return (
      <div >
        
        <Paper className={classes.root}>
        <Table className={classes.table}>
        <TableHead>
          <TableRow id="headRow">
            <TableCell >Loan</TableCell>
            <TableCell numeric>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(props.loanList.length) ?  Object.keys(props.loanList).map(n => {
            return (
              <TableRow className="loanRow" key={props.loanList[n].RequisitionNo}>
                <TableCell padding="none" classes={{paddingNone: classes.paddingNone}}  scope="row">
                  {`Loan Id ${props.loanList[n].RequisitionNo}`}
                </TableCell>
                <TableCell  classes={{paddingNone: classes.paddingNone}}  numeric>
                <NavLink id="view" to={`/loan/${props.loanList[n].RequisitionNo}`}>View</NavLink>
                </TableCell>
              </TableRow>
            );
          }) : <TableRow>
          
          
          <TableCell > <h4> No Pending Loans Available </h4></TableCell>
          </TableRow>}
        </TableBody>
      </Table>
      </Paper>
      </div>
    );
  
  }


export default withStyles(styles)(PendingApplications);