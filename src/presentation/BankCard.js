import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import citibank from '../static/images/citibank.png';
import wellsfargo from '../static/images/wellsfargo.png';
import jp from '../static/images/jp.png';
import Grid from '@material-ui/core/Grid';
const styles = {
    card: {
      maxWidth: 200,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
      marginTop: 10
    },
    content: {
      paddingTop: 20,
      paddingLeft: 15,
      paddingRight: 0
    },
  };
  function getImage(bankDetails) {
    if(bankDetails.BankName === 'citi') {
      return citibank;
    } else if(bankDetails.BankName === 'wells') {
      return wellsfargo;
    } else {
      return jp;
    }
  }
  function SimpleMediaCard(props) {
    const { classes } = props;
    console.log(props.bankDetails + "hey");
    const status = props.bankDetails.Status.toUpperCase();
    const acceptCallback = function () {
        props.onSubmit(props.bankDetails.BankName);
    };
    const checkColor = (status) => {
      let colorclass='';
      switch(status) {
        case 'Pending':
          colorclass= 'yellow';
          break;
        case 'Declined':
        colorclass= 'red';
        break;
        default:
        colorclass= '';
        break;
      }
      return colorclass;
    }
    return (
      
        <Card className={classes.card}>
          <CardMedia
            id="card"
            className={classes.media}
            image={getImage(props.bankDetails)}
            title="ICICI Bank"
          />
          <CardContent className={classes.content}>
            <Typography gutterBottom variant="subheading" component="h5">
              {props.bankDetails.ContactFirstName + " " + props.bankDetails.ContactLastName}
            </Typography>
            <Typography >
                Loan Amount: {props.loanAmt}
            </Typography>
            <Typography >
                Deadline: {props.deadline}
            </Typography>
            <Typography >
               Interest Rate: {props.bankDetails.Rate}
            </Typography>
          </CardContent>
          {(props.bankDetails.Status === "Rate Quoted") ?  <CardActions>
            <Button size="small" variant="contained" id="acceptBtn" onClick={acceptCallback}>
              Accept
            </Button>
            
          </CardActions> : <h5 id="statusBank" className={checkColor(props.bankDetails.Status)}> {props.bankDetails.Status.toUpperCase()} </h5> }
         
        </Card>
    );
  }
  
  SimpleMediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(SimpleMediaCard);