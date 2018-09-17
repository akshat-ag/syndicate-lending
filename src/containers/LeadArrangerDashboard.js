import React, { Component } from 'react';
import {AuthenticatedServiceInstance} from '../services/AuthenticationService';
import PendingApplications from '../presentation/BorrowerPendingApplications';
import BiddingLoans from '../presentation/BiddingLoans';
import BorrowerAcceptedLoans from '../presentation/BorrowerAcceptedLoans';
import CustomizedTabs from '../presentation/RequisitionTabs';
import InformationMemo from '../presentation/InformationMemo';
import SyndicateLoans from '../presentation/LoansTable';
import { Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import _ from 'lodash';
import Modal from '@material-ui/core/Modal';
import {NotificationManager} from 'react-notifications';
import Grid from "@material-ui/core/Grid";
class LeadArrangerDashboard extends Component {
    constructor(props) {
        super(props);
        this.authenticedServiceInstance = AuthenticatedServiceInstance;
    	this.state = {
            quotedLoans: [],
            acceptedLoans: [],
            biddingLoans: [],
            syndicateLoans: [],
            loansResolved: false,
            requisitionsResolved: false,
            tabIndex: 0,
            generateInfo: false,
            currentReq: '',
            bankName: '',
            checkTC: false,
            redirectToDashboard: false
    	};
        this.myCallback = this.myCallback.bind(this);
        this.handleAccept = this.handleAccept.bind(this);
        this.handleRate = this.handleRate.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.showLoanDetails = this.showLoanDetails.bind(this);
    }
    componentDidMount() {
        const arrangerName = this.authenticedServiceInstance.getUserInfo().orgId;
        const bankName = this.authenticedServiceInstance.getUserInfo().orgName;
        this.setState({arrangerName: arrangerName, bankName: bankName});
        let requisitions =  axios.get('http://delvmplwindpark00:8080/requisitions/la/' + arrangerName);
        let loans = axios.get('http://delvmplwindpark00:8080/la/' + arrangerName + '/loans');
        requisitions.then(({ data: loanList }) => {
            let approvedLoans = [];
            let biddingLoans = [];
            let statusAddedRequisition= {};
            this.setState({requisitionsResolved: true});
            for( let i = 0, max = loanList.length; i < max ; i++ ){
                if( loanList[i].RequisitionStatus === "Approved" && loanList[i].ApprovedLA === arrangerName){
                    statusAddedRequisition = this.sortStatus(loanList[i]);
                    approvedLoans.push(statusAddedRequisition);
                } else if(loanList[i].RequisitionStatus === "Pending"){
                    for(let j=0; j< loanList[i].RoI.length; j++) {
                        if(loanList[i].RoI[j].BankName === arrangerName && loanList[i].RoI[j].Status === "Pending") {
                            biddingLoans.push(loanList[i]);
                        }
                    }
                    
                }
            } 
            this.setState({ acceptedLoans: approvedLoans, biddingLoans: biddingLoans });
        });
        loans.then(({ data: loanList }) => {
           this.setState({loansResolved: true});
           this.setState({ syndicateLoans: loanList });
        });
    }
    myCallback(loanId){
    	this.setState({
    		redirect: true,
    		loanToRedirect: loanId
    	});
    }
    
    sortStatus = (loan) => {
        // if(this.state.approvedLoans.length >0) {
        //     const newItems = [...this.state.approvedLoans];
        //     for(let i=0; i<this.state.approvedLoans.length; i++) {
                if(!loan.Memo.LeadArranger &&
                    !loan.Memo.Borrower) {
                        loan.status = "Generate Memo";
                        loan.ActionNeeded = true;
                } else if(loan.Memo.LeadArranger &&
                     !loan.Memo.Borrower) {
                        loan.status = "Borrower Confirmation Left";
                        loan.ActionNeeded = false;
                } else {
                    loan.status = "Form Syndicate";
                    loan.ActionNeeded = true;
                }
            // }
            // this.setState((prevState) => {
            //     return {approvedLoans: newItems};
            // });
        // }
        return loan;
    }
    handleAccept(loanId){
        let postObj = this.state.quotedLoans.find(x => x.RequisitionNo === loanId);
        // if(postObjIndex === -1) {
        //     NotificationManager.error('Error', 'Requisition Confirmed');
        // }
        
        postObj.status = 'Rate Quoted';
        
          axios.put(`http://delvmplwindpark00:8080/updateRequisition/`,  postObj )
            .then(res => {
                this.setState({redirect: true})
              console.log(res);
              console.log(res.data);
              this.setState({redirectToDashboard: true});
              NotificationManager.success('Success message', 'Rate Quoted');
            });
    };
    handleRate = function(e,prop) { 
        let loanObj = this.state.quotedLoans.findIndex(x => x.RequisitionNo === prop);
        if(loanObj === -1) {
            let obj = {
             RequisitionNo:prop,
             leadArranger: this.state.arrangerName,
             rate: e.target.value }
             this.setState({
                quotedLoans: [...this.state.quotedLoans, obj]
            });
        } else {
            let value = e.target.value;
            this.setState((prevState) => {
                const newItems = [...prevState.quotedLoans];
                newItems[loanObj].rate = value;
                return {quotedLoans: newItems};
            });
            
        }
    }
    handleCancel(loanId) {
        let postObjIndex = this.state.quotedLoans.findIndex(x => x.RequistionNo === loanId);
        let postObj= {};
        postObj.action =  "decline";
        if(postObjIndex === -1) {
            postObj.RequistionNo = loanId;
        } else {
           postObj = this.state.quotedLoans[postObjIndex];
           delete postObj.rateQuoted;
        }
        axios.put(`http://delvmplwindpark00:8080/citi/${loanId}`, { postObj })
            .then(res => {
              console.log(res);
              console.log(res.data);
              this.setState({redirectToDashboard: true});
              NotificationManager.error('Error message', 'Requisition Declined');
            });
    }
    refreshPage() {
        console.log("Clicked");
        window.location.reload();
    }
    showLoanDetails(loanId) {
        this.setState({
    		redirectToTranches: true,
    		loanToRedirect: loanId
    	});  
    }
    getTabData = () =>  {
        const biddingHeader = "Loan(s) for Bidding";
        const accepteddHeader = "Borrower Accepted Loans";
        switch(this.state.tabIndex) {
            case 0:
              return  <BiddingLoans heading={biddingHeader} 
                                    loanList={this.state.biddingLoans} 
                                    changeRate={this.handleRate} 
                                    onAccept={this.handleAccept} 
                                    onDecline={this.handleCancel}/>;
              case 1: 
                return   <BorrowerAcceptedLoans heading={accepteddHeader} 
                                                loanList={this.state.acceptedLoans} 
                                                showLoan={this.showLoanDetails} 
                                                handleAction={this.handleAction}/>;
            default: 
                throw new Error('Unknown step');
        }
    };
    handleChange = (event, value) => {
        this.setState({ tabIndex: value });
    };
    handleAction = (reqNo, status) => {
        if(status === "Generate Memo") {
            this.setState({generateInfo: true, currentReq: reqNo});
        }else if(status === "Form Syndicate") {
            this.showLoanDetails(reqNo);
        }
    }
    getGenerationMemo = () => {
        let user = _.find(this.state.acceptedLoans,{ RequisitionNo : this.state.currentReq });
        return user;
    }
    handleClose = () => {
        this.setState({generateInfo: false, currentReq: ''});
        return false;
    }
    sendMemo = () => {
        let postObj = {
            RequisitionNo: this.state.currentReq,
            MemoUpdated: "LeadArranger"
        };
        axios.put(`http://delvmplwindpark00:8080/updateMemo/`,  postObj )
        .then(res => {
            this.setState({generateInfo: false, currentReq: ''});
            this.setState({redirectToDashboard: true});
            NotificationManager.success('Success message', 'Memo Signed');
        });
    }
    handleCheck = (event) => {
        this.setState({checkTC: event.target.checked});
    }
    render() {
       
        console.log(this.state);
   		if (this.state.redirectToTranches && this.state.loanToRedirect) {
    		return <Redirect push to={`/syndicate/${this.state.loanToRedirect}`}/>;
          }
        if (this.state.redirectToDashboard) {
            return <Redirect push to={`/`} />
        }
        if(this.state.loansResolved && this.state.requisitionsResolved) {
            return (
                <div id="leadArrangerDashboard">
                    <div id="requisitionsBank">
                    <h4 id="requis"> Requisitions </h4>
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
                        bank={this.state.bankName}
                        handleCheck={this.handleCheck}
                        checked={this.state.checkTC}/>
                    </Modal>
                    </div>
                    <div id="loansBank">
                    <h4 id="requis"> Loans </h4>
                    <SyndicateLoans  
                        loanList={this.state.syndicateLoans} 
                        showLoan={this.showLoanDetails} 
                        handleAction={this.handleAction}/>
                    </div>
                </div>
            );
        }
        else {
            return  <Grid container  id="loader" justify="center" alignItems="center">
            <Grid container item xs={12} justify="center">
            <CircularProgress  size={50} thickness={4} />
            </Grid>
            
            </Grid>
        }
    }
}

export default LeadArrangerDashboard;