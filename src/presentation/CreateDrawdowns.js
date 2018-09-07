import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Chip from "@material-ui/core/Chip";
import Input from '@material-ui/core/Input';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    }, table: {
        minWidth: 100,
    },
    paddingNone: {
        padding: '1px 22px 1px 12px',
    },
    chip: {
        marginTop: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit*2
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
      },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    delbutton: {
        height: theme.spacing.unit * 5,
        width: theme.spacing.unit * 5,
    },
    header: {
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 0
    },
    inputRatio: {
        width: theme.spacing.unit * 18
    },
    amount: {
        width: theme.spacing.unit * 12
    }
});
{/* <Button variant="fab" color="primary" aria-label="Delete" >
                                <DeleteIcon />
                            </Button>
*/}
function getDrawdownRows(data) {
    return Object.keys(data).map(row => {
        return (
          <TableRow key={data[row].startDate}>
            <TableCell component="th" scope="row">
              {Number(row) + 1}
            </TableCell>
            <TableCell >{data[row].amount}</TableCell>
            <TableCell >{data[row].startDate}</TableCell>
            <TableCell >{data[row].endDate}</TableCell>
            <TableCell ></TableCell>

          </TableRow>
        );
      })
}
function CreateDrawdowns(props) {
    const { classes } = props;
    let arr = [];
    let ratio = 100 - (props.totalRatio);
    return (
        <div className="">
            <Grid container>
                <Grid item xs={6}>
            <h3 className={classes.header}> Create Drawdowns</h3>
            </Grid>
            <Grid item xs={6}>
              { console.log('click',props.checkDisability())}
            <Chip
            id="addParticipant"
            className={classes.chip}
            label="Add Another"
            clickable={props.checkDisability()}
            onDelete={() => props.addDrawdown(props.startDate)}
            color="primary"
            deleteIcon={<AddIcon />}
        />
        
        </Grid>
        <Grid item xs={12} sm={6}>
           {props.ratioExceeded ? "Tranche Amount Splitted" : "Amount Remaining: " + ratio}
            </Grid>
        <Grid item xs={12}>
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell  classes={{paddingNone: classes.paddingNone}}>S.no</TableCell>
                            <TableCell  classes={{paddingNone: classes.paddingNone}}>Amount</TableCell>
                            <TableCell  classes={{paddingNone: classes.paddingNone}}>Start Date</TableCell>
                            <TableCell classes={{paddingNone: classes.paddingNone}}>End Date</TableCell>
                            <TableCell  classes={{paddingNone: classes.paddingNone}}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {getDrawdownRows(props.drawdowns)}
                    
                        <TableRow>
                            <TableCell component="th" scope="row">
                                {props.drawdowns.length + 1}
                            </TableCell>
                            <TableCell >
                            <TextField
                                required
                                id="simple-start-adornment"
                                type="number"
                                className={classes.amount}
                                value={props.currentDrawdownObj.amount}
                                onChange={(e) => props.setCurrentDrawdownObj(e,"amount")}
                                error={props.amountExceeded}
                                
                                InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>
                                }}
                            />
                            </TableCell>
                            <TableCell component="th" scope="row">
                            <TextField
                                required
                                type="date"
                                id="start-date"
                                disabled
                                className={classes.inputRatio}
                                value={props.startDate}
                            />
                            </TableCell>
                            <TableCell component="th" scope="row">
                            <FormControl  >
                            <Input
                            required
                            type="date"
                            id="end-date"
                            inputProps= {{ min: props.drawdownEndMin, max: props.trancheEndDate, }}
                           
                            
                            className={classes.inputRatio}
                            value={props.currentDrawdownObj.endDate}
                            onChange={(e) => props.setCurrentDrawdownObj(e, "endDate")}
                            />
                        </FormControl>
                            
                            </TableCell>
                            <TableCell component="th" scope="row">
                            <Button variant="fab" color="primary" aria-label="Delete" className={classes.delbutton}>
                                <DeleteIcon />
                            </Button>
                            </TableCell>
                        </TableRow> 
                    </TableBody>
                </Table>
            </Paper>
            </Grid>
            </Grid>
        </div>)
}

export default withStyles(styles)(CreateDrawdowns);