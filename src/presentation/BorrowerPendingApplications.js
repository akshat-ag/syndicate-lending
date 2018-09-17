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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";

import classnames from 'classnames';
const styles = theme => ({
   root: {
    width: '100%',
    marginTop: theme.spacing.unit * 0.7,
    overflowX: 'auto',
  }, table: {
    minWidth: 100,
  },tablehead: {
   height: theme.spacing.unit * 4
 },tablecell: {
     padding: '1px 28px 1px 19px',
     fontWeight: 500,
     fontSize: theme.spacing.unit * 1.7
 },
 tablerow: {
   height: theme.spacing.unit * 3.95
 },
 tableNormalcell: {
   padding: '1px 28px 1px 19px',
 },
  paddingNone: {
    padding: '1px 56px 1px 24px',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
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
          <TableRow className={classes.tablehead}>
            <TableCell >Requistion</TableCell>
            <TableCell className={classes.tablecell}>Requsition Amount</TableCell>
            <TableCell className={classes.tablecell}>Deadline</TableCell>
             <TableCell className={classes.tablecell}>Action</TableCell>
          </TableRow>
        </TableHead>
       
      </Table>
          {(props.loanList.length) ?  Object.keys(props.loanList).map(n => {
            return (
            
              <ExpansionPanel
             expanded={props.expanded === props.loanList[n].RequisitionNo}
              onChange={(e) => {props.handleExpandClick(e,props.loanList[n].RequisitionNo)}}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                  General settings
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  I am an expansion panel
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                  feugiat. Aliquam eget maximus est, id dignissim quam.
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          
            
           
            );
          }) : null}
          
          
          
        
      </Paper>
      </div>
    );
  
  }


export default withStyles(styles)(PendingApplications);