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
        height: '450px',
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
      table1: {
          width: '50%'
      },
      table2: {
        width: '70%'
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
function TrancheView(props) {
    const {classes} = props;
  return (
    <React.Fragment>
       
       <main className={classes.layout}>
      
        <Paper className={classes.paper}>
        <Typography variant="headline" align="center">
          Tranche 
            </Typography>
            <Typography variant="subheading" align="left">
        Basic Information
        </Typography>
        <hr id="lineHeader"/>
      <Grid container  className={classes.container}>
      <Grid item xs={12} sm={4} className={classes.basicItem}>
        <Typography variant="subheading" gutterBottom align="left">
       Amount
        </Typography>
        <Typography variant="body2" gutterBottom align="left">
        {"$ " + props.tranche.Amount}
        </Typography> 
        </Grid>
      <Grid item xs={12} sm={4} className={classes.basicItem}>
        <Typography variant="subheading" gutterBottom align="left">
        Start Date
        </Typography>
        <Typography variant="body2" gutterBottom align="left">
        {props.tranche.StartDate}
        </Typography> 
        
          
        </Grid>
      <Grid item xs={12} sm={4} className={classes.basicItem}>
        <Typography variant="subheading" gutterBottom align="left">
       End Date
        </Typography>
        <Typography variant="body2" gutterBottom align="left">
        {props.tranche.EndDate}
        
        </Typography> 
        </Grid>
        
        
        <Grid item xs={12} sm={12} id="newItem">
        <Typography variant="subheading"  align="left">
        Participants
        </Typography>
        <hr id="lineHeader"/>
        <Table className={classes.table1}>
        <TableHead>
          <TableRow>
            <TableCell>Bank Name</TableCell>
            <TableCell >Asset Ratio</TableCell>
           </TableRow>
        </TableHead>
        <TableBody>
        {(props.tranche.Participants.length) ? 
          Object.keys(props.tranche.Participants).map(row => {
            return (
              <TableRow key={props.tranche.Participants.bank}>
                <TableCell component="th" scope="row">
                {props.tranche.Participants[row].bank}
                </TableCell>
                <TableCell >{props.tranche.Participants[row].ratio + "%"}</TableCell>
                </TableRow>
            );
          })
          : <TableRow>
          <TableCell ></TableCell>
          
          </TableRow>}
           
        </TableBody>
        
      </Table>
        
        
        </Grid>
        <Grid item xs={12} sm={12}  id="newItem" >
        <Typography variant="subheading"  align="left">
        Drawdowns
        </Typography>
        <hr id="lineHeader"/>
        <Table className={classes.table2}>
        <TableHead>
          <TableRow>
            <TableCell>Start Date</TableCell>
            <TableCell >End Date</TableCell>
            <TableCell >Amount</TableCell>
           </TableRow>
        </TableHead>
        <TableBody>
        {(props.tranche.Drawdowns.length) ? 
          Object.keys(props.tranche.Drawdowns).map(row => {
            return (
              <TableRow key={props.tranche.Drawdowns.startDate}>
                <TableCell component="th" scope="row">
                {props.tranche.Drawdowns[row].startDate}
                </TableCell>
                <TableCell >{props.tranche.Drawdowns[row].endDate}</TableCell>
                <TableCell >{"$ " + props.tranche.Drawdowns[row].amount}</TableCell>
                </TableRow>
            );
          })
          : <TableRow>
          <TableCell ></TableCell>
          
          </TableRow>}
           
        </TableBody>
        
      </Table>
        
        
        </Grid>
        </Grid>
                
              
        </Paper>
      </main>
    </React.Fragment>
  );
}

export default withStyles(styles)(TrancheView);