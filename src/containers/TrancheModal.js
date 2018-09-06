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
              "ContactFirstName": "Patrick",
              "ContactLastName": "Sprows",
                },
                {
                  "BankId": 2,
                  "BankName": "Wells Fargo",
                  "ContactFirstName": "Adam",
                  "ContactLastName": "McLory"
                }, {
                  "BankId": 3,
                  "BankName": "JP Morgan",
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
            trancheEndtDate: this.props.trancheEndtDate,
            trancheAmount: this.props.trancheAmount,
            currentBankObj: {
              bankId: '',
              ratio: ''
            },
            currentDrawdownObj: {
              amount: ''
            },
            participants: [],
            drawdowns: [],
            ratioExceeded: false,
            totalRatio: 0
        };
        console.log(this.props)
        this.handleEndDate = this.handleEndDate.bind(this);
        this.checkDisability = this.checkDisability.bind(this);
        this.addParticipant = this.addParticipant.bind(this);
    }
    
 componentDidMount() {
     //this.setTrancheDate();
 }
  handleNext = () => {
    const { activeStep } = this.state;
    if(activeStep === steps.length - 2) {
      this.addParticipant();
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
    var momentObj = moment(e.target.value, 'YYYY-MM-DD').add(5, 'days');
    var momentString = momentObj.format('YYYY-MM-DD'); 
    this.setState({trancheEndDate: momentString});
    
  }
  checkDisability = () => {
    if(this.state.currentBankObj.bank && this.state.currentBankObj.ratio
      && !this.state.ratioExceeded) {
      return true;
    }
    return false;
  }
  checkDrawdownDisability = () => {

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
            ContactLastName: currObj.ContactLastName
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
    if(prop === "endDate") {
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
  checkDrawdownAmount = (e) => {}
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
  disableNext = () => {
    const {activeStep} = this.state;
    if(activeStep === steps.length - 2) {
      if(this.state.ratioExceeded) {
        return false;
      }
      return true;
    }
    return false;
  }
  getStepContent(step) {
    switch (step) {
      case 0:
        return <BasicInformationTranche 
            amount={this.state.trancheAmount}
            startDate={this.state.trancheStartDate}
            endDate={this.state.trancheEndDate}
            setEndDate={this.handleEndDate}
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
                                checkDrawdownAmount={this.checkDrawdownAmount}
                                amountExceeded = {this.state.amountExceeded}
                                addDrawdown = {this.addDrawdown}
                                drawdowns ={this.state.drawdowns}
                                totalAmount={this.state.totalAmount}/>;
      default:
        throw new Error('Unknown step');
    }
  }
  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;

    return (
      <React.Fragment>
       
        <main className={classes.layout}>
        
          <Paper className={classes.paper}>
            <Typography variant="title" align="center">
              Add Tranche
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="headline" gutterBottom>
                    Thank you for your order.
                  </Typography>
                  <Typography variant="subheading">
                    Your order number is #2001539. We have emailed your oder confirmation, and will
                    send you an update when your order has shipped.
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {this.getStepContent(activeStep)}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button onClick={this.handleBack} className={classes.button}>
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
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