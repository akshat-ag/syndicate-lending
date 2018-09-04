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
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DeleteIcon from '@material-ui/icons/Delete';
const styles = theme => ({
    root: {
        width: '90%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    }, table: {
        minWidth: 100,
    },
    paddingNone: {
        padding: '1px 56px 1px 24px',
    }
});
function getParticipantRows(data) {
    return data.map(row => {
        return <TableRow>
                  <TableCell>counter</TableCell>
                  <TableCell>{el.b}</TableCell>
                  <TableCell>{el.c}</TableCell>
              </TableRow>
        }) 
}
function AddParticipants(props) {
    const { classes } = props;
    return (
        <div className="">
            <h3> Add Bank</h3>
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
                        
                        <TableRow>
                            <TableCell component="th" scope="row">
                                1
                            </TableCell>
                            <TableCell numeric>
                                <FormControl className={classes.formControl}>
                                    <Select
                                    name="age"
                                    displayEmpty
                                    className={classes.selectEmpty}>
                                        <MenuItem value="" disabled>
                                            Placeholder
                                        </MenuItem>
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                    <FormHelperText>Placeholder</FormHelperText>
                                </FormControl>
                            </TableCell>
                            <TableCell component="th" scope="row">
                               20%
                            </TableCell>
                            <TableCell component="th" scope="row">
                               1 million USD
                            </TableCell>
                            <TableCell component="th" scope="row">
                            <Button variant="fab" color="primary" aria-label="Delete" className={classes.button}>
                                <DeleteIcon />
                            </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        </div>)
}

export default withStyles(styles)(AddParticipants);