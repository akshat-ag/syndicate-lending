import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Grid from "@material-ui/core/Grid";
import MultipleSelect from '../presentation/LeadArrangerSelect.js';
// import MultipleSelect from '../views/leadArrangerS.js';
import FormInput from './FormInput/formInput'
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
			leadArrangers: []
		};
		this.updateData = this.updateData.bind(this);
	}
	handleChange = prop => event => {
		this.setState({ [prop]: event.target.value });
	};

	myCallback = (leadArrangers) => {

		this.setState({ leadArrangers: leadArrangers });
		console.log("hi");
	};
	handleSubmit = event => {
		event.preventDefault();

		const postObj = {
			loanNumber: this.state.loanNo,
			loanAmount: this.state.loanAmt,
			leadArrangers: this.state.leadArrangers,
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			emailId: this.state.emailId,
			start_date: this.state.start_date,
			end_date: this.state.end_date
		};

		axios.post(`https://jsonplaceholder.typicode.com/users`, { postObj })
			.then(res => {
				console.log(res);
				console.log(res.data);
			})
	}

	testValidation(value) {
		if (value < 2) {
			return {
				error: true,
				errorMsg: 'Number is less than 2'
			}
		} else if (value > 10) {
			return {
				error: true,
				errorMsg: 'Number is greater than 10'
			}
		}
		return {
			error: false,
			errorMsg: ''
		}
	}

	updateData(key, value) {
		this.setState({ [key]: value });
	}

	render() {
		const { classes } = this.props;
		console.log(this.state);
		return (
			<Grid container className="loan_app">
				<Grid item xs={12}>
					<h3 id="app1"> Application </h3>
				</Grid>

				<Grid item xs={10}>

					<form id="loanform" onSubmit={this.handleSubmit}>


						<Grid item xs={9}>
							<h3 id="LoanTitle"> Loan Information </h3>
							<Grid container spacing={16} className="container">
								<Grid item xs={3}>
									<FormControl fullWidth className={classes.margin}>
										<InputLabel htmlFor="loan-amount" required>Amount</InputLabel>
										<Input
											id="loan-amount"
											required
											value={this.state.loanAmt}
											onChange={this.handleChange("loanAmt")}
											startAdornment={<InputAdornment position="start">$</InputAdornment>}
										/>
									</FormControl>
								</Grid>
								<Grid item xs={3} className="borrInput">
									<FormControl fullWidth className={classes.margin}>
										<InputLabel htmlFor="start-date" disableAnimation required>Start Date</InputLabel>
										<Input
											type="date"
											id="start-date"
											onChange={this.handleChange("start_date")}
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
											onChange={this.handleChange("end_date")}
											startAdornment={<InputAdornment position="start"></InputAdornment>}
										/>
									</FormControl>
								</Grid>
							</Grid>
							<h3 id="LoanTitle"> Borrower Information </h3>

							<Grid container spacing={16} className="container">
								<Grid item xs={3}>
									<FormControl fullWidth className={classes.margin}>
										<InputLabel htmlFor="first-name" required>First Name</InputLabel>
										<Input
											id="first-name"
											required
											value={this.state.firstName}
											onChange={this.handleChange("firstName")}
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
											onChange={this.handleChange("lastName")}
											startAdornment={<InputAdornment position="start"></InputAdornment>}
										/>
									</FormControl>
								</Grid>
								<Grid item xs={3} className="borrInput">
									<FormControl fullWidth className={classes.margin}>
										<InputLabel htmlFor="emailId" required>Email Address</InputLabel>
										<Input
											type="email"
											id="emailId"
											value={this.state.email}
											onChange={this.handleChange("emailId")}
											startAdornment={<InputAdornment position="start"></InputAdornment>}
										/>
									</FormControl>
								</Grid>
								{/* code: Mridul */}
								<Grid item xs={3} className="borrInput">
									<FormInput
										id="test-field"
										name="test"
										type="text"
										isRequired
										label="Test"
										validations={[this.testValidation]}
										endAdornment={{ icon: '3d_rotation' }}
										restrictedPattern={/^[0-9*#+]+$/}
										updateData={this.updateData} />
								</Grid>
								<Grid item xs={3} className="borrInput">
									<FormInput
										id="test-password-field"
										name="test-password"
										type="password"
										isRequired
										label="Test-Password"
										// validations={[this.testValidation]}
										endAdornment="eye"
										// restrictedPattern={/^[0-9*#+]+$/} 
										updateData={this.updateData}
									/>
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
							{(this.state.loanStatus === "Approved") ? <MultipleSelect callbackFromParent={this.myCallback} /> : null}
						</Grid>
					</form>
				</Grid>
			</Grid>
		);
	}
}
export default withStyles(styles)(LoanApplication);