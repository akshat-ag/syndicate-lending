import React, { Component } from 'react';
import {AuthenticatedServiceInstance} from '../services/AuthenticationService';
import PendingApplications from '../presentation/BorrowerPendingApplications';
import ApprovedLoans from '../presentation/BorrowerApprovedLoans';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
class Dashboard extends Component {
    constructor(props) {
    	super(props);
    	this.state = {
    		
    	};
    	this.myCallback = this.myCallback.bind(this);
    }
    componentDidMount() {
        axios.get(`/requisitions/reliance`)
            .then(({ data: loanList }) => {
             // console.log('user', loanList);
            let approvedLoans = [];
            let pendingLoans = [];
            for( let i = 0, max = loanList.length; i < max ; i++ ){
                if( loanList[i].status === "approved" ){
                    approvedLoans.push(loanList[i]);
                } else {
                    pendingLoans.push(loanList[i]);
                }
            } 
            this.setState({ approvedLoans: approvedLoans, pendingLoans: pendingLoans });
                         }); 

        // let loans = {};
        //     for( let i = 0, max = loanList.length; i < max ; i++ ){
        //         if( loans[loanList[i].status] == undefined ){
        //          loans[loanList[i].status] = [];
        //         }
        //         loans[loanList[i].status].push(loanList[i]);
        //     } 
        //     this.setState({ loans: loans }).bind(this);
        //       console.log(loans);
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
                <div id="borrowerDashboard">
    			<h3> Applications Pending for Lead Arranger Selection </h3>            
                  <PendingApplications loanList={this.state.pendingLoans}
                  redirectToLoan={this.myCallback} />
                <ApprovedLoans loanList={this.state.approvedLoans} />
                </div>
            );
        }
        else {
            return <div>Loading....</div>
        }
    }
}

export default Dashboard;