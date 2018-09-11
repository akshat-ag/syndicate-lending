import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import { Redirect } from 'react-router-dom';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Grid from "@material-ui/core/Grid";
import MultipleSelect from '../presentation/LeadArrangerSelect.js';
import {NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
// import MultipleSelect from '../views/leadArrangerS.js';
import axios from 'axios';
const styles = theme => ({
  	container: {
	    display: 'flex',
	    flexWrap: 'wrap',
  	},
  	textField: {
	    marginLeft: theme.spacing.unit,
	    marginRight: theme.spacing.unit,
	    width: 200,
  	},
  	menu: {
    	width: 200,
  	},
  	root: {
	    ...theme.mixins.gutters(),
	    paddingTop: theme.spacing.unit * 2,
	    paddingBottom: theme.spacing.unit * 2,
	},
	
	rightIcon: {
    	marginLeft: theme.spacing.unit,
  	},
});

class LoanApplication extends Component {

	
	constructor(props) {
		super(props);
		this.state = {
			loanNo: 123,
			loanStatus: "Approved",
			leadArrangers: [],
			redirect: false
			}; 
	}
	handleChange = prop => event => {
    	this.setState({ [prop]: event.target.value });
  	};
  	
  	myCallback = (leadArrangers) => {
  		
        this.setState({leadArrangers: leadArrangers});
        console.log("hi");
    };
  	handleSubmit = event => {
	    event.preventDefault();

	    const postObj = {
	      requisitionAmount: this.state.loanAmt,
	      leadArrangers: this.state.leadArrangers.toString(),
	      firstName: this.state.firstName,
	      lastName: this.state.lastName,
	      emailId: this.state.emailId,
	      startDate: this.state.start_date,
		  endDate: this.state.end_date,
		  contact: this.state.mobileNo,
	      institutionName: this.state.institutionName
	      
	    };

	    axios.post(`/requisition/`,  postObj )
	      .then(res => {
	        console.log(res);
			console.log(res.data);
			this.setState({redirect: true});
			NotificationManager.success('Success message', 'Requisition Confirmed');
	      })
  }
	render() {
		 const {classes} = this.props;
		 console.log(this.state);
		 if (this.state.redirect) {
    		return <Redirect push to={`/dashboard`}/>;
  		}
		return (
			<Grid container className="loan_app">
			<Grid item xs={12}>
			<h3 id="app1"> Application </h3>
			</Grid>
			
			<Grid item  xs={10}>
			
		     <form id="loanform" onSubmit={this.handleSubmit}>
			
		    
			<Grid item xs={9}>
			 <h3 id="LoanTitle"> Loan Information </h3>
		     	 <Grid  container spacing={16}  className="container">
		     	 	<Grid item xs={3}>
          				<FormControl fullWidth className={classes.margin}>
          				<InputLabel htmlFor="loan-amount" required>Amount</InputLabel>
				          <Input
				            id="loan-amount"
				            required
				            value={this.state.loanAmt}
				            onChange= {this.handleChange("loanAmt")}
				            startAdornment={<InputAdornment position="start">$</InputAdornment>}
				          />
        				</FormControl>
        			</Grid>
        			<Grid item xs={3} className="borrInput">
          				<FormControl fullWidth className={classes.margin}>
          				<InputLabel htmlFor="start-date" disableAnimation={true} required>Start Date</InputLabel>
				          <Input
				          	type="date"
				            id="start-date"
				            onChange= {this.handleChange("start_date")}
							startAdornment={<InputAdornment position="start"></InputAdornment>}
				          />
        				</FormControl>
        			</Grid>
        			<Grid item xs={3} className="borrInput">
        			<FormControl fullWidth className={classes.margin}>
          				<InputLabel htmlFor="end-date" disableAnimation="true" required>End Date</InputLabel>
				          <Input
				          	type="date"
				            id="end-date"
				            onChange= {this.handleChange("end_date")}
							startAdornment={<InputAdornment position="start"></InputAdornment>}
				          />
        				</FormControl>
        			</Grid>
		     	 </Grid>
		     	  <h3 id="LoanTitle"> Borrower Information </h3>
			
			<Grid  container spacing={16} className="container">
		     	 
		     	 	<Grid item xs={3}>
          				<FormControl fullWidth className={classes.margin}>
          				<InputLabel htmlFor="institution-name" required>Institution Name</InputLabel>
				          <Input
				            id="institution-name"
				            required
				            value={this.state.institutionName}
				            onChange= {this.handleChange("institutionName")}
				            startAdornment={<InputAdornment position="start"></InputAdornment>}
				          />
        				</FormControl>
        			</Grid>
        			<Grid item xs={3} className="borrInput">
          				<FormControl fullWidth className={classes.margin}>
          				<InputLabel htmlFor="first-name" required>First Name</InputLabel>
				          <Input
				            id="first-name"
				            required
				            value={this.state.firstName}
				            onChange= {this.handleChange("firstName")}
				            startAdornment={<InputAdornment position="start"></InputAdornment>}
				          />
        				</FormControl>
        			</Grid>
        			<Grid item xs={3} className="borrInput">
          				<FormControl fullWidth className={classes.margin}>
          				<InputLabel htmlFor="last-name" required>Last Name</InputLabel>
				          <Input
				            id="last-name"
				            required
				            value={this.state.lastName}
				            onChange= {this.handleChange("lastName")}
				            startAdornment={<InputAdornment position="start"></InputAdornment>}
				          />
        				</FormControl>
        			</Grid>
        			</Grid>
        			<Grid container spacing={16} className="container1">
        			<Grid item xs={3} >
          				<FormControl fullWidth className={classes.margin}>
          				<InputLabel htmlFor="emailId" required>Email Address</InputLabel>
				          <Input
				          	type="email"
				            id="emailId"
				            value={this.state.email}
				            onChange= {this.handleChange("emailId")}
				            startAdornment={<InputAdornment position="start"></InputAdornment>}
				          />
        				</FormControl>
        			</Grid>
        			
        			
        			<Grid item xs={3} className="borrInput">
          				<FormControl fullWidth className={classes.margin}>
          				<InputLabel htmlFor="mobile" required>Mobile Number</InputLabel>
				          <Input
				          	type="number"
				            id="mobile"
				            value={this.state.mobileNo}
				            onChange= {this.handleChange("mobileNo")}
				            startAdornment={<InputAdornment position="start"></InputAdornment>}
				          />
        				</FormControl>
        			</Grid>
        			
		     	 </Grid>
		     	 <Grid item container justify="flex-start" xs={12}>
			<Button type="submit" variant="contained" color="primary" id="submitBtn">
        		Send
        	<Icon className={classes.rightIcon}>send</Icon>
     		 </Button>
		  </Grid>
		     </Grid>	 
      	<Grid item xs={3}>

      	{(this.state.loanStatus === "Approved") ? <MultipleSelect callbackFromParent={this.myCallback}/> : null}

		  </Grid>
		  
    		</form>
		 
		  </Grid>
		    </Grid>
			);
	}
}
export default withStyles(styles)(LoanApplication);