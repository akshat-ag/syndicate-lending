import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from "@material-ui/core/Grid";
import Checkout from './TrancheModal';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import AddIcon from "@material-ui/icons/Add";
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import TranchesOverview from '../presentation/TranchesOverview.js';
import TrancheView from '../presentation/ViewTranche.js';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {NotificationManager} from 'react-notifications';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import moment from 'moment';
const styles = theme => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        marginTop: theme.spacing.unit * 2.4,
        [theme.breakpoints.up(900 + theme.spacing.unit * 2 * 2)]: {
            width: 900,
            marginLeft: theme.spacing.unit * 2,
            marginRight: 'auto',
        },
    },
    chip: {
        marginTop: theme.spacing.unit * 4,
        marginLeft: theme.spacing.unit * 1
    },
    badaWell: {
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 1.5,
        paddingRight: theme.spacing.unit * 1.5
    },
    borrwerLine: {
        marginTop: theme.spacing.unit * 1,
    },
    trancheNo: {
        marginTop: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit * 1.5,
    },
    submitBtn: {
        marginTop: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit * 1.5
    },
    loanSummaryWell: {

    }
})
class SyndicateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            tranches: [],
            trancheNo: '',
            trancheStartDate: '',
            trancheEndDate: '',
            currentTranche: '',
            openn: false,
            counter: 0,
            redirect: false
        };
        //this.handleOpen = this.handleOpen.bind(this);
        this.checkDisability = this.checkDisability.bind(this);
    }
    componentDidMount() {
        const { match: { params } } = this.props;
        axios.get(`http://delvmplwindpark00:8080/requisition/${params.id}`)
			.then(({ data: loanDetail }) => {
			    this.setState({ loanDetail: loanDetail });
				this.setState({ banksList: loanDetail.RoI });
				console.log('state', this.state);
				
			})
			.catch((error) => {
				console.log('Data wasnt rendered');
				this.setState({hasError: true});
			});
    }
    
    handleClose =() => {
        this.setState({ open: false });
    }
    handleClosee =() => {
        this.setState({ openn: false , currentTranche: ''});
    }
    setTrancheNo = event => {
        let trancheNo = event.target.value;
        this.setState({ trancheNo: trancheNo });
        let eachTrancheAmount = this.state.loanDetail.RequisitionAmount / trancheNo;
        this.setState({ eachTrancheAmount});
      };
    setStartTrancheDate = () => {
        let date;
        if(this.state.tranches.length === 0) {
            date = this.state.loanDetail.StartDate;
            //this.setState({ trancheStartDate: date})
        }else {
            date = this.state.tranches[this.state.tranches.length -1].EndDate;
            let momentObj = moment(date, 'YYYY-MM-DD').add(1, 'days');
            date = momentObj.format('YYYY-MM-DD');
            //this.setState({ trancheStartDate: date })
        }
        return date;
    }
    setEndTrancheDate = () => {
        if(this.state.trancheNo && this.state.tranches.length === Number(this.state.trancheNo) -1) {
             return this.state.loanDetail.EndDate;
        }
        return this.state.trancheEndDate;
    }
    
    addTranche = (tranche) => {
        this.setState(prevState => ({
            counter:
                prevState.counter + 1,
          }));

        this.setState(prevState => ({
            tranches: [
                ...prevState.tranches,
                tranche
            ]
          }));
        
    }
    checkDisability = () => {
        if(this.state.trancheNo && this.state.counter === Number(this.state.trancheNo)) {
            return false;
        }
        return true;
    }
    checkDisabilityy = () => {
        if(this.state.trancheNo === '' ||
            (this.state.trancheNo && this.state.counter === Number(this.state.trancheNo))) {
            return false;
        }
        return true;
    }
    handleOpen = () => {
        let check = this.checkDisabilityy();
        if(check) {
            this.setState({ open: true });
        }
    }
    setViewTrache = (e,tranche) => {
        this.setState({ openn: true , currentTranche: tranche});
    }
    handleSubmit = () => {
        
        let postObj = {
            "RequisitionNo": this.state.loanDetail.RequisitionNo,
            "Tranches": this.state.tranches
        }
        for(let i=0; i<this.state.tranches.length; i++) {
            let participants = [];
            for(let w=0; w<this.state.tranches[i].Participants.length; w++) {
                let obj = {};
                obj.BankName = this.state.tranches[i].Participants[w].bankPostname;
                obj.AssetRatio = this.state.tranches[i].Participants[w].ratio;
                participants.push(obj);
            }
            postObj.Tranches[i].Participants = participants;
            let amount = postObj.Tranches[i].Amount.toString();
            postObj.Tranches[i].Amount = amount;
        }
        for(let i=0; i<this.state.tranches.length; i++) {
            let drawdowns = [];
            for(let w=0; w<this.state.tranches[i].Drawdowns.length; w++) {
                let obj = {};
                obj.StartDate = this.state.tranches[i].Drawdowns[w].startDate;
                obj.EndDate = this.state.tranches[i].Drawdowns[w].endDate;
                obj.Amount = this.state.tranches[i].Drawdowns[w].amount;
                drawdowns.push(obj);
            }
            
            postObj.Tranches[i].Drawdowns = drawdowns;
        }
        
        axios.post(`http://delvmplwindpark00:8080/loan`, postObj )
        .then(res => {
            this.setState({redirect: true})
          console.log(res);
          console.log(res.data);
          NotificationManager.success('Success message', 'Syndicate Formed');
        });
    }
    render() {
        const { classes } = this.props;
        console.log('Hey ash', this.state);
        if(this.state.redirect === true) {
			return <Redirect push to={`/dashboard`}/>;
		}
        // if (this.state.redirect && this.state.loanToRedirect) {
        //     return <Redirect push to={`/loan/${this.state.loanToRedirect}`} />;
        // }
        if (this.state.loanDetail) {
            return (
                <div className="syndicateScreen">
                    <AppBar position="static" id="dashbRow">
                <Toolbar id="headerBot">
                <Typography id="loggedInAs" variant="subheading" color="inherit">
                Home / Loan / Syndicate Formation
               			</Typography>
                <div id="logout">
                <Typography variant="sunbheading" color="inherit">
               			Logged in as Bank
               			</Typography>
                </div>
                </Toolbar>
            </AppBar>
                <div id="syndicateForm" className={classes.layout}>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={12}>
                            <Paper className={classes.badaWell} id="syndicateForms">
                                <Grid container>
                                    <Grid item xs={12}>
                                <Paper className={classes.loanSummaryWell} id="syndiWell">
                                    <Grid container>
                                        <Grid item md={3}>
                                            <Typography variant="Subheading" color="inherit" className="wellText">
                                                Loan Id: {this.state.loanDetail.RequisitionNo}
                                            </Typography>
                                        </Grid>
                                        <Grid item md={3}>
                                            <Typography variant="Subheading" color="inherit" className="wellText">
                                                Loan Amount: {this.state.loanDetail.RequisitionAmount}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container className={classes.borrwerLine}>
                                        <Grid item md={3}>
                                            <Typography variant="Subheading" color="inherit" className="wellText">
                                                Borrower: {this.state.loanDetail.InstitutionName}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Paper>
                                </Grid>
                                <Grid item xs={6} sm={3} className={classes.trancheNo}>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="trancheNo" required>Enter Number of Tranches</InputLabel>
                                    <Input
                                    id="trancheNo"
                                    required
                                    type="number"
                                    value={this.state.trancheNo}
				                    onChange= {this.setTrancheNo}
                                    />
                                </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                <Chip
                                    className={classes.chip}
                                    id="addtranch"
                                    label="Add Tranche"
                                    clickable= {false}
                                    color="primary"
                                    onDelete={this.handleOpen}
                                    deleteIcon={<AddIcon />}
                                />
                                </Grid>
                                <Modal
                                    aria-labelledby="simple-modal-title"
                                    aria-describedby="simple-modal-description"
                                    open={this.state.open}
                                    onClose={this.handleClose}>
                                    <Checkout 
                                    trancheAmount={this.state.eachTrancheAmount}
                                    trancheStartDate={this.setStartTrancheDate()}
                                    loanEndDate = {this.state.loanDetail.EndDate}
                                    trancheEndDate={this.setEndTrancheDate()}
                                    trancheNo={this.state.trancheNo}
                                    counter={this.state.counter}
                                    addTranche={this.addTranche}/>
                                </Modal>
                                <Grid item xs={12} className={classes.chip}>
                                <TranchesOverview trancheList={this.state.tranches}
                                    handleView= {this.handleView}
                                    totaltranches={this.state.tranches.length}
                                    page={this.state.tranchesPage}
                                    handleClick = {this.setViewTrache}
                                    />
                                    <Modal
                                    aria-labelledby="simple-modal-title"
                                    aria-describedby="simple-modal-description"
                                    open={this.state.openn}
                                    onClose={this.handleClosee}>
                                    <TrancheView 
                                    tranche={this.state.currentTranche}
                                    />
                                </Modal>
                                    </Grid>
                                    <Grid item xs={12} >
                                    <Button
                                    variant="contained"
                                    id={(this.checkDisability()) ? "disabledsubBtn" : "submtbtn"}
                                    color="primary"
                                    className= {classes.submitBtn}
                                    onClick={() => this.handleSubmit()}
                                    disabled={this.checkDisability()}
                                    >
                                    Submit
                                    </Button>
                                    </Grid>
                                    </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
                </div>
            );
        }
        else {
            return <div className="syndicateScreen"> 
                <AppBar position="static" id="dashbRow">
                <Toolbar id="headerBot">
                <Typography id="loggedInAs" variant="subheading" color="inherit">
               			Home / Loan / Syndicate Formation
               			</Typography>
                <div id="logout">
                <Typography variant="sunbheading" color="inherit">
               			Logged in as Bank
               			</Typography>
                </div>
                </Toolbar>
            </AppBar>
            <Grid container id="loader" justify="center" alignItems="center">
                <Grid container item xs={12} justify="center">
                    <CircularProgress size={50} thickness={4} />
                </Grid>

            </Grid>
            </div>
        }
    }
}
export default withStyles(styles)(SyndicateForm);
