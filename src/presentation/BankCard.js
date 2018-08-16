import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import wellsfargo from '../static/images/citibank.png';
import Grid from '@material-ui/core/Grid';
const styles = {
    card: {
      maxWidth: 200,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    content: {
      paddingTop: 0,
      paddingLeft: 15,
      paddingRight: 0
    }
  };
  
  function SimpleMediaCard(props) {
    const { classes } = props;
    return (
      
        <Card className={classes.card}>
          <CardMedia
            id="card"
            className={classes.media}
            image={wellsfargo}
            title="ICICI Bank"
          />
          <CardContent className={classes.content}>
            <Typography gutterBottom variant="headline" component="h4">
              {props.bankDetails.firstName + " " + props.bankDetails.secondName}
            </Typography>
            <Typography >
                Loan Amount: {props.bankDetails.loanamount}
            </Typography>
            <Typography >
                Deadline: {props.bankDetails.deadline}
            </Typography>
            <Typography >
               Interest Rate: {props.bankDetails.rate}
            </Typography>
          </CardContent>
          {(props.bankDetails.status === "Rate Quoted") ?  <CardActions>
            <Button size="small" color="primary">
              Accept
            </Button>
            
          </CardActions> : null }
         
        </Card>
    );
  }
  
  SimpleMediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(SimpleMediaCard);