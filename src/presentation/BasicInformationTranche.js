import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';

function BasicInformationTranche(props) {
  return (
    <React.Fragment>
      
      <Grid container spacing={24}>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth >
            <InputLabel htmlFor="amount" required>Amount</InputLabel>
            <Input
              id="amount"
              required
              value={props.amount}
             
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
        <FormControl fullWidth>
          <InputLabel htmlFor="start-date" disableAnimation={true} required>Start Date</InputLabel>
          <Input
            type="date"
            id="start-date"
            disabled
            value={props.startDate}
            startAdornment={<InputAdornment position="start"></InputAdornment>}
          />
        </FormControl>
          
        </Grid>
        <Grid item xs={12} sm={3}>
        <FormControl fullWidth>
        <InputLabel htmlFor="end-date" disableAnimation={true} required>End Date</InputLabel>
        <Input
          type="date"
          id="end-date"
          value={props.endDate}
          inputProps= {{ min: props.endDateLimitMin, max: props.endDateLimitMax, }}
          error = {props.trancheEndDateLimitReached}
          onChange={(e) => props.setEndDate(e)}
          startAdornment={<InputAdornment position="start"></InputAdornment>}
        />
      </FormControl>
        </Grid>
        
        
      </Grid>
    </React.Fragment>
  );
}

export default BasicInformationTranche;