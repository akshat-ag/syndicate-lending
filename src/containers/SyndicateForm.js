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
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import moment from 'moment';
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
    chip: {
        marginTop: theme.spacing.unit * 4,
        marginLeft: theme.spacing.unit * 1
    },
    badaWell: {
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 1.5,
        paddingRight: theme.spacing.unit * 1.5,
    },
    borrwerLine: {
        marginTop: theme.spacing.unit * 1,
    },
    trancheNo: {
        marginTop: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit * 1.5,
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
            trancheEndDate: ''
        };
        this.handleOpen = this.handleOpen.bind(this);
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
    handleOpen = () => {
        this.setState({ open: true });
    }
    handleClose =() => {
        this.setState({ open: false });
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
            let date = this.state.tranches[this.state.tranches.length -1].endDate;
            let momentObj = moment(date, 'YYYY-MM-DD').add(1, 'days');
            date = momentObj.format('YYYY-MM-DD');
            this.setState({ trancheStartDate: date })
        }
        return date;
    }
    setEndTrancheDate = () => {
        if(this.state.tranches.length === this.state.trancheNo) {
            this.setState({trancheEndDate: this.props.endDateLoan})
        }
        return this.state.trancheEndDate;
    }
    render() {
        const { classes } = this.props;
        console.log('Hey ash', this.state);
        if (this.state.redirect && this.state.loanToRedirect) {
            return <Redirect push to={`/loan/${this.state.loanToRedirect}`} />;
        }
        if (this.state.loanDetail) {
            return (
                <div id="syndicateForm" className={classes.layout}>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={12}>
                            <Paper className={classes.badaWell}>
                                <Grid container>
                                    <Grid item xs={12}>
                                <Paper id="syndiWell">
                                    <Grid container>
                                        <Grid item md={3}>
                                            <Typography variant="Subheading" color="inherit">
                                                Loan Id: {this.state.loanDetail.RequisitionNo}
                                            </Typography>
                                        </Grid>
                                        <Grid item md={3}>
                                            <Typography variant="Subheading" color="inherit">
                                                Loan Amount: {this.state.loanDetail.RequisitionAmount}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container className={classes.borrwerLine}>
                                        <Grid item md={3}>
                                            <Typography variant="Subheading" color="inherit">
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
                                    label="Add Tranche"
                                    clickable
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
                                    trancheEndDate={this.setEndTrancheDate()}
                                    trancheNo={(this.state.tranches.length + 1)}
                                    addTranche={this.addTranche}/>
                                </Modal>
                                <Grid item xs={12} className={classes.chip}>
                                <TranchesOverview trancheList={this.state.tranches}
                                    totaltranches={this.state.tranches.length}
                                    rowsPerPage={this.state.tranchesRowsPerPage}
                                    page={this.state.tranchesPage}
                                    handleChangePage={this.handleChangePage}
                                    handleChangeRowsPerPage={this.handleChangeRowsPerPage}/>
                                    </Grid>
                                    </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            );
        }
        else {
            return <Grid container id="loader" justify="center" alignItems="center">
                <Grid container item xs={12} justify="center">
                    <CircularProgress size={50} thickness={4} />
                </Grid>

            </Grid>
        }
    }
}
export default withStyles(styles)(SyndicateForm);
