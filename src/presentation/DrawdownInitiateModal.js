import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Divider from '@material-ui/core/Divider';

import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
const styles = theme => ({
    
      layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        [theme.breakpoints.up(900 + theme.spacing.unit * 2 * 2)]: {
          width: 900,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      },
      paper: {
        height: '550px',
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
        padding: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
          marginTop: theme.spacing.unit * 6,
          marginBottom: theme.spacing.unit * 6,
          padding: theme.spacing.unit * 3,
        },
        overflowY: 'auto'
      },
      container: {
        marginTop: theme.spacing.unit * 0.5,
      },
      basicItem: {
          paddingTop: 0,
          paddingBottom: 5,
          paddingRight: 0
      }
  });
function getBankName(LeadArranger) {
    if(LeadArranger === 'citi') {
        return 'CitiBank';
      } else if(LeadArranger === 'wells') {
        return 'Wells Fargo';
      } else {
        return 'JP Morgan';
      }
}
function getBanksString(tranche) {
    let str = '';
    for(let i=0; i< tranche.Participants.length; i++) {
        let name = getBankName(tranche.Participants[i].BankId);
        str = str.concat(name + " :" +  tranche.Participants[i].AssetRatio + "%");
        if(i !== tranche.Participants.length -1)
        str = str.concat(" , "); 
    }
    return str;
}
function SyndicateDetail(props) {
    const {classes} = props;
  return (
    <React.Fragment>
       
       <main className={classes.layout}>
      
        <Paper className={classes.paper}>
        <Typography variant="headline" align="center">
          Loan {props.loan.LoanNo}
            </Typography>
            <Typography variant="subheading" align="left">
        Basic Information
        </Typography>
        <hr id="lineHeader"/>
      <Grid container  className={classes.container}>
      <Grid item xs={12} sm={4} className={classes.basicItem}>
        <Typography variant="subheading" gutterBottom align="left">
        Borrower
        </Typography>
        <Typography variant="body2" gutterBottom align="left">
        {props.loan.InstitutionName}
        </Typography> 
        </Grid>
      <Grid item xs={12} sm={4} className={classes.basicItem}>
        <Typography variant="subheading" gutterBottom align="left">
        Loan Amount
        </Typography>
        <Typography variant="body2" gutterBottom align="left">
        {props.loan.LoanAmount}
        </Typography> 
        
          
        </Grid>
      <Grid item xs={12} sm={4} className={classes.basicItem}>
        <Typography variant="subheading" gutterBottom align="left">
        Lead Arranger
        </Typography>
        <Typography variant="body2" gutterBottom align="left">
        {getBankName(props.loan.LeadArranger)}
        </Typography> 
        </Grid>
        
        
        <Grid item xs={12} sm={4} className={classes.basicItem}>
        <Typography variant="subheading" gutterBottom align="left">
        Start Date
        </Typography>
        <Typography variant="body2" gutterBottom align="left">
        {props.loan.StartDate}
        </Typography>
        
        </Grid>
        <Grid item xs={12} sm={4} className={classes.basicItem}>
        <Typography variant="subheading" gutterBottom align="left">
        End Date
        </Typography>
        <Typography variant="body2" gutterBottom align="left">
        {props.loan.EndDate}
        </Typography>
        
        </Grid>
        <Grid item xs={12} sm={4} className={classes.basicItem}>
        <Typography variant="subheading" gutterBottom align="left">
        Interest Rate
        </Typography>
        <Typography variant="body2" gutterBottom align="left">
        {props.loan.ApprovedRoI + "%"}
        </Typography>
        
        </Grid>
        
        
      </Grid>
      <Grid container  className={classes.container}>
      <Grid item xs={12} sm={12} className={classes.basicItem}>
        <Typography variant="subheading" gutterBottom align="left">
        Syndicate Details
        </Typography>
        <hr id="lineHeader"/>
        </Grid>
        <Grid item xs={12} sm={12} className={classes.basicItem}>
        {(props.loan.Tranches.length) ?  Object.keys(props.loan.Tranches).map(n => {
            return <ExpansionPanel>
        <ExpansionPanelSummary  expandIcon={<ExpandMoreIcon />} 
                                expanded= {props.expanded[n] !== false}
                                onChange={(e) => props.handleExpand(e, n)}>
          <Typography className={classes.heading}>{'Tranche ' + (Number(n) + 1)}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
        <Grid container  className={classes.container}>
      <Grid item xs={12} sm={4} className={classes.basicItem}>
        <Typography variant="subheading" gutterBottom align="left">
        Tranche Amount
        </Typography>
        <Typography variant="body2" gutterBottom align="left">
        {props.loan.Tranches[n].TrancheAmount}
        </Typography> 
        </Grid>
        <Grid item xs={12} sm={4} className={classes.basicItem}>
        <Typography variant="subheading" gutterBottom align="left">
        Start Date
        </Typography>
        <Typography variant="body2" gutterBottom align="left">
        {props.loan.Tranches[n].StartDate}
        </Typography> 
        </Grid>
        <Grid item xs={12} sm={4} className={classes.basicItem}>
        <Typography variant="subheading" gutterBottom align="left">
        End Date
        </Typography>
        <Typography variant="body2" gutterBottom align="left">
        {props.loan.Tranches[n].EndDate}
        </Typography> 
        </Grid>
        <Grid item xs={12} sm={12} className={classes.basicItem}>
        <Typography variant="subheading" gutterBottom align="left">
        Banks Participating
        </Typography>
        <Typography variant="body2" gutterBottom align="left">
        {getBanksString(props.loan.Tranches[n])}
        </Typography> 
        </Grid>
        <Grid item xs={12} sm={12} className={classes.basicItem}>
        <Typography variant="subheading" gutterBottom align="left">
        Drawdowns
        </Typography>
        <Paper >
        <Table >
        <TableHead>
          <TableRow className={classes.tablehead}>
            <TableCell >S.No</TableCell>
            <TableCell className={classes.tablecell}>Amount</TableCell>
            <TableCell className={classes.tablecell}>Start Date</TableCell>
             <TableCell className={classes.tablecell}>End Date</TableCell>
             <TableCell className={classes.tablecell}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {(props.loan.Tranches[n].Drawdowns.length) ? 
        Object.keys(props.loan.Tranches[n].Drawdowns).map(e => {
            return (
              <TableRow className={classes.tablerow} key={props.loan.Tranches[n].Drawdowns[e].DrawdownNo}>
                <TableCell className={classes.tableNormalcell} component="th" scope="row">
                  {props.loan.Tranches[n].Drawdowns[e].DrawdownNo}
                </TableCell>
                <TableCell className={classes.tableNormalcell} >{props.loan.Tranches[n].Drawdowns[e].DrawdownAmount}</TableCell>
                <TableCell className={classes.tableNormalcell} >{props.loan.Tranches[n].Drawdowns[e].StartDate}</TableCell>
                <TableCell className={classes.tableNormalcell} >{props.loan.Tranches[n].Drawdowns[e].EndDate}</TableCell>
                <TableCell className={classes.tableNormalcell} >{props.loan.Tranches[n].Drawdowns[e].DrawdownStatus}</TableCell>
                
                </TableRow>
            );
        }) : null}
        </TableBody>
      </Table>
       </Paper>
        </Grid>
        </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
        }) : null}
    </Grid>
     </Grid>
     {(props.loan.drawdownToBeInitiated !== '' && props.role === "bank") ? 
      <Grid container alignItems="center" item xs={12} >
        <Button
        variant="contained"
        id="memoBtn"
        align="center"
        onClick={() => {props.handleDrawdown(props.loan)}}
        >
        Initiate Drawdown
        </Button>
        </Grid> : null }
                
              
        </Paper>
      </main>
    </React.Fragment>
  );
}

export default withStyles(styles)(SyndicateDetail);