import React, {Component} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import BasicInformationTranche from '../presentation/BasicInformationTranche.js';
import AddParticipants from '../presentation/AddParticipants.js';
import CreateDrawdowns from '../presentation/CreateDrawdowns.js';
import moment from 'moment';
const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(800 + theme.spacing.unit * 2 * 2)]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
});

const steps = ['Basic Information', 'Add Participating Banks', 'Create Drawdowns'];
const banks = [
                {
                  "BankId": 1,
              "BankName": "CitiBank",
              "bankPostname": "citi",
              "ContactFirstName": "Patrick",
              "ContactLastName": "Sprows",
                },
                {
                  "BankId": 2,
                  "BankName": "Wells Fargo",
                  "bankPostname": "wells",
                  "ContactFirstName": "Adam",
                  "ContactLastName": "McLory"
                }, {
                  "BankId": 3,
                  "BankName": "JP Morgan",
                  "bankPostname": "jp",
                  "ContactFirstName": "Billy",
                  "ContactLastName": "Brown"
                }
              ];


class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            trancheStartDate: this.props.trancheStartDate,
            trancheEndDate: this.props.trancheEndDate,
            trancheAmount: this.props.trancheAmount,
            currentBankObj: {
              bankId: '',
              ratio: ''
            },
            currentDrawdownObj: {
              amount: '',
              startDate: ''
            },
            participants: [],
            drawdowns: [],
            ratioExceeded: false,
            totalRatio: 0,
            totalAmount: 0,
            amountExceeded: false,
            endDateLimitReached: false,
            trancheEndDateLimitReached: false
        };
        console.log(this.props)
        this.handleEndDate = this.handleEndDate.bind(this);
        this.checkDisability = this.checkDisability.bind(this);
        this.addParticipant = this.addParticipant.bind(this);
        this.checkDrawdownDisability = this.checkDrawdownDisability.bind(this);
        this.addDrawdown = this.addDrawdown.bind(this);
    }
    
 componentDidMount() {
    
 }
  handleNext = (startDate) => {
    const { activeStep } = this.state;
    if(activeStep === steps.length - 2) {
      this.addParticipant();
     // this.setDrawdownStartDate();
    }
    if(activeStep === steps.length - 1) {
      let postObj = {};
      if(!this.state.currentDrawdownObj.amount) {
        postObj = this.createTrancheObject();
        postObj.Drawdowns = this.state.drawdowns;
      } else {
        let lastdrawdown = true;
        let lastdrawdownobj = this.addDrawdown(startDate, lastdrawdown);
        let arr = this.state.drawdowns.slice();
         postObj = this.createTrancheObject(lastdrawdownobj);
         arr.push(lastdrawdownobj);
        postObj.Drawdowns = arr;
        
      }
      
      this.props.addTranche(postObj);
    }
    this.setState({
      activeStep: activeStep + 1,
    });
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1,
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };
  handleEndDate = function(e) {
    let value = e.target.value;
    this.setState({trancheEndDate: value});
    if(value === this.props.loanEndDate) {
      this.setState({trancheEndDateLimitReached :true});
    }
  }
  createTrancheObject = () => {
    let tranche = {};
    tranche.EndDate = this.state.trancheEndDate;
    tranche.StartDate = this.state.trancheStartDate;
   
    tranche.Amount = this.state.trancheAmount;
    tranche.Participants = this.state.participants;
    
    return tranche;
  }
  checkDisability = () => {
    if(this.state.currentBankObj.bank && this.state.currentBankObj.ratio
      && !this.state.ratioExceeded) {
      return true;
    }
    return false;
  }
  checkDrawdownDisability = () => {
    if(this.state.currentDrawdownObj.amount && this.state.currentDrawdownObj.endDate
      && !this.state.amountExceeded && !this.state.endDateLimitReached) {
      return true;
    }
    return false;
  }
  checkBankRatio = (e) => {
    let currRatio = Number(e) || 0;
    for(let i=0; i<this.state.participants.length; i++) {
      currRatio = Number(this.state.participants[i].ratio) + currRatio;
    }
    if(currRatio <= 100) {
      if(currRatio === 100) {
        this.setState({ratioExceeded: true});
      } else {
      this.setState({ ratioExceeded: false});
      }
      return true;
    }
    this.setState({ ratioExceeded: true});
    return false;
  }
  setCurrentBankObj =(e,prop) => {
    let currObj;
    let value = e.target.value;

    if(prop === "bank") {
      currObj = banks.find(obj => {
        return obj.BankId === value
      });
      this.setState(prevState => ({
        currentBankObj: {
            ...prevState.currentBankObj,
            bank: currObj.BankName,
            bankId: value,
            ContactFirstName: currObj.ContactFirstName,
            ContactLastName: currObj.ContactLastName,
            bankPostname: currObj.bankPostname
        }
      }));
    } else if(prop === "ratio") {
      if(this.checkBankRatio(value)) {
        let amount = (this.state.trancheAmount*value)/100;
        this.setState(prevState => ({
          currentBankObj: {
              ...prevState.currentBankObj,
              ratio: value,
              amount: amount
          }
        }));
      }
    }
  }
  setCurrentDrawdownObj = (e,prop) => {
    let value = e.target.value;
    let penultimateday = moment(this.state.trancheEndDate,
      'YYYY-MM-DD').subtract(1, 'days');
    penultimateday = penultimateday.format('YYYY-MM-DD');
    if(prop === "endDate") {
      if(value === this.state.trancheEndDate || value === penultimateday) {
        this.setState({endDateLimitReached: true});
      } else{
        this.setState({endDateLimitReached: false});
      }
      
      this.setState(prevState => ({
        currentDrawdownObj: {
            ...prevState.currentDrawdownObj,
            endDate: value
        }
      }));
    } else if(prop === "amount") {
      if(this.checkDrawdownAmount(value)) {
        
        this.setState(prevState => ({
          currentDrawdownObj: {
              ...prevState.currentDrawdownObj,
              amount: value
          }
        }));
      }
    } 
  }
  checkDrawdownAmount = (e) => {
    let totalAmount = Number(e) || 0;
    for(let i=0; i<this.state.drawdowns.length; i++) {
      totalAmount = Number(this.state.drawdowns[i].amount) + totalAmount;
    }
    if(totalAmount <= this.state.trancheAmount) {
      if(totalAmount === this.state.trancheAmount) {
        this.setState({amountExceeded: true});
      } else {
      this.setState({ amountExceeded: false});
      }
      return true;
    }
    this.setState({ amountExceeded: true});
    return false;
  }
  setDrawdownStartDate = () => {
    if(this.state.drawdowns.length === 0) {
      
      return this.state.trancheStartDate;
    } else {
      let lastDrawdownEndDate = moment(this.state.drawdowns[this.state.drawdowns.length -1].endDate,
                                        'YYYY-MM-DD').add(1, 'days');
      let newStartDate =   lastDrawdownEndDate.format('YYYY-MM-DD');
      
      return newStartDate;
    }
  }
  setEndDateLimit = (startDate) => {
    let lastDrawdownEndDate = moment(startDate,
                                        'YYYY-MM-DD').add(1, 'days');
    let newStartDate =   lastDrawdownEndDate.format('YYYY-MM-DD');
    return newStartDate;
    
  }
  addParticipant = () => {
    if(this.state.currentBankObj.bankId && this.state.currentBankObj.ratio) {
      
      this.setState(prevState => ({
        participants: [
            ...prevState.participants,
            this.state.currentBankObj
        ]
      }));
      let newObj = {
        bankId: '',
        ratio: ''
      };
      let ratio = this.state.totalRatio + Number(this.state.currentBankObj.ratio);

      this.setState({totalRatio: ratio});
      this.setState({ currentBankObj: newObj});
    }
  }
  addDrawdown = (startDate, lastdrawdown) => {
    if(this.state.currentDrawdownObj.amount && this.state.currentDrawdownObj.endDate) {
      let finalObj = this.state.currentDrawdownObj;
      finalObj.startDate = startDate;
      this.setState(prevState => ({
        drawdowns: [
            ...prevState.drawdowns,
            finalObj
        ]
      }));
      
      let newObj = {
        amount: '',
        startDate: '',
        endDate: ''
      };
      let totalAmount = this.state.totalAmount + Number(this.state.currentDrawdownObj.amount);

      this.setState({totalAmount: totalAmount});
      this.setState({ currentDrawdownObj: newObj});
      if(lastdrawdown) {
         return finalObj;
      }
      
    }
  }
  disableNext = () => {
    const {activeStep} = this.state;
    if(activeStep === steps.length - 2) {
      if(this.state.ratioExceeded) {
        return false;
      }
      return true;
    } else if (activeStep === steps.length - 1) {
      if(this.state.amountExceeded && this.state.endDateLimitReached) {
        return false;
      }
      return true;
    }
    return false;
  }
  setEndDateLimitMin = () => {
    let day = moment(this.state.trancheStartDate,
      'YYYY-MM-DD').add(1, 'days');
    day = day.format('YYYY-MM-DD');
    return day;
  }
  getStepContent(step,startDate,endDateLimit) {
    switch (step) {
      case 0:
        return <BasicInformationTranche 
            amount={this.state.trancheAmount}
            startDate={this.state.trancheStartDate}
            endDate={this.state.trancheEndDate}
            setEndDate={this.handleEndDate}
            endDateLimitMax={this.props.loanEndDate}
            endDateLimitMin={this.setEndDateLimitMin()}
            trancheEndDateLimitReached={this.state.trancheEndDateLimitReached}
        />;
      case 1:
        return <AddParticipants checkDisability={this.checkDisability}
                                currentBankObj={this.state.currentBankObj}
                                setCurrentBankObj={this.setCurrentBankObj}
                                checkBankRatio={this.checkBankRatio}
                                ratioExceeded = {this.state.ratioExceeded}
                                addParticipant = {this.addParticipant}
                                participants ={this.state.participants}
                                totalRatio={this.state.totalRatio}/>;
      case 2:
        return <CreateDrawdowns checkDisability={this.checkDrawdownDisability}
                                currentDrawdownObj={this.state.currentDrawdownObj}
                                setCurrentDrawdownObj={this.setCurrentDrawdownObj}
                                trancheEndDate={this.state.trancheEndDate}
                                drawdownEndMin = {endDateLimit}
                                startDate = {startDate}
                                checkDrawdownAmount={this.checkDrawdownAmount}
                                amountExceeded = {this.state.amountExceeded}
                                endDateLimitReached = {this.state.endDateLimitReached}
                                addDrawdown = {this.addDrawdown}
                                drawdowns ={this.state.drawdowns}
                                totalAmountRemaining={(Number(this.state.trancheAmount) - Number(this.state.totalAmount))}/>;
      default:
        throw new Error('Unknown step');
    }
  }
  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;
    let startDate = this.setDrawdownStartDate();
    let endDateLimit = this.setEndDateLimit(startDate);
    return (
      <React.Fragment>
       
        <main className={classes.layout}>
        
          <Paper className={classes.paper}>
            <Typography variant="title" align="center">
              Add Tranche
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper} >
              {steps.map(label => (
                <Step id="stepper1" key={label}>
                  <StepLabel id="stepper">{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="headline" gutterBottom>
                    Tranche #{this.props.counter} Created Successfully.
                  </Typography>
                  <Typography variant="subheading">
                    Remaining Tranches: {this.props.trancheNo - this.props.counter}
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {this.getStepContent(activeStep,startDate,endDateLimit)}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button onClick={this.handleBack} className={classes.button}>
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => this.handleNext(startDate)}
                      disabled={this.disableNext()}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                    </Button>
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

Checkout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Checkout);