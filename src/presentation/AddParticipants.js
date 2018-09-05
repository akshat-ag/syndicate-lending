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
import InputLabel from '@material-ui/core/InputLabel';
const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    }, table: {
        minWidth: 100,
    },
    paddingNone: {
        padding: '1px 56px 1px 24px',
    },
    chip: {
        marginTop: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit * 16
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
    }
});
{/* <Button variant="fab" color="primary" aria-label="Delete" >
                                <DeleteIcon />
                            </Button>
*/}
function getParticipantRows(data) {
    return Object.keys(data).map(row => {
        return (
          <TableRow key={data[row].bankId}>
            <TableCell component="th" scope="row">
              {Number(row) + 1}
            </TableCell>
            <TableCell >{data[row].bank}</TableCell>
            <TableCell >{data[row].ratio}</TableCell>
            <TableCell >{data[row].amount}</TableCell>
            <TableCell ></TableCell>

          </TableRow>
        );
      })
}
function AddParticipants(props) {
    const { classes } = props;
    let arr = [];
    
    return (
        <div className="">
            <Grid container>
                <Grid item xs={6}>
            <h3> Add Bank</h3>
            </Grid>
            <Grid item xs={6}>
               
            <Chip
            className={classes.chip}
            label="Add Another"
            clickable={props.checkDisability()}
            onDelete={props.addParticipant}
            color="primary"
            deleteIcon={<AddIcon />}
        />
     
        </Grid>
        <Grid item xs={12}>
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>S.no</TableCell>
                            <TableCell >Bank</TableCell>
                            <TableCell >Asset Ratio</TableCell>
                            <TableCell >Amount</TableCell>
                            <TableCell >Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {getParticipantRows(props.participants)}
                        <TableRow>
                            <TableCell component="th" scope="row">
                                {props.participants.length + 1}
                            </TableCell>
                            <TableCell numeric>
                            <FormControl >
                            <Select
                                    value={props.currentBankObj.bankId}
                                    onChange={(e) => props.setCurrentBankObj(e,"bank")}
                                    name="bank"
                                    displayEmpty
                                   
                                >
                                    <MenuItem value="" disabled>
                                    Select Bank
                                    </MenuItem>
                                    <MenuItem value={1}>CitiBank</MenuItem>
                                    <MenuItem value={2}>Wells Fargo</MenuItem>
                                    <MenuItem value={3}>JP Morgan</MenuItem>
                                </Select>
                                </FormControl>
                                
                            </TableCell>
                            <TableCell component="th" scope="row">
                            <TextField
                                required
                                id="simple-start-adornment"
                                type="number"
                                value={props.currentBankObj.ratio}
                                onChange={(e) => props.setCurrentBankObj(e,"ratio")}
                                error={props.ratioError}
                               
                                InputProps={{
                                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                }}
                            />
                            </TableCell>
                            <TableCell component="th" scope="row">
                            {props.currentBankObj.amount}
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

export default withStyles(styles)(AddParticipants);