import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
function getBankName(LeadArranger) {
  if(LeadArranger === 'citi') {
      return 'CitiBank';
    } else if(LeadArranger === 'wells') {
      return 'Wells Fargo';
    } else if(LeadArranger === 'jp') {
      return 'JP Morgan';
    }
}
const styles = theme => ({
    
      layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        [theme.breakpoints.up(400 + theme.spacing.unit * 2 * 2)]: {
          width: 400,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      },
      paper: {
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
        padding: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
          marginTop: theme.spacing.unit * 6,
          marginBottom: theme.spacing.unit * 6,
          padding: theme.spacing.unit * 3,
        },
      },
      container: {
        marginTop: theme.spacing.unit * 3,
      }
  });
function InformationMemo(props) {
    const {classes} = props;
  return (
    <React.Fragment>
       <main className={classes.layout}>
      
        <Paper className={classes.paper}>
        <Typography variant="headline" align="center">
          Information Memo
            </Typography>
            <Typography variant="subheading" align="center">
        RequisitionNo # {props.loan.RequisitionNo}
        </Typography>
      <Grid container spacing={24} className={classes.container}>
      <Grid item xs={12} sm={6}>
        <Typography variant="subheading" gutterBottom align="center">
        Lead Arranger
        </Typography>
        <Typography variant="body2" gutterBottom align="center">
        {props.bank ? getBankName(props.bank) : props.loan.bankName}
        </Typography> 
        </Grid>
        <Grid item xs={12} sm={6} >
        <Typography variant="subheading" gutterBottom align="center">
        Borrower
        </Typography>
        <Typography variant="body2" gutterBottom align="center">
        {props.loan.InstitutionName}
        </Typography> 
        </Grid>
        <Grid item xs={12} sm={6}>
        <Typography variant="subheading" gutterBottom align="center">
        Loan Amount
        </Typography>
        <Typography variant="body2" gutterBottom align="center">
        {props.loan.RequisitionAmount}
        </Typography> 
        
          
        </Grid>
        <Grid item xs={12} sm={6}>
        <Typography variant="subheading" gutterBottom align="center">
        End Date
        </Typography>
        <Typography variant="body2" gutterBottom align="center">
        {props.loan.EndDate}
        </Typography>
        
        </Grid>
        <Grid container alignItems="center" item xs={12} >
        <FormControlLabel
          control={
            <Checkbox
            checked={props.checked}
            value="checkedB"
            onChange={(e) => props.handleCheck(e)}
            color="primary"
          />
          }
          label="Check to indicate that you have read and agree to the terms presented in the Terms and Conditions agreement"
        />
       
        
        </Grid>
        <Grid container alignItems="center" item xs={12} >
        <Button
        variant="contained"
        color="primary"
        align="center"
        onClick={() => {props.handleClick()}}
        >
        Sign Memo
        </Button>
        </Grid>
      </Grid>
  
     
                
              
        </Paper>
      </main>
    </React.Fragment>
  );
}

export default withStyles(styles)(InformationMemo);