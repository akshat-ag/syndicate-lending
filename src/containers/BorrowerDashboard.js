import React, { Component } from 'react';
import {AuthenticatedServiceInstance} from '../services/AuthenticationService';
import PendingApplications from '../presentation/BorrowerPendingApplications';
import ApprovedLoans from '../presentation/BorrowerApprovedLoans';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from "@material-ui/core/Grid";
class Dashboard extends Component {
    constructor(props) {
    	super(props);
    	this.state = {
    		
    	};
    	this.myCallback = this.myCallback.bind(this);
    }
    componentDidMount() {
        axios.get(`http://delvmplwindpark00:8080/requisitions/abc`)
            .then(({ data: loanList }) => {
             // console.log('user', loanList);
            let approvedLoans = [];
            let pendingLoans = [];
            for( let i = 0, max = loanList.length; i < max ; i++ ){
                if( loanList[i].RequisitionStatus === "Approved" ){
                    approvedLoans.push(loanList[i]);
                } else {
                    pendingLoans.push(loanList[i]);
                }
            } 
            this.setState({ approvedLoans: approvedLoans, pendingLoans: pendingLoans });
                         });
    }
    myCallback = (loanId) => {
    	this.setState({
    		redirect: true,
    		loanToRedirect: loanId
    	});
    }
    render() {
        console.log(this.state);
   		if (this.state.redirect && this.state.loanToRedirect) {
    		return <Redirect push to={`/loan/${this.state.loanToRedirect}`}/>;
  		}
        if(this.state.approvedLoans && this.state.pendingLoans) {
            return (
                <div id="borrowerDa0shboard">
                    <Grid container>
                        <Grid item xs={12} sm={10} md={10}>
    			<h3> Applications Pending for Lead Arranger Selection </h3>  
                        
                  <PendingApplications loanList={this.state.pendingLoans}
                  redirectToLoan={this.myCallback} />
                 </Grid>
                 <Grid xs={12} sm={10} md={10}>
                <ApprovedLoans loanList={this.state.approvedLoans} />
                </Grid>
                </Grid>
                </div>
                
            );
        }
        else {
            return <Grid container  id="loader" justify="center" alignItems="center">
                <Grid container item xs={12} justify="center">
                <CircularProgress  size={50} thickness={4} />
                </Grid>
                
                </Grid>
        }
    }
}

export default Dashboard;