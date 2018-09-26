import React, { Component } from 'react';
import {AuthenticatedServiceInstance} from '../services/AuthenticationService';
import PendingApplications from '../presentation/BorrowerPendingApplications';
import BiddingLoans from '../presentation/BiddingLoans';
import BorrowerAcceptedLoans from '../presentation/BorrowerAcceptedLoans';
import CustomizedTabs from '../presentation/RequisitionTabs';
import InformationMemo from '../presentation/InformationMemo';
import SyndicateLoans from '../presentation/LoansTable';
import { Redirect } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import TodoActivity from '../presentation/TodoActivity';
import SimpleCard from '../presentation/LoanSummary';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import SyndicateDetail from '../presentation/DrawdownInitiateModal';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import _ from 'lodash';
import Modal from '@material-ui/core/Modal';
import {NotificationManager} from 'react-notifications';
import Grid from "@material-ui/core/Grid";
import TimelineComponent from '../presentation/TimelineComponent.js';
function Transition(props) {
    return <Slide direction="up" {...props} />;
}
  
class LeadArrangerDashboard extends Component {
    constructor(props) {
        super(props);
        this.authenticedServiceInstance = AuthenticatedServiceInstance;
    	this.state = {
            quotedLoans: [],
            acceptedLoans: [],
            biddingLoans: [],
            syndicateLoans: [],
            pendingActivites: [],
            expanded: [],
            expandedR: [],
            checked: [],
            loansResolved: false,
            requisitionsResolved: false,
            tabIndex: 0,
            generateInfo: false,
            currentReq: '',
            bankName: '',
            initDrawdown: false,
            openHistory: false,
            currentLoanNo: '',
            checkTC: false,
            drawdownToBeInitiated: '',
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
            let actionPendingLoans = [];
            let actionApprovedLoans = [];
            let actionFormSyndicate =[];
            let statusAddedRequisition= {};
            this.setState({requisitionsResolved: true});
            if(loanList)
            for( let i = 0, max = loanList.length; i < max ; i++ ){
                if( loanList[i].RequisitionStatus === "Approved" && loanList[i].ApprovedLA === arrangerName){
                    statusAddedRequisition = this.sortStatus(loanList[i]);
                    approvedLoans.push(statusAddedRequisition);
                    if(statusAddedRequisition.Memo.LeadArranger && statusAddedRequisition.Memo.Borrower) {
                        actionFormSyndicate.push(statusAddedRequisition);
                    } else if(!statusAddedRequisition.Memo.LeadArranger) {
                        actionApprovedLoans.push(statusAddedRequisition);
                    }
                } else if(loanList[i].RequisitionStatus === "Pending"){
                    for(let j=0; j< loanList[i].RoI.length; j++) {
                        if(loanList[i].RoI[j].BankName === arrangerName && loanList[i].RoI[j].Status === "Pending") {
                           actionPendingLoans.push(loanList[i]);
                        }
                    }
                    biddingLoans.push(loanList[i]);
                }
            }
            this.authenticedServiceInstance.setPendingLoansBank(actionPendingLoans);
            this.authenticedServiceInstance.setApprovedLoansBank(actionApprovedLoans);
            this.authenticedServiceInstance.setSynidcateLoansBank(actionFormSyndicate); 
            this.setState({ acceptedLoans: approvedLoans, biddingLoans: biddingLoans });
            this.calculateNotifications();
        });
        loans.then(({ data: loanList }) => {
           this.setState({loansResolved: true});
           let statusAddedRequisition;
           let syndLoans = [];
           for(let u = 0; u< loanList.length; u++) {
            statusAddedRequisition = this.authenticedServiceInstance.findDrawdown(loanList[u]);
            
            loanList[u].drawdownToBeInitiated = statusAddedRequisition;
            
            if(loanList[u].drawdownToBeInitiated !== '') {
                syndLoans.push(loanList[u]);
                loanList[u].currStatus = 'Pay Drawdown';
            } else 
                loanList[u].currStatus = 'Paid full';
           }
           this.authenticedServiceInstance.setPendingDrawdownsBank(syndLoans);
           this.setState({ syndicateLoans: loanList });
           let arr = []; let ner = [];
           for(let i=0; i<loanList.length; i++) {
            arr[i] = false;
            ner[i] = false;
            }
            
            this.setState({expanded: arr, expandedR: ner});
        });
    }
    
    calculateNotifications = () =>  {
        let pendingActivites = this.authenticedServiceInstance.getPendingActivities();
        let approvedActivities = this.authenticedServiceInstance.getApprovedActivities();
        let syndicateActivities = this.authenticedServiceInstance.getSyndicateActivities();
        let drawdownActivities = this.authenticedServiceInstance.getPendingDrawdownsBankActivites();
        let totalactivites;
        totalactivites = pendingActivites.concat(approvedActivities);
        totalactivites = totalactivites.concat(syndicateActivities);
        totalactivites = totalactivites.concat(drawdownActivities);
     
        
        this.setState({pendingActivites : totalactivites});
        let arrr = [];
      // let pendingActivites = [];
       for(let i=0; i<totalactivites.length; i++) {
           arrr[i] = false;
       }
       this.setState({checked: arrr});
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
                                    bankUser = {this.state.arrangerName}
                                    onDecline={this.handleCancel}/>;
            case 1: 
                return   <BorrowerAcceptedLoans heading={accepteddHeader} 
                                                loanList={this.state.acceptedLoans} 
                                                showLoan={this.showLoanDetails}
                                                handleViewHistory={this.handleViewHistory} 
                                                handleAction={this.handleAction}/>;
            case 2:
                return <SyndicateLoans
                loanList={this.state.syndicateLoans} 
                showLoan={this.showLoanDetails}
                role={"bank"}
                handleViewHistory={this.handleViewHistory}
                handleAction={this.initiateDrawdown}/>;
            default: 
                throw new Error('Unknown step');
        }
    };
    handleViewHistory = (reqNo, type) => {
        this.setState({openHistory: true, currentReq: reqNo, historyType: type});
    }
    handleCloseHistory = () => {
        this.setState({openHistory: false, currentReq: ''});
        return false;
    }
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
    initiateDrawdown = (loanNo) => {
        this.setState({initDrawdown: true, currentLoanNo: loanNo});
    }
    getGenerationMemo = () => {
        let user;
        if(this.state.historyType === 'loan') {
            user = _.find(this.state.syndicateLoans,{ LoanNo : this.state.currentReq });
            return user;
        }
        else {
            user = _.find(this.state.acceptedLoans,{ RequisitionNo : this.state.currentReq });
            if(user) {
                return user;
            }
        }
        
    }
    clickCard = (cardPlate) => {
        if(cardPlate === "pending") {
            this.setState({ tabIndex: 0 });
        } else if(cardPlate === "approved") {
            this.setState({ tabIndex: 1 });
        } if(cardPlate === "syndicate") {
            this.setState({ tabIndex: 2 });
        }
    }
    getLoanObject = () => {
        let user;
        if(this.state.currentLoanNo)
        user = _.find(this.state.syndicateLoans,{ LoanNo : this.state.currentLoanNo });
        
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
    setSummaryData = () => {
        let arr = [];
        arr.totalApplications = this.state.biddingLoans.length + this.state.acceptedLoans.length;
        arr.pendingLoans = this.state.biddingLoans.length;
        arr.approvedLoans = this.state.acceptedLoans.length;
        arr.syndicate = this.state.syndicateLoans.length;
        return arr;
    }
    handleChecked = (event, value) => {
        this.setState((prevState) => {
            const newItems = [...prevState.checked];
            newItems[value] = !newItems[value];
            return {checked: newItems};
        });
    }
    deleteItem = (e,index) => {
        let arr = this.state.pendingActivites.slice();
        arr.splice(index, 1);
        this.setState({pendingActivites: arr});
    }
    handleClosee = () => {
        this.setState({initDrawdown: false, currentLoanNo: ''});
    }
    handleExpand = (event, value) => {
        this.setState((prevState) => {
            const newItems = Array.from([...prevState.expandedR]);
            
            newItems[value] = !newItems[value];
            
            return {checked: newItems};
        });
    }
    handleDrawdown = (loan) => {
        let postObj = {
            LoanNo: loan.LoanNo,
            DrawdownNo: loan.drawdownToBeInitiated,
            status: "Initiated"
        };
        axios.put(`http://delvmplwindpark00:8080/loan/` + loan.LoanNo + `/drawdown/` + loan.drawdownToBeInitiated,  postObj )
        .then(res => {
            this.setState({redirectToDashboard: true});
            NotificationManager.success('Success message', 'Amount Paid');
        });
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
                    <Grid container>
                    <Grid item xs={12} sm={12} md={12}>
                    <SimpleCard data={this.setSummaryData()}
                                clickCard={this.clickCard}/>
                    </Grid>
                        <Grid item xs={12} sm={9} md={9}>
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
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.initDrawdown}
                        scroll='body'
                        onClose={this.handleClosee}>
                    <SyndicateDetail 
                        loan={this.getLoanObject()}
                        role={"bank"}
                        onClose={this.handleClosee}
                        expanded={this.state.expanded}
                        handleExpand={this.handleExpand}
                        checked={this.state.checkTC}
                        handleDrawdown = {this.handleDrawdown}/>
                        </Modal>
                        <Modal
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                            open={this.state.openHistory}
                            onClose={this.handleCloseHistory}>
                            <TimelineComponent 
                            loanNo = {this.getGenerationMemo() ? this.getGenerationMemo() : null} />
                        </Modal>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                <TodoActivity data={this.state.pendingActivites}
                                role={"bank"}
                                checked = {this.state.checked}
                                handleCheck={this.handleChecked}
                                 handleDelete={this.deleteItem}/>
                    </Grid>
                </Grid>
                
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