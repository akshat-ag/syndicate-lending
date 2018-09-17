import React, { Component } from 'react';
import {AuthenticatedServiceInstance} from '../services/AuthenticationService';
import PendingApplications from '../presentation/BorrowerPendingApplications';
import ApprovedLoans from '../presentation/BorrowerApprovedLoans';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';
import Modal from '@material-ui/core/Modal';
import CustomizedTabs from '../presentation/RequisitionTabs';
import SyndicateLoans from '../presentation/LoansTable';
import InformationMemo from '../presentation/InformationMemo';
import SimpleCard from '../presentation/LoanSummary';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import {NotificationManager} from 'react-notifications';
import LoanDetails from './LoanDetails';
import Grid from "@material-ui/core/Grid";
const names = [
    {name: 'CitiBank',
    value: 'citi'},
    {name: 'Wells Fargo',
    value: 'wells'},
    {name: 'JP Morgan',
      value: 'jp'}
  ];
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.authenticedServiceInstance = AuthenticatedServiceInstance;
    	this.state = {
            approvedLoansRowsPerPage: 5,
            approvedLoansPage: 0,
            approvedLoans: [],
            approvedLoansView: [],
            tabIndex: 0,
            currentReq: '',
            bankName: '',
            checkTC: false,
            redirectToDashboard: false,
            generateInfo: false,
            expandedObj: null
    	};
        this.myCallback = this.myCallback.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
        this.handleExpandClick = this.handleExpandClick.bind(this);
    }
    componentDidMount() {
        let user = this.authenticedServiceInstance.getUserInfo();
        let role = user.orgId;
        axios.get(`http://delvmplwindpark00:8080/requisitions/` + role)
            .then(({ data: loanList }) => {
                let statusAddedRequisition= {};
                let approvedLoans = [];
                let pendingLoans = [];
                for( let i = 0, max = loanList.length; i < max ; i++ ){
                    if( loanList[i].RequisitionStatus === "Approved" ){
                        statusAddedRequisition = this.sortStatus(loanList[i]);
                        approvedLoans.push(statusAddedRequisition);
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
        
        let arr = this.state.approvedLoans.slice
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
    
    handleChange = (event, value) => {
        this.setState({ tabIndex: value });
    };
    sortStatus = (loan) => {
        if(!loan.Memo.LeadArranger &&
            !loan.Memo.Borrower) {
            loan.status = "Memo Generation";
            loan.ActionNeeded = false;
        } else if(loan.Memo.LeadArranger &&
            !loan.Memo.Borrower) {
            loan.status = "Sign Memo";
            loan.ActionNeeded = true;
        } else {
            loan.status = "Syndicate Formation";
            loan.ActionNeeded = false;
        }
        return loan;
    };
    handleAction = (reqNo, status) => {
         this.setState({generateInfo: true, currentReq: reqNo});
    }
    handleClose = () => {
        this.setState({generateInfo: false, currentReq: ''});
        return false;
    };
    getGenerationMemo = () => {
        let user = _.find(this.state.approvedLoans,{ RequisitionNo : this.state.currentReq });
        if(user) {
            let name =_.find(names,{ value : user.ApprovedLA });
            user.bankName = name.name;
        }
        
        return user;
    }
    getExpandProp(loanNo, expandedObj) {
        if(loanNo === expandedObj.index) {
          return expandedObj.expanded;
        }
        return false;
      }
    sendMemo = () => {
        let postObj = {
            RequisitionNo: this.state.currentReq,
            MemoUpdated: "Borrower"
        };
        axios.put(`http://delvmplwindpark00:8080/updateMemo/`,  postObj )
        .then(res => {
          this.setState({redirectToDashboard: true});
          this.setState({generateInfo: false, currentReq: ''});
          NotificationManager.success('Success message', 'Memo Signed');
        });
    };
    handleCheck = (event) => {
        this.setState({checkTC: event.target.checked});
    };
    // handleExpandClick = (index) => {
    //     let newObj = {
    //         index: index,
    //         expanded: !this.state.expandedObj.expanded
    //     }
    //     this.setState({expandedObj: newObj});
    // }
    handleExpandClick = function(event, expanded){
        this.setState({
          expanded: expanded ? expanded : false
        });
      };
    getRowData = (loanNo) => {
        return <LoanDetails loanNo= {loanNo} />;
    }
    getTabData = () =>  {
        switch(this.state.tabIndex) {
            case 0:
              return   <PendingApplications loanList={this.state.pendingLoans}
                  redirectToLoan={this.myCallback}
                  handleExpandClick = {this.handleExpandClick}
                  expanded= {this.state.expanded}
                  getExpandProp = {this.getExpandProp}
                  getRowData = {this.getRowData} />;
              case 1: 
                return   <ApprovedLoans loanList={this.setApprovedViewLoans()}
                totalLoans={this.state.approvedLoans.length}
                rowsPerPage={this.state.approvedLoansRowsPerPage}
                page={this.state.approvedLoansPage}
                handleChangePage={this.handleChangePage}
                handleAction={this.handleAction}
                handleChangeRowsPerPage={this.handleChangeRowsPerPage}/>;
                case 2: 
                return 'Not yet Made';
            default: 
                throw new Error('Unknown step');
        }
    };
    render() {
        console.log(this.state);
   		if (this.state.redirect && this.state.loanToRedirect) {
    		return <Redirect push to={`/loan/${this.state.loanToRedirect}`}/>;
          }
          if(this.state.redirectToDashboard) {
            return <Redirect push to={`/`}/>;
          }
        if(this.state.approvedLoans && this.state.pendingLoans) {
            return (
                <div id="borrowerDashboard">
                    <Grid container>
                    <Grid item xs={12} sm={12} md={12}>
                    <SimpleCard />
                    </Grid>
                        <Grid item xs={12} sm={9} md={8}>
                        <div id="requisitionsBank">
                   
                    <CustomizedTabs handleChange={this.handleChange}
                                    tabIndex={this.state.tabIndex}/>
                    {this.getTabData()}
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.generateInfo}
                        onClose={this.handleClose}>
                        <InformationMemo 
                        loan={this.getGenerationMemo()}
                        handleClick={this.sendMemo}
                        handleCheck={this.handleCheck}
                        checked={this.state.checkTC}/>
                    </Modal>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                   
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