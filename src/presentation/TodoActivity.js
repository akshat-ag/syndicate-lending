import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import citibank from '../static/images/citibank.png';
import wellsfargo from '../static/images/wellsfargo.png';
import IconButton from '@material-ui/core/IconButton';
import jp from '../static/images/jp.png';
import Grid from '@material-ui/core/Grid';
import Check from '@material-ui/icons/Check';
import Edit from '@material-ui/icons/Edit';
import Close from '@material-ui/icons/Close';
const styles = theme => ({
    card: {
        width: '100%'
    },
    todoActivity: {
        marginLeft: theme.spacing.unit * 3,
        marginTop: 15
    },
    media: {
      height: 0,
      paddingTop: '36.25%', // 16:9
      marginTop: 10
    },
    content: {
      paddingTop: 10,
      paddingLeft: 15,
      paddingRight: 0,
      paddingBottom: 0
    },
    tableCell: {
        padding: 0
    },
    tableCellV: {
        fontSize: 14,
        paddingTop: 15,
        paddingBottom: 10,
        paddingRight: 0
    },
    tableActions: {
        padding: 0,
        paddingRight: 0
    },
    cardContent: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 0,
        paddingBottom: 0
    },
    header: {
        paddingLeft: 15,
        background: 'beige',
        paddingBottom: 10,
        paddingTop: 12
    },
    title: {
        color: 'red',
        fontSize: 18,
        fontWeight: 500
    }
});
  function getBankName(loan) {
    if(loan.ApprovedLA === 'citi') {
      return 'CitiBank';
    } else if(loan.ApprovedLA === 'wells') {
      return 'Wells Fargo';
    } else {
      return 'JP Morgan';
    }
  }
  function getCellValue(loan, role) {
    if(role === "borrower") {
      if(loan.Status === "Pending") {
      let banks = '';
      for(let i=0; i<loan.banksQuoted.length; i++) {
        banks = banks.concat(loan.banksQuoted[i]);
        if(i !== loan.banksQuoted.length -1)
        banks = banks.concat(" ,");
      }
      let str = loan.ReqNo + " : " + banks + " have quoted rates, finalize Lead Arranger for the Loan";
      return str;
    } else if(loan.RequisitionStatus === "Approved") {
        let name = getBankName(loan);
        let str = loan.RequisitionNo + " : " + name + " have generated and signed Information Memo, sign it to confirm Loan";
        return str;
    }
  } else if(role === "bank") {
    if(loan.RequisitionStatus === "Pending") {
      let str = "Quote Interest Rate for " + loan.RequisitionNo;
      return str;
    } else if(loan.RequisitionStatus === "Approved") {
        if(!loan.Memo.LeadArranger) {
          let str = "Sign Information Memo for " + loan.RequisitionNo;
          return str;
        } else if(loan.Memo.LeadArranger && loan.Memo.Borrower){
          let str = "Form Syndicate for " + loan.RequisitionNo;
          return str;
        }
    } else if(loan.LoanStatus === "Syndication Formed") {
      let str = "Accept Drawdown for " + loan.LoanNo;
      return str;
    }
  }
  }
  function TodoActivity(props) {
    const { classes } = props;
    console.log(props.bankDetails + "hey");
    return (
      <Grid container item xs={10} className={classes.todoActivity}>
        
        <Card className={classes.card}>
<CardHeader  className={classes.header} 
             subheader ="To-do List" 
             subheaderTypographyProps = {{className: classes.title}}/>
 
 

<CardContent className={classes.cardContent}>
<Table className={classes.table}>

<TableBody>
  {(props.data.length) ?
          Object.keys(props.data).map(value => { return (
            <TableRow key={value.ReqNo} className={classes.tableRow}>
              <TableCell className={classes.tableCell}>
              <Checkbox
            checked={props.checked[value] !== false}
            value="checkedB"
            onChange={(e) => props.handleCheck(e, value)}
            color="primary"
          />
              </TableCell>
              <TableCell className={classes.tableCellV}>
                {getCellValue(props.data[value], props.role)}
                
              </TableCell>
              <TableCell id="removeTooltip" className={classes.tableActions}>
              <Tooltip
                  id="tooltip-top-start"
                  title="Remove"
                  placement="top"
                >
                  <IconButton
                    aria-label="Close"
                    onClick={(e) => props.handleDelete(e,value)}
                  >
                    <Close/>
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          )})
        : <TableRow>
 
  <TableCell > <h4 id="noloan"> No Pending Tasks  </h4></TableCell>
 
  </TableRow>}
  
</TableBody>

</Table>
</CardContent>
</Card></Grid>
    );
  }
 
  export default withStyles(styles)(TodoActivity);