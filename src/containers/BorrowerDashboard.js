import React, { Component } from 'react';
import {AuthenticatedServiceInstance} from '../services/AuthenticationService';
import PendingApplications from '../presentation/BorrowerPendingApplications';
import ApprovedLoans from '../presentation/BorrowerApprovedLoans';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';
import Modal from '@material-ui/core/Modal';
import CustomizedTabs from '../presentation/RequisitionTabs';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Demo from '../presentation/ReactGridExample';
// import ReactTablee from '../presentation/ReactTableExample';
import SyndicateDetail from '../presentation/DrawdownInitiateModal';
import SyndicateLoans from '../presentation/LoansTable';
import InformationMemo from '../presentation/InformationMemo';
import TodoActivity from '../presentation/TodoActivity';
import SimpleCard from '../presentation/LoanSummary';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import {NotificationManager} from 'react-notifications';
import LoanDetails from './LoanDetails';
import Grid from "@material-ui/core/Grid";
import TimelineComponent from '../presentation/TimelineComponent.js';
const names = [
    {name: 'CitiBank',
    value: 'citi'},
    {name: 'Wells Fargo',
    value: 'wells'},
    {name: 'JP Morgan',
      value: 'jp'}
  ];
const styles = theme => ({
    todoActivity: {
        marginLeft: theme.spacing.unit * 3,
        marginTop: 15
    },
    content : {
        display: 'inline-flex',
    },
    card : {
        boxShadow: 'none'
    }
});
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.authenticedServiceInstance = AuthenticatedServiceInstance;
    	this.state = {
            approvedLoansRowsPerPage: 5,
            approvedLoansPage: 0,
            approvedLoans: [],
            approvedLoansView: [],
            redirectToApplication: false,
            pendingActivites: [],
            syndicateLoans: [],
            expanded: [],
            expandedR: [],
            initDrawdown: false,
            checked: [],
            currentLoanNo: '',
            tabIndex: 0,
            currentReq: '',
            openHistory: false,
            bankName: '',
            checkTC: false,
            redirectToDashboard: false,
            generateInfo: false,
            expandedRowIds: []
    	};
        this.myCallback = this.myCallback.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
        this.handleExpandClick = this.handleExpandClick.bind(this);
    }
    componentDidMount() {
        let user = this.authenticedServiceInstance.getUserInfo();
        let role = user.orgId;
        let requisitions =  axios.get(`http://delvmplwindpark00:8080/requisitions/` + role);
        let loans = axios.get('http://delvmplwindpark00:8080/borrower/' + role + '/loans');
        requisitions.then(({ data: loanList }) => {
                let statusAddedRequisition= {};
                let approvedLoans = [];
                let pendingLoans = [];
                let actionPendingLoans = [];
                let actionApprovedLoans = [];
                for( let i = 0, max = loanList.length; i < max ; i++ ){
                    if( loanList[i].RequisitionStatus === "Approved" ){
                        statusAddedRequisition = this.sortStatus(loanList[i]);
                        approvedLoans.push(statusAddedRequisition);
                        if(statusAddedRequisition.Memo.LeadArranger && !statusAddedRequisition.Memo.Borrower) {
                            actionApprovedLoans.push(statusAddedRequisition);
                        }
                    } else if(loanList[i].RequisitionStatus === "Pending"){
                        pendingLoans.push(loanList[i]);
                        
                        for(let j=0; j<loanList[i].RoI.length; j++) {
                            if(loanList[i].RoI[j].Status === "Rate Quoted") {
                                actionPendingLoans.push(loanList[i]);
                                break;
                            }
                        }
                        
                    }
                }
                this.authenticedServiceInstance.setPendingLoans(actionPendingLoans);
                this.authenticedServiceInstance.setApprovedLoans(actionApprovedLoans);
                this.setState({ approvedLoans: approvedLoans, pendingLoans: pendingLoans });
                this.setApprovedViewLoans();
                this.calculateNotifications();
            });
            loans.then(({ data: loanList }) => {
                this.setState({loansResolved: true});
                this.setState({ syndicateLoans: loanList });
                let arr = []; let ner = [];
                for(let i=0; i<loanList.length; i++) {
                 arr[i] = false;
                 ner[i] = false;
                 }
                 let statusAddedRequisition;
                 for(let u = 0; u< loanList.length; u++) {
                    statusAddedRequisition = this.authenticedServiceInstance.findDrawdown(loanList[u]);
                    
                    loanList[u].drawdownToBeInitiated = statusAddedRequisition;
                    
                    if(loanList[u].drawdownToBeInitiated !== '') {
                        loanList[u].currStatus = 'Pay Drawdown';
                    } else 
                        loanList[u].currStatus = 'Paid full';
                   }
                 this.setState({expanded: arr, expandedR: ner});
             });
    }
    calculateNotifications = () =>  {
        let pendingActivites = this.authenticedServiceInstance.getPendingActivities();
        let approvedActivities = this.authenticedServiceInstance.getApprovedActivities();
        //let syndicateActivities = this.authenticedServiceInstance.getSyndicateActivities();
        let totalactivites;
        totalactivites = pendingActivites.concat(approvedActivities);
        // totalactivites = totalactivites.concat(syndicateActivities);

     
        
        this.setState({pendingActivites : totalactivites});
        let arrr = [];
      // let pendingActivites = [];
       for(let i=0; i<totalactivites.length; i++) {
           arrr[i] = false;
       }
       this.setState({checked: arrr});
    }
    myCallback = (loanId) => {
    	this.setState({
    		redirect: true,
    		loanToRedirect: loanId
    	});
    }
    handleClosee = () => {
        this.setState({initDrawdown: false, currentLoanNo: ''});
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
    clickCard = (cardPlate) => {
        if(cardPlate === "pending") {
            this.setState({ tabIndex: 0 });
        } else if(cardPlate === "approved") {
            this.setState({ tabIndex: 1 });
        } if(cardPlate === "syndicate") {
            this.setState({ tabIndex: 2 });
        }
    }
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
        let user;
        if(this.state.historyType === 'loan') {
            user = _.find(this.state.syndicateLoans,{ LoanNo : this.state.currentReq });
            return user;
        }
        else {
            let user = _.find(this.state.approvedLoans,{ RequisitionNo : this.state.currentReq });
            if(user) {
                let name =_.find(names,{ value : user.ApprovedLA });
                user.bankName = name.name;
            }
            return user;
        }
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
    handleChecked = (event, value) => {
        this.setState((prevState) => {
            const newItems = [...prevState.checked];
            newItems[value] = !newItems[value];
            return {checked: newItems};
        });
    }
    handleExpandClick = function(event, expandedRowIds){
        this.setState({
            expandedRowIds: expandedRowIds
        });
      };
    getPendingLoanRows = () => {
        let arr = [];
        let obj={};
        for(let i=0; i< this.state.pendingLoans.length; i++) {
            arr.push({RequisitionNo: this.state.pendingLoans[i].RequisitionNo,
                Amount: "$ " + this.state.pendingLoans[i].RequisitionAmount,
                StartDate: this.state.pendingLoans[i].StartDate,
                EndDate: this.state.pendingLoans[i].EndDate})
        }
        //this.setState({pendingLoanRows: arr});
        return arr;
    }
    
    
    initiateDrawdown = (loanNo) => {
        this.setState({initDrawdown: true, currentLoanNo: loanNo});
    }
    getRowData = function(row) {
        return <LoanDetails loanNo= {row.RequisitionNo} />;
    }
    deleteItem = (e,index) => {
        let arr = this.state.pendingActivites.slice();
        arr.splice(index, 1);
        this.setState({pendingActivites: arr});
    }
    getTabData = () =>  {
        switch(this.state.tabIndex) {
            case 0:
              return   <Demo loanList={this.getPendingLoanRows()}
                  redirectToLoan={this.myCallback}
                  handleExpandClick = {this.handleExpandClick}
                  expandedRowIds= {this.state.expandedRowIds}
                  getExpandProp = {this.getExpandProp}
                  getComponent = {this.getRowData} />;
              case 1: 
                    return   <ApprovedLoans loanList={this.setApprovedViewLoans()}
                    totalLoans={this.state.approvedLoans.length}
                    rowsPerPage={this.state.approvedLoansRowsPerPage}
                    page={this.state.approvedLoansPage}
                    handleChangePage={this.handleChangePage}
                    handleAction={this.handleAction}
                    handleViewHistory={this.handleViewHistory}
                    handleChangeRowsPerPage={this.handleChangeRowsPerPage}/>;
                case 2:
                    return <SyndicateLoans  
                    loanList={this.state.syndicateLoans} 
                    showLoan={this.showLoanDetails}
                    handleViewHistory={this.handleViewHistory}
                    role={"borrower"}
                    handleAction={this.initiateDrawdown}/>;
            default: 
                throw new Error('Unknown step');
        }
    };
    setSummaryData = () => {
        let arr = [];
        arr.totalApplications = this.state.pendingLoans.length + this.state.approvedLoans.length;
        arr.pendingLoans = this.state.pendingLoans.length;
        arr.approvedLoans = this.state.approvedLoans.length;
        arr.syndicate = this.state.syndicateLoans.length;
        return arr;
    }
    getLoanObject = () => {
        let user;
        if(this.state.currentLoanNo)
        user = _.find(this.state.syndicateLoans,{ LoanNo : this.state.currentLoanNo });
        
        return user;
    }
    handleExpand = (event, value) => {
        this.setState((prevState) => {
            const newItems = Array.from([...prevState.expandedR]);
            
            newItems[value] = !newItems[value];
            
            return {checked: newItems};
        });
    }
    handleOpenApp = () => {
        this.setState({redirectToApplication: true});
    }
    handleViewHistory = (reqNo, type) => {
        this.setState({openHistory: true, currentReq: reqNo, historyType: type});
    }
    handleCloseHistory = () => {
        this.setState({openHistory: false, currentReq: ''});
        return false;
    }
    render() {
        const {classes} = this.props;
        console.log(this.state);
   		if (this.state.redirect && this.state.loanToRedirect) {
    		return <Redirect push to={`/loan/${this.state.loanToRedirect}`}/>;
          }
          if(this.state.redirectToDashboard) {
            return <Redirect push to={`/`}/>;
          }
          if(this.state.redirectToApplication) {
            return <Redirect push to={`/application`}/>;
          }
        if(this.state.approvedLoans && this.state.pendingLoans) {
            return (
                <div id="borrowerDashboard">
                    <Grid container>
                    <Grid item xs={12} sm={12} md={12}>
                    <SimpleCard data={this.setSummaryData()}
                                clickCard = {this.clickCard}/>
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
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.initDrawdown}
                        scroll='body'
                        onClose={this.handleClosee}>
                    <SyndicateDetail 
                        loan={this.getLoanObject()}
                        handleClick={this.sendMemo}
                        role={"borrower"}
                        handleCheck={this.handleCheck}
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
                <Grid item container xs={12} sm={12} md={4}>
                <Grid item  xs={10} sm={10} md={10} className={classes.todoActivity}>
                <Paper className="pap">
                <Card className={classes.card}>
              <CardContent className={classes.content}>
               <Button variant="fab" id="initAppBtn" aria-label="Add" onClick={this.handleOpenApp}>
                <AddIcon /> 
                 </Button>
               <Typography  id="initAppLabel" variant="heading">Initiate Application</Typography>
                </CardContent>
               </Card>
               </Paper>
               <TodoActivity data={this.state.pendingActivites}
                                role= {"borrower"}
                                checked = {this.state.checked}
                                handleCheck={this.handleChecked}
                                 handleDelete={this.deleteItem}/>
                    </Grid>
                  
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

export default withStyles(styles)(Dashboard);
