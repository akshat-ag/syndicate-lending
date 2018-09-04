import React from 'react'
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography'
import {NavLink} from 'react-router-dom'
import SimpleMediaCard from '../presentation/BankCard.js';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { Redirect } from 'react-router-dom';

import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import CircularProgress from '@material-ui/core/CircularProgress';
export default class LoanDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			banksList: [],
			hasError: false
		}
	}
	componentDidMount() {
		const { match: { params } } = this.props;
		axios.get(`http://delvmplwindpark00:8080/requisition/${params.id}`)
			.then(({ data: loanDetail }) => {
			  console.log('user', loanDetail);
				this.setState({ loanDetail: loanDetail });
				this.setState({ banksList: loanDetail.RoI });
				console.log('state', this.state);
				
			})
			.catch((error) => {
				console.log('Data wasnt rendered');
				this.setState({hasError: true});
			});

	}
	handleSubmit = (bankName) => {
	   // event.preventDefault();
	   const { match: { params } } = this.props;
	    const postObj = {
			RequisitionNo: params.id,
			BankName: bankName,
			status: "Approved"
		};
		

	    axios.put(`http://delvmplwindpark00:8080/finalizeRequisition`, postObj )
	      .then(res => {
			  this.setState({redirect: true})
	        console.log(res);
			console.log(res.data);
			NotificationManager.success('Success message', 'Requisition Confirmed');
	      });
	}
	declineAll = () => {
		const { match: { params } } = this.props;
		const postObj = {
			RequisitionNo: params.id,
		  declineAll: true,
		  
		};
		
		axios.post(`http://delvmplwindpark00:8080/finalizeRequisition`, postObj )
		.then(res => {
		this.setState({redirect: true})
			console.log(res);
			console.log(res.data);
			NotificationManager.error( 'All Lead Arrangers Declined', 'Warning', 3000);
		});
	}
	render() {
		if(this.state.redirect === true) {
			return <Redirect push to={`/dashboard`}/>;
		}
		console.log(this.state);
		const checkBanks = () => {
			if(this.state.banksList.length) {
				console.log("aa");
				return (<Grid item container xs={12}  justify="center" id="declineall">
			<Button variant="contained" color="secondary" onClick={this.declineAll}>
				Decline All
			</Button>
			 </Grid>)
			} else {
				return;
			}
		}
		if(this.state.hasError) {
			return (<div><h3>Oops something went wrong!</h3></div>);
		}
		if(!this.state.banksList.length) {
			return <Grid container  id="loader" justify="center" alignItems="center">
			<Grid container item xs={12} justify="center">
			<CircularProgress  size={50} thickness={4} />
			</Grid>
		
			</Grid>
		}
		return (
			<div >
        		<h3 id="leadSelect"> Select the Lead Arranger </h3>
				<Grid container id="cardContainer" spacing={16} justify="space-evenly">
				
				{this.state.banksList.map(bank => {
					return (
						<Grid item xs={12} sm={2} md={2} >
							
						<SimpleMediaCard bankDetails={bank} 
						loanAmt={this.state.loanDetail.RequisitionAmount}
						deadline={this.state.loanDetail.EndDate}
						onSubmit={this.handleSubmit}/>
						</Grid>
					)
				})}
				
				</Grid>
			{checkBanks()} 
        </div>);
	}
}