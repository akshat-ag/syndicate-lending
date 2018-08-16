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
export default class LoanDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			banksList: []
		}
	}
	componentDidMount() {
		const { match: { params } } = this.props;
		
		  axios.get(`/requisition/${params.id}/banks`)
			.then(({ data: banksList }) => {
			  console.log('user', banksList);
		
			  this.setState({ banksList });
			});
	}
	render() {
		
		return (
			 <div >
        		<h3 id="leadSelect"> Select the Lead Arranger </h3>
				<Grid container id="cardContainer" spacing={8} justify="center">
				{this.state.banksList.map(bank => {
					return (
						<Grid item xs={12} sm={4} md={3} >
						<SimpleMediaCard bankDetails={bank}/>
						</Grid>
					)
				})}
				
				</Grid>
        </div>);
	}
}