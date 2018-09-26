import {Timeline, TimelineEvent} from 'react-event-timeline';
import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {AuthenticatedServiceInstance} from '../services/AuthenticationService';
import Paper from '@material-ui/core/Paper';
import _ from 'lodash';
const styles = theme => ({
    
      layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        [theme.breakpoints.up(900 + theme.spacing.unit * 2 * 2)]: {
          width: 900,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      },
      paper: {
        height: '450px',
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
        padding: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
          marginTop: theme.spacing.unit * 6,
          marginBottom: theme.spacing.unit * 6,
          padding: theme.spacing.unit * 3,
        },
        overflowY: 'auto'
      },
      container: {
        marginTop: theme.spacing.unit * 0.5,
      },
      table1: {
          width: '50%'
      },
      table2: {
        width: '70%'
    },
      basicItem: {
          paddingTop: 0,
          paddingBottom: 5,
          paddingRight: 0
      }
  });
function getBankName(LeadArranger) {
    if(LeadArranger === 'citi') {
        return 'CitiBank';
      } else if(LeadArranger === 'wells') {
        return 'Wells Fargo';
      } else if(LeadArranger === 'jp') {
        return 'JP Morgan';
      }
}
function getBanksString(tranche) {
    let str = '';
    for(let i=0; i< tranche.Participants.length; i++) {
        let name = getBankName(tranche.Participants[i].BankId);
        str = str.concat(name + " :" +  tranche.Participants[i].AssetRatio + "%");
        if(i !== tranche.Participants.length -1)
        str = str.concat(" , "); 
    }
    return str;
}
class TimelineComponent extends Component {
    constructor(props) {
        super(props);
        this.authenticedServiceInstance = AuthenticatedServiceInstance;
        this.state = {
            loanDetail: []
        }
    }
    componentDidMount() {
      let reqNo = this.props.loanNo.RequisitionNo;
      let loanNo = this.props.loanNo.LoanNo;
      
      let arr = [];
      let reqhistory = axios.get(`http://delvmplwindpark00:8080/requisition/${reqNo}/history/`);
      if(loanNo) {
          let loanHistory = axios.get(`http://delvmplwindpark00:8080/loan/${loanNo}/history/`)
          axios.all([loanHistory, reqhistory])
          .then(axios.spread((loanDetail, reqDetail) => {
            // Both requests are now complete
            let arr = this.sortTimeline(reqDetail.data,'req');
            let arr1 = this.sortTimeline(loanDetail.data, 'loan');
            arr = arr.concat(arr1);
            this.setState({loanDetail: arr});
          }))
          .catch((error) => {
            console.log('Data wasnt rendered');
            this.setState({hasError: true});
          });
    } else {
        reqhistory.then(({ data: loanDetail }) => {
            console.log('user', loanDetail);
            let arr = this.sortTimeline(loanDetail,'req');
            this.setState({loanDetail: arr});
            console.log('state', this.state);
            
          })
          .catch((error) => {
            console.log('Data wasnt rendered');
            this.setState({hasError: true});
          }); 
        }
    }
    sortTimeline = (loanDetail, type) => {
        if(type === 'req') {
      const newItems = [...loanDetail];
      let bankQuotedList = [];
      for(let i=0;i<loanDetail.length; i++) {
        if(i === 0) {
          newItems[i].timelineLabel = "Requisition Created";
          newItems[i].timelineDetail = "Created by " + newItems[i].Value.FirstName +
            " " + newItems[i].Value.LastName + " of " +
            newItems[i].Value.InstitutionName;
         newItems[i].timelineDate = newItems[i].Timestamp.split('.');
         newItems[i].icon = 'create';
        } else if(loanDetail[i].Value.RequisitionStatus === "Pending") {
          for(let j=0;j<loanDetail[i].Value.RoI.length;j++) {
            if(loanDetail[i].Value.RoI[j].Status === "Rate Quoted" &&
          !(_.find(bankQuotedList,{ BankName : loanDetail[i].Value.RoI[j].BankName}))) {
              newItems[i].timelineLabel = "Rate Quoted";
              bankQuotedList.push(loanDetail[i].Value.RoI[j].BankName);
          newItems[i].timelineDetail = "Interest Rate Quoted by " +
          getBankName(loanDetail[i].Value.RoI[j].BankName);
          newItems[i].timelineDate = newItems[i].Timestamp.split('.');
          newItems[i].icon = 'query_builder';
            }
          }
        } 
        else if(loanDetail[i].Value.RequisitionStatus === "Approved") {
            if(!loanDetail[i].Value.Memo.Borrower &&
              !loanDetail[i].Value.Memo.LeadArranger) {
               newItems[i].timelineLabel = "Lead Arranger Finalized"
          newItems[i].timelineDetail = getBankName(loanDetail[i].Value.ApprovedLA)
             + " is selected as Lead Arranger for the loan at rate of "
             +  loanDetail[i].Value.ApprovedRoI + "%";
          ;
         newItems[i].timelineDate = newItems[i].Timestamp.split('.');
         newItems[i].icon = 'how_to_reg';
            } 
            else if(!loanDetail[i].Value.Memo.Borrower &&
              loanDetail[i].Value.Memo.LeadArranger) {
              newItems[i].timelineLabel = "Information Memo Signed by " +
              getBankName(loanDetail[i].Value.ApprovedLA);
          newItems[i].timelineDetail = getBankName(loanDetail[i].Value.ApprovedLA)
             + " generated and signed Information Memo";
             newItems[i].icon = 'receipt';
          ;
         newItems[i].timelineDate = newItems[i].Timestamp.split('.');
            } 
            
            else if(loanDetail[i].Value.Memo.Borrower &&
              loanDetail[i].Value.Memo.LeadArranger) {
              newItems[i].timelineLabel = "Information Memo Signed by " +
              loanDetail[i].Value.InstitutionName;
          newItems[i].timelineDetail = loanDetail[i].Value.InstitutionName
             + " signed the Memo to confirm Agreement";
          ;
          newItems[i].timelineDate = newItems[i].Timestamp.split('.');
          newItems[i].icon = 'assignment_turned_in';
            } 
            
        } else if(loanDetail[i].Value.RequisitionStatus === "Loan Formed") {
            newItems.splice(i, 1);
          }
      }
      return newItems; 
    } else if(type === 'loan') {
        const newItems = [...loanDetail];
        for(let i=0;i<loanDetail.length; i++) {
            if(i === 0) {
                newItems[i].timelineLabel = "Syndicate Formed";
                newItems[i].timelineDetail = "Created by " + getBankName(newItems[i].Value.LeadArranger);
               newItems[i].timelineDate = newItems[i].Timestamp.split('.');
               newItems[i].icon = 'create';
            } else if(i>0){
                let dno = this.authenticedServiceInstance.findDrawdownPaid(loanDetail[i].Value);
                newItems[i].timelineLabel = "Drawdown Paid";
                newItems[i].timelineDetail = getBankName(loanDetail[i].Value.LeadArranger) +
                " paid Drawdown " + dno.drawdownNo + " amounting $" + dno.drawdownAmount;
               newItems[i].timelineDate = newItems[i].Timestamp.split('.');
               newItems[i].icon = 'payment';
            }
    }
    return newItems;
    }
}
    render() {
        const {classes} = this.props;
  return (
    
    <React.Fragment>
       
       <main className={classes.layout}>
      
        <Paper className={classes.paper}>
        <Typography variant="subheadline" align="center" color="#1E79D3">
         Transaction History 
            </Typography>
          
        <hr id="lineHeader"/>
        
        {(this.state.loanDetail.length) ? 
      
        Object.keys(this.state.loanDetail).map(row => {
        return (
          <Timeline>
          <TimelineEvent title={this.state.loanDetail[row].timelineLabel}
                        titleStyle={{fontWeight: "bold"}}
                        subtitle={"TxId: " +  this.state.loanDetail[row].TxId}
                        subtitleStyle={{color: "#1E79D3"}}
                           createdAt={this.state.loanDetail[row].Timestamp}
                           icon={<i className="material-icons md-18">{this.state.loanDetail[row].icon}</i>}
            >
           {this.state.loanDetail[row].timelineDetail}
           </TimelineEvent>
           </Timeline> 
           );
         })  : <Grid container  id="loader" justify="center" alignItems="center">
      <Grid container item xs={12} justify="center">
      <CircularProgress  size={50} thickness={4} />
      </Grid>
    
      </Grid> } 
        </Paper>
      </main>
    </React.Fragment>
  );
}
}

export default withStyles(styles)(TimelineComponent);