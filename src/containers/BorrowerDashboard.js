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
        this.authenticedServiceInstance = AuthenticatedServiceInstance;
    	this.state = {
            approvedLoansRowsPerPage: 5,
            approvedLoansPage: 0,
            approvedLoansView: []
    	};
        this.myCallback = this.myCallback.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    }
    componentDidMount() {
        let user = this.authenticedServiceInstance.getUserInfo();
        let role = user.orgId;
        axios.get(`http://delvmplwindpark00:8080/requisitions/` + role)
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
            this.setApprovedViewLoans();
                         });
    }
    myCallback = (loanId) => {
    	this.setState({
    		redirect: true,
    		loanToRedirect: loanId
    	});
    }
    setApprovedViewLoans = () => {
        var arr = this.state.approvedLoans.slice
        (this.state.approvedLoansPage * this.state.approvedLoansRowsPerPage,
            this.state.approvedLoansPage * this.state.approvedLoansRowsPerPage +
            this.state.approvedLoansRowsPerPage);
        //this.setState({approvedLoansView: arr});
        return arr;
    }
    handleChangePage = (event, page) => {
        this.setState({ approvedLoansPage: page });
        //this.setApprovedViewLoans(page);
    };
    handleChangeRowsPerPage = event => {
        var rows = event.target.value;
        this.setState({ approvedLoansRowsPerPage: rows, approvedLoansPage: 0 });
        //this.setApprovedViewLoans(rows);
    };
    render() {
        console.log(this.state);
   		if (this.state.redirect && this.state.loanToRedirect) {
    		return <Redirect push to={`/loan/${this.state.loanToRedirect}`}/>;
  		}
        if(this.state.approvedLoans && this.state.pendingLoans) {
            return (
                <div id="borrowerDashboard">
                    <Grid container>
                        <Grid item xs={12} sm={10} md={10}>
    			<h3> Applications Pending for Lead Arranger Selection </h3>  
                <PendingApplications loanList={this.state.pendingLoans}
                  redirectToLoan={this.myCallback} />
                 </Grid>
                 <Grid xs={12} sm={10} md={10}>
                <ApprovedLoans loanList={this.setApprovedViewLoans()}
                totalLoans={this.state.approvedLoans.length}
                rowsPerPage={this.state.approvedLoansRowsPerPage}
                page={this.state.approvedLoansPage}
                handleChangePage={this.handleChangePage}
                handleChangeRowsPerPage={this.handleChangeRowsPerPage}/>
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