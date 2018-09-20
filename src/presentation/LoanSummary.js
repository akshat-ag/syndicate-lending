import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import citibank from '../static/images/citibank.png';
import wellsfargo from '../static/images/wellsfargo.png';
import total from '../static/images/total.png';
import pending from '../static/images/pending.png';
import loans from '../static/images/loans.png';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
const styles = {
    card: {
        display: 'flex',
        width: 270
      },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
      marginTop: 10
    },
    // content: {
    //   paddingTop: 20,
    //   paddingLeft: 15,
    //   paddingRight: 0
    // },
    pap: {
        width: 267
    },
    iconn1: {
        width: 50,
        height: 50,
        marginLeft: 27,
        marginTop: 20,
        marginRight: 6,
    },
    iconn2: {
        width: 50,
        height: 50,
        marginLeft: 93,
       // marginTop: 20,
        marginRight: 6,
    },
    iconn3: {
        width: 50,
        height: 50,
        marginLeft: 86,
        //marginTop: 20,
        marginRight: 6,
    },
    iconn4: {
        width: 50,
        height: 50,
        marginLeft: 76,
        //marginTop: 20,
        marginRight: 6,
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 5
      },
      content: {
        flex: '1 0 auto',
        paddingLeft: 18
      },
      numberItem: {
          color: "#007bff",
           fontWeight: 500
      },
      labelItem: {
        color: "#000000",
         fontWeight: 200
    }
  };
 
  function SimpleCard(props) {
    const { classes } = props;

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
      <Grid container item xs={12}>
          <Grid  item xs={12} sm={6} md={3}>
        <Paper className={classes.pap}>
         <Card className={classes.card} >
         
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography className= {classes.numberItem} variant="headline">{props.data.totalApplications}</Typography>
          <Typography className= {classes.labelItem} variant="subheading" color="textSecondary">
            Total Applications
          </Typography>
        </CardContent>
        
      </div>
      <img className={classes.iconn1} src={total} alt="Girl in a jacket" />
     
    </Card>
        </Paper>
        </Grid> <Grid  item xs={12} sm={6} md={3}>
     <Paper className={classes.pap}>
     <Card className={classes.card}>
     <ButtonBase  onClick={() => props.clickCard("pending")}>
  <div className={classes.details}>
    <CardContent className={classes.content}>
    <Typography className= {classes.numberItem} variant="headline">{props.data.pendingLoans}</Typography>
    <Typography className= {classes.labelItem} variant="subheading" color="textSecondary">
        Pending
      </Typography>
    </CardContent>
    
  </div>
  <img className={classes.iconn2} src={pending} alt="Girl in a jacket" />
  </ButtonBase>
</Card>
    </Paper></Grid> <Grid  item xs={12} sm={6} md={3}>
    <Paper className={classes.pap}>
    <Card className={classes.card}>
    <ButtonBase  onClick={() => props.clickCard("approved")}>
 <div className={classes.details}>
   <CardContent className={classes.content}>
   <Typography className= {classes.numberItem} variant="headline">{props.data.approvedLoans}</Typography>
   <Typography className= {classes.labelItem} variant="subheading" color="textSecondary">
       Approved
     </Typography>
   </CardContent>
   
 </div>
 <img className={classes.iconn3} src={total} alt="Girl in a jacket" />
 </ButtonBase>
</Card>
   </Paper></Grid> <Grid  item xs={12} sm={6} md={4} lg={3}>
   <Paper className={classes.pap}>
   <Card className={classes.card}>
   <ButtonBase  onClick={() => props.clickCard("syndicate")}>
<div className={classes.details}>
  <CardContent className={classes.content}>
  <Typography className= {classes.numberItem} variant="headline">{props.data.syndicate}</Typography>
  <Typography className= {classes.labelItem} variant="subheading" color="textSecondary">
      Syndicates
    </Typography>
  </CardContent>
  
</div>
<img className={classes.iconn4} src={loans} alt="Girl in a jacket" />
</ButtonBase>
</Card>
  </Paper></Grid>
  </Grid>
    );
  }
  
  
  
  export default withStyles(styles)(SimpleCard);